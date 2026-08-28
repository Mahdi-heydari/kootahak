"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const themeChange = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      document.documentElement.style.setProperty("--theme-change-x", `${x}px`);
      document.documentElement.style.setProperty("--theme-change-y", `${y}px`);

      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={themeChange}
      className="btn p-2 rounded-token-md hover:bg-muted transition-colors"
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
