export const PRINT_DEPOT_LABEL = 'ПС - Стара Загора';

export function applyPrintDepotLabel(container, selector) {
  const element = container?.querySelector(selector);
  if (!element) {
    return;
  }

  element.textContent = PRINT_DEPOT_LABEL;
}