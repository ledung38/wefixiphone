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
} from "lucide-react";
import { Routes } from "@/lib/enum/routes";

// Define pricing pricing data
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
];

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Selected state
  const [selectedModel, setSelectedModel] = useState("iphone-13");
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
    IPHONE_MODELS.find((m) => m.id === selectedModel) || IPHONE_MODELS[6];

  // Calculate price based on quality tiers
  const getPrices = () => {
    if (selectedPart === "screen") {
      return {
        standard: modelData.baseScreen,
        premium: Math.round(modelData.baseScreen * 1.45),
        genuine: Math.round(modelData.baseScreen * 2.1),
      };
    } else {
      return {
        standard: modelData.baseBattery,
        premium: Math.round(modelData.baseBattery * 1.3),
        genuine: Math.round(modelData.baseBattery * 1.8),
      };
    }
  };

  const prices = getPrices();

  // Specifications comparison data
  const comparisonData = {
    screen: [
      {
        feature: "Công nghệ tấm nền (Display Tech)",
        standard: "LCD / IPS (Màu sắc khá, viền dày hơn)",
        premium: "OLED High-Contrast (Màu rực rỡ, viền mỏng)",
        genuine: "Original Apple OLED (Chuẩn chỉ hãng, sắc nét 100%)",
      },
      {
        feature: "True Tone & 3D Touch",
        standard: "Không hỗ trợ / Có thể mất",
        premium: "Hỗ trợ nạp code True Tone đầy đủ",
        genuine: "Hỗ trợ đồng bộ True Tone chính hãng",
      },
      {
        feature: "Độ nhạy cảm ứng (Response)",
        standard: "90% (Thỉnh thoảng trễ nhẹ)",
        premium: "99% (Mượt mà như màn zin ban đầu)",
        genuine: "100% (Hoàn hảo tuyệt đối)",
      },
      {
        feature: "Thời gian bảo hành (Warranty)",
        standard: "3 Tháng (Bảo hành cảm ứng)",
        premium: "12 Tháng (Bảo hành sọc nháy + cảm ứng)",
        genuine: "12 Tháng (Bảo hành chính hãng 1 đổi 1)",
      },
      {
        feature: "Thông báo linh kiện (Component Message)",
        standard: "Hiển thị thông báo màn hình không xác định",
        premium: "Hiển thị thông báo màn hình không xác định",
        genuine: "Không báo lỗi linh kiện (Nạp IC chính hãng)",
      },
    ],
    battery: [
      {
        feature: "Dung lượng pin (Capacity)",
        standard: "100% Dung lượng chuẩn (Third-party)",
        premium: "100% Dung lượng chuẩn (Cell tốt nhập khẩu)",
        genuine: "Original Apple Cell (Chuẩn Apple tháo máy/new)",
      },
      {
        feature: "Sức khỏe pin trong cài đặt (Battery Health)",
        standard: "Báo bảo trì / Không hiện % dung lượng",
        premium: "Hiện % dung lượng (Nếu dời cổ cáp cũ)",
        genuine: "Hiện % đầy đủ chính xác 100%",
      },
      {
        feature: "Độ bền & Chu kỳ sạc (Lifespan)",
        standard: "500 Chu kỳ sạc (Hiệu suất ổn định)",
        meaning: "Khoảng 1.5 năm sử dụng",
        premium: "800 Chu kỳ sạc (Dòng điện siêu ổn định)",
        genuine: "1000+ Chu kỳ sạc (Bền bỉ nhất)",
      },
      {
        feature: "Thời gian bảo hành (Warranty)",
        standard: "3 Tháng (Lỗi chai phồng đổi mới)",
        premium: "12 Tháng (Bảo hành 1 đổi 1 tận nơi)",
        genuine: "12 Tháng (Chính hãng thợ lắp tận nhà)",
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
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header text */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Bảng Báo Giá Minh Bạch
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
              Giá báo trọn gói bao gồm linh kiện, tiền đi lại của thợ lưu động
              đến tận nhà, và công thay thế trực tiếp. Cam kết không phát sinh
              bất kỳ khoản phí ẩn nào khác.
            </p>
          </div>

          {/* Calculator Section */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md dark:shadow-2xl relative overflow-hidden">
            {/* Background blur decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {/* Dropdown 1: Model Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  1. Chọn Dòng iPhone Của Bạn:
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary cursor-pointer appearance-none text-sm"
                  >
                    {IPHONE_MODELS.map((model) => (
                      <option
                        key={model.id}
                        value={model.id}
                        className="text-slate-900 dark:text-white"
                      >
                        {model.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Dropdown 2: Part Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  2. Chọn Linh Kiện Cần Sửa:
                </label>
                <div className="relative">
                  <select
                    value={selectedPart}
                    onChange={(e) => setSelectedPart(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-200 dark:bg-slate-950 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-primary cursor-pointer appearance-none text-sm"
                  >
                    {PARTS.map((part) => (
                      <option
                        key={part.id}
                        value={part.id}
                        className="text-slate-900 dark:text-white"
                      >
                        {part.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 dark:text-slate-400">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing cards grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6">
            {/* Tier 1: Aftermarket */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/10 shadow-sm transition-all duration-300 relative group">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    TIẾT KIỆM CHI PHÍ
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Standard (Aftermarket)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tối ưu về giá, linh kiện từ bên thứ ba chất lượng loại A,
                    bảo hành đầy đủ.
                  </p>
                </div>

                <div className="py-4 border-y border-slate-100 dark:border-white/5 flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                    AUD
                  </span>
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    ${prices.standard}
                  </span>
                  <span className="text-xs text-slate-450 dark:text-slate-500 ml-2">
                    Trọn gói
                  </span>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>Tiết kiệm ngân sách tối đa</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>Lắp đặt tận nhà nhanh chóng</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Bảo hành sửa chữa 3 tháng</span>
                  </li>
                  <li className="flex items-center gap-2.5 opacity-40">
                    <X className="w-4 h-4 text-rose-500 flex-shrink-0" />
                    <span>True Tone / Đồng bộ zin gốc</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() =>
                    handleBook("Standard Aftermarket", prices.standard)
                  }
                  className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-6 rounded-xl font-bold text-sm transform active:scale-95 transition-transform"
                >
                  Đặt Sửa Gói Này
                </Button>
              </div>
            </div>

            {/* Tier 2: Premium (RECOMMENDED) */}
            <div className="rounded-3xl border-2 border-primary bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xl shadow-primary/5 dark:shadow-primary/10 relative group transform lg:-translate-y-2">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg">
                KHUYÊN DÙNG (POPULAR)
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                    HIỆU NĂNG 99% ZIN
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Premium OLED / Cell
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Linh kiện cao cấp nhất sản xuất theo chuẩn zin gốc. Trải
                    nghiệm vuốt chạm, màu sắc và độ bền hoàn hảo.
                  </p>
                </div>

                <div className="py-4 border-y border-slate-100 dark:border-white/10 flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-slate-450 dark:text-slate-400">
                    AUD
                  </span>
                  <span className="text-5xl font-black text-primary">
                    ${prices.premium}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                    Trọn gói
                  </span>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-800 dark:text-white">
                      Màu sắc/Cảm ứng mượt 99% zin
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>Hỗ trợ chép True Tone đầy đủ</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-semibold text-primary">
                      Bảo hành 12 tháng tận nơi
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>Linh kiện tuyển chọn siêu bền</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => handleBook("Premium Quality", prices.premium)}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-black text-sm shadow-lg shadow-primary/20 transform active:scale-95 transition-transform"
                >
                  Đặt Sửa Premium Ngay
                </Button>
              </div>
            </div>

            {/* Tier 3: Genuine Apple */}
            <div className="rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/10 shadow-sm transition-all duration-300 relative group">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-slate-450 dark:text-slate-500 uppercase">
                    CHẤT LƯỢNG CHÍNH HÃNG
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    Genuine (Chính Hãng)
                  </h3>
                  <p className="text-xs text-slate-505 dark:text-slate-400">
                    Linh kiện zin chính hãng Apple bóc máy hoặc zin tháo máy mới
                    100%. Đảm bảo zin nguyên bản.
                  </p>
                </div>

                <div className="py-4 border-y border-slate-100 dark:border-white/5 flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-slate-450 dark:text-slate-500">
                    AUD
                  </span>
                  <span className="text-5xl font-black text-slate-900 dark:text-white">
                    ${prices.genuine}
                  </span>
                  <span className="text-xs text-slate-500 ml-2">Trọn gói</span>
                </div>

                <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>Màn hình / Pin tháo máy Apple 100%</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>Đồng bộ 100% không báo lỗi thiết bị</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Bảo hành chính hãng 12 tháng</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    <span>Đầy đủ True Tone, sức khỏe pin hiển thị</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => handleBook("Genuine Apple", prices.genuine)}
                  className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white py-6 rounded-xl font-bold text-sm transform active:scale-95 transition-transform"
                >
                  Đặt Sửa Gói Chính Hãng
                </Button>
              </div>
            </div>
          </div>

          {/* Technical Specs Comparison Table */}
          <div className="max-w-4xl mx-auto pt-12 space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                So Sánh Chi Tiết Thông Số Kỹ Thuật
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Thông số linh kiện thay thế dành cho {modelData.name}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-md dark:shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-950/80 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
                      <th className="p-4 sm:p-5">Thông số / Tính năng</th>
                      <th className="p-4 sm:p-5 text-slate-700 dark:text-slate-300">
                        Standard (Aftermarket)
                      </th>
                      <th className="p-4 sm:p-5 text-primary">
                        Premium (OLED/Cell)
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

          {/* General Information Callout */}
          <div className="bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-4xl mx-auto flex gap-4 items-start shadow-sm">
            <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">
                Ghi chú về dịch vụ lưu động tại Sydney:
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Thời gian sửa chữa trung bình chỉ 15-20 phút tại chỗ. Thợ sửa
                chữa sẽ chủ động liên hệ hẹn lịch trước khi di chuyển. Mọi quy
                trình đều công khai, minh bạch, cho phép bạn quan sát từ đầu đến
                khi bàn giao máy.
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
          Đang tải bảng giá...
        </div>
      }
    >
      <PricingContent />
    </React.Suspense>
  );
}
