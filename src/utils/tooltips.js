/**
 * Initialise Bootstrap tooltips on all [data-bs-toggle="tooltip"] elements
 * inside the given container.
 *
 * Only runs on hover-capable (desktop) devices so touch-screen users are
 * never affected.  Call this after every innerHTML assignment that contains
 * tooltip-enabled buttons.
 *
 * @param {Element|null} container
 */
export function initTooltips(container) {
  if (!container || !window.bootstrap?.Tooltip) return;
  // Skip on touch/mobile – no hover, no tooltip clutter
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  container.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
    const existing = window.bootstrap.Tooltip.getInstance(el);
    if (existing) existing.dispose();
    new window.bootstrap.Tooltip(el, { trigger: 'hover focus' });
  });
}
