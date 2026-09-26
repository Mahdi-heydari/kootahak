"use client";

import { useTheme } from "next-themes";
import { useRef } from "react";
import Icon from "@/components/ui/Icon";
import { IconName } from "@/components/ui/Icon";

export interface ThemeToggleContent {
  lightIcon: IconName;
  darkIcon: IconName;
}
export const themeToggleContent: ThemeToggleContent = {
  lightIcon: "Sun",
  darkIcon: "Moon",
};
function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { lightIcon, darkIcon } = themeToggleContent;

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
      aria-label={"تغییر سیستم روز و شب"}
      className="btn p-2 w-full flex justify-center items-center md:w-auto bg-muted md:bg-transparent md:rounded-token-md rounded-token-sm md:hover:bg-muted transition-colors"
    >
      <div className="block dark:hidden">
        <Icon name={lightIcon} size={20} />
      </div>
      <div className="hidden dark:block">
        <Icon name={darkIcon} size={20} />
      </div>
    </button>
  );
}

export default ThemeToggle;
