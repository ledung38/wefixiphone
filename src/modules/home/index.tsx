"use client";

import { AnimateSpan } from "@/components/common/Animate";
import { ArrowCircleRightIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import HomeAreas from "@/modules/home/components";
import Testimonials from "@/modules/home/components/Testimonials";
import { CheckCircle, Clock, Eye, Phone, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QuickServices } from "./components/QuickServices";
import { FreeConsultationBanner } from "./components/FreeConsultationBanner";
import { RepairProcess } from "./components/RepairProcess";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { WhyFixNow } from "./components/WhyFixNow";
import { Routes } from "@/lib/enum/routes";
import DIff from "@/modules/home/components/DIff";

// List of Sydney Suburbs covered for interactive checking
const SYDNEY_SUBURBS = [
  "Sydney CBD",
  "Chatswood",
  "Parramatta",
  "Bondi",
  "Manly",
  "Ryde",
  "Surry Hills",
  "Hornsby",
  "Liverpool",
  "Hurstville",
  "Burwood",
  "Auburn",
  "Blacktown",
  "Randwick",
  "Coogee",
  "Newtown",
  "Marrickville",
  "Pyrmont",
  "North Sydney",
  "Darlinghurst",
  "Paddington",
  "Redfern",
  "Alexandria",
  "Waterloo",
  "Zetland",
];

const Home = () => {
  const router = useRouter();

  // Before/After state

  // Suburb check state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState<
    "idle" | "found" | "not_found"
  >("idle");
  const [matchedSuburb, setMatchedSuburb] = useState("");

  const checkSuburb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    const found = SYDNEY_SUBURBS.find((s) => s.toLowerCase().includes(query));

    if (found) {
      setSearchStatus("found");
      setMatchedSuburb(found);
    } else {
      setSearchStatus("not_found");
    }
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden py-12 lg:py-24 bg-slate-50 dark:bg-slate-950">
        {/* Background Image with overlay gradient */}
        <div className="absolute inset-0 z-0 ">
          <Image
            src="/hero_repair.png"
            quality={100}
            unoptimized
            width={1920}
            height={1080}
            alt="iPhone Repair Technician"
            className="w-full h-full object-cover object-right lg:object-center opacity-85 dark:opacity-75 transition-opacity duration-500"
          />
          <div className="absolute inset-0 lg:w-1/2 left-0 top-0 bottom-0">
            <div className="absolute inset-0 bg-slate-950/70 lg:bg-transparent z-10" />
            <div className="absolute inset-0 hero-gradient-overlay z-10" />
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
          {/* Left side (48% width): Content Area */}
          <div className="w-full lg:w-[48%]  flex flex-col items-start text-left space-y-6">
            {/* Headline Lockup */}

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white"
              >
                On-Site iPhone Repair in{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Sydney
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-slate-200"
              >
                Screen & Battery Replacement{" "}
                <span className="text-primary">in just 20 mins</span>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg sm:text-xl font-semibold text-slate-300"
              >
                Doorstep Service • 12-Month Warranty
              </motion.p>
            </div>

            {/* Subtext Grid */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 w-full mt-2 text-sm sm:text-base font-semibold text-slate-200"
            >
              <div className="flex items-center gap-3 gradient-border-premium px-4 py-3 rounded-2xl cursor-default">
                <div className="h-6 w-6 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Arrives in 30 mins</span>
              </div>
              <div className="flex items-center gap-3 gradient-border-premium px-4 py-3 rounded-2xl cursor-default">
                <div className="h-6 w-6 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Genuine-grade parts</span>
              </div>
              <div className="flex items-center gap-3 gradient-border-premium px-4 py-3 rounded-2xl cursor-default">
                <div className="h-6 w-6 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <Eye className="w-3.5 h-3.5" />
                </div>
                <span>Watch the repair live</span>
              </div>
              <div className="flex items-center gap-3 gradient-border-premium px-4 py-3 rounded-2xl cursor-default">
                <div className="h-6 w-6 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>Done on the spot</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            >
              <Button
                size="lg"
                onClick={() => router.push(Routes.BOOKING)}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-4 py-6 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-primary/30 transform active:scale-95 transition-transform"
              >
                BOOK A REPAIR
                <AnimateSpan
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowCircleRightIcon className="size-6" />
                </AnimateSpan>
              </Button>
              <a href="tel:0433263105" className="w-full sm:w-auto flex-1">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:min-w-40 sm:w-auto border-white/20 hover:border-white/50 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-5 h-5 animate-bounce " />
                  Call us now
                </Button>
              </a>
            </motion.div>

            {/* Trust badge */}
            <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 pt-1.5">
              <span className="text-amber-500">★★★★★</span>
              <span>Rated 4.9/5 (2,000+ customers in Sydney)</span>
            </div>
          </div>

          {/* Right side (52% width): Empty space so background image of technician is fully visible */}
          <div className="w-full lg:w-[52%] hidden lg:block" />
        </div>
      </section>

      {/* 2. QUICK SERVICES SECTION */}
      <QuickServices />
      <FreeConsultationBanner />

      {/* 3. BEFORE / AFTER SLIDER SECTION */}
      <DIff />

      {/* 4. WHY FIX NOW SECTION */}
      <WhyFixNow />

      {/* 5. WHY CHOOSE US SECTION */}
      <WhyChooseUs />

      {/* 6. REPAIR PROCESS SECTION */}
      <RepairProcess />

      <Testimonials />
      <HomeAreas />
    </div>
  );
};

export default Home;
