/** UnitFlow style: dedicated category routes preserve the workbench and make every pairing shareable. */
import { ArrowLeft, ArrowRight, Info, Star } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { CategoryIcon } from "../components/CategoryIcon";
import { Converter } from "../components/Converter";
import { PageHeader } from "../components/PageHeader";
import { categoryById, initialPair, unitById } from "../data/conversionData";
import NotFound from "./NotFound";

export default function Category() {
  const [, params] = useRoute("/converter/:category/:pair"); const [, categoryParams] = useRoute("/converter/:category"); const [, navigate] = useLocation();
  const categoryId = params?.category || categoryParams?.category || "length"; const category = categoryById(categoryId);
  const pair = params?.pair?.match(/^(.+)-to-(.+)$/); const fallback = category ? initialPair(category.id) : null;
  const from = pair?.[1] && category && unitById(category.id, pair[1]) ? pair[1] : fallback?.from; const to = pair?.[2] && category && unitById(category.id, pair[2]) ? pair[2] : fallback?.to;
  const initialValue = new URLSearchParams(window.location.search).get("value");
  if (!category || !from || !to) return <NotFound />;
  return <div className="page-wrapper category-page page-enter"><button type="button" className="back-link" onClick={() => navigate("/converters")}><ArrowLeft size={16} />All categories</button><section className="category-workbench-heading"><div className="category-heading-icon"><CategoryIcon icon={category.icon} size={24} /></div><div><p className="eyebrow">CATEGORY WORKBENCH</p><h1>{category.name} converter</h1><p>{category.description}. Switch units, set precision, or save a frequently used pairing.</p></div></section><Converter categoryId={category.id} initialFrom={from} initialTo={to} initialValue={initialValue} onViewHistory={() => navigate("/history")} /><section className="category-info-grid"><article><Info size={17} /><div><strong>Accurate definitions</strong><p>Results use calibrated base-unit factors and scale-specific formulae where needed.</p></div></article><article><Star size={17} /><div><strong>Save this pairing</strong><p>Use the heart on the converter to make this unit pair available from Favorites.</p></div></article><article><ArrowRight size={17} /><div><strong>Share the instrument</strong><p>Copy a direct route to this conversion pair from the share action.</p></div></article></section><section className="related-units"><div className="section-heading compact"><div><p className="eyebrow">AVAILABLE SCALES</p><h2>{category.units.length} units in this category</h2></div></div><div className="unit-chip-list">{category.units.map((unit) => <button type="button" onClick={() => navigate(`/converter/${category.id}/${unit.id}-to-${to}`)} key={unit.id}><strong>{unit.symbol}</strong><span>{unit.name}</span></button>)}</div></section></div>;
}
