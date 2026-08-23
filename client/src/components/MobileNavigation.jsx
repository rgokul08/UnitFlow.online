/** UnitFlow style: mobile navigation keeps essential destinations one thumb away. */
import { Clock3, Heart, Home, Menu, PanelsTopLeft, Search, Settings2, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Brand } from "./Brand";

export function MobileNavigation({ onOpenSearch }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const links = [{ href: "/", label: "Converter", icon: Home }, { href: "/converters", label: "Categories", icon: PanelsTopLeft }, { href: "/history", label: "History", icon: Clock3 }, { href: "/favorites", label: "Favorites", icon: Heart }, { href: "/about", label: "About", icon: Settings2 }];
  return <>
    <header className="mobile-header"><Brand /><div className="mobile-header-actions"><button type="button" onClick={onOpenSearch} aria-label="Search UnitFlow"><Search size={19} /></button><button type="button" onClick={() => setOpen(true)} aria-label="Open navigation"><Menu size={21} /></button></div></header>
    {open && <div className="mobile-menu-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><section className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"><div className="mobile-menu-heading"><Brand /><button type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={20} /></button></div><nav>{links.map(({ href, label, icon: Icon }) => <Link href={href} key={href} className={location === href ? "mobile-menu-link is-current" : "mobile-menu-link"} onClick={() => setOpen(false)}><Icon size={19} />{label}</Link>)}</nav></section></div>}
    <nav className="bottom-nav" aria-label="Mobile navigation">{links.slice(0, 4).map(({ href, label, icon: Icon }) => <Link href={href} key={href} className={location === href || (href !== "/" && location.startsWith(href)) ? "bottom-link is-current" : "bottom-link"}><Icon size={18} /><span>{label}</span></Link>)}<Link href="/settings" className={location === "/settings" ? "bottom-link is-current" : "bottom-link"}><Settings2 size={18} /><span>Settings</span></Link></nav>
  </>;
}

