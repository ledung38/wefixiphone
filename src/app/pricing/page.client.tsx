"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LayoutComponents from "@/components/layouts/LayoutComponents";
import { Button } from "@/components/ui/Button";
import {
  Check,
  X,
  ShieldCheck,
  Smartphone,
  Settings,
  Info,
  Clock,
} from "lucide-react";
import { Routes } from "@/lib/enum/routes";
import { Select } from "@/components/ui";
import { TextGradient } from "@/components/common/TextGradient";
import { REPAIR_PRICES } from "@/lib/data/repairPrices";

// Define pricing pricing data
const IPHONE_MODELS = [
  { id: "iphone-x", name: "iPhone X", baseScreen: 99, baseBattery: 79, gen: 1 },
  {
    id: "iphone-xr",
    name: "iPhone XR",
    baseScreen: 99,
    baseBattery: 79,
    gen: 1,
  },
  {
    id: "iphone-xs",
    name: "iPhone XS",
    baseScreen: 109,
    baseBattery: 79,
    gen: 1,
  },
  {
    id: "iphone-xs-max",
    name: "iPhone XS Max",
    baseScreen: 119,
    baseBattery: 89,
    gen: 1,
  },
  {
    id: "iphone-11",
    name: "iPhone 11",
    baseScreen: 99,
    baseBattery: 89,
    gen: 2,
  },
  {
    id: "iphone-11-pro",
    name: "iPhone 11 Pro",
    baseScreen: 119,
    baseBattery: 99,
    gen: 2,
  },
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    baseScreen: 139,
    baseBattery: 109,
    gen: 2,
  },
  {
    id: "iphone-12",
    name: "iPhone 12",
    baseScreen: 129,
    baseBattery: 99,
    gen: 3,
  },
  {
    id: "iphone-12-pro",
    name: "iPhone 12 Pro",
    baseScreen: 149,
    baseBattery: 109,
    gen: 3,
  },
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    baseScreen: 169,
    baseBattery: 119,
    gen: 3,
  },
  {
    id: "iphone-13",
    name: "iPhone 13",
    baseScreen: 149,
    baseBattery: 109,
    gen: 4,
  },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    baseScreen: 169,
    baseBattery: 119,
    gen: 4,
  },
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    baseScreen: 189,
    baseBattery: 129,
    gen: 4,
  },
  {
    id: "iphone-14",
    name: "iPhone 14",
    baseScreen: 179,
    baseBattery: 129,
    gen: 5,
  },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    baseScreen: 199,
    baseBattery: 139,
    gen: 5,
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    baseScreen: 219,
    baseBattery: 149,
    gen: 5,
  },
  {
    id: "iphone-15",
    name: "iPhone 15",
    baseScreen: 220,
    baseBattery: 149,
    gen: 6,
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    baseScreen: 250,
    baseBattery: 159,
    gen: 6,
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    baseScreen: 290,
    baseBattery: 169,
    gen: 6,
  },
  {
    id: "iphone-16",
    name: "iPhone 16",
    baseScreen: 260,
    baseBattery: 159,
    gen: 7,
  },
  {
    id: "iphone-16-pro",
    name: "iPhone 16 Pro",
    baseScreen: 290,
    baseBattery: 169,
    gen: 7,
  },
  {
    id: "iphone-16-pro-max",
    name: "iPhone 16 Pro Max",
    baseScreen: 330,
    baseBattery: 179,
    gen: 7,
  },
  {
    id: "iphone-17",
    name: "iPhone 17",
    baseScreen: 290,
    baseBattery: 169,
    gen: 8,
  },
  {
    id: "iphone-17-pro",
    name: "iPhone 17 Pro",
    baseScreen: 340,
    baseBattery: 179,
    gen: 8,
  },
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    baseScreen: 390,
    baseBattery: 189,
    gen: 8,
  },
];

