/** UnitFlow style: the bracket-and-transfer mark anchors the instrument-panel identity. */
import { Link } from "wouter";

export function Brand({ compact = false }) {
  return (
    <Link href="/" className="brand-mark" aria-label="UnitFlow home">
      <img src="/unitflow-mark.svg" alt="" className="brand-symbol" />
      {!compact && <span className="brand-word">Unit<span>Flow</span></span>}
    </Link>
  );
}
