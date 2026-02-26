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

  root.classList.toggle('print-orientation-landscape', orientation === 'landscape');
  root.classList.toggle('print-orientation-portrait', orientation === 'portrait');

  if (!fitOnePage || !sheet) {
    return;
  }

  const pageWidthMm = orientation === 'portrait' ? 210 : 297;
  const pageHeightMm = orientation === 'portrait' ? 297 : 210;
  const marginMm = 10;
  const printableWidthPx = (pageWidthMm - marginMm * 2) * MM_TO_PX;
  const printableHeightPx = (pageHeightMm - marginMm * 2) * MM_TO_PX;

  // Pin the sheet to the exact A4 printable width before measuring.
  // This normalises layout across all computers regardless of Windows
  // display scaling, browser zoom level or screen DPI.
  sheet.style.zoom     = '';
  sheet.style.width    = printableWidthPx + 'px';
  sheet.style.minWidth = printableWidthPx + 'px';
  sheet.style.maxWidth = printableWidthPx + 'px';
  void sheet.offsetHeight; // force reflow

  const contentHeightPx = Math.max(sheet.scrollHeight || 0, 1);
  const scale = Math.max(0.3, Math.min(printableHeightPx / contentHeightPx, 1));

  // After zoom the element needs to be wider than A4 so that zoom brings it
  // back to exactly A4 width: expandedWidth * scale = A4 width.
  // Apply zoom and dimensions as inline styles so they take effect immediately,
  // bypassing all @media print / CSS variable timing issues.
  const expandedWidthPx = Math.ceil(printableWidthPx / scale);
  sheet.style.zoom     = String(Number(scale.toFixed(3)));
  sheet.style.width    = expandedWidthPx + 'px';
  sheet.style.minWidth = expandedWidthPx + 'px';
  sheet.style.maxWidth = expandedWidthPx + 'px';
}

export function cleanupPrintLayout() {
  const root = document.documentElement;
  root.classList.remove(
    'print-preparing', 'print-compact', 'print-fit-one-page', 'print-hide-second-day',
    'print-orientation-landscape', 'print-orientation-portrait'
  );

  document.querySelectorAll('.plan-schedule-sheet').forEach((sheet) => {
    sheet.classList.remove('print-landscape-page', 'print-portrait-page');
    sheet.style.zoom     = '';
    sheet.style.width    = '';
    sheet.style.minWidth = '';
    sheet.style.maxWidth = '';
  });
}
