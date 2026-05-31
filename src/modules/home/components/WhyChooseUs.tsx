"use client";

import { TickIcon } from "@/components/icons";
import Image from "@/components/ui/Image";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
}

export const WhyChooseUs = () => {
  const checkItems: ChecklistItem[] = [
    {
      id: "transparency",
      title: "100% On-Site Transparency",
      description:
        "Watch the entire repair process live directly in front of you. No hidden backrooms, no risk of parts swapping, complete peace of mind.",
    },
    {
      id: "convenience",
      title: "Doorstep Convenience",
      description:
        "Our certified technicians drive straight to you. Whether you are at home, the office, or a local café, we bring the shop to your door.",
    },
    {
      id: "warranty",
      title: "12-Month Guarantee",
      description:
        "All our screen and battery replacements are backed by a full 1-year warranty. If any defect arises, we swap it immediately with no hassle.",
    },
    {
      id: "options",
      title: "Flexible Quality Tiers",
      description:
        "Select the replacement part tier that matches your preference and budget, choosing between Standard, Premium, or Genuine Apple parts.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="w-full py-24 px-4 md:px-8 lg:px-16   bg-primary/20"
    >
      <div className="max-w-7xl mx-auto space-y-4 relative">
        {/* Section Header */}
        <div className="text-left w-full">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate">
            Why Choose WeFixiPhone?
          </h2>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* COLUMN 1: Left Premium Primary-Tinted Card (7/12 Width) */}
          <div className="lg:col-span-7 rounded-3xl flex flex-col  gap-10 self-center mr-10">
            <p className="text-base sm:text-lg text-slate-655 dark:text-slate-350 leading-relaxed ">
              We have re-engineered the mobile repair experience in Sydney. By
              combining certified experts, high-grade replacement parts, and
              doorstep convenience, we guarantee absolute peace of mind.
            </p>

            {/* 2x2 Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {checkItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  {/* Glowing custom Checkicon */}
                  <TickIcon className="w-8 h-8 shrink-0" />

                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual bottom footnote badge */}
            <div className="border-t border-slate-200/50 dark:border-white/5 pt-6 flex items-center justify-between text-[14px] font-bold text-slate-450 dark:text-slate-500">
              <span>★ Trusted Sydney Service</span>
              <span>4.9/5 Rating (2,000+ reviews)</span>
            </div>
          </div>

          {/* COLUMN 2: Right Premium Mockup Image Frame (5/12 Width) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-full aspect-[1/1] max-w-[500px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900">
              <Image
                src="/why_choose_us.png"
                alt="WeFixiPhone Mobile On-Site Repair Service"
                width={500}
                height={625}
                className="w-full h-full object-cover"
              />
              {/* Premium Caption Card Overlay (Solid background, no heavy blur calculation) */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-150 dark:border-white/10 space-y-1.5 shadow-lg">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  Premium Sydney Mobile Repair
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-355 font-semibold leading-relaxed">
                  Certified technicians, premium grade parts, and complete
                  transparency at your location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
