/** UnitFlow style: an accessible searchable selector that behaves like an instrument control. */
import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";

export function UnitSelector({ units, value, onChange, label }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const listId = useId();
  const selected = units.find((unit) => unit.id === value) || units[0];
  const matches = useMemo(() => units.filter((unit) => `${unit.name} ${unit.symbol}`.toLowerCase().includes(query.toLowerCase())), [units, query]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const onPointerDown = (event) => { if (!containerRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", onPointerDown);
    return () => { window.cancelAnimationFrame(frame); document.removeEventListener("pointerdown", onPointerDown); };
  }, [open]);

  useEffect(() => { setActiveIndex(0); }, [query]);

  const selectUnit = (unit) => { onChange(unit.id); setQuery(""); setOpen(false); };
  const onKeyDown = (event) => {
    if (!open && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) { event.preventDefault(); setOpen(true); return; }
    if (!open) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, matches.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
    if (event.key === "Enter" && matches[activeIndex]) { event.preventDefault(); selectUnit(matches[activeIndex]); }
    if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
  };

  return (
    <div className="unit-selector" ref={containerRef}>
      <button type="button" className="unit-trigger" aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((state) => !state)} onKeyDown={onKeyDown}>
        <span className="unit-symbol">{selected.symbol}</span>
        <span className="unit-name">{selected.name}</span>
        <ChevronDown size={16} className={open ? "chevron-up" : ""} aria-hidden="true" />
      </button>
      {open && (
        <div className="unit-menu" role="dialog" aria-label={`Choose ${label} unit`} onKeyDown={onKeyDown}>
          <div className="unit-search-wrap"><Search size={15} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a unit" aria-label={`Search ${label} units`} aria-controls={listId} /></div>
          <div id={listId} className="unit-options" role="listbox" aria-label={`${label} unit options`}>
            {matches.length ? matches.map((unit, index) => (
              <button type="button" role="option" aria-selected={unit.id === value} key={unit.id} className={`unit-option ${index === activeIndex ? "is-active" : ""}`} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectUnit(unit)}>
                <span><strong>{unit.symbol}</strong>{unit.name}</span>{unit.id === value && <Check size={15} aria-hidden="true" />}
              </button>
            )) : <p className="unit-empty">No matching unit</p>}
          </div>
          <p className="unit-keyboard">↑ ↓ to move · Enter to select · Esc to close</p>
        </div>
      )}
    </div>
  );
}

