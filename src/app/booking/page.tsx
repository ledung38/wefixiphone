"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LayoutComponents from "@/components/layouts/LayoutComponents";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Smartphone,
  Settings,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  CheckCircle,
  Truck,
  Building,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Routes } from "@/lib/enum/routes";

// Models list matching pricing
const IPHONE_MODELS = [
  {
    id: "iphone-8-plus",
    name: "iPhone 8 Plus",
    baseScreen: 89,
    baseBattery: 69,
    gen: 0,
  },
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
  { id: "software", name: "Software Repair" },
];

const BOOKING_PARTS = [
  { id: "screen", name: "Screen Replacement" },
  { id: "battery", name: "Battery Replacement" },
  { id: "back-glass", name: "Back Glass Replacement" },
  { id: "charging", name: "Charging Port Repair" },
  { id: "rear-camera", name: "Rear Camera Issue" },
  { id: "camera-lens", name: "Rear Camera Lens Replacement" },
  { id: "front-camera", name: "Front Camera Issue" },
  { id: "audio", name: "Speaker & Audio Repair" },
  { id: "housing", name: "Housing Replacement" },
  { id: "software", name: "Software Repair" },
];

const TIME_SLOTS = [
  { id: "slot-1", name: "Morning: 09:00 - 12:00" },
  { id: "slot-2", name: "Afternoon: 12:00 - 16:00" },
  { id: "slot-3", name: "Evening: 16:00 - 20:00" },
];

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Booking wizard steps: 1 = Device, 2 = Service Details, 3 = Personal Info, 4 = Success
  const [step, setStep] = useState(1);

  // Form states
  const [model, setModel] = useState("iphone-13");
  const [part, setPart] = useState("screen");
  const [quality, setQuality] = useState("Premium Quality");
  const [serviceType, setServiceType] = useState("on-site"); // on-site vs drop-off
  const [suburb, setSuburb] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("slot-2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [priceEstimate, setPriceEstimate] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Parse URL query parameters on mount
  useEffect(() => {
    const modelParam = searchParams.get("model");
    const partParam = searchParams.get("part");
    const qualityParam = searchParams.get("quality");
    const priceParam = searchParams.get("price");

    if (modelParam && IPHONE_MODELS.find((m) => m.id === modelParam)) {
      setModel(modelParam);
    }
    if (partParam) {
      const mappedPart = partParam === "camera" ? "rear-camera" : partParam;
      if (BOOKING_PARTS.find((p) => p.id === mappedPart)) {
        setPart(mappedPart);
      }
    }
    if (qualityParam) {
      setQuality(qualityParam);
    }
    if (priceParam) {
      setPriceEstimate(parseInt(priceParam));
    }
  }, [searchParams]);

  // Recalculate price dynamically when model/part/quality changes (if not explicitly set by query)
  useEffect(() => {
    const modelData =
      IPHONE_MODELS.find((m) => m.id === model) || IPHONE_MODELS[0];

    const gen = modelData.gen || 0;
    const isPro = model.includes("pro") || model.includes("max");

    // Custom calculations for parts
    if (part === "screen") {
      let multiplier = 1.45; // default premium
      if (quality.includes("Standard")) multiplier = 1.0;
      if (quality.includes("Genuine")) multiplier = 2.1;
      setPriceEstimate(Math.round(modelData.baseScreen * multiplier));
    } else if (part === "battery") {
      let multiplier = 1.3; // default premium
      if (quality.includes("Standard")) multiplier = 1.0;
      if (quality.includes("Genuine")) multiplier = 1.8;
      setPriceEstimate(Math.round(modelData.baseBattery * multiplier));
    } else if (part === "back-glass") {
      setPriceEstimate(119 + gen * 20 + (isPro ? 20 : 0));
    } else if (part === "charging") {
      setPriceEstimate(89 + gen * 10);
    } else if (part === "rear-camera") {
      setPriceEstimate(79 + gen * 15 + (isPro ? 25 : 0));
    } else if (part === "camera-lens") {
      setPriceEstimate(59 + gen * 10);
    } else if (part === "front-camera") {
      setPriceEstimate(69 + gen * 10);
    } else if (part === "audio") {
      setPriceEstimate(69 + gen * 10);
    } else if (part === "housing") {
      setPriceEstimate(149 + gen * 30 + (isPro ? 30 : 0));
    } else if (part === "software") {
      setPriceEstimate(59);
    }
  }, [model, part, quality]);

  // Validation function
  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 2) {
      if (!suburb.trim()) newErrors.suburb = "Please enter a Sydney Suburb";
      if (!address.trim())
        newErrors.address = "Please enter a specific address";
      if (!date) newErrors.date = "Please select a repair date";

      if (!name.trim()) newErrors.name = "Please enter your full name";
      if (!phone.trim()) newErrors.phone = "Please enter your phone number";
      else if (!/^\d{8,12}$/.test(phone.replace(/\s+/g, ""))) {
        newErrors.phone = "Invalid phone number (8 - 12 digits)";
      }
      if (!email.trim()) newErrors.email = "Please enter your email address";
      else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Invalid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  const selectedModelName =
    IPHONE_MODELS.find((m) => m.id === model)?.name || model;
  const selectedPartName =
    BOOKING_PARTS.find((p) => p.id === part)?.name || part;

  return (
    <LayoutComponents fullWidth>
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          {/* Wizard step indicator */}
          {step <= 3 && (
            <div className="mb-12">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {/* Step 1 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 1
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {step > 1 ? <Check className="w-4 h-4 text-white" /> : "1"}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 1 ? "text-primary" : "text-slate-450 dark:text-slate-500"}`}
                  >
                    Device
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${step >= 2 ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"}`}
                />

                {/* Step 2 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 2
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {step > 2 ? <Check className="w-4 h-4 text-white" /> : "2"}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 2 ? "text-primary" : "text-slate-450 dark:text-slate-500"}`}
                  >
                    Confirm
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${step >= 3 ? "bg-primary" : "bg-slate-200 dark:bg-slate-800"}`}
                />

                {/* Step 3 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 3
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {step >= 3 ? <Check className="w-4 h-4 text-white" /> : "3"}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 3 ? "text-primary" : "text-slate-450 dark:text-slate-500"}`}
                  >
                    Complete
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Content container */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-900 dark:text-white">
            {/* Step 1: Device and Repair Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    Select Device & Repair
                  </h2>
                  <p className="text-sm text-slate-550 dark:text-slate-400">
                    Choose your exact iPhone model and the component that needs
                    repair.
                  </p>
                </div>

                {/* Model selection */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    1. Choose iPhone Model:
                  </label>
                  <div className="max-w-md">
                    <Select
                      value={model}
                      onChange={setModel}
                      options={IPHONE_MODELS.map((m) => ({
                        label: m.name,
                        value: m.id,
                      }))}
                      triggerClassName="!w-full !rounded-xl !h-12 bg-white border border-slate-200 dark:bg-slate-950 dark:border-white/10 text-slate-900 dark:text-white px-4 py-3 flex items-center justify-between"
                    />
                  </div>
                </div>

                {/* Part selection */}
                <div className="space-y-3 pt-3">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    2. Choose Repair Service:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BOOKING_PARTS.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setPart(p.id);
                          if (p.id !== "screen" && p.id !== "battery") {
                            setQuality("Premium Quality"); // reset quality if not battery/screen
                          }
                        }}
                        className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/5 ${
                          part === p.id
                            ? "border-primary bg-primary/10 font-bold text-primary dark:text-white shadow-lg"
                            : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <span className="text-sm">{p.name.split(" (")[0]}</span>
                        {part === p.id && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality tier selection (visible only for screen or battery replacement) */}
                {(part === "screen" || part === "battery") && (
                  <div className="space-y-3 pt-3">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      3. Choose Component Quality Tier:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        "Standard Aftermarket",
                        "Premium Quality",
                        "Genuine Apple",
                      ].map((q) => (
                        <div
                          key={q}
                          onClick={() => setQuality(q)}
                          className={`cursor-pointer p-4 rounded-xl border text-center transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/5 ${
                            quality === q
                              ? "border-primary bg-primary/10 font-bold text-primary dark:text-white shadow-lg"
                              : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          <span className="text-xs sm:text-sm block">{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimation box */}
                <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-100 dark:bg-slate-950/60 p-4 rounded-xl">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Estimated cost (All-inclusive):
                    </span>
                    <p className="text-slate-550 dark:text-slate-400 text-xs mt-0.5">
                      Includes mobile doorstep service fee
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-primary">
                      ${priceEstimate} AUD
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-5 rounded-xl flex items-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Location, Timing, and Contact Info */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Contact Information */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      1. Contact Information
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Please enter your contact details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., John Doe"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary text-sm transition-colors duration-200"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Phone Number:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 0451 210 238"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary text-sm transition-colors duration-200"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Email Address:
                    </label>
                    <input
                      type="email"
                      placeholder="e.g., john.doe@example.com"
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary text-sm transition-colors duration-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <hr className="border-slate-200 dark:border-white/5" />

                {/* 2. Service Method & Address */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      2. Service Location & Schedule
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Our doorstep technician repairs the device live at your
                      location.
                    </p>
                  </div>

                  {/* Service Method Badge */}
                  <div className="p-4 rounded-xl border border-primary bg-primary/10 text-slate-900 dark:text-white flex gap-4 items-center">
                    <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs">
                        Doorstep Service (Mobile)
                      </h4>
                      <p className="text-[11px] text-slate-550 dark:text-slate-400">
                        Technician drives to you in Sydney and repairs on-site.
                      </p>
                    </div>
                  </div>

                  {/* Address fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Sydney Suburb:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Chatswood, CBD..."
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary text-sm transition-colors duration-200"
                        value={suburb}
                        onChange={(e) => setSuburb(e.target.value)}
                      />
                      {errors.suburb && (
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />{" "}
                          {errors.suburb}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Street Address (Street name, unit/house number):
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., 12/345 George St"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary text-sm transition-colors duration-200"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && (
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />{" "}
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Timing selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        Choose Repair Date:
                      </label>
                      <input
                        type="date"
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary text-sm transition-colors duration-200"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors.date && (
                        <p className="text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.date}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Choose Time Slot:
                      </label>
                      <div className="relative">
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary cursor-pointer appearance-none text-sm transition-colors duration-200"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option
                              key={slot.id}
                              value={slot.id}
                              className="text-slate-900 dark:text-white dark:bg-slate-950"
                            >
                              {slot.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-200 dark:border-white/5" />

                {/* 3. Notes & Summary */}
                <div className="space-y-4">
                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Additional Notes (Device color, symptoms):
                    </label>
                    <textarea
                      placeholder="e.g., Gold color, screen has green line. Security access required..."
                      rows={3}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary text-sm transition-colors duration-200"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  {/* Summary bill */}
                  <div className="p-5 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-white/5 space-y-3.5 text-sm">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-white/5 pb-2">
                      Booking Summary:
                    </h4>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Customer Name:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {name || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Phone Number:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {phone || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Email Address:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {email || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Service Location:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                        {address ? `${address}, ` : ""}
                        {suburb || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 dark:border-white/5 pt-2">
                      <span className="text-slate-500 dark:text-slate-400">
                        Device & Service:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedModelName} - {selectedPartName.split(" (")[0]}
                      </span>
                    </div>
                    {(part === "screen" || part === "battery") && (
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          Component Quality:
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {quality}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-550 dark:text-slate-400">
                        Method:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        Doorstep Service (Mobile)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">
                        Appointment:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {date || "-"} (
                        {TIME_SLOTS.find((t) => t.id === timeSlot)?.name.split(
                          ": ",
                        )[1] || "-"}
                        )
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/5 text-base">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        Total Estimated Cost:
                      </span>
                      <span className="font-black text-primary">
                        ${priceEstimate} AUD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Back / Confirm buttons */}
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="border-slate-200 dark:border-white/10 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 px-6 py-5 rounded-xl flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-white font-extrabold px-8 py-5 rounded-xl shadow-lg shadow-primary/20 transform active:scale-95 transition-transform"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: Success confirmation screen */}
            {step === 3 && (
              <div className="text-center py-10 space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border-2 border-emerald-500/30">
                  <CheckCircle className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                    Booking Successful!
                  </h2>
                  <p className="text-slate-550 dark:text-slate-400 text-sm max-w-md mx-auto">
                    Thank you for choosing WeFixiPhone. We have successfully
                    received your repair request.
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-white/5 text-left max-w-md mx-auto space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Appointment ID:
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      WFI-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Customer Name:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Phone Number:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Email Address:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Service Location:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">
                      {address}, {suburb}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Repair Service:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {selectedModelName} ({selectedPartName.split(" (")[0]})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">
                      Appointment:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {date} (
                      {
                        TIME_SLOTS.find((t) => t.id === timeSlot)?.name.split(
                          ": ",
                        )[1]
                      }
                      )
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/5 font-bold">
                    <span className="text-slate-500 dark:text-slate-400">
                      Estimated Cost:
                    </span>
                    <span className="text-primary">${priceEstimate} AUD</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl max-w-md mx-auto text-xs leading-relaxed">
                  ✓ Our mobile technician will contact you at{" "}
                  <strong>{phone}</strong> 30 minutes before arrival to confirm
                  your location and components.
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => router.push(Routes.HOME)}
                    className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold px-8 py-4 rounded-xl"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutComponents>
  );
}

export default function BookingPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
          Loading booking form...
        </div>
      }
    >
      <BookingContent />
    </React.Suspense>
  );
}
