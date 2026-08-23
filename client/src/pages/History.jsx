/** UnitFlow style: a complete, editable local conversion record with honest persistence cues. */
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { HistoryList } from "../components/HistoryList";
import { PageHeader } from "../components/PageHeader";
import { useUnitFlow } from "../contexts/UnitFlowContext";

export default function History() { const { history, clearHistory } = useUnitFlow(); return <div className="page-wrapper page-enter"><PageHeader eyebrow="LOCAL RECORD" title="Conversion history" description="A private, repeatable log of work completed on this browser." action={history.length ? <button type="button" className="instrument-button danger" onClick={() => { clearHistory(); toast.success("History cleared"); }}><Trash2 size={16} />Clear history</button> : null} /><div className="history-summary"><strong>{history.length}</strong><span>{history.length === 1 ? "measurement" : "measurements"} recorded locally</span></div><HistoryList /></div>; }

