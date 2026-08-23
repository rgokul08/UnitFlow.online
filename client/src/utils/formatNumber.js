/** UnitFlow style: readable, tabular-ready measurement formatting with no false precision. */
export function formatNumber(value, precision = "auto") {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  if (!Number.isFinite(value)) return "∞";
  const maximumFractionDigits = precision === "auto" ? 6 : Number(precision);
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
    useGrouping: true,
  }).format(value);
}

export function compactNumber(value) {
  if (!Number.isFinite(value)) return "∞";
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

