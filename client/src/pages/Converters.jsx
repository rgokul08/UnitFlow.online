/** UnitFlow style: the converter library reads like an organized set of instruments, not a marketing grid. */
import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { CategoryIcon } from "../components/CategoryIcon";
import { PageHeader } from "../components/PageHeader";
import { categories } from "../data/conversionData";

export default function Converters() {
  const [query, setQuery] = useState(""); const [, navigate] = useLocation();
  const filtered = useMemo(() => categories.filter((category) => `${category.name} ${category.description} ${category.units.map((unit) => unit.name).join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="page-wrapper page-enter"><PageHeader eyebrow="MEASUREMENT LIBRARY" title="All converters" description="Pick a category, then move between the units that matter to your work." action={<div className="inline-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter categories" aria-label="Filter converter categories" /></div>} /><div className="category-count"><span>{filtered.length} categories shown</span><i /><span>{categories.reduce((total, item) => total + item.units.length, 0)} calibrated units</span></div><section className="category-grid">{filtered.map((category, index) => <button type="button" className={`category-card card-index-${index % 5}`} onClick={() => navigate(`/converter/${category.id}`)} key={category.id}><div className="category-card-icon"><CategoryIcon icon={category.icon} /></div><div className="category-card-copy"><p>{category.name}</p><span>{category.description}</span><small>CHANNEL {String(index + 1).padStart(2, "0")} · {category.units.length} UNITS</small></div><ArrowRight size={17} /></button>)}</section>{!filtered.length && <div className="empty-state"><Search size={26} /><h3>No category found</h3><p>Try a category name or one of its unit names.</p></div>}</div>;
}
