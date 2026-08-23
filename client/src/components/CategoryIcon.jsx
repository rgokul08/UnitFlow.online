/** UnitFlow style: compact, technical category symbols used as measurement markers. */
import { ArrowLeftRight, BatteryCharging, Box, CircleGauge, Clock3, CookingPot, Footprints, Fuel, Gauge, Hand, HardDrive, Layers3, RotateCw, Ruler, SquareDashedMousePointer, Thermometer, Waves, Weight, Wrench, Zap } from "lucide-react";

const icons = { Ruler, SquareDashedMousePointer, Box, Weight, Thermometer, Clock3, Gauge, HardDrive, Zap, CircleGauge, BatteryCharging, Waves, RotateCw, ArrowLeftRight, Fuel, CookingPot, Footprints, Hand, Wrench, Layers3 };

export function CategoryIcon({ icon, size = 18, strokeWidth = 1.8, className }) {
  const Icon = icons[icon] || Ruler;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}

