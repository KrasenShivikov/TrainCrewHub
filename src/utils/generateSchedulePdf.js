/**
 * CSS rules from print.css (@media print block) re-expressed as normal rules
 * so they apply when html2canvas captures the element outside @media print.
 * Keep in sync with src/styles/print.css.
 */
const PDF_PRINT_STYLES = `
  .plan-schedule-sheet,
  .plan-schedule-sheet * {
    font-family: "Segoe UI", Arial, sans-serif !important;
    text-rendering: geometricPrecision;
  }
  .plan-schedule-sheet { border: none !important; box-shadow: none !important; background: #fff; }
  .plan-schedule-sheet .table { font-size: 10px; }
  .plan-schedule-sheet .table-responsive { overflow: visible !important; }
  .plan-schedule-sheet .table-responsive .table thead th { position: static; }
  .plan-schedule-sheet .plan-schedule-table thead th {
    background: #1a3a6b !important;
    color: #fff !important;
    font-size: 9px !important;
    text-align: center;
    padding: 4px 3px !important;
    border-color: #2a4a7b !important;
  }
  .plan-schedule-sheet .schedule-cell-key-badge {
    background: transparent !important;
    color: #1a3a6b !important;
    font-weight: 700 !important;
    font-size: 7.5px !important;
    padding: 0 !important;
    margin-right: 2px !important;
    min-width: unset !important;
    border-radius: 0 !important;
  }
  .plan-schedule-sheet .schedule-duty-name-ellipsis { white-space: normal; overflow: visible; text-overflow: unset; }
  .plan-schedule-sheet h2, .plan-schedule-sheet h3, .plan-schedule-sheet p { margin-bottom: 0.35rem !important; }
  .plan-schedule-sheet section { margin-bottom: 0.75rem !important; }
  .plan-schedule-sheet footer {
    margin-top: 0.75rem !important;
    border-top: 1px solid #b0b8c8;
    padding-top: 8px !important;
  }
  .plan-schedule-sheet footer .col-md-4 { text-align: center; }
  .plan-schedule-sheet footer .small {
    font-size: 8px !important;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #4a5568 !important;
    font-weight: 700;
  }
  .plan-schedule-sheet footer .border-bottom {
    border-bottom: 1px solid #374151 !important;
    margin-top: 28px;
  }
  html.pdf-compact .plan-schedule-sheet .table { font-size: 10px; }
  html.pdf-compact .plan-schedule-sheet .table > :not(caption) > * > * { padding: 0.12rem 0.2rem; }
  html.pdf-compact .plan-schedule-sheet .plan-schedule-table tbody th,
  html.pdf-compact .plan-schedule-sheet .plan-schedule-table tbody td { height: 28px; }
  .plan-schedule-sheet .print-hide-train-only { display: none !important; }
  html.pdf-hide-second-day .plan-schedule-sheet .second-day-col { visibility: hidden !important; }
  .plan-schedule-sheet .print-as-cards .plan-schedule-table { display: none !important; }
  .plan-schedule-sheet .print-as-cards .print-only-duty-cards { display: block !important; }
  .plan-schedule-sheet .schedule-sheet-header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: end;
    border-bottom: 2px solid #1a3a6b;
    padding-bottom: 7px;
    margin-bottom: 10px !important;
  }
  .plan-schedule-sheet .schedule-sheet-title-wrap { grid-column: 2; text-align: center; }
  .plan-schedule-sheet .schedule-sheet-title-wrap h2 {
    letter-spacing: 2px;
    color: #1a3a6b;
    font-size: 1.25rem !important;
    margin-bottom: 0.15rem !important;
  }
  .plan-schedule-sheet .schedule-sheet-title-wrap p { font-size: 0.78rem; color: #4a5568 !important; }
  .plan-schedule-sheet .schedule-print-left-label {
    display: block;
    grid-column: 1;
    justify-self: start;
    align-self: center;
    font-size: 11px;
    font-weight: 700;
    color: #1a3a6b;
    letter-spacing: 0.3px;
  }
  .plan-schedule-sheet .schedule-print-norm-display {
    display: block;
    grid-column: 3;
    justify-self: end;
    align-self: center;
    text-align: right;
  }
  .plan-schedule-sheet .schedule-print-norm-inner { display: flex; flex-direction: column; align-items: flex-end; gap: 1px; }
  .plan-schedule-sheet .schedule-print-norm-label { font-size: 8px; color: #4a5568; text-transform: uppercase; letter-spacing: 0.5px; line-height: 1.2; }
  .plan-schedule-sheet .schedule-print-norm-value { font-size: 13px; font-weight: 700; color: #1a3a6b; line-height: 1.2; }
  .plan-schedule-sheet .schedule-print-norm-sub   { font-size: 8px; color: #4a5568; line-height: 1.2; }
  .plan-schedule-sheet .print-duty-cards-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 5px;
  }
  .plan-schedule-sheet .print-duty-card {
    border: 1px solid #96a3b4;
    border-radius: 3px;
    min-height: 132px;
    padding: 0;
    font-size: 9.5px;
    line-height: 1.3;
    background: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .plan-schedule-sheet .print-duty-card-empty { border-style: dashed; border-color: #c8cfd8; background: #f9fafb; }
  .plan-schedule-sheet .print-duty-card-title {
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.4px;
    background: #1a3a6b;
    color: #fff;
    padding: 4px 4px;
    min-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8.8px;
    flex-shrink: 0;
  }
  .plan-schedule-sheet .print-duty-card-empty .print-duty-card-title { background: #e2e6ea; color: transparent; }
  .plan-schedule-sheet .print-duty-card-note {
    font-size: 8.5px; line-height: 1.2; color: #c0392b;
    border-bottom: 1px dashed #e5e7eb; padding: 2px 5px; margin: 0;
    min-height: 14px; text-align: left; word-break: break-word;
    max-height: calc(1.2em * 2); overflow: hidden; flex-shrink: 0;
  }
  .plan-schedule-sheet .print-duty-card-line {
    display: grid; grid-template-columns: 28px 1fr;
    align-items: start; gap: 3px;
    border-bottom: 1px solid #e8ecf0; padding: 3px 5px; min-height: 20px;
  }
  .plan-schedule-sheet .print-duty-card-key { font-weight: 700; color: #1a3a6b; font-size: 8.5px; letter-spacing: 0.1px; }
  .plan-schedule-sheet .print-duty-card-value { text-align: left; word-break: break-word; font-weight: 700; font-size: 12px; }
  .plan-schedule-sheet .plan-schedule-table tbody td .btn,
  .plan-schedule-sheet .plan-schedule-table tbody td { font-weight: 700; font-size: 12px; }
  #plan-schedule-absence-section {
    border: 1px solid #cfd4da; border-radius: 2px; padding: 6px;
    margin-top: 0.5rem !important; background: #fff;
  }
  #plan-schedule-absence-section h3 { margin-bottom: 0.3rem !important; font-size: 12px; letter-spacing: 0.2px; }
  #plan-schedule-absence .plan-schedule-table { margin-bottom: 0 !important; table-layout: fixed; width: 100%; }
  #plan-schedule-absence .plan-schedule-table th,
  #plan-schedule-absence .plan-schedule-table td { padding: 0.18rem 0.28rem; height: 24px; vertical-align: middle; font-size: 10px; }
  #plan-schedule-absence .plan-schedule-table thead th { font-weight: 700; }
  #plan-schedule-absence .plan-schedule-table th:first-child,
  #plan-schedule-absence .plan-schedule-table td:first-child { width: 220px; }
  #plan-schedule-absence .plan-schedule-table tbody tr:nth-child(even) { background: rgba(0,0,0,0.03); }
`;

