/**
 * UnitFlow conversion library
 * Base-unit factors are used for standard linear conversions.
 * Temperature and fuel economy are handled by conversionEngine.js.
 */

export const categories = [
  {
    id: "length",
    name: "Length",
    description: "Distance, dimensions, and everyday measurements",
    icon: "Ruler",
    type: "linear",
    baseUnit: "m",
    allowNegative: true,
    units: [
      { id: "mm", name: "Millimeter", symbol: "mm", factor: 0.001 },
      { id: "cm", name: "Centimeter", symbol: "cm", factor: 0.01 },
      { id: "m", name: "Meter", symbol: "m", factor: 1 },
      { id: "km", name: "Kilometer", symbol: "km", factor: 1000 },
      { id: "in", name: "Inch", symbol: "in", factor: 0.0254 },
      { id: "ft", name: "Foot", symbol: "ft", factor: 0.3048 },
      { id: "yd", name: "Yard", symbol: "yd", factor: 0.9144 },
      { id: "mi", name: "Mile", symbol: "mi", factor: 1609.344 },
    ],
  },

  {
    id: "area",
    name: "Area",
    description: "Surface area and space measurements",
    icon: "SquareDashedMousePointer",
    type: "linear",
    baseUnit: "m2",
    allowNegative: false,
    units: [
      { id: "mm2", name: "Square Millimeter", symbol: "mm²", factor: 0.000001 },
      { id: "cm2", name: "Square Centimeter", symbol: "cm²", factor: 0.0001 },
      { id: "m2", name: "Square Meter", symbol: "m²", factor: 1 },
      { id: "km2", name: "Square Kilometer", symbol: "km²", factor: 1000000 },
      { id: "in2", name: "Square Inch", symbol: "in²", factor: 0.00064516 },
      { id: "ft2", name: "Square Foot", symbol: "ft²", factor: 0.09290304 },
      { id: "yd2", name: "Square Yard", symbol: "yd²", factor: 0.83612736 },
      { id: "acre", name: "Acre", symbol: "acre", factor: 4046.8564224 },
      { id: "hectare", name: "Hectare", symbol: "ha", factor: 10000 },
    ],
  },

  {
    id: "volume",
    name: "Volume",
    description: "Capacity, liquid, and space measurements",
    icon: "Box",
    type: "linear",
    baseUnit: "l",
    allowNegative: false,
    units: [
      { id: "ml", name: "Milliliter", symbol: "mL", factor: 0.001 },
      { id: "l", name: "Liter", symbol: "L", factor: 1 },
      { id: "m3", name: "Cubic Meter", symbol: "m³", factor: 1000 },
      { id: "cm3", name: "Cubic Centimeter", symbol: "cm³", factor: 0.001 },
      { id: "in3", name: "Cubic Inch", symbol: "in³", factor: 0.016387064 },
      { id: "ft3", name: "Cubic Foot", symbol: "ft³", factor: 28.316846592 },
      { id: "galus", name: "US Gallon", symbol: "gal", factor: 3.785411784 },
      { id: "qtus", name: "US Quart", symbol: "qt", factor: 0.946352946 },
      { id: "cupus", name: "US Cup", symbol: "cup", factor: 0.2365882365 },
    ],
  },

  {
    id: "weight",
    name: "Weight",
    description: "Mass and weight measurements",
    icon: "Weight",
    type: "linear",
    baseUnit: "kg",
    allowNegative: false,
    units: [
      { id: "mg", name: "Milligram", symbol: "mg", factor: 0.000001 },
      { id: "g", name: "Gram", symbol: "g", factor: 0.001 },
      { id: "kg", name: "Kilogram", symbol: "kg", factor: 1 },
      { id: "t", name: "Metric Ton", symbol: "t", factor: 1000 },
      { id: "oz", name: "Ounce", symbol: "oz", factor: 0.028349523125 },
      { id: "lb", name: "Pound", symbol: "lb", factor: 0.45359237 },
      { id: "stone", name: "Stone", symbol: "st", factor: 6.35029318 },
    ],
  },

  {
    id: "temperature",
    name: "Temperature",
    description: "Thermal scales and temperature readings",
    icon: "Thermometer",
    type: "temperature",
    baseUnit: "c",
    allowNegative: true,
    units: [
      { id: "c", name: "Celsius", symbol: "°C", factor: 1 },
      { id: "f", name: "Fahrenheit", symbol: "°F", factor: 1 },
      { id: "k", name: "Kelvin", symbol: "K", factor: 1 },
    ],
  },

  {
    id: "time",
    name: "Time",
    description: "Duration and time intervals",
    icon: "Clock3",
    type: "linear",
    baseUnit: "s",
    allowNegative: false,
    units: [
      { id: "ms", name: "Millisecond", symbol: "ms", factor: 0.001 },
      { id: "s", name: "Second", symbol: "s", factor: 1 },
      { id: "min", name: "Minute", symbol: "min", factor: 60 },
      { id: "h", name: "Hour", symbol: "h", factor: 3600 },
      { id: "day", name: "Day", symbol: "day", factor: 86400 },
      { id: "week", name: "Week", symbol: "week", factor: 604800 },
      { id: "month", name: "Month", symbol: "month", factor: 2629800 },
      { id: "year", name: "Year", symbol: "year", factor: 31557600 },
    ],
  },

  {
    id: "speed",
    name: "Speed",
    description: "Velocity and movement measurements",
    icon: "Gauge",
    type: "linear",
    baseUnit: "mps",
    allowNegative: false,
    units: [
      { id: "mps", name: "Meters per Second", symbol: "m/s", factor: 1 },
      { id: "kph", name: "Kilometers per Hour", symbol: "km/h", factor: 0.2777777778 },
      { id: "mph", name: "Miles per Hour", symbol: "mph", factor: 0.44704 },
      { id: "fps", name: "Feet per Second", symbol: "ft/s", factor: 0.3048 },
      { id: "knot", name: "Knot", symbol: "kn", factor: 0.5144444444 },
    ],
  },

  {
    id: "data",
    name: "Data",
    description: "Digital storage and information sizes",
    icon: "HardDrive",
    type: "linear",
    baseUnit: "byte",
    allowNegative: false,
    units: [
      { id: "bit", name: "Bit", symbol: "bit", factor: 0.125 },
      { id: "byte", name: "Byte", symbol: "B", factor: 1 },
      { id: "kb", name: "Kilobyte", symbol: "KB", factor: 1000 },
      { id: "mb", name: "Megabyte", symbol: "MB", factor: 1000000 },
      { id: "gb", name: "Gigabyte", symbol: "GB", factor: 1000000000 },
      { id: "tb", name: "Terabyte", symbol: "TB", factor: 1000000000000 },
      { id: "kib", name: "Kibibyte", symbol: "KiB", factor: 1024 },
      { id: "mib", name: "Mebibyte", symbol: "MiB", factor: 1048576 },
      { id: "gib", name: "Gibibyte", symbol: "GiB", factor: 1073741824 },
      { id: "tib", name: "Tebibyte", symbol: "TiB", factor: 1099511627776 },
    ],
  },

  {
    id: "energy",
    name: "Energy",
    description: "Energy, heat, and work measurements",
    icon: "Zap",
    type: "linear",
    baseUnit: "j",
    allowNegative: false,
    units: [
      { id: "j", name: "Joule", symbol: "J", factor: 1 },
      { id: "kj", name: "Kilojoule", symbol: "kJ", factor: 1000 },
      { id: "cal", name: "Calorie", symbol: "cal", factor: 4.184 },
      { id: "kcal", name: "Kilocalorie", symbol: "kcal", factor: 4184 },
      { id: "wh", name: "Watt-hour", symbol: "Wh", factor: 3600 },
      { id: "kwh", name: "Kilowatt-hour", symbol: "kWh", factor: 3600000 },
      { id: "btu", name: "British Thermal Unit", symbol: "BTU", factor: 1055.05585262 },
    ],
  },

  {
    id: "pressure",
    name: "Pressure",
    description: "Pressure and force-per-area measurements",
    icon: "CircleGauge",
    type: "linear",
    baseUnit: "pa",
    allowNegative: false,
    units: [
      { id: "pa", name: "Pascal", symbol: "Pa", factor: 1 },
      { id: "kpa", name: "Kilopascal", symbol: "kPa", factor: 1000 },
      { id: "mpa", name: "Megapascal", symbol: "MPa", factor: 1000000 },
      { id: "bar", name: "Bar", symbol: "bar", factor: 100000 },
      { id: "atm", name: "Atmosphere", symbol: "atm", factor: 101325 },
      { id: "psi", name: "Pounds per Square Inch", symbol: "psi", factor: 6894.757293168 },
      { id: "mmhg", name: "Millimeters of Mercury", symbol: "mmHg", factor: 133.322387415 },
    ],
  },

  {
    id: "power",
    name: "Power",
    description: "Power and rate of energy transfer",
    icon: "BatteryCharging",
    type: "linear",
    baseUnit: "w",
    allowNegative: false,
    units: [
      { id: "w", name: "Watt", symbol: "W", factor: 1 },
      { id: "kw", name: "Kilowatt", symbol: "kW", factor: 1000 },
      { id: "mw", name: "Megawatt", symbol: "MW", factor: 1000000 },
      { id: "hp", name: "Horsepower", symbol: "hp", factor: 745.699871582 },
      { id: "btu_h", name: "BTU per Hour", symbol: "BTU/h", factor: 0.2930710702 },
    ],
  },

  {
    id: "frequency",
    name: "Frequency",
    description: "Cycles and repeating events",
    icon: "Waves",
    type: "linear",
    baseUnit: "hz",
    allowNegative: false,
    units: [
      { id: "hz", name: "Hertz", symbol: "Hz", factor: 1 },
      { id: "khz", name: "Kilohertz", symbol: "kHz", factor: 1000 },
      { id: "mhz", name: "Megahertz", symbol: "MHz", factor: 1000000 },
      { id: "ghz", name: "Gigahertz", symbol: "GHz", factor: 1000000000 },
    ],
  },

  {
    id: "angle",
    name: "Angle",
    description: "Angular measurements and rotation",
    icon: "RotateCw",
    type: "linear",
    baseUnit: "rad",
    allowNegative: true,
    units: [
      { id: "rad", name: "Radian", symbol: "rad", factor: 1 },
      { id: "deg", name: "Degree", symbol: "°", factor: Math.PI / 180 },
      { id: "grad", name: "Gradian", symbol: "gon", factor: Math.PI / 200 },
      { id: "arcmin", name: "Arcminute", symbol: "′", factor: Math.PI / 10800 },
      { id: "arcsec", name: "Arcsecond", symbol: "″", factor: Math.PI / 648000 },
    ],
  },

  {
    id: "fuel",
    name: "Fuel Economy",
    description: "Vehicle fuel consumption and economy",
    icon: "Fuel",
    type: "fuel",
    baseUnit: "kml",
    allowNegative: false,
    units: [
      { id: "kml", name: "Kilometers per Liter", symbol: "km/L", factor: 1 },
      { id: "l100", name: "Liters per 100 Kilometers", symbol: "L/100km", factor: 1 },
      { id: "mpgus", name: "Miles per US Gallon", symbol: "mpg US", factor: 1 },
      { id: "mpguk", name: "Miles per Imperial Gallon", symbol: "mpg UK", factor: 1 },
    ],
  },

  {
    id: "cooking",
    name: "Cooking",
    description: "Kitchen, recipe, and culinary measurements",
    icon: "CookingPot",
    type: "linear",
    baseUnit: "ml",
    allowNegative: false,
    units: [
      { id: "ml", name: "Milliliter", symbol: "mL", factor: 1 },
      { id: "tsp", name: "Teaspoon", symbol: "tsp", factor: 4.92892159375 },
      { id: "tbsp", name: "Tablespoon", symbol: "tbsp", factor: 14.78676478125 },
      { id: "floz", name: "Fluid Ounce", symbol: "fl oz", factor: 29.5735295625 },
      { id: "cup", name: "US Cup", symbol: "cup", factor: 236.5882365 },
      { id: "pint", name: "US Pint", symbol: "pt", factor: 473.176473 },
      { id: "quart", name: "US Quart", symbol: "qt", factor: 946.352946 },
      { id: "gallon", name: "US Gallon", symbol: "gal", factor: 3785.411784 },
    ],
  },

  {
    id: "pace",
    name: "Pace",
    description: "Running and walking pace measurements",
    icon: "Footprints",
    type: "linear",
    baseUnit: "minperkm",
    allowNegative: false,
    units: [
      { id: "minperkm", name: "Minutes per Kilometer", symbol: "min/km", factor: 1 },
      { id: "minpermile", name: "Minutes per Mile", symbol: "min/mi", factor: 1.609344 },
    ],
  },

  {
    id: "force",
    name: "Force",
    description: "Force and mechanical load measurements",
    icon: "Hand",
    type: "linear",
    baseUnit: "n",
    allowNegative: true,
    units: [
      { id: "n", name: "Newton", symbol: "N", factor: 1 },
      { id: "kn", name: "Kilonewton", symbol: "kN", factor: 1000 },
      { id: "lbf", name: "Pound-force", symbol: "lbf", factor: 4.4482216152605 },
      { id: "kgf", name: "Kilogram-force", symbol: "kgf", factor: 9.80665 },
      { id: "dyn", name: "Dyne", symbol: "dyn", factor: 0.00001 },
    ],
  },

  {
    id: "torque",
    name: "Torque",
    description: "Rotational force and mechanical torque",
    icon: "Wrench",
    type: "linear",
    baseUnit: "nm",
    allowNegative: true,
    units: [
      { id: "nm", name: "Newton-meter", symbol: "N·m", factor: 1 },
      { id: "knm", name: "Kilonewton-meter", symbol: "kN·m", factor: 1000 },
      { id: "lbfft", name: "Pound-foot", symbol: "lb·ft", factor: 1.3558179483314 },
      { id: "lbfin", name: "Pound-inch", symbol: "lb·in", factor: 0.1129848290276 },
      { id: "kgfm", name: "Kilogram-force meter", symbol: "kgf·m", factor: 9.80665 },
    ],
  },

  {
    id: "density",
    name: "Density",
    description: "Mass per unit volume measurements",
    icon: "Layers3",
    type: "linear",
    baseUnit: "kgm3",
    allowNegative: false,
    units: [
      { id: "kgm3", name: "Kilogram per Cubic Meter", symbol: "kg/m³", factor: 1 },
      { id: "gcm3", name: "Gram per Cubic Centimeter", symbol: "g/cm³", factor: 1000 },
      { id: "gml", name: "Gram per Milliliter", symbol: "g/mL", factor: 1000 },
      { id: "lbft3", name: "Pound per Cubic Foot", symbol: "lb/ft³", factor: 16.01846337 },
      { id: "lbgal", name: "Pound per US Gallon", symbol: "lb/gal", factor: 119.8264273 },
    ],
  },

  {
    id: "data-transfer",
    name: "Data Transfer",
    description: "Network and internet transfer rates",
    icon: "ArrowLeftRight",
    type: "linear",
    baseUnit: "bps",
    allowNegative: false,
    units: [
      { id: "bps", name: "Bit per Second", symbol: "bit/s", factor: 1 },
      { id: "kbps", name: "Kilobit per Second", symbol: "kbit/s", factor: 1000 },
      { id: "mbps", name: "Megabit per Second", symbol: "Mbit/s", factor: 1000000 },
      { id: "gbps", name: "Gigabit per Second", symbol: "Gbit/s", factor: 1000000000 },
      { id: "Bps", name: "Byte per Second", symbol: "B/s", factor: 8 },
      { id: "kBps", name: "Kilobyte per Second", symbol: "KB/s", factor: 8000 },
      { id: "MBps", name: "Megabyte per Second", symbol: "MB/s", factor: 8000000 },
      { id: "GBps", name: "Gigabyte per Second", symbol: "GB/s", factor: 8000000000 },
    ],
  },
];

/**
 * Find a category by its ID.
 */
export function categoryById(categoryId) {
  return categories.find((category) => category.id === categoryId) || null;
}

/**
 * Find a unit inside a category.
 */
export function unitById(categoryId, unitId) {
  const category = categoryById(categoryId);
  if (!category) return null;

  return category.units.find((unit) => unit.id === unitId) || null;
}

/**
 * Return the default conversion pair for a category.
 */
export function initialPair(categoryId) {
  const category = categoryById(categoryId);

  if (!category || !category.units.length) {
    return null;
  }

  const baseUnit = category.units.find(
    (unit) => unit.id === category.baseUnit
  );

  const secondUnit =
    category.units.find((unit) => unit.id !== category.baseUnit) ||
    baseUnit;

  return {
    from: baseUnit?.id || category.units[0].id,
    to: secondUnit?.id || category.units[0].id,
  };
}
