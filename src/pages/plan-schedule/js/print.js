const MM_TO_PX = 96 / 25.4;

export function preparePrintLayout(container, { orientation, compact, fitOnePage }) {
  const root = document.documentElement;
  const sheet = container.querySelector('.plan-schedule-sheet');

  root.classList.add('print-preparing');
  root.classList.toggle('print-compact', compact);
  root.classList.toggle('print-fit-one-page', fitOnePage);

  if (sheet) {
    sheet.classList.toggle('print-landscape-page', orientation === 'landscape');
    sheet.classList.toggle('print-portrait-page', orientation === 'portrait');
  }

  root.classList.toggle('print-orientation-landscape', orientation === 'landscape');
  root.classList.toggle('print-orientation-portrait', orientation === 'portrait');

  if (!fitOnePage || !sheet) {
    root.style.setProperty('--plan-print-scale', '1');
    return;
  }

  // Reset scale first, then measure actual rendered size
  root.style.setProperty('--plan-print-scale', '1');

  // Force reflow so getBoundingClientRect reflects print-compact classes
  void sheet.offsetHeight;

  const rect = sheet.getBoundingClientRect();
  const pageWidthMm = orientation === 'portrait' ? 210 : 297;
  const pageHeightMm = orientation === 'portrait' ? 297 : 210;
  const marginMm = 10;
  const printableWidthPx = (pageWidthMm - marginMm * 2) * MM_TO_PX;
  const printableHeightPx = (pageHeightMm - marginMm * 2) * MM_TO_PX;

  const scaleX = printableWidthPx / Math.max(rect.width, 1);
  const scaleY = printableHeightPx / Math.max(rect.height, 1);
  const scale = Math.min(scaleX, scaleY, 1);

  root.style.setProperty('--plan-print-scale', String(Math.max(0.3, scale)));
}

export function cleanupPrintLayout() {
  const root = document.documentElement;
  root.classList.remove(
    'print-preparing', 'print-compact', 'print-fit-one-page',
    'print-orientation-landscape', 'print-orientation-portrait'
  );
  root.style.setProperty('--plan-print-scale', '1');

  document.querySelectorAll('.plan-schedule-sheet').forEach((sheet) => {
    sheet.classList.remove('print-landscape-page', 'print-portrait-page');
  });
}
