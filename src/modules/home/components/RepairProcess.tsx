"use client";

import React from "react";
import { MapPin, Truck, Eye, CheckCircle } from "lucide-react";
import Image from "@/components/ui/Image";
import { TextGradient } from "@/components/common/TextGradient";
import { CommentStar } from "@/components/icons/home";

interface ProcessStep {
  id: string;
  stepNumber: string;
  cardSubtitle: string;
  title: string;
  description: string;
  visual: React.ReactNode;
}

// Reusable iPhone Frame Mockup in HTML/CSS
const PhoneFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto w-[155px] h-[310px] bg-slate-950 rounded-[30px] border-[5px] border-slate-900 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col select-none">
      {/* Dynamic Island / Notch */}
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-20 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-slate-900/60 ml-auto mr-1.5" />
      </div>

      {/* Screen Content Wrapper */}
      <div className="flex-1 w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-6 pb-3 px-2 relative flex flex-col font-sans overflow-hidden">
        {children}
      </div>

      {/* Home Indicator Bar */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-slate-400 dark:bg-slate-700 rounded-full z-20" />
    </div>
  );
};

export const RepairProcess = () => {
  const steps: ProcessStep[] = [
    {
      id: "step-1",
      stepNumber: "1",
      cardSubtitle: "Describe the Issue",
      title: "Describe the Issue",
      description: "Tell us about your phone's problem through our easy chat.",
      visual: (
        <PhoneFrame>
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-1 mb-2">
            <span className="text-[6px] text-slate-400 font-bold">❮ Back</span>
            <span className="text-[7.5px] font-black text-slate-800 dark:text-white">
              iPhone 13
            </span>
            <span className="text-[7px] text-slate-400 font-bold">●</span>
          </div>

          {/* Messages list */}
          <div className="flex-1 flex flex-col space-y-2 overflow-hidden text-[7px] leading-tight">
            {/* Outgoing Client Msg */}
            <div className="bg-primary text-white p-2 rounded-2xl rounded-tr-none self-end max-w-[85%] font-semibold shadow-sm">
              Screen cracked & battery dead.
            </div>

            {/* Incoming Support Msg */}
            <div className="flex gap-1 items-start">
              <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-800 text-[5px] font-black flex items-center justify-center text-slate-500 dark:text-slate-400">
                W
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-350 p-2 rounded-2xl rounded-tl-none max-w-[80%] font-semibold">
                Got it! Let's schedule a fix.
              </div>
            </div>
          </div>

          {/* Input bar mockup */}
          <div className="mt-2 pt-1 border-t border-slate-100 dark:border-white/5 flex items-center gap-1">
            <div className="flex-1 bg-slate-50 dark:bg-slate-900 rounded-full px-2 py-0.5 text-[6.5px] text-slate-400 border border-slate-200 dark:border-white/5">
              Type a message...
            </div>
            <span className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-white text-[6px]">
              ➔
            </span>
          </div>
        </PhoneFrame>
      ),
    },
    {
      id: "step-2",
      stepNumber: "2",
      cardSubtitle: "Get Instant Quote",
      title: "Get Instant Quote",
      description: "Receive a transparent, fixed price estimate immediately.",
      visual: (
        <PhoneFrame>
          {/* Header */}
          <div className="text-center pb-1.5 border-b border-slate-100 dark:border-white/5 mb-2.5">
            <h5 className="text-[8px] font-black text-slate-800 dark:text-white">
              Repair Estimate
            </h5>
            <span className="text-[6px] font-semibold text-slate-400 dark:text-slate-500 block">
              Phone 13 Screen + Battery
            </span>
          </div>

          {/* Big price box */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-xl p-2.5 text-center space-y-0.5">
            <span className="text-[6.5px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-wider block">
              Estimated Price
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-white tracking-tight block">
              $229.00
            </span>
          </div>

          {/* Price table breakdown */}
          <div className="flex-1 flex flex-col justify-center space-y-1.5 py-1.5 font-mono text-[6.5px]">
            <div className="flex justify-between text-slate-500 dark:text-slate-450 border-b border-dashed border-slate-200/50 dark:border-white/5 pb-0.5">
              <span>Screen</span>
              <span className="font-bold text-slate-800 dark:text-white">
                $149
              </span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-450 border-b border-dashed border-slate-200/50 dark:border-white/5 pb-0.5">
              <span>Battery</span>
              <span className="font-bold text-slate-800 dark:text-white">
                $69
              </span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-450">
              <span>Service Fee</span>
              <span className="font-bold text-slate-800 dark:text-white">
                $11
              </span>
            </div>
          </div>

          {/* Accept Button */}
          <div className="w-full bg-primary text-white text-[7.5px] font-black py-1.5 rounded-lg text-center shadow-md shadow-primary/10">
            Accept Quote
          </div>
        </PhoneFrame>
      ),
    },
    {
      id: "step-3",
      stepNumber: "3",
      cardSubtitle: "Technician On The Way",
      title: "Technician On The Way",
      description: "Track your technician's location and arrival time live.",
      visual: (
        <PhoneFrame>
          {/* Map background grid */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:12px_12px] opacity-75" />

          {/* Route path vector */}
          <svg
            className="absolute inset-0 w-full h-full z-10"
            xmlns="http://www.w3.org/2005/svg"
          >
            <path
              d="M 25,230 Q 60,130 115,75"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          </svg>

          {/* Customer marker pin */}
          <div className="absolute right-4 top-12 z-20 flex flex-col items-center">
            <span className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-1 py-0.5 rounded-[4px] text-[4.5px] font-black uppercase tracking-wider shadow-sm mb-0.5">
              Your Location
            </span>
            <span className="h-4.5 w-4.5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 animate-bounce">
              <MapPin className="w-2.5 h-2.5" />
            </span>
          </div>

          {/* Tech Delivery Van */}
          <div className="absolute left-3 bottom-10 z-20 flex items-center gap-0.5 bg-primary text-white px-1.5 py-0.5 rounded-full shadow-lg shadow-primary/20">
            <Truck className="w-2 h-2" />
            <span className="text-[5.5px] font-black uppercase tracking-wider">
              Van
            </span>
          </div>

          {/* Status overlay bar */}
          <div className="absolute bottom-2 left-1.5 right-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg p-1.5 z-20 shadow-md space-y-0.5">
            <div className="flex justify-between items-center text-[5.5px]">
              <span className="font-extrabold text-slate-400 uppercase">
                Status
              </span>
              <span className="font-bold text-slate-800 dark:text-white">
                10:45 AM
              </span>
            </div>
            <p className="text-[7.5px] font-black text-slate-800 dark:text-white">
              Demi is 12 mins away.
            </p>
          </div>
        </PhoneFrame>
      ),
    },
    {
      id: "step-4",
      stepNumber: "4",
      cardSubtitle: "Watch the Repair",
      title: "Watch the Repair",
      description: "Observe the live repair progress of your device.",
      visual: (
        <div className="relative w-[155px] h-[310px] rounded-[30px] overflow-hidden border-[5px] border-slate-900 dark:border-slate-850 shadow-xl bg-slate-900 select-none">
          <Image
            src="/repair_hands.png"
            alt="Observe Repair Live Process"
            width={180}
            height={320}
            className="w-full h-full object-cover"
          />
          {/* Shade gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 z-10" />

          {/* Progress bar info panel at bottom */}
          <div className="absolute bottom-2.5 left-2 right-2 z-20 bg-slate-950/80 backdrop-blur-sm border border-white/10 rounded-xl p-1.5 space-y-0.5 text-center">
            <span className="text-[7px] font-black uppercase tracking-widest text-primary block">
              Repairing... 78%
            </span>
            <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-primary rounded-full" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "step-5",
      stepNumber: "5",
      cardSubtitle: "Test & Pay",
      title: "Test & Pay",
      description: "Ensure quality with a multi-point test and pay securely.",
      visual: (
        <PhoneFrame>
          {/* Header */}
          <div className="text-center pb-1 border-b border-slate-100 dark:border-white/5 mb-2">
            <h5 className="text-[8px] font-black text-slate-800 dark:text-white">
              Post-Repair Checklist
            </h5>
          </div>

          {/* Item Checklist */}
          <div className="flex-1 flex flex-col justify-center space-y-1 py-0.5 font-semibold text-[6.5px]">
            {[
              { label: "Display Quality", ok: true },
              { label: "Battery Health (100%)", ok: true },
              { label: "Face ID Diagnostic", ok: true },
              { label: "Front Camera Test", ok: true },
              { label: "Rear Camera Focus", ok: true },
              { label: "Speaker Channel Output", ok: true },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-slate-600 dark:text-slate-450 border-b border-slate-100/50 dark:border-white/5 pb-0.5"
              >
                <span>{item.label}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[5.5px]">
                  ✓
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Price Sum & Pay Button */}
          <div className="pt-1.5 border-t border-slate-100 dark:border-white/5 space-y-1.5">
            <div className="flex justify-between items-center text-[7px] font-black">
              <span className="text-slate-400">Total Paid</span>
              <span className="text-slate-800 dark:text-white">$229.00</span>
            </div>
            <div className="w-full bg-emerald-500 text-white text-[7.5px] font-black py-1.5 rounded-lg text-center shadow-md shadow-emerald-500/10">
              Complete Payment
            </div>
          </div>
        </PhoneFrame>
      ),
    },
  ];

  return (
    <section
      id="repair-process"
      className="w-full py-24 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-950 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white truncate"></h2>

          <TextGradient className="text-4xl sm:text-5xl font-black  mb-6 inline-block">
            Simple 5-Step On-Site Repair Process
          </TextGradient>

          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Simple, Transparent, and Hassle-Free Mobile Repair. We charge $0
            call-out fees. You only authorize and release payment after
            verifying all screen & hardware tests are completely functional.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8 items-stretch relative">
          {steps.map((step, idx) => (
            <div key={step.id} className="relative flex flex-col h-full">
              {/* Step circle bubble centered on top border */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-white font-black text-sm flex items-center justify-center border-4 border-white dark:border-slate-950 shadow-md z-20 select-none">
                {step.stepNumber}
              </div>

              {/* Main Card Frame */}
              <div className="relative pt-6 pb-2 rounded-[32px] border-2 border-primary/30 dark:border-primary/20 bg-slate-50/50 dark:bg-slate-900/30 flex flex-col items-center text-center space-y-2 flex-1 hover:shadow-lg hover:shadow-slate-100 dark:hover:shadow-none transition-all duration-300">
                <h4 className="font-extrabold text-xs text-slate-500 dark:text-slate-400 select-none">
                  {step.cardSubtitle}
                </h4>

                {/* Visual mockup slot */}
                <div className="w-full flex justify-center items-center h-[320px]">
                  {step.visual}
                </div>

                {/* Descriptive Copy info */}
                <div className="space-y-1.5">
                  <h3 className="font-black text-base text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Arrow */}
              {idx < steps.length - 1 && (
                <>
                  {/* Desktop Arrow (pointing right) */}
                  <div className="hidden md:flex absolute right-[-20px] lg:right-[-24px] top-1/2 -translate-y-1/2 z-30 text-primary/80 dark:text-primary/60 items-center justify-center select-none pointer-events-none">
                    <span className="text-2xl font-black">➔</span>
                  </div>
                  {/* Mobile Arrow (pointing down) */}
                  <div className="flex md:hidden justify-center items-center h-8 my-1.5 text-primary/80 dark:text-primary/60 select-none pointer-events-none">
                    <span className="text-2xl font-black">⬇</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
