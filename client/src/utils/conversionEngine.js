/** UnitFlow style: accurate, dependency-free conversion mechanics behind every display. */
import { categoryById, unitById } from "../data/conversionData.js";

const temperatureToCelsius = (value, unit) => ({ c: value, f: (value - 32) * (5 / 9), k: value - 273.15 }[unit]);
const celsiusToTemperature = (value, unit) => ({ c: value, f: value * (9 / 5) + 32, k: value + 273.15 }[unit]);

const fuelToKmPerLitre = (value, unit) => {
  if (value === 0 && unit === "l100") return Infinity;
  return { kml: value, l100: 100 / value, mpgus: value * 0.4251437075, mpguk: value * 0.3540061899 }[unit];
};
const kmPerLitreToFuel = (value, unit) => {
  if (value === 0 && unit === "l100") return Infinity;
  return { kml: value, l100: 100 / value, mpgus: value / 0.4251437075, mpguk: value / 0.3540061899 }[unit];
};

export function convert(value, fromUnitId, toUnitId, categoryId) {
  const category = categoryById(categoryId);
  if (!category || !Number.isFinite(value)) return null;
  if (!category.allowNegative && value < 0) return null;
  if (category.type === "temperature") return celsiusToTemperature(temperatureToCelsius(value, fromUnitId), toUnitId);
  if (category.type === "fuel") return kmPerLitreToFuel(fuelToKmPerLitre(value, fromUnitId), toUnitId);
  const from = unitById(categoryId, fromUnitId);
  const to = unitById(categoryId, toUnitId);
  if (!from || !to) return null;
  return (value * from.factor) / to.factor;
}

export function getFormula(categoryId, fromUnitId, toUnitId) {
  const category = categoryById(categoryId);
  const from = unitById(categoryId, fromUnitId);
  const to = unitById(categoryId, toUnitId);
  if (!category || !from || !to) return "";
  if (category.type === "temperature") return "Temperature is converted using the relevant scale formula.";
  if (category.type === "fuel") return "Fuel economy is converted through kilometres per litre.";
  const factor = convert(1, fromUnitId, toUnitId, categoryId);
  return `1 ${from.symbol} = ${factor} ${to.symbol}`;
}
