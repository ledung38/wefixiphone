"use client";

import { ModeToggle } from "@/components/common/ModeToggle";
import { BellIcon, PhoneIcon } from "@/components/icons";
import { MENU_ITEMS } from "@/components/layouts/contants";
import { NavLink } from "@/components/layouts/Header/NavLink";
import {
  Button,
  NextAvatar,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { useAppRouter } from "@/hooks/useAppRouter";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import logo from "@/lib/assets/images/logo.webp";
import { Routes } from "@/lib/enum/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils/index";

// Mobile Menu Item Component
const MobileMenuItem = ({
  item,
  onClose,
}: {
  item: (typeof MENU_ITEMS)[0];
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
          {item.children.map((subTab) => (
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
  const navigate = useAppRouter();
  const route = useAppRouter();
  const isHome = pathname === "/";

  const onChangeTab = useCallback(
    (key: string) => {
      setActive(key);
      navigate.push(key);
      setIsMobileMenuOpen(false);
    },
    [navigate],
  );

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all bg-white dark:bg-white/50  duration-500 ${
          isScrolled
            ? "bg-white backdrop-blur-xl shadow-2xl"
            : isHome
              ? "!bg-transparent"
              : ""
        }`}
        ref={ref}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Premium Design */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href={Routes.HOME}
                aria-label="Trở về trang chủ"
                className="flex items-center gap-3 flex-shrink-0 group"
              >
                <div className="relative transition-all duration-300 group-hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-secondary rounded-full blur-lg opacity-50 transition-opacity duration-300  group-hover:opacity-0" />
                  <img
                    src="/logo_header_v3.png"
                    alt="Logo"
                    className="relative h-18 "
                  />
                </div>
                {/* <div className="hidden sm:flex flex-col">
                  <span className="text-lg font-black text-white leading-tight tracking-tight">
                    N&T Spotless
                  </span>
                  <span className="text-xs text-blue-100 font-semibold tracking-wide uppercase">
                    Cleaning
                  </span>
                </div> */}
              </Link>
            </motion.div>

            {/* Desktop Navigation - Enhanced */}
            <nav className="hidden lg:flex items-center gap-8">
              {MENU_ITEMS.map((item, index) => {
                const hasSubTabs = item.children && item.children.length > 0;

                if (hasSubTabs) {
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                    >
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <div className="relative">
                            <NavLink
                              href={`${item.key}`}
                              isActive={active === item.key}
                              isTextBlack={isHome ? !!isScrolled : true}
                            >
                              <span className="flex items-center gap-1">
                                {item.label}
                                <ChevronDown size={14} className="opacity-60" />
                              </span>
                            </NavLink>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          sideOffset={16}
                          className="z-[1000] w-max rounded-xl bg-white shadow-2xl border border-blue-100 p-2 animate-in fade-in slide-in-from-top-2"
                        >
                          <div className="py-1 min-w-max">
                            {item.children.map((subTab) => (
                              <Link
                                key={subTab.key}
                                href={`${subTab.key}`}
                                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700 transition-all duration-200 whitespace-nowrap first:rounded-t-lg last:rounded-b-lg hover:translate-x-1"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subTab.label}
                              </Link>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  >
                    <NavLink
                      href={`${item.key}`}
                      isActive={active === item.key}
                      isTextBlack={isHome ? !!isScrolled : true}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                );
              })}
            </nav>

            {/* Right Actions - Premium Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex-1 group"
              >
                <a href="tel:0451210238">
                  <motion.div
                    whileHover="hover"
                    initial="initial"
                    variants={{}} // cần để button có state để truyền xuống
                    // className="w-full hidden lg:flex  gap-2 items-center bg-white text-primary font-semibold hover:bg-blue-50 hover:shadow-2xl transition-transform duration-300 active:scale-95 hover:scale-105 px-4 py-1.5 text-sm sm:text-base rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <Button className="rounded-lg">
                      <motion.div
                        variants={{
                          initial: { rotate: 0 },
                          hover: {
                            rotate: [0, 15, -15, 10, -10, 0],
                            transition: { duration: 0.5 },
                          },
                        }}
                      >
                        <PhoneIcon className="[&_path]:stroke-white size-5 transition-all " />
                      </motion.div>
                      <span>0451210238</span>
                    </Button>
                  </motion.div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="group flex-1"
              >
                <motion.button
                  whileHover="hover"
                  initial="initial"
                  variants={{}} // cần để button có state để truyền xuống
                  className="w-full hidden lg:flex flex-1 gap-2 items-center bg-white  font-semibold hover:bg-blue-50 hover:shadow-2xl transition-transform duration-300 active:scale-95 hover:scale-105 px-4 py-1.5 text-sm sm:text-base rounded-lg group bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  onClick={() => {
                    route.push(Routes.BOOKING);
                  }}
                >
                  <motion.div
                    variants={{
                      initial: { rotate: 0 },
                      hover: {
                        rotate: [0, 15, -15, 10, -10, 0],
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <BellIcon className="size-5" />
                  </motion.div>
                  <span>Book now</span>
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <ModeToggle />
              </motion.div>

              {/* Mobile Menu Button - Premium Style */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                onClick={toggleMobileMenu}
                className={
                  "lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-secondary hover:bg-secondary/20 transition-all duration-200 active:bg-secondary/30"
                }
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Premium Design */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/20 bg-gradient-to-b from-primary/98 to-primary/95 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
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
                <a href="tel:0451210238" className="block">
                  <Button className="w-full flex gap-2 bg-white text-primary font-semibold hover:bg-blue-50 transition-all duration-200 py-3 rounded-lg shadow-md">
                    <PhoneIcon className="[&_path]:stroke-primary size-5" />
                    <span>0451210238</span>
                  </Button>
                </a>
                <Button
                  onClick={() => {
                    route.push(Routes.BOOKING);
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

      {/* Spacing untuk fixed header */}
      <div className="h-20" />
    </>
  );
};
