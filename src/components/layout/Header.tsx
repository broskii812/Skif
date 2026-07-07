"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { companyInfo } from "@/data/company";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "О компании" },
  { href: "#catalog", label: "Каталог" },
  { href: "#request", label: "Заявка" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isMounted && isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-md"
          : isMounted
            ? "bg-transparent"
            : "bg-white/95 shadow-md backdrop-blur-md",
      )}
    >
      <div className="section-container flex h-16 items-center justify-between sm:h-20">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt={companyInfo.name}
            width={180}
            height={180}
            className="h-11 w-auto rounded-md bg-white/95 object-contain p-1 sm:h-12"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-red",
                !isMounted || isScrolled ? "text-navy-800" : "text-white/90",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={companyInfo.phoneHref}
            className={cn(
              "text-sm font-semibold transition-colors hover:text-brand-red",
              !isMounted || isScrolled ? "text-navy-900" : "text-white",
            )}
          >
            {companyInfo.phone}
          </a>
          <Button href="#request" size="sm">
            Оставить заявку
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg lg:hidden",
            !isMounted || isScrolled ? "text-navy-900" : "text-white",
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Меню"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-navy-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={companyInfo.phoneHref}
              className="px-3 py-2 font-semibold text-brand-red"
            >
              {companyInfo.phone}
            </a>
            <Button href="#request" className="w-full" onClick={() => setIsMenuOpen(false)}>
              Оставить заявку
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
