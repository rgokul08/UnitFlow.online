/** UnitFlow style: a stable lab rail keeps navigation visible without crowding the workbench. */
import { Clock3, Heart, Home, Info, PanelsTopLeft, Search, Settings2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Brand } from "./Brand";

const nav = [{ href: "/", label: "Converter", icon: Home }, { href: "/converters", label: "Categories", icon: PanelsTopLeft }, { href: "/history", label: "History", icon: Clock3 }, { href: "/favorites", label: "Favorites", icon: Heart }, { href: "/about", label: "About", icon: Info }];

export function Sidebar({ onOpenSearch }) {
  const [location] = useLocation();
  return <aside className="sidebar">
    <Brand />
    <button type="button" className="search-trigger" onClick={onOpenSearch}><Search size={17} /><span>Search</span><kbd>⌘ K</kbd></button>
    <nav className="rail-nav" aria-label="Primary navigation">{nav.map(({ href, label, icon: Icon }) => <Link href={href} key={href} className={location === href || (href !== "/" && location.startsWith(href)) ? "rail-link is-current" : "rail-link"}><Icon size={18} /><span>{label}</span></Link>)}</nav>
    <div className="sidebar-bottom"><Link href="/settings" className={location === "/settings" ? "rail-link is-current" : "rail-link"}><Settings2 size={18} /><span>Settings</span></Link><p className="local-note">LOCAL WORKSPACE<br /><strong>Your data stays here</strong></p></div>
  </aside>;
}

