import React from "react";
import { Info } from "lucide-react";

export const ServiceDetails = () => {
  return (
    <div className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-4xl mx-auto flex gap-4 items-start shadow-sm">
      <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
      <div className="space-y-1">
        <h4 className="font-bold text-slate-800 dark:text-slate-200">
          Sydney Mobile On-Site Service Notes:
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Average repair time is only 15-20 minutes on-site. Our mobile
          technician will contact you to confirm the appointment before
          departing. The entire repair is performed directly in front of you for
          complete transparency.
        </p>
      </div>
    </div>
  );
};
