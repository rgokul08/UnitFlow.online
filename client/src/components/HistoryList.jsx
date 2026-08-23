/** UnitFlow style: past work is presented as a compact, local-only measurement log. */
import { ArrowUpRight, Clock3, Trash2 } from "lucide-react";
import { useLocation } from "wouter";
import { formatNumber } from "../utils/formatNumber";
import { useUnitFlow } from "../contexts/UnitFlowContext";

export function HistoryList({ limit }) {
  const { history, deleteHistory } = useUnitFlow();
  const [, navigate] = useLocation();
  const entries = limit ? history.slice(0, limit) : history;
  if (!entries.length) return <div className="empty-state"><Clock3 size={26} /><h3>No measurements yet</h3><p>Your completed conversions will appear here and remain on this device.</p></div>;
  return <div className="history-list">{entries.map((entry) => <article className="history-row" key={entry.id}><button type="button" className="history-repeat" onClick={() => navigate(`/converter/${entry.category}/${entry.from}-to-${entry.to}?value=${encodeURIComponent(entry.rawValue)}`)}><span className="history-category">{entry.categoryName}</span><strong>{formatNumber(entry.inputValue)} {entry.fromSymbol} <ArrowUpRight size={13} /> {formatNumber(entry.result)} {entry.toSymbol}</strong><small>{new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" }).format(entry.timestamp)}</small></button><button type="button" className="row-delete" onClick={() => deleteHistory(entry.id)} aria-label="Delete this conversion"><Trash2 size={16} /></button></article>)}</div>;
}

