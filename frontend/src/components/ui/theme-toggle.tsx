"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-token-md hover:bg-muted transition-colors"
    >
      <div className="block dark:hidden">
        <Sun size={18} />
      </div>
      <div className="hidden dark:block">
        <Moon size={18} />
      </div>
    </button>
  );
}

export default ThemeToggle;
