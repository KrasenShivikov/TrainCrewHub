"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";

export type PlanSchedulePdfDuty = {
  id: string;
  name: string;
  time: string;
  chiefs: string[];
  conductors: string[];
};

export type PlanSchedulePdfAbsence = {
  id: string;
  employeeName: string;
  reason: string;
  period: string;
  notes: string;
};

type Props = {
  date: string;
  trainDuties: PlanSchedulePdfDuty[];
  businessTrips: PlanSchedulePdfDuty[];
  daysOff: PlanSchedulePdfDuty[];
  absences: PlanSchedulePdfAbsence[];
};

const sectionLabels = {
  trainDuties: "Повески на влак",
  businessTrips: "Командировки",
  daysOff: "Свободни дни"
} as const;

function DutySection({ title, rows }: { title: string; rows: PlanSchedulePdfDuty[] }) {
  return (
    <section style={{ marginTop: 18, breakInside: "avoid" }}>
      <h2 style={{ margin: "0 0 8px", borderBottom: "2px solid #1e3a5f", paddingBottom: 5, color: "#1e3a5f", fontSize: 17 }}>{title}</h2>
      {rows.length ? (
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", fontSize: 11 }}>
          <thead>
            <tr style={{ background: "#1e3a5f", color: "white" }}>
              <th style={headerCellStyle}>Повеска</th>
              <th style={{ ...headerCellStyle, width: "16%" }}>Час</th>
              <th style={headerCellStyle}>Началник влак</th>
              <th style={headerCellStyle}>Кондуктори</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td style={bodyCellStyle}>{row.name}</td>
                <td style={bodyCellStyle}>{row.time || "-"}</td>
                <td style={bodyCellStyle}>{row.chiefs.join(", ") || "-"}</td>
                <td style={bodyCellStyle}>{row.conductors.join(", ") || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <p style={emptyStyle}>Няма записи.</p>}
    </section>
  );
}

const headerCellStyle = { border: "1px solid #64748b", padding: "6px", textAlign: "left" as const };
const bodyCellStyle = { border: "1px solid #94a3b8", padding: "6px", verticalAlign: "top" as const, overflowWrap: "anywhere" as const };
const emptyStyle = { margin: 0, border: "1px solid #cbd5e1", padding: "8px", color: "#64748b", fontSize: 11 };

export function PlanSchedulePdfButton(props: Props) {
  const documentRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  async function downloadPdf() {
    const element = documentRef.current;
    if (!element || generating) return;

    setGenerating(true);
    setError("");
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf")
      ]);
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: true
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const margin = 10;
      const pageWidth = 210;
      const pageHeight = 297;
      const imageWidth = pageWidth - margin * 2;
      const imageHeight = canvas.height * imageWidth / canvas.width;
      const printableHeight = pageHeight - margin * 2;
      const image = canvas.toDataURL("image/jpeg", 0.96);

      let offset = 0;
      do {
        if (offset > 0) pdf.addPage();
        pdf.addImage(image, "JPEG", margin, margin - offset, imageWidth, imageHeight, undefined, "FAST");
        offset += printableHeight;
      } while (offset < imageHeight);

      pdf.save(`план-график-${props.date}.pdf`);
    } catch (caughtError) {
      console.error("Plan schedule PDF generation failed", caughtError);
      const details = caughtError instanceof Error ? caughtError.message : String(caughtError);
      setError(process.env.NODE_ENV === "development"
        ? `PDF файлът не можа да бъде генериран: ${details}`
        : "PDF файлът не можа да бъде генериран. Опитайте отново.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      <button type="button" onClick={downloadPdf} disabled={generating} className="inline-flex h-10 items-center gap-2 rounded bg-rail-route px-4 text-sm font-medium text-white hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
        <Download className="h-4 w-4" />
        {generating ? "Генериране…" : "Изтегли PDF"}
      </button>
      {error ? <p role="alert" className="w-full text-sm text-red-700">{error}</p> : null}

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          width: 794,
          height: 1123,
          overflow: "hidden",
          pointerEvents: "none",
          background: "white"
        }}
      >
        <div ref={documentRef} style={{ width: 794, minHeight: 1123, boxSizing: "border-box", background: "white", padding: 38, color: "#0f172a", fontFamily: "Arial, sans-serif" }}>
          <header style={{ borderBottom: "3px solid #1e3a5f", paddingBottom: 10, textAlign: "center" }}>
            <h1 style={{ margin: 0, color: "#1e3a5f", fontSize: 24, letterSpacing: 1 }}>ПЛАН-ГРАФИК</h1>
            <p style={{ margin: "5px 0 0", fontSize: 13 }}>Дата: {props.date}</p>
          </header>

          <DutySection title={sectionLabels.trainDuties} rows={props.trainDuties} />
          <DutySection title={sectionLabels.businessTrips} rows={props.businessTrips} />
          <DutySection title={sectionLabels.daysOff} rows={props.daysOff} />

          <section style={{ marginTop: 18 }}>
            <h2 style={{ margin: "0 0 8px", borderBottom: "2px solid #1e3a5f", paddingBottom: 5, color: "#1e3a5f", fontSize: 17 }}>Отсъстващи</h2>
            {props.absences.length ? (
              <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed", fontSize: 11 }}>
                <thead><tr style={{ background: "#1e3a5f", color: "white" }}><th style={headerCellStyle}>Служител</th><th style={headerCellStyle}>Причина</th><th style={headerCellStyle}>Период</th><th style={headerCellStyle}>Бележки</th></tr></thead>
                <tbody>{props.absences.map((row) => <tr key={row.id}><td style={bodyCellStyle}>{row.employeeName}</td><td style={bodyCellStyle}>{row.reason}</td><td style={bodyCellStyle}>{row.period}</td><td style={bodyCellStyle}>{row.notes || "-"}</td></tr>)}</tbody>
              </table>
            ) : <p style={emptyStyle}>Няма отсъстващи.</p>}
          </section>
        </div>
      </div>
    </>
  );
}