/**
 * Generates and downloads a PDF of a .plan-schedule-sheet element.
 *
 * Injects the @media print CSS as regular styles before capture so that
 * html2canvas sees the exact same visual result as the browser print preview.
 * The sheet is pinned to the A4 printable width via inline styles so the
 * output is identical on all computers regardless of display scaling or zoom.
 *
 * @param {HTMLElement} container - The page container holding .plan-schedule-sheet
 * @param {object}      opts
 * @param {'landscape'|'portrait'} opts.orientation
 * @param {boolean}     opts.compact       - Whether to apply compact print styles
 * @param {boolean}     opts.hideSecondDay - Whether to hide second-day column
 * @param {string}      opts.filename      - Downloaded file name (e.g. 'plan-2026-02-26.pdf')
 */
export async function generateSchedulePdf(container, {
  orientation = 'landscape',
  compact = true,
  hideSecondDay = true,
  filename = 'schedule.pdf',
} = {}) {
  const sheet = container.querySelector('.plan-schedule-sheet');
  if (!sheet) return;

  const { jsPDF } = await import('jspdf');
  const html2canvas = (await import('html2canvas')).default;

  const MM_TO_PX      = 96 / 25.4;
  const CANVAS_SCALE  = 2; // Retina-quality capture
  const pageWidthMm   = orientation === 'portrait' ? 210 : 297;
  const pageHeightMm  = orientation === 'portrait' ? 297 : 210;
  const marginMm      = 10;
  const printableWMm  = pageWidthMm  - marginMm * 2;
  const printableHMm  = pageHeightMm - marginMm * 2;
  const printableWPx  = printableWMm * MM_TO_PX;

  const root = document.documentElement;

  // ── Inject print styles as normal CSS (html2canvas ignores @media print) ─
  const styleTag = document.createElement('style');
  styleTag.id = '__pdf-print-styles__';
  styleTag.textContent = PDF_PRINT_STYLES;
  document.head.appendChild(styleTag);

  // ── Apply visual classes ──────────────────────────────────────────────────
  root.classList.add('print-preparing');
  if (compact)       root.classList.add('pdf-compact');
  if (hideSecondDay) root.classList.add('pdf-hide-second-day');
  sheet.classList.toggle('print-landscape-page', orientation === 'landscape');
  sheet.classList.toggle('print-portrait-page',  orientation === 'portrait');

  // ── Pin sheet to A4 printable width ──────────────────────────────────────
  const prevWidth    = sheet.style.width;
  const prevMinWidth = sheet.style.minWidth;
  const prevMaxWidth = sheet.style.maxWidth;

  sheet.style.width    = printableWPx + 'px';
  sheet.style.minWidth = printableWPx + 'px';
  sheet.style.maxWidth = printableWPx + 'px';

  // Wait two frames so the browser fully commits the new layout before capture
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  try {
    const canvas = await html2canvas(sheet, {
      scale:           CANVAS_SCALE,
      useCORS:         true,
      allowTaint:      true,
      backgroundColor: '#ffffff',
      logging:         false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Canvas height → mm (captured at CANVAS_SCALE × device pixels, convert back)
    const capturedHeightMm = (canvas.height / CANVAS_SCALE) / MM_TO_PX;

    // Scale down only if content is taller than one printable page
    const scaleToFit = Math.min(printableHMm / capturedHeightMm, 1);
    const finalWMm   = printableWMm * scaleToFit;
    const finalHMm   = capturedHeightMm * scaleToFit;
    const offsetXMm  = marginMm;
    const offsetYMm  = (pageHeightMm - finalHMm) / 2;

    const pdf = new jsPDF({ orientation, unit: 'mm', format: 'a4' });
    pdf.addImage(imgData, 'JPEG', offsetXMm, offsetYMm, finalWMm, finalHMm);
    pdf.save(filename);

  } finally {
    // ── Restore everything ────────────────────────────────────────────────
    sheet.style.width    = prevWidth;
    sheet.style.minWidth = prevMinWidth;
    sheet.style.maxWidth = prevMaxWidth;

    root.classList.remove('print-preparing', 'pdf-compact', 'pdf-hide-second-day');
    sheet.classList.remove('print-landscape-page', 'print-portrait-page');
    styleTag.remove();
  }
}
