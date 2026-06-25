import React from "react";

interface TechComparisonProps {
  modelName: string;
  selectedPart: string;
}

export const TechComparison = ({
  modelName,
  selectedPart,
}: TechComparisonProps) => {
  const comparisonData = {
    screen: [
      {
        feature: "Display Panel Technology",
        standard:
          "Incell LCD (120Hz support, slightly thicker bezels & power usage)",
        premium: "Soft OLED (Flexible substrate, 120Hz, original thin bezels)",
        genuine:
          "Original Apple Service Pack OLED (120Hz, OEM standard, 100% sharp)",
      },
      {
        feature: "Auto-Brightness & Light Sensor",
        standard: "Not supported / May be disabled",
        premium: "Full sensor programming supported",
        genuine: "Official sensor synchronization",
      },
      {
        feature: "Touch Sensitivity & Response",
        standard: "90% (Occasional slight lag)",
        premium: "99% (Smooth, feels like original display)",
        genuine: "100% (Absolute perfection)",
      },
      {
        feature: "Warranty Period",
        standard: "3 Months (Touch functionality warranty)",
        premium: "12 Months (Lines/flicker & touch warranty)",
        genuine: "12 Months (Genuine 1-to-1 replacement)",
      },
      {
        feature: "System Component Message",
        standard: "Displays 'Unknown Part' notification",
        premium: "Displays 'Unknown Part' notification",
        genuine: "No warning message (IC transferred/programmed)",
      },
    ],
    battery: [
      {
        feature: "Battery Capacity",
        standard: "100% Standard Capacity (Third-party)",
        premium: "100% Standard Capacity (High-grade imported cell)",
        genuine: "Original Apple Cell (Authentic Apple cell)",
      },
      {
        feature: "Battery Health Percentage Display",
        standard: "Shows 'Service' / No health percentage",
        premium: "Displays health % (requires cable transfer)",
        genuine: "Displays 100% health, fully supported",
      },
      {
        feature: "Lifespan & Charge Cycles",
        standard: "500 Charge Cycles (Stable performance)",
        premium: "800 Charge Cycles (Highly stable voltage)",
        genuine: "1000+ Charge Cycles (Max longevity)",
      },
      {
        feature: "Warranty Period",
        standard: "3 Months (Replacement for bloating or faults)",
        premium: "12 Months (1-to-1 doorstep warranty)",
        genuine: "12 Months (Genuine part doorstep warranty)",
      },
    ],
  };

  if (selectedPart !== "screen" && selectedPart !== "battery") {
    return null;
  }

  const currentSpecs =
    selectedPart === "screen" ? comparisonData.screen : comparisonData.battery;

  return (
    <div className="max-w-4xl mx-auto pt-12 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Detailed Technical Comparison
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Replacement part specifications for {modelName}
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-md dark:shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950/80 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                <th className="p-4 sm:p-5">Specifications / Features</th>
                <th className="p-4 sm:p-5 text-slate-700 dark:text-slate-300">
                  Standard (Aftermarket)
                </th>
                <th className="p-4 sm:p-5 text-primary">
                  {selectedPart === "screen"
                    ? "Premium (OLED)"
                    : "Premium (Standard Cell)"}
                </th>
                <th className="p-4 sm:p-5 text-slate-700 dark:text-slate-300">
                  Genuine Apple
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-white/5 text-sm">
              {currentSpecs.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-300">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">
                    {row.standard}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-medium">
                    {row.premium}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-200">
                    {row.genuine}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
