"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LayoutComponents from "@/components/layouts/LayoutComponents";
import { Button } from "@/components/ui/Button";
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
  { id: "iphone-11", name: "iPhone 11", baseScreen: 99, baseBattery: 89 },
  {
    id: "iphone-11-pro",
    name: "iPhone 11 Pro",
    baseScreen: 119,
    baseBattery: 99,
  },
  {
    id: "iphone-11-pro-max",
    name: "iPhone 11 Pro Max",
    baseScreen: 139,
    baseBattery: 109,
  },
  { id: "iphone-12", name: "iPhone 12", baseScreen: 129, baseBattery: 99 },
  {
    id: "iphone-12-pro",
    name: "iPhone 12 Pro",
    baseScreen: 149,
    baseBattery: 109,
  },
  {
    id: "iphone-12-pro-max",
    name: "iPhone 12 Pro Max",
    baseScreen: 169,
    baseBattery: 119,
  },
  { id: "iphone-13", name: "iPhone 13", baseScreen: 149, baseBattery: 109 },
  {
    id: "iphone-13-pro",
    name: "iPhone 13 Pro",
    baseScreen: 169,
    baseBattery: 119,
  },
  {
    id: "iphone-13-pro-max",
    name: "iPhone 13 Pro Max",
    baseScreen: 189,
    baseBattery: 129,
  },
  { id: "iphone-14", name: "iPhone 14", baseScreen: 179, baseBattery: 129 },
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    baseScreen: 199,
    baseBattery: 139,
  },
  {
    id: "iphone-14-pro-max",
    name: "iPhone 14 Pro Max",
    baseScreen: 219,
    baseBattery: 149,
  },
  { id: "iphone-15", name: "iPhone 15", baseScreen: 220, baseBattery: 149 },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    baseScreen: 250,
    baseBattery: 159,
  },
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    baseScreen: 290,
    baseBattery: 169,
  },
];

const PARTS = [
  { id: "screen", name: "Thay Màn Hình (Screen Replacement)" },
  { id: "battery", name: "Thay Pin Zin (Battery Replacement)" },
  { id: "faceid", name: "Sửa Face ID (Face ID Repair)" },
  { id: "camera", name: "Sửa Camera (Camera Repair)" },
  { id: "water", name: "Cứu Máy Vào Nước (Water Damage)" },
  { id: "charging", name: "Thay Chân Sạc (Charging Port)" },
];

