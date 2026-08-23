/**
 * UnitFlow style: shared application state is a quiet local workbench,
 * never a remote account or simulated service.
 */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UnitFlowContext = createContext(null);

export function UnitFlowProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("unitflow-settings", { theme: "system", precision: "auto", calculatorMode: false });
  const [history, setHistory] = useLocalStorage("unitflow-history", []);
  const [favorites, setFavorites] = useLocalStorage("unitflow-favorites", []);
  const [conversionCount, setConversionCount] = useLocalStorage("unitflow-conversion-count", 0);
  const [systemDark, setSystemDark] = useState(() => window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media) return undefined;
    const listener = (event) => setSystemDark(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const isDark = settings.theme === "dark" || (settings.theme === "system" && systemDark);
  useEffect(() => { document.documentElement.classList.toggle("dark", isDark); }, [isDark]);

  const updateSettings = (patch) => setSettings((current) => ({ ...current, ...patch }));
  const recordConversion = (entry) => {
    const timestamp = Date.now();
    setHistory((current) => [{ ...entry, id: `${timestamp}-${Math.random().toString(16).slice(2)}`, timestamp }, ...current].slice(0, 80));
    setConversionCount((count) => count + 1);
  };
  const deleteHistory = (id) => setHistory((current) => current.filter((entry) => entry.id !== id));
  const clearHistory = () => setHistory([]);
  const isFavorite = (entry) => favorites.some((item) => item.category === entry.category && item.from === entry.from && item.to === entry.to);
  const toggleFavorite = (entry) => {
    setFavorites((current) => {
      const exists = current.some((item) => item.category === entry.category && item.from === entry.from && item.to === entry.to);
      if (exists) return current.filter((item) => !(item.category === entry.category && item.from === entry.from && item.to === entry.to));
      return [{ category: entry.category, from: entry.from, to: entry.to, savedAt: Date.now() }, ...current];
    });
  };

  const value = useMemo(() => ({ settings, updateSettings, history, recordConversion, deleteHistory, clearHistory, favorites, toggleFavorite, isFavorite, conversionCount, isDark }), [settings, history, favorites, conversionCount, isDark]);
  return <UnitFlowContext.Provider value={value}>{children}</UnitFlowContext.Provider>;
}

export function useUnitFlow() {
  const context = useContext(UnitFlowContext);
  if (!context) throw new Error("useUnitFlow must be used inside UnitFlowProvider");
  return context;
}

