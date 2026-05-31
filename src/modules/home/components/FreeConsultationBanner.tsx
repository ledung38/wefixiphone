"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Phone, ArrowRight } from "lucide-react";
import Image from "@/components/ui/Image";
import { Routes } from "@/lib/enum/routes";
import { useRouter } from "next/navigation";

export const FreeConsultationBanner = () => {
  const router = useRouter();

  return (
    <section className="w-full relative min-h-[320px] md:h-[300px] flex items-center bg-slate-950 overflow-hidden border-y border-slate-900">
      {/* Background Image of Luxury iPhones */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <Image
          src="/cta_iphones_wide_banner.png"
          alt="Premium iPhone Models Showcase"
          width={1920}
          height={300}
          quality={100}
          unoptimized
          className="w-full h-full object-cover object-[center_right] md:object-[top_right] opacity-40 md:opacity-100"
        />
        {/* Responsive Overlay for readability */}
        {/* On mobile: solid dark overlay for 100% text legibility */}
        {/* On desktop: smooth horizontal gradient from solid slate-950 to transparent */}
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 relative z-10 py-10 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: CTA Content & Buttons */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="space-y-2">
              <span className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold uppercase tracking-wider border border-amber-500/20">
                Special Offer
              </span>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                Free Consultation & Diagnostic
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-slate-300 max-w-xl">
                Not sure what is wrong with your iPhone? Our mobile technician
                can inspect it at your doorstep completely free of charge.{" "}
                <span className="text-primary font-semibold">
                  No repair, no fee!
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="tel:0451210238" className="w-full sm:w-auto">
                <Button className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold rounded-xl py-3 px-5 flex items-center justify-center gap-2 text-xs transition-transform hover:scale-[1.02] cursor-pointer">
                  <Phone className="w-4 h-4 animate-pulse" />
                  <span>Call 0451 210 238</span>
                </Button>
              </a>
              <Button
                onClick={() => router.push(Routes.BOOKING)}
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 rounded-xl py-3 px-5 text-xs font-bold transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Book Diagnostic Online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Right Side: Spacer for iPhone Showcase Image */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </div>
    </section>
  );
};
