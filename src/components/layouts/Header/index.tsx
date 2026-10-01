"use client";

import { ModeToggle } from "@/components/common/ModeToggle";
import { BellIcon, PhoneIcon } from "@/components/icons";
import { MENU_ITEMS, MenuItem } from "@/components/layouts/contants";
import { NavLink } from "@/components/layouts/Header/NavLink";
import { useAppRouter } from "@/hooks/useAppRouter";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import { Routes } from "@/lib/enum/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, Menu, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Image from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";

// Mobile Menu Item Component
const MobileMenuItem = ({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) => {
  const hasSubTabs = item.children && item.children.length > 0;
  const [openSubmenu, setOpenSubmenu] = useState(false);

  return (
    <div key={item.key} className="space-y-0">
      {hasSubTabs ? (
        <button
          onClick={() => setOpenSubmenu(!openSubmenu)}
          className="w-full flex items-center justify-between px-4 py-3.5 text-white font-semibold hover:bg-white/15 rounded-lg transition-all duration-200 group"
        >
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            {item.label}
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${
              openSubmenu ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <Link
          href={`${item.key}`}
          onClick={onClose}
          className="block px-4 py-3.5 text-white font-semibold hover:bg-white/15 hover:translate-x-1 rounded-lg transition-all duration-200"
        >
          {item.label}
        </Link>
      )}

      {hasSubTabs && openSubmenu && (
        <div className="pl-4 space-y-1 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {item.children?.map((subTab) => (
            <Link
              key={subTab.key}
              href={`${subTab.key}`}
              onClick={onClose}
              className="block px-4 py-2.5 text-blue-100 font-medium hover:bg-white/15 hover:text-white hover:translate-x-1 rounded-lg transition-all duration-200 text-sm"
            >
              {subTab.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Header = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(() => {
    const firstSegment = `/${pathname.split("/")[1]}`;
    return firstSegment === "/" ? Routes.HOME : firstSegment;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const route = useAppRouter();
  const isHome = pathname === "/";

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  useDidUpdateEffect(() => {
    const firstSegment = `/${pathname.split("/")[1]}`;
    setActive(firstSegment === "/" ? Routes.HOME : firstSegment);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all bg-white dark:bg-slate-950 duration-500 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-slate-200/10"
            : isHome
              ? "!bg-transparent border-transparent"
              : "bg-white dark:bg-slate-950 border-b border-slate-200/10"
        }`}
        ref={ref}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Premium Design */}
            <div>
              <Link
                href={Routes.HOME}
                aria-label="Back to home"
                className="flex items-center gap-3 flex-shrink-0 group"
              >
                <div className="relative py-2 transition-all duration-300 group-hover:scale-105 px-1">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-90 transition-opacity duration-300 ${!isScrolled && isHome ? "" : "hidden dark:block"}`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-75 transition-opacity duration-300 group-hover:opacity-0 ${!isScrolled && isHome ? "" : "hidden dark:block"}`}
                  />
                  <Image
                    src="/logo_header_v2.webp"
                    alt="House Phone Tech"
                    width={120}
                    height={60}
                    unoptimized
                    className="relative h-10 sm:h-15 w-auto"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden lg:flex items-center gap-8">
              {MENU_ITEMS.map((item) => {
                const hasSubTabs = item.children && item.children.length > 0;

                if (hasSubTabs) {
                  return (
                    <div key={item.key} className="relative group">
                      <NavLink
                        href={`${item.key}`}
                        isActive={active === item.key}
                        isTextBlack={isHome ? !!isScrolled : true}
                      >
                        <span className="flex items-center gap-1">
                          {item.label}
                          <ChevronDown
                            size={14}
                            className="opacity-60 transition-transform duration-200 group-hover:rotate-180"
                          />
                        </span>
                      </NavLink>
                      <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-[1000]">
                        <div className="w-max rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-blue-100 dark:border-white/10 p-2 min-w-[200px]">
                          <div className="py-1 min-w-max">
                            {item.children?.map((subTab) => (
                              <Link
                                key={subTab.key}
                                href={`${subTab.key}`}
                                className="block px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 dark:hover:from-white/5 dark:hover:to-white/10 dark:hover:text-blue-400 transition-all duration-200 whitespace-nowrap rounded-lg hover:translate-x-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subTab.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.key}>
                    <NavLink
                      href={`${item.key}`}
                      isActive={active === item.key}
                      isTextBlack={isHome ? !!isScrolled : true}
                    >
                      {item.label}
                    </NavLink>
                  </div>
                );
              })}
            </nav>

            {/* Right Actions - Premium Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 group">
                <a
                  href="tel:0433263105"
                  className="hidden sm:flex transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <Button className="rounded-lg bg-primary hover:bg-primary/95 text-white flex items-center gap-2 group cursor-pointer shadow-md shadow-primary/20">
                    <PhoneIcon className="[&_path]:stroke-white size-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span>0433 263 105</span>
                  </Button>
                </a>
              </div>

              <div className="group flex-1">
                <button
                  type="button"
                  className="w-full hidden lg:flex flex-1 gap-2 items-center font-semibold transition-all duration-200 active:scale-95 hover:scale-105 px-4 py-2 text-sm sm:text-base rounded-lg group bg-gradient-to-r from-orange-500 to-red-500 text-white cursor-pointer shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30"
                  onClick={() => {
                    route.push(Routes.BOOKING);
                  }}
                >
                  <BellIcon className="size-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span>Book now</span>
                </button>
              </div>

              <div>
                <ModeToggle />
              </div>

              {/* Mobile Menu Button - Premium Style */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:bg-slate-500/10 transition-all duration-200 active:scale-90"
              >
                {isMobileMenuOpen ? (
                  <X
                    className={`max-sm:text-slate-400 h-6 w-6 transition-transform duration-300 text-slate-500 dark:text-white ${
                      isHome && !isScrolled ? "max-sm:text-white" : ""
                    }`}
                  />
                ) : (
                  <Menu
                    className={`max-sm:text-slate-400 h-6 w-6 transition-transform duration-300 text-slate-500 dark:text-white ${
                      isHome && !isScrolled ? "max-sm:text-white" : ""
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Premium Design */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-slate-900/98 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 sm:px-6 py-6 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
              {MENU_ITEMS.map((item) => (
                <MobileMenuItem
                  key={item.key}
                  item={item}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              ))}

              {/* Mobile Action Buttons */}
              <div className="pt-6 border-t border-white/20 space-y-3 mt-4">
                <a href="tel:0433263105" className="block">
                  <Button className="w-full flex gap-2 bg-white text-primary font-semibold hover:bg-blue-50 transition-all duration-200 py-3 rounded-lg shadow-md">
                    <PhoneIcon className="[&_path]:stroke-primary size-5" />
                    <span>0433 263 105</span>
                  </Button>
                </a>
                <Button
                  onClick={() => {
                    route.push(Routes.BOOKING);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg transition-all duration-200 py-3 rounded-lg"
                >
                  <BellIcon className="size-5" />
                  <span>Book now</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacing cho fixed header */}
      {!isHome && <div className="h-20" />}
    </>
  );
};
