/** UnitFlow style: command-like global discovery without sending user data anywhere. */
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { categories } from "../data/conversionData";

export function SearchDialog({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const [, navigate] = useLocation();
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return categories.slice(0, 6).map((category) => ({ type: "category", category }));
    return categories.flatMap((category) => {
      const categoryResult = `${category.name} ${category.description}`.toLowerCase().includes(term) ? [{ type: "category", category }] : [];
      const unitResults = category.units.filter((unit) => `${unit.name} ${unit.symbol}`.toLowerCase().includes(term)).slice(0, 3).map((unit) => ({ type: "unit", category, unit }));
      return [...categoryResult, ...unitResults];
    }).slice(0, 12);
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("keydown", onKeyDown); };
  }, [open, onClose]);
  if (!open) return null;
  const goTo = (result) => {
    if (result.type === "category") navigate(`/converter/${result.category.id}`);
    else navigate(`/converter/${result.category.id}/${result.unit.id}-to-${result.category.baseUnit}`);
    onClose();
  };
  return (
    <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="global-search" role="dialog" aria-modal="true" aria-label="Search UnitFlow">
        <div className="global-search-input"><Search size={19} aria-hidden="true" /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories or units…" aria-label="Search categories or units" /><button type="button" onClick={onClose} aria-label="Close search"><X size={18} /></button></div>
        <div className="global-search-results">
          <p className="search-label">{query ? "Matches" : "Start with a category"}</p>
          {results.map((result) => <button type="button" className="search-result" key={`${result.type}-${result.category.id}-${result.unit?.id || ""}`} onClick={() => goTo(result)}>
            <span className="search-result-copy"><strong>{result.type === "category" ? result.category.name : result.unit.name}</strong><small>{result.type === "category" ? result.category.description : `${result.category.name} · convert to ${result.category.units.find((unit) => unit.id === result.category.baseUnit)?.name}`}</small></span><ArrowUpRight size={16} aria-hidden="true" />
          </button>)}
          {!results.length && <p className="search-empty">No units or categories match “{query}”.</p>}
        </div>
        <footer className="search-footer"><span>Search stays on your device</span><kbd>ESC</kbd> Close</footer>
      </section>
    </div>
  );
}