const TIME_SLOTS = [
  { id: "slot-1", name: "Sáng: 09:00 - 12:00" },
  { id: "slot-2", name: "Chiều: 12:00 - 16:00" },
  { id: "slot-3", name: "Tối: 16:00 - 20:00" },
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
    if (partParam && PARTS.find((p) => p.id === partParam)) {
      setPart(partParam);
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
      IPHONE_MODELS.find((m) => m.id === model) || IPHONE_MODELS[6];

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
    } else if (part === "faceid") {
      setPriceEstimate(120);
    } else if (part === "camera") {
      setPriceEstimate(99);
    } else if (part === "water") {
      setPriceEstimate(60); // base check/cleaning fee
    } else if (part === "charging") {
      setPriceEstimate(89);
    }
  }, [model, part, quality]);

  // Validation function
  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 2) {
      if (serviceType === "on-site") {
        if (!suburb.trim())
          newErrors.suburb = "Vui lòng nhập Suburb tại Sydney";
        if (!address.trim()) newErrors.address = "Vui lòng nhập địa chỉ cụ thể";
      }
      if (!date) newErrors.date = "Vui lòng chọn ngày sửa chữa";
    }

    if (step === 3) {
      if (!name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
      if (!phone.trim())
        newErrors.phone = "Vui lòng nhập số điện thoại liên lạc";
      else if (!/^\d{8,12}$/.test(phone.replace(/\s+/g, ""))) {
        newErrors.phone = "Số điện thoại không hợp lệ (8 - 12 chữ số)";
      }
      if (!email.trim()) newErrors.email = "Vui lòng nhập địa chỉ email";
      else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Địa chỉ email không hợp lệ";
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
      setStep(4);
      window.scrollTo(0, 0);
    }
  };

  const selectedModelName =
    IPHONE_MODELS.find((m) => m.id === model)?.name || model;
  const selectedPartName = PARTS.find((p) => p.id === part)?.name || part;

  return (
    <LayoutComponents fullWidth>
      <div className="w-full min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Wizard step indicator */}
          {step < 4 && (
            <div className="mb-12">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {/* Step 1 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 1
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    1
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 1 ? "text-primary" : "text-slate-500"}`}
                  >
                    Thiết Bị
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${step >= 2 ? "bg-primary" : "bg-slate-800"}`}
                />

                {/* Step 2 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 2
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    2
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 2 ? "text-primary" : "text-slate-500"}`}
                  >
                    Hẹn Lịch
                  </span>
                </div>

                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${step >= 3 ? "bg-primary" : "bg-slate-800"}`}
                />

                {/* Step 3 */}
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step >= 3
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    3
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider ${step >= 3 ? "text-primary" : "text-slate-500"}`}
                  >
                    Xác Nhận
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form Content container */}
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Step 1: Device and Repair Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black">
                    Chọn Thiết Bị & Lỗi Cần Sửa
                  </h2>
                  <p className="text-sm text-slate-400">
                    Chọn chính xác model iPhone của bạn và linh kiện cần khắc
                    phục.
                  </p>
                </div>

                {/* Model selection */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    1. Chọn Dòng Máy iPhone:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {IPHONE_MODELS.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setModel(m.id)}
                        className={`cursor-pointer p-4 rounded-xl border text-center transition-all duration-200 hover:bg-white/5 ${
                          model === m.id
                            ? "border-primary bg-primary/10 font-bold text-white shadow-lg shadow-primary/10"
                            : "border-white/10 text-slate-300"
                        }`}
                      >
                        {m.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Part selection */}
                <div className="space-y-3 pt-3">
                  <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    2. Chọn Dịch Vụ Cần Sửa:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PARTS.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setPart(p.id);
                          if (p.id !== "screen" && p.id !== "battery") {
                            setQuality("Premium Quality"); // reset quality if not battery/screen
                          }
                        }}
                        className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:bg-white/5 ${
                          part === p.id
                            ? "border-primary bg-primary/10 font-bold text-white shadow-lg"
                            : "border-white/10 text-slate-300"
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
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      3. Chọn Loại Chất Lượng Linh Kiện:
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
                          className={`cursor-pointer p-4 rounded-xl border text-center transition-all duration-200 hover:bg-white/5 ${
                            quality === q
                              ? "border-primary bg-primary/10 font-bold text-white shadow-lg"
                              : "border-white/10 text-slate-300"
                          }`}
                        >
                          <span className="text-xs sm:text-sm block">{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimation box */}
                <div className="pt-6 border-t border-white/5 flex justify-between items-center bg-slate-950/60 p-4 rounded-xl">
                  <div>
                    <span className="text-xs text-slate-400">
                      Ước tính chi phí (Trọn gói):
                    </span>
                    <p className="text-slate-300 text-xs mt-0.5">
                      Đã bao gồm công sửa tận nơi
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
                    Tiếp tục
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Location and Timing */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black">
                    Địa Điểm & Thời Gian Sửa Chữa
                  </h2>
                  <p className="text-sm text-slate-400">
                    Chọn phương thức sửa chữa di động hoặc đặt lịch thời gian kỹ
                    thuật viên đến nhà.
                  </p>
                </div>

                {/* Service Type */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-300">
                    1. Phương thức phục vụ:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setServiceType("on-site")}
                      className={`cursor-pointer p-5 rounded-xl border flex gap-4 items-center transition-all duration-200 ${
                        serviceType === "on-site"
                          ? "border-primary bg-primary/10 text-white"
                          : "border-white/10 text-slate-300"
                      }`}
                    >
                      <Truck className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">
                          Kỹ thuật đến tận nhà
                        </h4>
                        <p className="text-xs text-slate-400">
                          Sửa tại phòng khách, văn phòng...
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setServiceType("drop-off")}
                      className={`cursor-pointer p-5 rounded-xl border flex gap-4 items-center transition-all duration-200 ${
                        serviceType === "drop-off"
                          ? "border-primary bg-primary/10 text-white"
                          : "border-white/10 text-slate-300"
                      }`}
                    >
                      <Building className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-sm">
                          Mail-in / Gửi thiết bị
                        </h4>
                        <p className="text-xs text-slate-400">
                          Gửi bưu điện đến trạm bảo hành
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* On-site Address input */}
                {serviceType === "on-site" && (
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Sydney Suburb:
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: Chatswood, Surry Hills, Sydney CBD..."
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
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
                      <label className="text-sm font-bold text-slate-300">
                        Địa chỉ cụ thể (Đường, số nhà, căn hộ...):
                      </label>
                      <input
                        type="text"
                        placeholder="Ví dụ: 12/345 George St, Office Room 3B"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
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
                )}

                {/* Date & Time Slot selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      2. Chọn Ngày Sửa Chữa:
                    </label>
                    <input
                      type="date"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
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
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      3. Chọn Khung Giờ Tiện Nhất:
                    </label>
                    <div className="relative">
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:border-primary cursor-pointer appearance-none text-sm"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.id} value={slot.id}>
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

                <div className="flex justify-between pt-6 border-t border-white/5">
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/5 px-6 py-5 rounded-xl flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Quay lại
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-5 rounded-xl flex items-center gap-2"
                  >
                    Tiếp tục
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Customer Details & Confirmation */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black">
                    Thông Tin Liên Hệ & Báo Giá
                  </h2>
                  <p className="text-sm text-slate-400">
                    Nhập thông tin liên hệ của bạn để kỹ thuật viên liên hệ xác
                    nhận cuộc gọi.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Họ và Tên:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
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
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-primary" />
                      Số Điện Thoại:
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: 0451 210 238"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Địa chỉ Email:
                    </label>
                    <input
                      type="email"
                      placeholder="Ví dụ: nguyenvana@gmail.com"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">
                      Ghi chú thêm (Màu máy, tình trạng cụ thể):
                    </label>
                    <textarea
                      placeholder="Ví dụ: Máy màu vàng Gold, màn hình có sọc xanh nháy nhẹ sau khi rơi. Có cổng bảo vệ an ninh tòa nhà..."
                      rows={3}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary text-sm"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>

                {/* Summary bill */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-white/5 space-y-3.5 text-sm">
                  <h4 className="font-bold text-slate-300 border-b border-white/5 pb-2">
                    Tóm tắt đơn đặt lịch sửa:
                  </h4>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Thiết bị & Dịch vụ:</span>
                    <span className="font-semibold text-slate-200">
                      {selectedModelName} - {selectedPartName.split(" (")[0]}
                    </span>
                  </div>
                  {(part === "screen" || part === "battery") && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Loại linh kiện:</span>
                      <span className="font-semibold text-slate-200">
                        {quality}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phương thức:</span>
                    <span className="font-semibold text-slate-200">
                      {serviceType === "on-site"
                        ? `Tận nơi (${suburb})`
                        : "Gửi thiết bị (Mail-in)"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lịch hẹn:</span>
                    <span className="font-semibold text-slate-200">
                      {date} (
                      {
                        TIME_SLOTS.find((t) => t.id === timeSlot)?.name.split(
                          ": ",
                        )[1]
                      }
                      )
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5 text-base">
                    <span className="font-bold text-slate-300">
                      Tổng chi phí dự kiến:
                    </span>
                    <span className="font-black text-primary">
                      ${priceEstimate} AUD
                    </span>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="border-white/10 text-white hover:bg-white/5 px-6 py-5 rounded-xl flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Quay lại
                  </Button>
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-white font-extrabold px-8 py-5 rounded-xl shadow-lg shadow-primary/20 transform active:scale-95 transition-transform"
                  >
                    Xác Nhận Đặt Lịch
                  </Button>
                </div>
              </form>
            )}

            {/* Step 4: Success confirmation screen */}
            {step === 4 && (
              <div className="text-center py-10 space-y-6">
                <div className="mx-auto w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border-2 border-emerald-500/30">
                  <CheckCircle className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-white">
                    Đăng Ký Đặt Lịch Thành Công!
                  </h2>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Cảm ơn bạn đã lựa chọn WeFixiPhone. Chúng tôi đã nhận được
                    yêu cầu đặt lịch sửa chữa của bạn.
                  </p>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 text-left max-w-md mx-auto space-y-3 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã lịch hẹn:</span>
                    <span className="font-mono font-bold text-white">
                      WFI-{Math.floor(100000 + Math.random() * 900000)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Khách hàng:</span>
                    <span className="font-semibold">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Số điện thoại:</span>
                    <span>{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sửa chữa:</span>
                    <span>
                      {selectedModelName} ({selectedPartName.split(" (")[0]})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lịch hẹn:</span>
                    <span>
                      {date} (
                      {
                        TIME_SLOTS.find((t) => t.id === timeSlot)?.name.split(
                          ": ",
                        )[1]
                      }
                      )
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5 font-bold">
                    <span className="text-slate-400">Chi phí dự kiến:</span>
                    <span className="text-primary">${priceEstimate} AUD</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl max-w-md mx-auto text-xs leading-relaxed">
                  ✓ Kỹ thuật viên lưu động sẽ liên hệ trực tiếp số điện thoại{" "}
                  <strong>{phone}</strong> của bạn trước 30 phút khi bắt đầu di
                  chuyển để xác nhận địa chỉ và linh kiện.
                </div>

                <div className="pt-6">
                  <Button
                    onClick={() => router.push(Routes.HOME)}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-xl"
                  >
                    Về Trang Chủ
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
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          Đang tải biểu mẫu đặt lịch...
        </div>
      }
    >
      <BookingContent />
    </React.Suspense>
  );
}
