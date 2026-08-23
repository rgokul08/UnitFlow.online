/** UnitFlow style: unknown routes receive a clear return path, never an unexplained dead end. */
import { ArrowLeft, Compass } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() { const [, navigate] = useLocation(); return <div className="not-found page-enter"><p className="eyebrow">OUT OF RANGE</p><div className="not-found-number">404</div><Compass size={28} /><h1>This conversion doesn’t exist.</h1><p>The category or unit pair may be unavailable. Return to the workbench and choose a supported measurement.</p><button type="button" className="instrument-button primary" onClick={() => navigate("/")}><ArrowLeft size={16} />Return to converter</button></div>; }

