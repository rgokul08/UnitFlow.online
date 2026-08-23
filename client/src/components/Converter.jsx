/** UnitFlow style: the central measurement instrument; moss-and-clay controls make every scale feel approachable and exact. */
import { Calculator, Check, ChevronDown, Clock3, Copy, Heart, RotateCw, Search, Share2, SlidersHorizontal, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { categories, categoryById, initialPair, unitById } from "../data/conversionData";
import { convert, getFormula } from "../utils/conversionEngine";
import { evaluateExpression } from "../utils/expressionParser";
import { formatNumber } from "../utils/formatNumber";
import { useUnitFlow } from "../contexts/UnitFlowContext";
import { UnitSelector } from "./UnitSelector";
import { CategoryIcon } from "./CategoryIcon";

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const textarea = document.createElement("textarea"); textarea.value = text; textarea.style.position = "fixed"; textarea.style.opacity = "0"; document.body.appendChild(textarea); textarea.select();
    const copied = document.execCommand("copy"); document.body.removeChild(textarea); return copied;
  }
}

function CategoryPicker({ category, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const pickerRef = useRef(null);
  const searchRef = useRef(null);
  const matches = useMemo(() => categories.filter((item) => `${item.name} ${item.description} ${item.units.map((unit) => unit.name).join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = window.requestAnimationFrame(() => searchRef.current?.focus());
    const onPointerDown = (event) => { if (!pickerRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", onPointerDown);
    return () => { window.cancelAnimationFrame(frame); document.removeEventListener("pointerdown", onPointerDown); };
  }, [open]);
  useEffect(() => { setActiveIndex(0); }, [query]);

  const selectCategory = (id) => { onChange(id); setQuery(""); setOpen(false); };
  const onKeyDown = (event) => {
    if (!open && (event.key === "Enter" || event.key === " " || event.key === "ArrowDown")) { event.preventDefault(); setOpen(true); return; }
    if (!open) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, matches.length - 1)); }
    if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
    if (event.key === "Enter" && matches[activeIndex]) { event.preventDefault(); selectCategory(matches[activeIndex].id); }
    if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
  };

  return <div className="category-picker" ref={pickerRef}>
    <button type="button" className="category-picker-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((value) => !value)} onKeyDown={onKeyDown}>
      <span className="category-picker-leading"><span className="category-picker-index">SCALE / {String(categories.findIndex((item) => item.id === category.id) + 1).padStart(2, "0")}</span><strong>{category.name}</strong></span><ChevronDown size={18} className={open ? "chevron-up" : ""} aria-hidden="true" />
    </button>
    {open && <section className="category-picker-menu" role="dialog" aria-label="Choose a conversion category" onKeyDown={onKeyDown}>
      <header className="category-picker-menu-head"><div><p className="eyebrow">MEASUREMENT LIBRARY</p><h3>Choose a scale</h3></div><button type="button" onClick={() => setOpen(false)} aria-label="Close category selector"><X size={17} /></button></header>
      <div className="category-picker-search"><Search size={15} aria-hidden="true" /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search categories or units" aria-label="Search categories or units" /></div>
      <div className="category-picker-grid" role="listbox" aria-label="Available conversion categories">
        {matches.map((item, index) => <button type="button" role="option" aria-selected={item.id === category.id} className={`category-picker-option ${index === activeIndex ? "is-active" : ""} ${item.id === category.id ? "is-selected" : ""}`} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectCategory(item.id)} key={item.id}>
          <span className="category-option-marker"><CategoryIcon icon={item.icon} size={16} /><small>{String(categories.findIndex((entry) => entry.id === item.id) + 1).padStart(2, "0")}</small></span><span className="category-option-copy"><strong>{item.name}</strong><small>{item.units.length} units · {item.description}</small></span>{item.id === category.id && <Check size={16} className="category-option-check" />}
        </button>)}
        {!matches.length && <p className="category-picker-empty">No categories or units match “{query}”.</p>}
      </div>
      <footer className="category-picker-footer"><span>Use ↑ ↓ to move</span><span>Enter to apply</span><span>Esc to close</span></footer>
    </section>}
  </div>;
}

export function Converter({ categoryId = "length", initialFrom, initialTo, initialValue, showCategoryPicker = false, onCategoryChange, onViewHistory }) {
  const category = categoryById(categoryId) || categoryById("length");
  const defaultPair = initialPair(category.id);
  const [from, setFrom] = useState(initialFrom && unitById(category.id, initialFrom) ? initialFrom : defaultPair.from);
  const [to, setTo] = useState(initialTo && unitById(category.id, initialTo) ? initialTo : defaultPair.to);
  const [rawValue, setRawValue] = useState("1");
  const [precisionOpen, setPrecisionOpen] = useState(false);
  const lastRecord = useRef("");
  const [, navigate] = useLocation();
  const { settings, updateSettings, recordConversion, toggleFavorite, isFavorite } = useUnitFlow();

  useEffect(() => { const pair = initialPair(category.id); setFrom(initialFrom && unitById(category.id, initialFrom) ? initialFrom : pair.from); setTo(initialTo && unitById(category.id, initialTo) ? initialTo : pair.to); setRawValue(initialValue ?? "1"); }, [category.id, initialFrom, initialTo, initialValue]);
  const parsedValue = useMemo(() => settings.calculatorMode ? evaluateExpression(rawValue) : Number(rawValue), [rawValue, settings.calculatorMode]);
  const result = useMemo(() => convert(parsedValue, from, to, category.id), [parsedValue, from, to, category.id]);
  const fromUnit = unitById(category.id, from);
  const toUnit = unitById(category.id, to);
  const valid = rawValue.trim() !== "" && Number.isFinite(parsedValue) && result !== null;
  const invalidMessage = rawValue.trim() === "" ? "Enter a value to begin" : !Number.isFinite(parsedValue) ? "Please enter a valid number or expression" : result === null ? `Negative values are not available for ${category.name.toLowerCase()}` : "";
  const formattedResult = valid ? formatNumber(result, settings.precision) : "—";
  const conversionText = valid ? `${formatNumber(parsedValue, settings.precision)} ${fromUnit.symbol} = ${formattedResult} ${toUnit.symbol}` : "";
  const entry = { category: category.id, from, to, rawValue, inputValue: parsedValue, result, fromSymbol: fromUnit.symbol, toSymbol: toUnit.symbol, categoryName: category.name };
  const favorite = isFavorite(entry);

  useEffect(() => {
    if (!valid) return undefined;
    const fingerprint = `${category.id}|${from}|${to}|${parsedValue}|${settings.precision}`;
    const timer = window.setTimeout(() => { if (lastRecord.current !== fingerprint) { recordConversion(entry); lastRecord.current = fingerprint; } }, 700);
    return () => window.clearTimeout(timer);
  }, [valid, category.id, from, to, parsedValue, settings.precision]);

  const setUnit = (direction, unit) => { if (direction === "from") setFrom(unit); else setTo(unit); };
  const swap = () => { setFrom(to); setTo(from); setRawValue(valid ? String(result) : rawValue); toast.success("Units swapped"); };
  const clear = () => { setRawValue(""); toast.message("Converter reset"); };
  const confirmCalculation = () => { if (!valid) return toast.error(invalidMessage || "This conversion is unavailable"); recordConversion(entry); lastRecord.current = `${category.id}|${from}|${to}|${parsedValue}|${settings.precision}`; toast.success("Conversion saved to history"); };
  const copyResult = async () => { if (!valid) return toast.error("Enter a valid value first"); const success = await copyText(conversionText); success ? toast.success("Conversion copied") : toast.error("Copy was unavailable"); };
  const share = async () => { const url = `${window.location.origin}/converter/${category.id}/${from}-to-${to}`; const success = await copyText(url); success ? toast.success("Share link copied") : toast.error("Copy was unavailable"); };
  const chooseCategory = (next) => { if (onCategoryChange) onCategoryChange(next); else navigate(`/converter/${next}`); };

  return <section className="converter-card" aria-label={`${category.name} converter`}>
    <div className="converter-topline"><div><p className="eyebrow">ACTIVE INSTRUMENT</p>{showCategoryPicker ? <CategoryPicker category={category} onChange={chooseCategory} /> : <h2>{category.name}</h2>}</div><div className="converter-status"><span className="live-dot" />Instant result</div></div>
    <div className="measurement-stack">
      <div className="measurement-row"><div className="measurement-label"><span>FROM</span><span>{fromUnit.name}</span></div><div className="measurement-control"><input value={rawValue} inputMode="decimal" onChange={(event) => setRawValue(event.target.value)} aria-label={`Value in ${fromUnit.name}`} placeholder="0" /><UnitSelector units={category.units} value={from} onChange={(unit) => setUnit("from", unit)} label="source" /></div></div>
      <div className="transfer-line"><span /><button type="button" className="swap-button" onClick={swap} aria-label="Swap source and target units"><RotateCw size={19} /></button><span /></div>
      <div className="measurement-row result-row"><div className="measurement-label"><span>TO</span><span>{toUnit.name}</span></div><div className="measurement-control result-control"><output aria-live="polite">{formattedResult}</output><UnitSelector units={category.units} value={to} onChange={(unit) => setUnit("to", unit)} label="target" /></div></div>
    </div>
    <div className="conversion-readout"><div>{valid ? <><span className="result-equation">{conversionText}</span><small>{getFormula(category.id, from, to)}</small></> : <span className="invalid-message">{invalidMessage}</span>}</div><div className="precision-control"><button type="button" onClick={() => setPrecisionOpen((open) => !open)} aria-expanded={precisionOpen}><SlidersHorizontal size={15} />{settings.precision === "auto" ? "Auto precision" : `${settings.precision} decimals`}</button>{precisionOpen && <div className="precision-menu">{[["auto", "Auto precision"], ["2", "2 decimals"], ["4", "4 decimals"], ["6", "6 decimals"], ["8", "8 decimals"]].map(([value, label]) => <button type="button" className={settings.precision === value ? "is-selected" : ""} onClick={() => { updateSettings({ precision: value }); setPrecisionOpen(false); }} key={value}>{settings.precision === value && <Check size={14} />}{label}</button>)}</div>}</div></div>
    <div className="converter-actions"><div className="primary-actions"><button type="button" className="instrument-button primary" onClick={confirmCalculation}><Calculator size={16} />Calculate</button><button type="button" className="instrument-button subtle" onClick={clear}><Trash2 size={15} />Clear</button></div><div className="icon-actions"><button type="button" onClick={copyResult} aria-label="Copy conversion result" title="Copy result"><Copy size={17} /></button><button type="button" className={favorite ? "is-favorite" : ""} onClick={() => { toggleFavorite(entry); toast.success(favorite ? "Removed from favorites" : "Added to favorites"); }} aria-label={favorite ? "Remove from favorites" : "Add to favorites"} title="Favorite conversion"><Heart size={17} fill={favorite ? "currentColor" : "none"} /></button><button type="button" onClick={share} aria-label="Copy shareable conversion link" title="Share conversion"><Share2 size={17} /></button>{onViewHistory && <button type="button" onClick={onViewHistory} aria-label="View conversion history" title="Conversion history"><Clock3 size={17} /></button>}</div></div>
    {settings.calculatorMode && <div className="calculator-hint"><Sparkles size={14} />Calculator mode accepts arithmetic, for example <code>(10 * 5) / 2</code></div>}
  </section>;
}
