/** UnitFlow style: frequently used pairings stay concise and directly reusable. */
import { ArrowUpRight, Heart } from "lucide-react";
import { useLocation } from "wouter";
import { categoryById, unitById } from "../data/conversionData";
import { useUnitFlow } from "../contexts/UnitFlowContext";

export function FavoriteList({ limit }) {
  const { favorites, toggleFavorite } = useUnitFlow();
  const [, navigate] = useLocation();
  const items = limit ? favorites.slice(0, limit) : favorites;
  if (!items.length) return <div className="empty-state"><Heart size={26} /><h3>Nothing saved yet</h3><p>Star a conversion pair in the converter to place it here.</p></div>;
  return <div className="favorite-list">{items.map((item) => { const category = categoryById(item.category); const from = unitById(item.category, item.from); const to = unitById(item.category, item.to); if (!category || !from || !to) return null; return <article className="favorite-row" key={`${item.category}-${item.from}-${item.to}`}><button type="button" className="favorite-repeat" onClick={() => navigate(`/converter/${item.category}/${item.from}-to-${item.to}`)}><span>{category.name}</span><strong>{from.name} <ArrowUpRight size={13} /> {to.name}</strong></button><button type="button" className="row-delete favorite-delete" onClick={() => toggleFavorite(item)} aria-label="Remove from favorites"><Heart size={16} fill="currentColor" /></button></article>; })}</div>;
}

