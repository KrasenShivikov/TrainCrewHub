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

  const pageWidthMm = orientation === 'portrait' ? 210 : 297;
  const pageHeightMm = orientation === 'portrait' ? 297 : 210;
  const marginMm = 10;
  const printableWidthPx = (pageWidthMm - marginMm * 2) * MM_TO_PX;
  const printableHeightPx = (pageHeightMm - marginMm * 2) * MM_TO_PX;

  // Reset scale and pin the sheet to the exact A4 printable width.
  // This normalises the layout across all computers regardless of
  // Windows display scaling, browser zoom level or screen DPI, so the
  // subsequent height measurement is always taken at an A4-width layout.
  root.style.setProperty('--plan-print-scale', '1');
  sheet.style.width    = printableWidthPx + 'px';
  sheet.style.minWidth = printableWidthPx + 'px';
  sheet.style.maxWidth = printableWidthPx + 'px';
  void sheet.offsetHeight; // force reflow

  const contentHeightPx = Math.max(sheet.scrollHeight || 0, 1);

  // Width is already pinned to A4 – only the height axis can overflow.
  const scale = Math.min(printableHeightPx / contentHeightPx, 1);

  // Release the temporary width constraint before applying zoom scale.
  sheet.style.width    = '';
  sheet.style.minWidth = '';
  sheet.style.maxWidth = '';

  root.style.setProperty('--plan-print-scale', String(Math.max(0.3, Number(scale.toFixed(3)))));
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