const PARTS = [
  { id: "screen", name: "Screen Replacement" },
  { id: "battery", name: "Battery Replacement" },
  { id: "back-glass", name: "Back Glass Replacement" },
  { id: "charging", name: "Charging Port Repair" },
  { id: "camera", name: "Camera Repair" },
  { id: "audio", name: "Speaker & Audio Repair" },
  { id: "housing", name: "Housing Replacement" },
  // { id: "software", name: "Software Repair" },
];

const SERVICE_DETAILS: Record<
  string,
  {
    title: string;
    duration: string;
    warranty: string;
    description: string;
    benefits: string[];
  }
> = {
  "back-glass": {
    title: "Back Glass Replacement",
    duration: "45 mins",
    warranty: "12-Month Warranty",
    description:
      "Full glass back panel restoration to repair spiderweb cracks, loose falling glass shards, and keep internal electronics protected. Preserves MagSafe and wireless charging coils functioning seamlessly.",
    benefits: [
      "OEM-grade high-durability rear glass",
      "MagSafe & Wireless charging fully preserved",
      "Laser-precision fitting for dust/water seal",
      "Completed on-site in under 45 minutes",
    ],
  },
  charging: {
    title: "Charging Port Repair",
    duration: "20 mins",
    warranty: "12-Month Warranty",
    description:
      "Professional repair or replacement of the Lightning/USB-C charging dock assembly. Resolves issues with loose connections, failing to charge, or lack of computer synchronization.",
    benefits: [
      "Brand new premium charging port assembly",
      "Cleans and restores microphone & speaker contacts",
      "Full fast charging and data sync restored",
      "No more wiggling cables to charge",
    ],
  },
  camera: {
    title: "Camera Repair",
    duration: "20 mins",
    warranty: "12-Month Warranty",
    description:
      "Restores broken rear camera sensors, blurry focus, cracked external lens glass, or camera app shaking/black screen bugs. Uses original-spec replacement camera modules.",
    benefits: [
      "Crisp image focus and optical stabilization (OIS) restored",
      "Dust-free chamber cleaning during installation",
      "Cracked protective glass lens replaced",
      "Tested on-site for all zoom and portrait modes",
    ],
  },
  audio: {
    title: "Speaker & Audio Repair",
    duration: "25 mins",
    warranty: "12-Month Warranty",
    description:
      "Resolves low volume, muffled sound, crackling speaker noises, or failure of the microphone during calls. Restores crisp stereo sound.",
    benefits: [
      "New internal ear speaker or loud speaker module",
      "Mesh dust filter cleaning and replacement",
      "Clear voice call transmission restored",
      "Stereo audio output fully tested",
    ],
  },
  housing: {
    title: "Housing Replacement",
    duration: "60 mins",
    warranty: "12-Month Warranty",
    description:
      "Complete replacement of the iPhone outer aluminum/titanium frame chassis. Best for severely bent frames, deep structural dents, or damaged buttons.",
    benefits: [
      "Full premium metal body shell replacement",
      "Restores bent structures to prevent display pressure",
      "New volume, power, and mute buttons if needed",
      "Restores phone appearance to like-new condition",
    ],
  },
  // software: {
  //   title: "Software Repair",
  //   duration: "30 mins",
  //   warranty: "30-Day Warranty",
  //   description:
  //     "Troubleshooting for bootloops, stuck at Apple logo, recovery mode errors, forgotten passcodes, or failing system updates. Restores operating system stability.",
  //   benefits: [
  //     "iOS operating system flashing & update optimization",
  //     "Data preservation and recovery attempt included",
  //     "Resolves boot loop error codes (Error 9, 14, 4013)",
  //     "System security and performance tuning",
  //   ],
  // },
};

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Selected state
  const [selectedModel, setSelectedModel] = useState("iphone-16-pro-max");
  const [selectedPart, setSelectedPart] = useState("screen");

  // Read URL query parameters on load
  useEffect(() => {
    const partQuery = searchParams.get("part");
    const modelQuery = searchParams.get("model");
    if (partQuery && PARTS.find((p) => p.id === partQuery)) {
      setSelectedPart(partQuery);
    }
    if (modelQuery && IPHONE_MODELS.find((m) => m.id === modelQuery)) {
      setSelectedModel(modelQuery);
    }
  }, [searchParams]);

  // Find active data
  const modelData =
    IPHONE_MODELS.find((m) => m.id === selectedModel) || IPHONE_MODELS[0];

  // Calculate price based on quality tiers
  const getPrices = () => {
    const prices = REPAIR_PRICES[selectedModel] || REPAIR_PRICES["iphone-x"];
    if (selectedPart === "screen") {
      return {
        standard: prices.screenStandard,
        premium: prices.screenPremium,
        genuine: prices.screenGenuine,
      };
    } else {
      return {
        standard: prices.batteryStandard,
        premium: prices.batteryPremium,
        genuine: prices.batteryGenuine,
      };
    }
  };

  const getSingleServicePrice = () => {
    const prices = REPAIR_PRICES[selectedModel] || REPAIR_PRICES["iphone-x"];
    switch (selectedPart) {
      case "back-glass":
        return prices.backGlass;
      case "charging":
        return prices.chargingPort;
      case "camera":
        return prices.camera;
      case "audio":
        return prices.audio;
      case "housing":
        return prices.housing;
      case "software":
        return prices.software;
      default:
        return 99;
    }
  };

  const prices = getPrices();

  // Specifications comparison data
  const comparisonData = {
    screen: [
      {
        feature: "Display Panel Technology",
        standard: "LCD / IPS (Decent colors, thicker bezels)",
        premium: "High-Contrast OLED (Vibrant colors, thin bezels)",
        genuine: "Original Apple OLED (OEM standard, 100% sharp)",
      },
      {
        feature: "True Tone & Touch Feedback",
        standard: "Not supported / May be disabled",
        premium: "Full True Tone programming supported",
        genuine: "Official True Tone synchronization",
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
        meaning: "Approx. 1.5 years of use",
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

  const currentSpecs =
    selectedPart === "screen" ? comparisonData.screen : comparisonData.battery;

  const handleBook = (tier: string, price: number) => {
    router.push(
      `${Routes.BOOKING}?model=${selectedModel}&part=${selectedPart}&quality=${tier}&price=${price}`,
    );
  };

  return (
    <LayoutComponents fullWidth>
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header text */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <TextGradient
              as="h1"
              className="text-4xl sm:text-5xl font-black tracking-tight leading-tight"
            >
              Transparent Pricing
            </TextGradient>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
              Our all-inclusive pricing covers replacement parts, local
              technician travel costs, and professional on-site installation. No
              hidden fees, guaranteed.
            </p>
          </div>

          {/* Calculator Section */}
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
                  onChange={setSelectedModel}
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
                  onChange={setSelectedPart}
                  options={PARTS.map((part) => ({
                    label: part.name,
                    value: part.id,
                  }))}
                  triggerClassName="!w-full !rounded-xl !h-12 bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:border-white/10 text-slate-900 dark:text-white px-4 py-3 flex items-center justify-between"
                />
              </div>
            </div>
          </div>
          {/* Pricing cards grid & Table or Single Service Layout */}
          {selectedPart === "screen" || selectedPart === "battery" ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6">
                {/* Tier 1: Aftermarket */}
                <div className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/10 shadow-sm transition-all duration-300 relative group">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                        BUDGET FRIENDLY
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        Standard (Aftermarket)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Budget-friendly option using high-quality Grade-A
                        third-party parts, fully warranted.
                      </p>
                    </div>

                    <div className="py-4 border-y border-slate-100 dark:border-white/5 flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                        AUD
                      </span>
                      <span className="text-5xl font-black text-slate-900 dark:text-white">
                        ${prices.standard}
                      </span>
                      <span className="text-xs text-slate-455 dark:text-slate-500 ml-2">
                        All-inclusive
                      </span>
                    </div>

                    <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                      <li className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                        <span>Maximize your savings</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span>3-month repair warranty only</span>
                      </li>
                      {selectedPart === "screen" ? (
                        <>
                          <li className="flex items-center gap-2.5">
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>
                              Average colors & display brightness (LCD/IPS)
                            </span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>True Tone not supported</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>
                              Displays &quot;Unknown Part&quot; warning message
                            </span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center gap-2.5">
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>Standard capacity (third-party cell)</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>No Battery Health percentage display</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            <span>
                              Displays &quot;Unknown Part&quot; warning message
                            </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <div className="max-w-6xl mx-auto py-6 text-center">
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 py-4 px-6 rounded-2xl shadow-sm inline-flex items-center gap-2.5 justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">
                          This price includes the part, labor, and travel fee to
                          your place.
                        </span>
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        handleBook("Standard Aftermarket", prices.standard)
                      }
                      className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-6 rounded-xl font-bold text-sm transform active:scale-95 transition-transform"
                    >
                      Book Standard Repair
                    </Button>
                  </div>
                </div>

                {/* Tier 2: Premium (RECOMMENDED) */}
                <div className="rounded-3xl border-2 border-primary bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xl shadow-primary/5 dark:shadow-primary/10 relative group transform lg:-translate-y-2">
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg">
                    RECOMMENDED (POPULAR)
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                        99% ORIGINAL PERFORMANCE
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        {selectedPart === "screen"
                          ? "Premium OLED"
                          : "Premium Battery"}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        {selectedPart === "screen"
                          ? "Top-tier parts manufactured to original specifications. Perfect touch responsiveness, vibrant colors, and durability."
                          : "High-quality battery replacements featuring original capacity cells and stable power management."}
                      </p>
                    </div>

                    <div className="py-4 border-y border-slate-100 dark:border-white/10 flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-slate-450 dark:text-slate-400">
                        AUD
                      </span>
                      <span className="text-5xl font-black text-primary">
                        ${prices.premium}
                      </span>
                      <span className="text-xs text-slate-550 dark:text-slate-400 ml-2">
                        All-inclusive
                      </span>
                    </div>

                    <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-200">
                      {selectedPart === "screen" ? (
                        <>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span className="font-semibold text-slate-800 dark:text-white">
                              Colors & touch responsiveness 99% like original
                            </span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span>Full True Tone programming supported</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span className="font-semibold text-slate-800 dark:text-white">
                              Original capacity & stable voltage output
                            </span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span>High-grade imported cells (800+ cycles)</span>
                          </li>
                        </>
                      )}
                      <li className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                        <span>12-month doorstep warranty</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span>
                          Displays &quot;Unknown Part&quot; warning message
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-8">
                    <div className="max-w-6xl mx-auto py-6 text-center">
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 py-4 px-6 rounded-2xl shadow-sm inline-flex items-center gap-2.5 justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">
                          This price includes the part, labor, and travel fee to
                          your place.
                        </span>
                      </p>
                    </div>

                    <Button
                      onClick={() =>
                        handleBook("Premium Quality", prices.premium)
                      }
                      className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-black text-sm shadow-lg shadow-primary/20 transform active:scale-95 transition-transform"
                    >
                      Book Premium Repair
                    </Button>
                  </div>
                </div>

                {/* Tier 3: Genuine Apple */}
                <div className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/10 shadow-sm transition-all duration-300 relative group">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold tracking-widest text-slate-450 dark:text-slate-500 uppercase">
                        GENUINE QUALITY
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        Genuine Apple Parts
                      </h3>
                      <p className="text-xs text-slate-505 dark:text-slate-400">
                        Original Apple parts, sourced from new or gently
                        disassembled devices. Guaranteed 100% authentic Apple
                        performance.
                      </p>
                    </div>

                    <div className="py-4 border-y border-slate-100 dark:border-white/5 flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-slate-455 dark:text-slate-500">
                        AUD
                      </span>
                      <span className="text-5xl font-black text-slate-900 dark:text-white">
                        ${prices.genuine}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        All-inclusive
                      </span>
                    </div>

                    <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                      {selectedPart === "screen" ? (
                        <>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span>
                              100% genuine Apple display (perfect brightness &
                              contrast)
                            </span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span>Official True Tone synchronization</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span>
                              Authentic OEM Apple battery cell (max longevity)
                            </span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                            <span>
                              Displays 100% Battery Health percentage natively
                            </span>
                          </li>
                        </>
                      )}
                      <li className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                        <span>12-month official warranty</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                        <span>
                          100% system integration, no warning messages
                        </span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span className="text-rose-600 dark:text-rose-400 ">
                          Premium pricing (most expensive option)
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-8">
                    <div className="max-w-6xl mx-auto py-6 text-center">
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 py-4 px-6 rounded-2xl shadow-sm inline-flex items-center gap-2.5 justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <span className="text-sm font-semibold text-slate-800 dark:text-white">
                          This price includes the part, labor, and travel fee to
                          your place.
                        </span>
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        handleBook("Genuine Apple", prices.genuine)
                      }
                      className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-6 rounded-xl font-bold text-sm transform active:scale-95 transition-transform"
                    >
                      Book Genuine Repair
                    </Button>
                  </div>
                </div>
              </div>

              {/* Technical Specs Comparison Table */}
              <div className="max-w-4xl mx-auto pt-12 space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Detailed Technical Comparison
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    Replacement part specifications for {modelData.name}
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-md dark:shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-950/80 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                          <th className="p-4 sm:p-5">
                            Specifications / Features
                          </th>
                          <th className="p-4 sm:p-5 text-slate-700 dark:text-slate-300">
                            Standard (Aftermarket)
                          </th>
                          <th className="p-4 sm:p-5 text-primary">
                            Premium (OLED)
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
            </>
          ) : (
            SERVICE_DETAILS[selectedPart] && (
              <div className="max-w-4xl mx-auto pt-6">
                <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-md dark:shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-stretch">
                  {/* Background blur decoration */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Left column: details (65% width) */}
                  <div className="flex-1 space-y-6 text-left relative z-10">
                    <div className="space-y-3">
                      <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20">
                        Professional Repair
                      </span>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                        {SERVICE_DETAILS[selectedPart].title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {SERVICE_DETAILS[selectedPart].description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>
                          Duration: {SERVICE_DETAILS[selectedPart].duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>
                          Warranty: {SERVICE_DETAILS[selectedPart].warranty}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        What is included:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                        {SERVICE_DETAILS[selectedPart].benefits.map(
                          (benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Right column: price and button (35% width) */}
                  <div className="w-full md:w-72 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/50 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between items-center text-center space-y-6 relative z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-widest text-slate-450 dark:text-slate-500 uppercase">
                        ESTIMATED PRICE
                      </span>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm font-semibold text-slate-450">
                          AUD
                        </span>
                        <span className="text-5xl font-black text-primary">
                          ${getSingleServicePrice()}
                        </span>
                      </div>
                      <span className="text-xs text-slate-450 dark:text-slate-500 block">
                        All-inclusive doorstep price
                      </span>
                      <div className="pt-4 border-t border-slate-150 dark:border-white/5">
                        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-3.5 py-2 rounded-xl border border-emerald-500/20">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                          <span>
                            This price includes the part, labor, and travel fee
                            to your place.
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() =>
                        handleBook(
                          SERVICE_DETAILS[selectedPart].title,
                          getSingleServicePrice(),
                        )
                      }
                      className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-xl font-black text-sm shadow-lg shadow-primary/20 transform active:scale-95 transition-transform"
                    >
                      Book This Repair
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}

          {/* General Information Callout */}
          <div className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-4xl mx-auto flex gap-4 items-start shadow-sm">
            <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">
                Sydney Mobile On-Site Service Notes:
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Average repair time is only 15-20 minutes on-site. Our mobile
                technician will contact you to confirm the appointment before
                departing. The entire repair is performed directly in front of
                you for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponents>
  );
}

export default function PricingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
          Loading pricing...
        </div>
      }
    >
      <PricingContent />
    </React.Suspense>
  );
}
