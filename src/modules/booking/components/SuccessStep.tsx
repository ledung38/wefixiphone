import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Routes } from "@/lib/enum/routes";

interface SuccessStepProps {
  bookingId: string;
  selectedModelName: string;
  selectedPartName: string;
  quality: string;
  part: string;
  address: string;
  suburb: string;
  date: string;
  timeString: string;
  priceEstimate: number;
}

export const SuccessStep = ({
  bookingId,
  selectedModelName,
  selectedPartName,
  quality,
  part,
  address,
  suburb,
  date,
  timeString,
  priceEstimate,
}: SuccessStepProps) => {
  return (
    <div className="text-center space-y-6 py-6">
      <div className="h-16 w-16 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center rounded-full mx-auto animate-bounce shadow-inner">
        <CheckCircle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Booking Confirmed!
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
          Your on-site iPhone repair request has been successfully registered. A
          confirmation email with details has been sent to your email.
        </p>
      </div>

      {/* Summary ticket */}
      <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-left max-w-md mx-auto space-y-4 shadow-sm">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 border-b border-slate-200 dark:border-white/5 pb-3">
          <span>BOOKING ID: {bookingId}</span>
          <span className="text-emerald-500 font-extrabold">CONFIRMED</span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Device:</span>
            <span className="font-bold text-slate-800 dark:text-white">
              {selectedModelName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Service:</span>
            <span className="font-bold text-slate-800 dark:text-white">
              {selectedPartName.split(" (")[0]}
            </span>
          </div>
          {(part === "screen" || part === "battery") && (
            <div className="flex justify-between">
              <span className="text-slate-500">Quality:</span>
              <span className="font-bold text-slate-800 dark:text-white">
                {quality}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-500">Address:</span>
            <span className="font-bold text-slate-800 dark:text-white text-right max-w-[200px] truncate">
              {address}, {suburb}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date/Time:</span>
            <span className="font-bold text-slate-800 dark:text-white">
              {date} at {timeString}
            </span>
          </div>
          <div className="flex justify-between border-t border-dashed border-slate-200 dark:border-white/5 pt-3 mt-3">
            <span className="text-slate-800 dark:text-white font-bold">
              Price Estimate:
            </span>
            <span className="text-primary font-black text-base">
              {priceEstimate === 0 ? "Free Diagnosis" : `$${priceEstimate} AUD`}
            </span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
        Our technician will call you 30 minutes before arrival. If you need to
        reschedule, please call us at{" "}
        <a href="tel:0433263105" className="text-primary font-bold">
          0433 263 105
        </a>
        .
      </p>

      <div className="pt-4">
        <Link href={Routes.HOME}>
          <Button className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 mx-auto cursor-pointer">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
