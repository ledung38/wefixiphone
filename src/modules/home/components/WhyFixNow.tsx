"use client";

import { TextGradient } from "@/components/common/TextGradient";
import Image from "@/components/ui/Image";
import { Camera, Droplet, Smartphone, Wrench, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface WarningIssue {
  id: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "WARNING";
  icon: React.ComponentType<any>;
  symptom: string;
  consequence: string;
  description: string;
  colorClass: string;
  badgeBg: string;
}

export const WhyFixNow = () => {
  const router = useRouter();

  const issues: WarningIssue[] = [
    {
      id: "screen",
      title: "Slight Screen Crack",
      severity: "HIGH",
      icon: Smartphone,
      symptom: "Minor hairline glass crack",
      consequence:
        "Moisture/sweat seeps in ➔ Ruined OLED display panel ($300+)",
      description:
        "Even a tiny crack compromises the structural integrity of your display. Moisture and finger pressure can easily damage the underlying OLED layers, turning a cheap glass fix into an expensive screen replacement.",
      colorClass: "text-rose-500 border-rose-500/20",
      badgeBg:
        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    },
    {
      id: "battery",
      title: "Degraded Battery",
      severity: "CRITICAL",
      icon: Zap,
      symptom: "Rapid drain & battery swelling",
      consequence: "Extreme heat ➔ Swollen battery bends screen & fire hazard",
      description:
        "Degraded battery cells generate high thermal levels. Over time, they swell up, pushing against the display panel causing screen separation or a chemical fire risk if punctured.",
      colorClass: "text-amber-500 border-amber-500/20",
      badgeBg:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    },
    {
      id: "water",
      title: "Water Exposure",
      severity: "CRITICAL",
      icon: Droplet,
      symptom: "Liquid spill / rain drops",
      consequence:
        "Motherboard oxidation ➔ Main board short circuit & data loss",
      description:
        "Water damage works like a slow poison. Corrosion starts within hours. Delaying a clean-up will permanently rust mainboard connectors, resulting in a completely dead phone and lost data.",
      colorClass: "text-blue-500 border-blue-500/20",
      badgeBg:
        "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    },
    {
      id: "camera",
      title: "Cracked Camera Glass",
      severity: "WARNING",
      icon: Camera,
      symptom: "Cracked rear camera glass",
      consequence:
        "Dust enters lens ➔ Permanent camera spots & broken OIS stabilization",
      description:
        "Broken camera protective glass lets microscopic dust settle onto the optical sensor. This ruins autofocus, damages optical image stabilization (rattling noise), and leaves black spots on photos.",
      colorClass: "text-orange-500 border-orange-500/20",
      badgeBg:
        "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
    },
    {
      id: "port",
      title: "Loose Charging Port",
      severity: "WARNING",
      icon: Wrench,
      symptom: "Loose charging port",
      consequence: "Short circuits ➔ Motherboard Power IC burn-out ($250+)",
      description:
        "Using a charger port that only connects at an angle creates rapid electrical arching (sparks). This damages the charging port pins and triggers short circuits that burn the motherboard's main Power IC chip.",
      colorClass: "text-cyan-500 border-cyan-500/20",
      badgeBg:
        "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20",
    },
  ];

  return (
    <section
      id="why-fix-now"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-950 relative"
    >
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Section Header */}
        <div className="text-center w-full">
          <TextGradient className="text-3xl sm:text-4xl font-bold">
            Why Fix Now? The Cost of Delaying Repairs
          </TextGradient>
          <p className="mt-4 text-center mx-auto max-w-4xl">
            Repair your device as soon as you detect a problem to prevent damage
            to internal components, avoid higher repair costs, and extend the
            device&apos;s lifespan. This is especially important in case of
            sudden shutdowns or malfunctions in critical situations.
          </p>
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12  items-start">
          {/* Column 1: Left - Kept phone error warning image (4 Cols) */}
          <div className="lg:col-span-5 flex justify-center sticky top-24">
            <Image
              src={"/phone_error_v2.png"}
              alt="iOS Warning Screen"
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>

          {/* Column 2: Right - Grid of all 5 warning items fully displayed (8 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-2 self-center">
            {issues.map((issue) => {
              const IconComponent = issue.icon;

              return (
                <div key={issue.id} className="  space-y-2 flex py-2">
                  {/* Image Placeholder */}
                  {/* <div className="w-15 aspect-[16/10] bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center text-center p-4">
                    <IconComponent className="w-6 h-6 text-slate-400 dark:text-slate-600 mb-2 animate-pulse" />
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold italic"></span>
                  </div> */}

                  {/* Title & Severity Badge */}
                  <div className="space-y-2 border-l-4 border-primary pl-5">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="font-extrabold text-lg text-primary dark:text-white leading-tight">
                        {issue.title}
                      </h4>
                      <span
                        className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${issue.badgeBg}`}
                      >
                        {issue.severity}
                      </span>
                    </div>

                    {/* Consequence / Pain Point */}
                    <p className="text-[14px] font-semibold text-rose-505 dark:text-rose-400 leading-tight">
                      ➔ {issue.consequence}
                    </p>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-slate-600 dark:text-slate-350 text-justify">
                      {issue.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Concluding Action Banner */}
        {/* <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-8 max-w-3xl mx-auto text-center space-y-6 shadow-sm">
          <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            Don't let small issues become big expenses.
          </h4>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Our Sydney mobile technicians can run a full hardware diagnostics
            test at your doorstep completely free. We quote a flat price and you
            only pay after repair completion.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a href="tel:0433263105" className="w-full sm:w-auto">
              <Button className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold py-5 px-6 rounded-xl flex items-center justify-center gap-2.5 text-sm shadow-lg shadow-primary/20 transform active:scale-95 transition-transform">
                <Phone className="w-4 h-4" />
                Call Now: 0433 263 105
              </Button>
            </a>
            <Button
              onClick={() => router.push(Routes.BOOKING)}
              variant="outline"
              className="w-full sm:w-auto border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 py-5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-primary" />
              Request Free Diagnosis
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
};
