/** UnitFlow style: deep field navigation on desktop, clear workbench on every screen. */
import { useEffect, useState } from "react";
import { SearchDialog } from "./SearchDialog";
import { Sidebar } from "./Sidebar";
import { MobileNavigation } from "./MobileNavigation";

export function AppLayout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return <div className="app-shell"><Sidebar onOpenSearch={() => setSearchOpen(true)} /><MobileNavigation onOpenSearch={() => setSearchOpen(true)} /><main className="main-canvas">{children}</main><SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} /></div>;
}
