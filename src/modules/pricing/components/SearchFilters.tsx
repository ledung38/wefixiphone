"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";
import { Smartphone, Settings } from "lucide-react";
import { IPHONE_MODELS, PARTS } from "../constants/data";

interface SearchFiltersProps {
  selectedModel: string;
  selectedPart: string;
}

export const SearchFilters = ({
  selectedModel,
  selectedPart,
}: SearchFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSelectionChange = (newModel: string, newPart: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("model", newModel);
      params.set("part", newPart);
      router.replace(`/pricing?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md dark:shadow-2xl relative overflow-hidden">
      {/* Background blur decoration */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
        {/* Dropdown 1: Model Select */}
        <div className="space-y-2 w-full sm:w-[280px]">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            1. Select Your iPhone Model:
          </label>
          <Select
            value={selectedModel}
            onChange={(val) => handleSelectionChange(val, selectedPart)}
            isLoading={isPending}
            options={IPHONE_MODELS.map((model) => ({
              label: model.name,
              value: model.id,
            }))}
            triggerClassName="!w-full !rounded-xl !h-12 bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:border-white/10 text-slate-900 dark:text-white px-4 py-3 flex items-center justify-between"
          />
        </div>

        {/* Dropdown 2: Part Select */}
        <div className="space-y-2 w-full sm:w-[280px]">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            2. Select the Part to Repair:
          </label>
          <Select
            value={selectedPart}
            onChange={(val) => handleSelectionChange(selectedModel, val)}
            isLoading={isPending}
            options={PARTS.map((part) => ({
              label: part.name,
              value: part.id,
            }))}
            triggerClassName="!w-full !rounded-xl !h-12 bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:border-white/10 text-slate-900 dark:text-white px-4 py-3 flex items-center justify-between"
          />
        </div>
      </div>
    </div>
  );
};
