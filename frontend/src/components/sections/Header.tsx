"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import ThemeToggle from "../ui/theme-toggle";
import Button from "@/components/ui/Button";
import { navLinks } from "@/contents/landing";

function Header(): React.JSX.Element {
  const [isLogined, setLogined] = useState<boolean>(false);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
  const isScrolled = useScroll(70);

  const handleToggleLogin = (): void => {
    setLogined((prev) => !prev);
  };

  const handleToggleMenu = (): void => {
    setMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = (): void => {
    setMenuOpen(false);
  };

  return (
    <header className="h-screen flex flex-col bg-background text-primary">
      {/* Desktop */}
      <nav
        aria-hidden={isMenuOpen}
        className={[
          "container left-0 right-0 px-4 mx-auto transition-all duration-token-normal ease-token-default",
          "fixed flex justify-between z-50 items-center p-4 border-b-2",
          isScrolled
            ? "bg-background-secondary/50 md:mt-4 backdrop-blur-md shadow-token-md rounded-token-sm rounded-bl-none rounded-br-none"
            : "bg-transparent",
          isMenuOpen ? "border-b-0" : "border-b",
        ].join(" ")}
      >
        <div className="flex items-center gap-15">
          <div className="shrink-0 text-token-3xl font-extrabold">
            <Link href="/" className="">
              کوتاهک
            </Link>
            <span className="text-info mr-2">/</span>
          </div>

          <ul className="hidden md:flex items-center  text-token-sm font-token-medium text-primary/60">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary hover:bg-muted p-3 rounded-token-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <Button variant="outline" size="md" onClick={handleToggleLogin}>
            ورود  |  ثبت نام
          </Button>
        </div>

        <button
          type="button"
          onClick={handleToggleMenu}
          className="md:hidden p-2 rounded-token-sm hover:bg-muted transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile */}
      <div
        aria-hidden={!isMenuOpen}
        className={[
          "md:hidden fixed left-0 right-0 z-40 container mx-auto px-4 transition-all duration-token-normal ease-token-default overflow-hidden",
          isScrolled ? "top-24" : "top-22",
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-token-md shadow-token-md p-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-4 text-token-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleCloseMenu}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <ThemeToggle />

            <Button variant="outline" size="md" onClick={handleToggleLogin}>
              ورود | ثبت نام
            </Button>
          </div>
        </div>
      </div>

      <div className="grow mt-17 text-center grid place-items-center text-primary text-token-7xl">
        Hero Section & ...
      </div>
    </header>
  );
}

export default Header;
