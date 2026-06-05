import {
  ArrowRight,
  Camera,
  Clock,
  Shield,
  ShieldCheck,
  Volume2,
  Wrench,
} from "lucide-react";
import React from "react";

import { ArrowCircleRightIcon } from "@/components/icons";
import Image from "@/components/ui/Image";
import { Routes } from "@/lib/enum/routes";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  price: string;
  duration: string;
  warranty?: string;
  badge?: string;
  borderClass: string;
  description: string;
  icon: React.ComponentType<any> | string;
  link: string;
}

export const QuickServices = () => {
  // 3 Most Popular Services (Screen, Battery, Back Glass)
  const popularServices: ServiceItem[] = [
    {
      id: "screen",
      title: "Screen Replacement",
      price: "$99",
      duration: "20 mins",
      warranty: "12-Month Warranty",
      badge: "Most Popular",
      borderClass:
        "border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5",
      description:
        "Professional replacement for cracked glass, unresponsive touch screens, vertical green lines, bleeding LCD/OLED black spots, or completely dead display panels. Includes True Tone calibration to restore authentic system colors.",
      icon: "/fix_screen_car.png",
      link: `${Routes.PRICING}?part=screen`,
    },
    {
      id: "battery",
      title: "Battery Replacement",
      price: "$89",
      duration: "15 mins",
      warranty: "12-Month Warranty",
      badge: "Essential Care",
      borderClass:
        "border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5",
      description:
        "High-quality battery cell replacement for health status capacity below 80%, rapid drainage, sudden auto-shutdowns at 20-30%, device overheating during charge, or physical swelling that lifts the glass screen.",
      icon: "/battery.png",
      link: `${Routes.PRICING}?part=battery`,
    },
    {
      id: "back-glass",
      title: "Back Glass Replacement",
      price: "$119",
      duration: "45 mins",
      badge: "Popular Fix",
      borderClass:
        "border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5",
      description:
        "Full glass back panel restoration to repair spiderweb cracks, loose falling glass shards, and keep internal electronics protected. Preserves MagSafe and wireless charging coils functioning seamlessly.",
      icon: "/back-glass.png",
      link: `${Routes.PRICING}?part=back-glass`,
    },
  ];

  // 5 Remaining Services (1-row grid layout)
  const otherServices: ServiceItem[] = [
    {
      id: "charging",
      title: "Charging Port Repair",
      price: "$89",
      duration: "20 mins",
      borderClass: "gradient-border-premium",
      description:
        "Fix loose Lightning/USB-C connectors that won't hold cables, require wiggling to charge, or show moisture warning screens.",
      icon: Wrench,
      link: `${Routes.PRICING}?part=charging`,
    },
    {
      id: "camera",
      title: "Camera Repair",
      price: "$79",
      duration: "20 mins",
      borderClass: "gradient-border-premium",
      description:
        "Fix blurry lenses, autofocus failures, cracked protective glass covers, camera sensor dark spots, or shaky image OIS failures.",
      icon: Camera,
      link: `${Routes.PRICING}?part=camera`,
    },
    {
      id: "audio",
      title: "Speaker & Audio Repair",
      price: "$69",
      duration: "25 mins",
      borderClass: "gradient-border-premium",
      description:
        "Fix low or muffled ear speaker volume during phone calls, microphone issues, or crackling static audio sounds.",
      icon: Volume2,
      link: `${Routes.PRICING}?part=audio`,
    },
    {
      id: "housing",
      title: "Housing Replacement",
      price: "$149",
      duration: "60 mins",
      borderClass: "gradient-border-premium",
      description:
        "Replace entire bent metal frames, structural chassis corners with deep scratches/dents, or restore stuck hardware buttons.",
      icon: Shield,
      link: `${Routes.PRICING}?part=housing`,
    },
    // {
    //   id: "software",
    //   title: "Software Repair",
    //   price: "$59",
    //   duration: "30 mins",
    //   borderClass: "gradient-border-premium",
    //   description:
    //     "Solve iOS boot loops, forgotten passcode locks, stuck recovery mode logos, failing system updates, or iTunes errors.",
    //   icon: Cpu,
    //   link: `${Routes.PRICING}?part=software`,
    // },
  ];

  return (
    <section
      id="services"
      className="w-full py-16 sm:py-24 bg-slate-100/30 dark:bg-slate-900/10 relative"
    >
      <div className="absolute top-0 z-0 left-0 w-full h-50 bg-linear-to-b from-primary/80 to-background  ">
        {/* <svg
          className="curve-overlay"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#A9C8E5"
            d="M0,0 L1440,0 L1440,40
               C1080,120 360,120 0,40 Z"
          ></path>
        </svg> */}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-1">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Professional iPhone Services
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Select one of our premium mobile repair services. We fix everything
            on-site at your home or office in Sydney.
          </p>
        </div>

        {/* 1. Popular Services (3-Item Grid) */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularServices.map((service) => {
              return (
                <Link
                  key={service.id}
                  href={service.link}
                  className={`flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer ${service.borderClass}`}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between gap-3 min-h-[28px]">
                      <div className="flex flex-wrap items-center gap-2">
                        {service.warranty && (
                          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[12px] font-bold border border-emerald-500/20">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{service.warranty}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        From{" "}
                        <span className="text-primary text-base font-extrabold">
                          {service.price}
                        </span>
                      </span>
                    </div>

                    {/* Image Placeholder (Set Width/Height for User to Insert Later) */}
                    <div className="w-full h-48 bg-slate-200/40 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-350 dark:border-white/10 flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold italic"></span>
                      <Image
                        src={
                          typeof service.icon === "string" ? service.icon : ""
                        }
                        alt={service.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-center object-cover rounded-2xl"
                      />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        {service.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-655 dark:text-slate-300 text-justify">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Button Action */}
                  <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-white/5">
                    <div className="w-full hover:bg-primary hover:text-white dark:bg-slate-850 dark:hover:bg-primary text-primary hover:dark:text-white dark:border-white/10 hover:border-primary dark:hover:border-primary rounded-xl py-3.5 flex items-center justify-center gap-2 font-extrabold text-sm transition-all duration-300 shadow-sm">
                      <span>Compare Types & Pricing</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2. Other Services (1-Row Grid, Icon/Title/Redirect default, hover slides up description with border-primary and shadow) */}
        <div className="space-y-8 ">
          <div className="flex items-center gap-3">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:via-primary/20" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-slate-450 dark:text-slate-500 text-center px-4">
              Other Essential Repairs
            </h3>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:via-primary/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {otherServices.map((service) => {
              const IconComponent = service.icon;

              return (
                <Link
                  key={service.id}
                  href={service.link}
                  className="relative group overflow-hidden rounded-2xl p-6 border shadow-md border-[#0858c3] dark:border-white/10 bg-white dark:bg-slate-900/60 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 flex flex-col justify-between h-48 cursor-pointer"
                >
                  {/* Default State content */}
                  <div className="space-y-4 flex flex-col items-center text-center justify-center h-full pb-2">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 shadow-inner">
                      <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white leading-tight">
                      {service.title}
                    </h4>
                  </div>

                  {/* Tiny redirect indicator */}
                  <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300">
                    <ArrowCircleRightIcon className="size-8 text-primary" />
                  </div>

                  {/* Hover Slide-up Panel for Description */}
                  <div className="absolute inset-0 bg-white dark:bg-slate-950 p-4 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20 border border-primary rounded-2xl shadow-lg shadow-primary/10">
                    <div className="space-y-2">
                      <h5 className="font-black text-base text-primary">
                        {service.title}
                      </h5>
                      <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed text-justify">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-200/60 dark:border-white/10 pt-2 mt-2">
                      <div className="text-[10px] text-slate-500 font-bold flex flex-col leading-tight">
                        <span>From {service.price}</span>
                        <span>{service.duration}</span>
                      </div>
                      <div className="h-8 px-3 rounded-lg bg-primary hover:bg-primary/95 text-white hover:text-white text-xs font-bold flex items-center gap-1 border border-primary transition-all duration-200 shadow-sm">
                        <span>Learn more</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
