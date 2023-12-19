"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState("");

  const handleThemeChange = useCallback(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-colors-scheme:dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    handleThemeChange();
  }, [mode, handleThemeChange]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme is used outside the ThemeProvider");
  }

  return context;
}
