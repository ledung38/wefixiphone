import React from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/lib/enum/routes";

interface PricingCardsProps {
  selectedModel: string;
  selectedPart: string;
  prices: {
    standard: number;
    premium: number;
    genuine: number;
  };
}

export const PricingCards = ({
  selectedModel,
  selectedPart,
  prices,
}: PricingCardsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6">
      {/* Tier 1: Aftermarket */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/10 shadow-sm transition-all duration-300 relative group">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
              BUDGET FRIENDLY
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Standard (Aftermarket)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Budget-friendly option using high-quality Grade-A third-party
              parts, fully warranted.
            </p>
          </div>

          <div className="py-4 border-y border-slate-100 dark:border-white/5 flex items-baseline gap-1">
            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
              AUD
            </span>
            <span className="text-5xl font-black text-slate-900 dark:text-white">
              ${prices.standard}
            </span>
            <span className="text-xs text-slate-455 dark:text-slate-500 ml-2">
              All-inclusive
            </span>
          </div>

          <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span>Maximize your savings</span>
            </li>
            {selectedPart === "screen" && (
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                <span>Supports 120Hz refresh rate (Prime Incell)</span>
              </li>
            )}
            <li className="flex items-center gap-2.5">
              <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>3-month repair warranty only</span>
            </li>
            {selectedPart === "screen" ? (
              <>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Auto-Brightness not supported</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Displays &quot;Unknown Part&quot; warning message</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Standard capacity (third-party cell)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>No Battery Health percentage display</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>Displays &quot;Unknown Part&quot; warning message</span>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="pt-8">
          <div className="max-w-6xl mx-auto py-6 text-center">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-355 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 py-4 px-6 rounded-2xl shadow-sm inline-flex items-center gap-2.5 justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                This price includes the part, labor, and travel fee to your
                place.
              </span>
            </p>
          </div>
          <Link
            href={`${Routes.BOOKING}?model=${selectedModel}&part=${selectedPart}&quality=Standard Aftermarket&price=${prices.standard}`}
            className="w-full block"
          >
            <Button className="w-full bg-slate-100 hover:text-primary hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-6 rounded-xl font-bold text-sm transform active:scale-95 transition-transform cursor-pointer">
              Book Standard Repair
            </Button>
          </Link>
        </div>
      </div>

      {/* Tier 2: Premium (RECOMMENDED) */}
      <div className="rounded-3xl border-2 border-primary bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xl shadow-primary/5 dark:shadow-primary/10 relative group transform lg:-translate-y-2">
        <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg">
          RECOMMENDED (POPULAR)
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              99% ORIGINAL PERFORMANCE
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              {selectedPart === "screen" ? "Premium OLED" : "Premium Battery"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {selectedPart === "screen"
                ? "Top-tier parts manufactured to original specifications. Perfect touch responsiveness, vibrant colors, and durability."
                : "High-quality battery replacements featuring original capacity cells and stable power management."}
            </p>
          </div>

          <div className="py-4 border-y border-slate-100 dark:border-white/10 flex items-baseline gap-1">
            <span className="text-sm font-semibold text-slate-450 dark:text-slate-400">
              AUD
            </span>
            <span className="text-5xl font-black text-primary">
              ${prices.premium}
            </span>
            <span className="text-xs text-slate-550 dark:text-slate-400 ml-2">
              All-inclusive
            </span>
          </div>

          <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-200">
            {selectedPart === "screen" ? (
              <>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-white">
                    Soft OLED flexible substrate (highly drop resistant)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Colors & touch responsiveness 90% like original</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Original thin bezels & 120Hz refresh rate</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Full sensor programming supported</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-800 dark:text-white">
                    Original capacity & stable voltage output
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>High-grade imported cells (800+ cycles)</span>
                </li>
              </>
            )}
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span>12-month doorstep warranty</span>
            </li>
            <li className="flex items-center gap-2.5">
              <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>Displays &quot;Unknown Part&quot; warning message</span>
            </li>
          </ul>
        </div>

        <div className="pt-8">
          <div className="max-w-6xl mx-auto py-6 text-center">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-355 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 py-4 px-6 rounded-2xl shadow-sm inline-flex items-center gap-2.5 justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                This price includes the part, labor, and travel fee to your
                place.
              </span>
            </p>
          </div>

          <Link
            href={`${Routes.BOOKING}?model=${selectedModel}&part=${selectedPart}&quality=Premium Quality&price=${prices.premium}`}
            className="w-full block"
          >
            <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-black text-sm shadow-lg shadow-primary/20 transform active:scale-95 transition-transform cursor-pointer">
              Book Premium Repair
            </Button>
          </Link>
        </div>
      </div>

      {/* Tier 3: Genuine Apple */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/10 shadow-sm transition-all duration-300 relative group">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-slate-450 dark:text-slate-500 uppercase">
              GENUINE QUALITY
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Genuine Apple Parts
            </h3>
            <p className="text-xs text-slate-505 dark:text-slate-400">
              Original Apple parts, sourced from new or gently disassembled
              devices. Guaranteed 100% authentic Apple performance.
            </p>
          </div>

          <div className="py-4 border-y border-slate-100 dark:border-white/5 flex items-baseline gap-1">
            <span className="text-sm font-semibold text-slate-455 dark:text-slate-500">
              AUD
            </span>
            <span className="text-5xl font-black text-slate-900 dark:text-white">
              ${prices.genuine}
            </span>
            <span className="text-xs text-slate-500 ml-2">All-inclusive</span>
          </div>

          <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
            {selectedPart === "screen" ? (
              <>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>
                    100% genuine Apple display (perfect brightness & contrast)
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Official sensor synchronization</span>
                </li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Authentic OEM Apple battery cell (max longevity)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>Displays 100% Battery Health percentage natively</span>
                </li>
              </>
            )}
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span>12-month official warranty</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
              <span>100% system integration, no warning messages</span>
            </li>
            <li className="flex items-center gap-2.5">
              <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span className="text-rose-600 dark:text-rose-400 ">
                Premium pricing (most expensive option)
              </span>
            </li>
          </ul>
        </div>

        <div className="pt-8">
          <div className="max-w-6xl mx-auto py-6 text-center">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-355 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 py-4 px-6 rounded-2xl shadow-sm inline-flex items-center gap-2.5 justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="text-sm font-semibold text-slate-800 dark:text-white">
                This price includes the part, labor, and travel fee to your
                place.
              </span>
            </p>
          </div>
          <Link
            href={`${Routes.BOOKING}?model=${selectedModel}&part=${selectedPart}&quality=Genuine Apple&price=${prices.genuine}`}
            className="w-full block"
          >
            <Button className="w-full bg-slate-100 hover:text-primary hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-6 rounded-xl font-bold text-sm transform active:scale-95 transition-transform cursor-pointer">
              Book Genuine Repair
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
