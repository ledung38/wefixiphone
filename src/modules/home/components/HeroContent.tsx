import React from "react";
import { Clock, ShieldCheck, Eye, CheckCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  AnimateDiv,
  AnimateH1,
  AnimateP,
  AnimateSpan,
} from "@/components/common/Animate";
import { ArrowCircleRightIcon } from "@/components/icons";
import { Routes } from "@/lib/enum/routes";

export const HeroContent = () => {
  return (
    <div className="w-full lg:w-[48%] flex flex-col items-start text-left space-y-6">
      {/* Headline Lockup */}
      <div className="space-y-4">
        <AnimateH1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white"
        >
          On-Site iPhone Repair in{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Sydney
          </span>
        </AnimateH1>
        <AnimateP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold text-slate-200"
        >
          Screen & Battery Replacement{" "}
          <span className="text-primary">in just 20 mins</span>
        </AnimateP>
        <AnimateP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl font-semibold text-slate-300"
        >
          Doorstep Service • 12-Month Warranty
        </AnimateP>
      </div>

      {/* Subtext Grid */}
      <AnimateDiv
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
      </AnimateDiv>

      {/* CTAs */}
      <AnimateDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
      >
        <Link href={Routes.BOOKING} className="w-full sm:w-auto">
          <Button
            size="lg"
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
        </Link>
        <a href="tel:0433263105" className="w-full sm:w-auto flex-1">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:min-w-40 sm:w-auto border-white/20 hover:border-white/50 text-white hover:bg-white/10 backdrop-blur-sm font-bold px-8 py-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            Call us now
          </Button>
        </a>
      </AnimateDiv>

      {/* Trust badge */}
      <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 pt-1.5">
        <span className="text-amber-500">★★★★★</span>
        <span>Rated 4.9/5 (2,000+ customers in Sydney)</span>
      </div>
    </div>
  );
};
