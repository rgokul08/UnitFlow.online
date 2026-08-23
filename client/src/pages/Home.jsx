/** UnitFlow style: an offset forest measurement field gives way to a focused, low-friction conversion workbench. */
import { ArrowRight, Copy, MoveUpRight, PanelsTopLeft, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { CategoryIcon } from "../components/CategoryIcon";
import { Converter } from "../components/Converter";
import { FavoriteList } from "../components/FavoriteList";
import { HistoryList } from "../components/HistoryList";
import { categories, categoryById, unitById } from "../data/conversionData";
import { convert } from "../utils/conversionEngine";
import { formatNumber } from "../utils/formatNumber";
import { useUnitFlow } from "../contexts/UnitFlowContext";

const quickPairs = [{ category: "length", from: "km", to: "mi" }, { category: "length", from: "m", to: "ft" }, { category: "weight", from: "kg", to: "lb" }, { category: "volume", from: "l", to: "gal" }, { category: "temperature", from: "c", to: "f" }];

async function copy(text) { try { await navigator.clipboard.writeText(text); toast.success("Conversion copied"); } catch { toast.error("Copy was unavailable"); } }

function QuickCard({ item }) {
  const [, navigate] = useLocation();
  const category = categoryById(item.category); const from = unitById(item.category, item.from); const to = unitById(item.category, item.to); const result = convert(1, item.from, item.to, item.category); const text = `1 ${from.symbol} = ${formatNumber(result)} ${to.symbol}`;
  return <article className="quick-card"><div className="quick-card-head"><span>{category.name}</span><button type="button" onClick={() => copy(text)} aria-label={`Copy ${text}`}><Copy size={15} /></button></div><strong>{text}</strong><button type="button" className="open-conversion" onClick={() => navigate(`/converter/${item.category}/${item.from}-to-${item.to}`)}>Open converter <ArrowRight size={14} /></button></article>;
}

function Home() {
  const [, navigate] = useLocation();
  const { conversionCount, favorites, history } = useUnitFlow();
  const unitCount = categories.reduce((total, category) => total + category.units.length, 0);
  return <div className="home-page page-enter">
    <section className="hero-field"><div className="hero-orbit" aria-hidden="true"><span /><i /><b /></div><div className="hero-copy"><p className="eyebrow bright">UNITFLOW · CONVERSION WORKBENCH</p><h1>Move between<br />scales with focus.</h1><p>Precise unit conversion for everyday calculations, technical work, and the questions in between.</p><div className="hero-actions"><button type="button" className="hero-primary-action" onClick={() => document.querySelector(".converter-stage")?.scrollIntoView({ behavior: "smooth", block: "center" })}>Start converting <ArrowRight size={16} /></button><button type="button" className="hero-quiet-link" onClick={() => navigate("/converters")}>Browse all scales</button></div><div className="hero-proof"><span><Zap size={14} />Instant calculation</span><span><ShieldCheck size={14} />Stored on this device</span></div></div><div className="hero-calibration"><span>MEASURE</span><i /><span>TRANSFORM</span><i /><span>REPEAT</span></div></section>
    <section className="converter-stage"><Converter showCategoryPicker onCategoryChange={(id) => navigate(`/converter/${id}`)} onViewHistory={() => navigate("/history")} /></section>
    <section className="dashboard-strip"><div className="dashboard-stat"><span>AVAILABLE SCALES</span><strong>{categories.length}</strong><small>conversion categories</small></div><div className="dashboard-stat"><span>MEASUREMENT UNITS</span><strong>{unitCount}</strong><small>calibrated definitions</small></div><div className="dashboard-stat"><span>YOUR CONVERSIONS</span><strong>{conversionCount}</strong><small>stored locally</small></div><div className="dashboard-stat"><span>SAVED PAIRS</span><strong>{favorites.length}</strong><small>ready to reuse</small></div></section>
    <section className="content-section quick-section"><div className="section-heading"><div><p className="eyebrow">QUICK START</p><h2>Common measurements, ready when you are.</h2></div><button type="button" className="text-action" onClick={() => navigate("/converters")}>All converters <MoveUpRight size={16} /></button></div><div className="quick-grid">{quickPairs.map((item) => <QuickCard item={item} key={`${item.category}-${item.from}-${item.to}`} />)}</div></section>
    <section className="split-utility-section"><div className="content-section utility-block"><div className="section-heading compact"><div><p className="eyebrow">RECENT WORK</p><h2>Your conversion log</h2></div><button type="button" className="text-action" onClick={() => navigate("/history")}>View history <ArrowRight size={15} /></button></div><HistoryList limit={4} /></div><div className="content-section utility-block"><div className="section-heading compact"><div><p className="eyebrow">SAVED PAIRS</p><h2>Favorites</h2></div><button type="button" className="text-action" onClick={() => navigate("/favorites")}>Manage <ArrowRight size={15} /></button></div><FavoriteList limit={4} /></div></section>
    <section className="feature-band"><article className="feature-panel feature-panel-library"><div className="library-ornament" aria-hidden="true"><i /><i /><i /><i /><b>20</b></div><p className="eyebrow">MEASUREMENT LIBRARY</p><h2>Every scale has a place.</h2><p>Move across 20 categories—from cooking and pace to torque and data transfer—without changing how you work.</p><button type="button" className="instrument-button dark" onClick={() => navigate("/converters")}>Browse categories <PanelsTopLeft size={16} /></button></article><article className="feature-panel feature-panel-dark feature-panel-precision"><div className="precision-ornament" aria-hidden="true"><span>0.001</span><i /><span>CAL</span><i /><span>10.000</span></div><p className="eyebrow bright">CONTROL THE OUTPUT</p><h2>Precision is a preference.</h2><p>Choose automatic formatting or set a fixed decimal precision. Your preference stays on this browser.</p><button type="button" className="instrument-button light" onClick={() => navigate("/settings")}>Open settings <ArrowRight size={16} /></button></article></section>
    <footer className="app-footer"><div><span className="footer-brand">Unit<span>Flow</span></span><p>Calibrated conversions, kept local.</p></div><div className="footer-links"><button type="button" onClick={() => navigate("/converters")}>Converters</button><button type="button" onClick={() => navigate("/history")}>History</button><button type="button" onClick={() => navigate("/favorites")}>Favorites</button><button type="button" onClick={() => navigate("/about")}>About</button></div><p className="footer-note">© 2026 UnitFlow<br />Your data stays on this device.</p></footer>
  </div>;
}

export default Home;
