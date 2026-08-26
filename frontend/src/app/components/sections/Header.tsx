"use client";

import Link from "next/link";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useScroll } from "@/app/hooks/use-scroll";

function Header() {
  const [isDark, setIsDark] = useState(true);
  const [isLogined, setLogined] = useState(false);
  const isScrolled = useScroll(70);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="h-screen flex flex-col bg-background text-primary">
      <nav
        className={[
          "container left-0 right-0 px-4 mx-auto border-b transition-all duration-300 text-primary",
          "fixed flex justify-between z-50 items-center p-4",
          isScrolled
            ? "bg-[#191919]/45 backdrop-blur-md border-border hover:border-border-hover shadow-lg rounded-token-md rounded-br-none rounded-bl-none mt-2.5"
            : "bg-transparent border-b",
        ].join(" ")}
      >
        <div className="shrink-0">
          <Link href="/" className="text-xl font-bold tracking-wide">
            KOOTAHAK
          </Link>
          <span className="text-violet-500 font-bold text-xl mr-2">/</span>
        </div>

        <ul className="hidden md:flex tracking-wider items-center gap-8 text-sm text-[#edededa8]">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-primary transition-colors"
            >
              AboutUs
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="hover:text-primary transition-colors"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-token-md hover:bg-[#2a2a2a] transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* just for testing */}
          {isLogined ? (
            <button
              onClick={() => setLogined(!isLogined)}
              className="px-4 py-2 text-sm rounded-token-sm bg-muted hover:bg-muted-foreground transition-colors"
            >
              LogIn
            </button>
          ) : (
            <button
              onClick={() => setLogined(!isLogined)}
              className="px-4 py-2 text-sm rounded-token-sm bg-muted hover:bg-muted-foreground transition-colors"
            >
              SignUp
            </button>
          )}
        </div>
      </nav>

      <div className="grow mt-17 grid place-items-center text-primary text-7xl">
        Hero Section & ...
      </div>
    </header>
  );
}

export default Header;
