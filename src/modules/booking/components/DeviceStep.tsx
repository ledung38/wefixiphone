import React from "react";
import { Smartphone, Settings, Check, ChevronRight } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { IPHONE_MODELS, BOOKING_PARTS } from "../../pricing/constants/data";

interface DeviceStepProps {
  model: string;
  setModel: (val: string) => void;
  part: string;
  setPart: (val: string) => void;
  quality: string;
  setQuality: (val: string) => void;
  priceEstimate: number;
  onNext: () => void;
}

export const DeviceStep = ({
  model,
  setModel,
  part,
  setPart,
  quality,
  setQuality,
  priceEstimate,
  onNext,
}: DeviceStepProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Select Device & Repair
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Choose your exact iPhone model and the component that needs repair.
        </p>
      </div>

      {/* Model selection */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-primary" />
          1. Choose iPhone Model:
        </label>
        <div className="max-w-md">
          <Select
            value={model}
            onChange={setModel}
            options={IPHONE_MODELS.map((m) => ({
              label: m.name,
              value: m.id,
            }))}
            triggerClassName="!w-full !rounded-xl !h-12 bg-white border border-slate-200 dark:bg-slate-950 dark:border-white/10 text-slate-900 dark:text-white px-4 py-3 flex items-center justify-between"
          />
        </div>
      </div>

      {/* Part selection */}
      <div className="space-y-3 pt-3">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Settings className="w-4 h-4 text-primary" />
          2. Choose Repair Service:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BOOKING_PARTS.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setPart(p.id);
                if (p.id !== "screen" && p.id !== "battery") {
                  setQuality("Premium Quality");
                }
              }}
              className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/5 ${
                part === p.id
                  ? "border-primary bg-primary/10 font-bold text-primary dark:text-white shadow-lg"
                  : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
              }`}
            >
              <span className="text-sm">{p.name.split(" (")[0]}</span>
              {part === p.id && <Check className="w-4 h-4 text-primary" />}
            </div>
          ))}
        </div>
      </div>

      {/* Quality tier selection (visible only for screen or battery replacement) */}
      {(part === "screen" || part === "battery") && (
        <div className="space-y-3 pt-3">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Check className="w-4 h-4 text-primary" />
            3. Choose Component Quality Tier:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["Standard Aftermarket", "Premium Quality", "Genuine Apple"].map(
              (q) => (
                <div
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`cursor-pointer p-4 rounded-xl border text-center transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/5 ${
                    quality === q
                      ? "border-primary bg-primary/10 font-bold text-primary dark:text-white shadow-lg"
                      : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <span className="text-xs sm:text-sm block">{q}</span>
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {/* Estimation box */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-100 dark:bg-slate-950/60 p-4 rounded-xl">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Estimated cost (All-inclusive):
          </span>
          <p className="text-slate-550 dark:text-slate-400 text-xs mt-0.5">
            This price includes the part, labor, and travel fee to your place.
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-primary">
            {part === "other" ? "Free Diagnosis" : `$${priceEstimate} AUD`}
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-5 rounded-xl flex items-center gap-2 cursor-pointer"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
