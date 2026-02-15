const MM_TO_PX = 96 / 25.4;

export function preparePrintLayout(container, { orientation, compact, fitOnePage }) {
  const root = document.documentElement;
  const sheet = container.querySelector('.plan-schedule-sheet');

  root.classList.add('print-preparing');
  root.classList.add('print-hide-second-day');
  root.classList.toggle('print-compact', compact);
  root.classList.toggle('print-fit-one-page', fitOnePage);

  if (sheet) {
    sheet.classList.toggle('print-landscape-page', orientation === 'landscape');
    sheet.classList.toggle('print-portrait-page', orientation === 'portrait');
  }

  if (!fitOnePage || !sheet) {
    root.style.setProperty('--plan-print-scale', '1');
    return;
  }

  root.style.setProperty('--plan-print-scale', '1');

  const rect = sheet.getBoundingClientRect();
  const pageWidthMm = orientation === 'portrait' ? 210 : 297;
  const pageHeightMm = orientation === 'portrait' ? 297 : 210;
  const printableWidthPx = (pageWidthMm - 20) * MM_TO_PX;
  const printableHeightPx = (pageHeightMm - 20) * MM_TO_PX;

  const scaleX = printableWidthPx / Math.max(rect.width, 1);
  const scaleY = printableHeightPx / Math.max(rect.height, 1);
  const scale = Math.min(scaleX, scaleY, 1);

  root.style.setProperty('--plan-print-scale', String(Math.max(0.6, scale)));
}

export function cleanupPrintLayout() {
  const root = document.documentElement;
  root.classList.remove('print-preparing', 'print-compact', 'print-fit-one-page', 'print-hide-second-day');
  root.style.setProperty('--plan-print-scale', '1');

  document.querySelectorAll('.plan-schedule-sheet').forEach((sheet) => {
    sheet.classList.remove('print-landscape-page', 'print-portrait-page');
  });
}
