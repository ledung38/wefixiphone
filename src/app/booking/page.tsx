"use client";

import LayoutComponents from "@/components/layouts/LayoutComponents";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Routes } from "@/lib/enum/routes";
import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mail,
  MapPin,
  Settings,
  Smartphone,
  Truck,
  User,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { REPAIR_PRICES } from "@/lib/data/repairPrices";
import { toast } from "sonner";

// Models list matching pricing
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

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Booking wizard steps: 1 = Device, 2 = Service Details, 3 = Personal Info, 4 = Success
  const [step, setStep] = useState(1);

  // Form states
  const [model, setModel] = useState("iphone-16-pro-max");
  const [part, setPart] = useState("screen");
  const [quality, setQuality] = useState("Premium Quality");
  const [serviceType, setServiceType] = useState("on-site"); // on-site vs drop-off
  const [suburb, setSuburb] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [priceEstimate, setPriceEstimate] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateBookingEmailHTML = (params: {
    bookingId: string;
    name: string;
    phone: string;
    email: string;
    suburb: string;
    address: string;
    date: string;
    time: string;
    modelName: string;
    partName: string;
    quality: string;
    price: number;
    notes: string;
  }) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center; border-bottom: 2px solid #3b82f6;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">WeFix <span style="color: #3b82f6;">iPhone</span></h1>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Sydney Mobile Repair</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 24px; background-color: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Booking Confirmation</h2>
          <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
            Hi <strong>${params.name}</strong>, thank you for booking with us. We have received your request and will contact you 30 minutes before arrival to confirm.
          </p>

          <!-- Summary Card -->
          <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Booking ID:</td>
                <td style="padding: 6px 0; color: #0f172a; font-family: monospace; font-weight: 700;">${params.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Customer:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${params.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone:</td>
                <td style="padding: 6px 0; color: #0f172a;">${params.phone}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
                <td style="padding: 6px 0; color: #0f172a;">${params.email}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Address:</td>
                <td style="padding: 6px 0; color: #0f172a;">${params.address}, ${params.suburb}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600; border-top: 1px solid #e2e8f0; padding-top: 12px;">Device & Repair:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600; border-top: 1px solid #e2e8f0; padding-top: 12px;">${params.modelName} - ${params.partName}</td>
              </tr>
              ${
                params.quality
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Quality Tier:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${params.quality}</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Appointment:</td>
                <td style="padding: 6px 0; color: #3b82f6; font-weight: 700;">${params.date} at ${params.time}</td>
              </tr>
              ${
                params.notes
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: 600; vertical-align: top;">Notes:</td>
                <td style="padding: 6px 0; color: #475569; font-style: italic;">"${params.notes}"</td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 12px 0 0 0; color: #0f172a; font-weight: bold; font-size: 16px; border-top: 1px solid #e2e8f0;">Total Cost:</td>
                <td style="padding: 12px 0 0 0; color: #f4601f; font-weight: 800; font-size: 18px; border-top: 1px solid #e2e8f0;">$${params.price} AUD</td>
              </tr>
            </table>
          </div>

          <!-- Info alert box -->
          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; color: #1e3a8a; font-size: 13px; line-height: 1.4;">
            <strong>Sydney Mobile On-Site Service Note:</strong> The entire repair will be performed in front of you. Please make sure the technician has access to a safe working area.
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
          <p style="margin: 0 0 4px 0;">© ${new Date().getFullYear()} WeFixiPhone. All rights reserved.</p>
          <p style="margin: 0;">Sydney, NSW, Australia | Tel: 0433 263 105</p>
        </div>
      </div>
    `;
  };

  const getFormattedTime = (hourStr: string, minuteStr: string) => {
    const hour = parseInt(hourStr);
    const displayHr =
      hour > 12 ? `${hour - 12}` : hour === 12 ? "12" : `${hour}`;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${displayHr}:${minuteStr} ${ampm}`;
  };

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
    const prices = REPAIR_PRICES[model] || REPAIR_PRICES["iphone-x"];

    // Custom calculations for parts
    if (part === "screen") {
      if (quality.includes("Standard")) setPriceEstimate(prices.screenStandard);
      else if (quality.includes("Genuine"))
        setPriceEstimate(prices.screenGenuine);
      else setPriceEstimate(prices.screenPremium);
    } else if (part === "battery") {
      if (quality.includes("Standard"))
        setPriceEstimate(prices.batteryStandard);
      else if (quality.includes("Genuine"))
        setPriceEstimate(prices.batteryGenuine);
      else setPriceEstimate(prices.batteryPremium);
    } else if (part === "back-glass") {
      setPriceEstimate(prices.backGlass);
    } else if (part === "charging") {
      setPriceEstimate(prices.chargingPort);
    } else if (part === "rear-camera") {
      setPriceEstimate(prices.camera);
    } else if (part === "camera-lens") {
      setPriceEstimate(prices.cameraLens);
    } else if (part === "front-camera") {
      setPriceEstimate(prices.frontCamera);
    } else if (part === "audio") {
      setPriceEstimate(prices.audio);
    } else if (part === "housing") {
      setPriceEstimate(prices.housing);
    } else if (part === "software") {
      setPriceEstimate(prices.software);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      const generatedId = `WFI-${Math.floor(100000 + Math.random() * 900000)}`;
      const formattedTime = getFormattedTime(selectedHour, selectedMinute);

      const emailContent = generateBookingEmailHTML({
        bookingId: generatedId,
        name,
        phone,
        email,
        suburb,
        address,
        date,
        time: formattedTime,
        modelName: selectedModelName,
        partName: selectedPartName.split(" (")[0],
        quality: part === "screen" || part === "battery" ? quality : "",
        price: priceEstimate,
        notes,
      });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `📱 WeFixiPhone Booking Confirmed – ${name} (${generatedId})`,
          message: emailContent,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        toast.success("Booking confirmed! A confirmation email has been sent.");
        setBookingId(generatedId);
        setStep(3);
        window.scrollTo(0, 0);
      } else {
        toast.error(
          "Something went wrong. Please check your network or try again.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedModelName =
    IPHONE_MODELS.find((m) => m.id === model)?.name || model;
  const selectedPartName =
    BOOKING_PARTS.find((p) => p.id === part)?.name || part;

  return (
    <LayoutComponents fullWidth>
      <div className="w-full min-h-screen bg-primary/20 dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
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
                        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-transparent"
                    }`}
                  >
                    {step > 1 ? <Check className="w-4 h-4 text-white" /> : "1"}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 1 ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    Device
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${step >= 2 ? "bg-primary" : "bg-slate-300 dark:bg-slate-800"}`}
                />

                {/* Step 2 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 2
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-transparent"
                    }`}
                  >
                    {step > 2 ? <Check className="w-4 h-4 text-white" /> : "2"}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 2 ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    Confirm
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${step >= 3 ? "bg-primary" : "bg-slate-300 dark:bg-slate-800"}`}
                />

                {/* Step 3 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 3
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-transparent"
                    }`}
                  >
                    {step >= 3 ? <Check className="w-4 h-4 text-white" /> : "3"}
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 3 ? "text-primary" : "text-slate-600 dark:text-slate-400"}`}
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
                  <p className="text-sm text-slate-600 dark:text-slate-400">
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
                    <p className="text-xs text-slate-600 dark:text-slate-400">
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
                        placeholder="e.g., 0433 263 105"
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
                    <p className="text-xs text-slate-600 dark:text-slate-400">
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
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
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
                        Choose Preferred Time:
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Hour Dropdown */}
                        <div className="relative">
                          <select
                            value={selectedHour}
                            onChange={(e) => setSelectedHour(e.target.value)}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary cursor-pointer appearance-none text-sm transition-colors duration-200"
                          >
                            {Array.from({ length: 12 }, (_, i) => i + 9).map(
                              (h) => {
                                const hrStr = h.toString().padStart(2, "0");
                                const displayHr =
                                  h > 12
                                    ? `${h - 12} PM`
                                    : h === 12
                                      ? "12 PM"
                                      : `${h} AM`;
                                return (
                                  <option
                                    key={hrStr}
                                    value={hrStr}
                                    className="text-slate-900 dark:text-white dark:bg-slate-950"
                                  >
                                    {displayHr}
                                  </option>
                                );
                              },
                            )}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            ▼
                          </div>
                        </div>

                        {/* Minute Dropdown */}
                        <div className="relative">
                          <select
                            value={selectedMinute}
                            onChange={(e) => setSelectedMinute(e.target.value)}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl py-3.5 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary cursor-pointer appearance-none text-sm transition-colors duration-200"
                          >
                            {["00", "15", "30", "45"].map((m) => (
                              <option
                                key={m}
                                value={m}
                                className="text-slate-900 dark:text-white dark:bg-slate-950"
                              >
                                {m} mins
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
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-white/5 pb-2">
                      Booking Summary:
                    </h4>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Customer Name:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {name || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Phone Number:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {phone || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Email Address:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {email || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Service Location:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-right">
                        {address ? `${address}, ` : ""}
                        {suburb || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 dark:border-white/5 pt-2">
                      <span className="text-slate-600 dark:text-slate-400">
                        Device & Service:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {selectedModelName} - {selectedPartName.split(" (")[0]}
                      </span>
                    </div>
                    {(part === "screen" || part === "battery") && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">
                          Component Quality:
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {quality}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Method:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        Doorstep Service (Mobile)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        Appointment:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {date || "-"} at{" "}
                        {getFormattedTime(selectedHour, selectedMinute)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/5 text-base">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
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
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/95 text-white font-extrabold px-8 py-5 rounded-xl shadow-lg shadow-primary/20 transform active:scale-95 transition-transform disabled:opacity-50"
                  >
                    {isSubmitting ? "Confirming..." : "Confirm Booking"}
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
                  <p className="text-slate-650 dark:text-slate-400 text-sm max-w-md mx-auto">
                    Thank you for choosing WeFixiPhone. We have successfully
                    received your repair request.
                  </p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200 dark:border-white/5 text-left max-w-md mx-auto space-y-3 text-sm text-slate-800 dark:text-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Appointment ID:
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {bookingId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Customer Name:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Phone Number:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {phone}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Email Address:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Service Location:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white text-right">
                      {address}, {suburb}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Repair Service:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {selectedModelName} ({selectedPartName.split(" (")[0]})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      Appointment:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {date} at {getFormattedTime(selectedHour, selectedMinute)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-white/5 font-bold">
                    <span className="text-slate-600 dark:text-slate-400">
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
        <div className="min-h-screen bg-primary/20 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center">
          Loading booking form...
        </div>
      }
    >
      <BookingContent />
    </React.Suspense>
  );
}
