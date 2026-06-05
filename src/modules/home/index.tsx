import Image from "@/components/ui/Image";
import HomeAreas from "@/modules/home/components";
import Testimonials from "@/modules/home/components/Testimonials";
import React from "react";
import { QuickServices } from "./components/QuickServices";
import { FreeConsultationBanner } from "./components/FreeConsultationBanner";
import { RepairProcess } from "./components/RepairProcess";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { WhyFixNow } from "./components/WhyFixNow";
import DIff from "@/modules/home/components/DIff";
import { HeroContent } from "./components/HeroContent";

const Home = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden max-sm:pt-16 lg:py-24 bg-slate-50 dark:bg-slate-950">
        {/* Background Image with overlay gradient */}
        <div className="absolute inset-0 z-0 ">
          <Image
            src="/hero_repair.png"
            quality={100}
            unoptimized
            width={1920}
            height={1080}
            alt="iPhone Repair Technician"
            className="w-full h-full object-cover object-right lg:object-center opacity-85 dark:opacity-75 transition-opacity duration-500"
          />
          <div className="absolute inset-0 lg:w-1/2 left-0 top-0 bottom-0">
            <div className="absolute inset-0 bg-slate-950/70 lg:bg-transparent z-10" />
            <div className="absolute inset-0 hero-gradient-overlay z-10" />
          </div>
        </div>
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
          {/* Left side (48% width): Animated Hero Content */}
          <HeroContent />

          {/* Right side (52% width): Empty space so background image of technician is fully visible */}
          <div className="w-full lg:w-[52%] hidden lg:block" />
        </div>
      </section>

      {/* 2. QUICK SERVICES SECTION */}
      <QuickServices />
      <FreeConsultationBanner />

      {/* 3. BEFORE / AFTER SLIDER SECTION */}
      <DIff />

      {/* 4. WHY FIX NOW SECTION */}
      <WhyFixNow />

      {/* 5. WHY CHOOSE US SECTION */}
      <WhyChooseUs />

      {/* 6. REPAIR PROCESS SECTION */}
      <RepairProcess />

      <Testimonials />
      <HomeAreas />
    </div>
  );
};

export default Home;
