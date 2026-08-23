/** UnitFlow style: favorites are a deliberate shortcut shelf for recurrent conversion work. */
import { Heart } from "lucide-react";
import { FavoriteList } from "../components/FavoriteList";
import { PageHeader } from "../components/PageHeader";
import { useUnitFlow } from "../contexts/UnitFlowContext";

export default function Favorites() { const { favorites } = useUnitFlow(); return <div className="page-wrapper page-enter"><PageHeader eyebrow="PERSONAL PAIRINGS" title="Favorite conversions" description="Keep the unit combinations you reach for most close to the workbench." /><div className="favorites-summary"><Heart size={18} fill="currentColor" /><strong>{favorites.length}</strong><span>{favorites.length === 1 ? "saved pair" : "saved pairs"}</span></div><FavoriteList /></div>; }

