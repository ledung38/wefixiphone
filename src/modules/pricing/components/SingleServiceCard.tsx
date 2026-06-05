import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/lib/enum/routes";
import { ServiceDetail } from "../constants/data";

interface SingleServiceCardProps {
  selectedModel: string;
  selectedPart: string;
  price: number;
  modelName: string;
  serviceDetails: ServiceDetail;
}

export const SingleServiceCard = ({
  selectedModel,
  selectedPart,
  price,
  modelName,
  serviceDetails,
}: SingleServiceCardProps) => {
  return (
    <div className="max-w-3xl mx-auto pt-6">
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-8 hover:border-primary/50 shadow-md dark:shadow-2xl transition-all duration-300 relative group overflow-hidden">
        {/* Background blur decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex-1 space-y-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                PREMIUM REPAIR
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-550 dark:text-slate-400 font-semibold">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>{serviceDetails.duration}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span>{serviceDetails.warranty}</span>
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">
              {serviceDetails.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed text-justify">
              {serviceDetails.description}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              What is included:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
              {serviceDetails.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sm:w-[220px] flex flex-col justify-between items-center sm:items-stretch border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-white/10 pt-6 sm:pt-0 sm:pl-8 text-center sm:text-left relative z-10 shrink-0">
          <div className="space-y-1 py-4">
            <span className="text-[10px] font-black tracking-widest text-slate-400 dark:text-slate-550 uppercase">
              All-inclusive Estimate
            </span>
            <div className="flex items-baseline justify-center sm:justify-start gap-1">
              <span className="text-sm font-semibold text-slate-455 dark:text-slate-550">
                AUD
              </span>
              <span className="text-5xl font-black text-primary">${price}</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight pt-1">
              Includes premium part, labor, travel fee, and 12-month warranty.
            </p>
          </div>

          <Link
            href={`${Routes.BOOKING}?model=${selectedModel}&part=${selectedPart}&price=${price}`}
            className="w-full"
          >
            <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 sm:py-5 rounded-xl font-black text-sm shadow-lg shadow-primary/20 transform active:scale-95 transition-transform cursor-pointer">
              Book This Repair
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
