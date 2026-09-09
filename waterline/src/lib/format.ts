/** Shared formatting helpers, so numbers read the same everywhere. */

export function money(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString("en-GB")}`;
  }
}

export function percent(n: number, digits = 0): string {
  return `${n.toFixed(digits)}%`;
}

export function shortDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
