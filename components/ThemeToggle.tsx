"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const THEME_KEY = "rei-das-caixas-theme";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.location.pathname.startsWith("/studio")) {
      setReady(true);
      return;
    }
    const saved = window.localStorage.getItem(THEME_KEY);
    const systemTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initialTheme: Theme = saved === "dark" || saved === "light" ? saved : systemTheme;
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setReady(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
  }

  const dark = theme === "dark";
  return <button type="button" onClick={toggleTheme} aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"} aria-pressed={dark} disabled={!ready} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-creme/30 px-4 py-2 text-sm font-semibold text-creme transition-colors hover:border-dourado hover:text-dourado disabled:cursor-wait disabled:opacity-80">{dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}<span>{dark ? "Tema claro" : "Tema escuro"}</span></button>;
}
