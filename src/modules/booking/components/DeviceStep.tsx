import React from "react";
import {
  Smartphone,
  Settings,
  Check,
  ChevronRight,
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { IPHONE_MODELS, BOOKING_PARTS } from "../../pricing/constants/data";
import { REPAIR_PRICES } from "@/lib/data/repairPrices";

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

interface DeviceStepProps {
  model: string;
  setModel: (val: string) => void;
  part: string;
  setPart: (val: string) => void;
  quality: string;
  setQuality: (val: string) => void;
  priceEstimate: number;
  onNext: () => void;
  deviceImage: string;
  setDeviceImage: (val: string) => void;
}

export const DeviceStep = ({
  model,
  setModel,
  part,
  setPart,
  quality,
  setQuality,
  priceEstimate,
  onNext,
  deviceImage,
  setDeviceImage,
}: DeviceStepProps) => {
  const [isCompressing, setIsCompressing] = React.useState(false);

  // Find active data & prices
  const activeModel =
    IPHONE_MODELS.find((m) => m.id === model) || IPHONE_MODELS[0];
  const activeModelPrices = REPAIR_PRICES[model];

  // Filter available repair services based on device classification rules
  const filteredBookingParts = BOOKING_PARTS.filter((p) => {
    // 1. Hide Rear Camera Lens for Group 1 models (removable back glass)
    if (p.id === "camera-lens" && activeModel.isBackGlassRemovable) {
      return false;
    }

    // 2. Hide Housing Replacement if housing price is undefined for this model
    if (
      p.id === "housing" &&
      (!activeModelPrices || activeModelPrices.housing === undefined)
    ) {
      return false;
    }

    return true;
  });

  // Reset selected part if it's not available in the filtered list for the current model
  React.useEffect(() => {
    if (!filteredBookingParts.some((p) => p.id === part)) {
      setPart("screen");
    }
  }, [model, part, filteredBookingParts]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          Select Device & Repair
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Choose your exact iPhone model and the component that needs repair.
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
          {filteredBookingParts.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setPart(p.id);
                if (p.id !== "screen" && p.id !== "battery") {
                  setQuality("Premium Quality");
                }
              }}
              className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/5 ${
                part === p.id
                  ? "border-primary bg-primary/10 font-bold text-primary dark:text-white shadow-lg"
                  : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
              }`}
            >
              <span className="text-sm">{p.name.split(" (")[0]}</span>
              {part === p.id && <Check className="w-4 h-4 text-primary" />}
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
            {["Standard Aftermarket", "Premium Quality", "Genuine Apple"].map(
              (q) => (
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
              ),
            )}
          </div>
        </div>
      )}

      {/* Image Upload Option */}
      <div className="space-y-2 pt-2 text-left">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4 text-amber-500" />
          Upload Phone Photo (Optional):
        </label>

        {deviceImage ? (
          <div className="relative inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950">
            <img
              src={deviceImage}
              alt="Device Preview"
              className="max-h-48 object-contain rounded-xl"
            />
            <button
              type="button"
              onClick={() => setDeviceImage("")}
              className="absolute top-2 right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1.5 shadow-lg transition-colors duration-150 cursor-pointer"
              title="Remove image"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              id="device-photo-upload"
              className="hidden"
              disabled={isCompressing}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                if (file.size > 10 * 1024 * 1024) {
                  toast.error("Image file must be under 10MB");
                  return;
                }

                setIsCompressing(true);
                try {
                  const compressedBase64 = await compressImage(file);
                  setDeviceImage(compressedBase64);
                } catch (err) {
                  console.error(err);
                  toast.error(
                    "Failed to process image. Please try another one.",
                  );
                } finally {
                  setIsCompressing(false);
                }
              }}
            />
            <label
              htmlFor="device-photo-upload"
              className={`flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-primary dark:hover:border-primary/50 bg-white dark:bg-slate-950/40 rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
                isCompressing ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              {isCompressing ? (
                <>
                  <Loader2 className="w-6 h-6 text-primary animate-spin mb-2" />
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Processing & compressing image...
                  </span>
                </>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-2" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-350">
                    Click to upload phone photo
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    Supports JPG, PNG (Max 10MB - auto compressed)
                  </span>
                </>
              )}
            </label>
          </div>
        )}
      </div>

      {/* Estimation box */}
      <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between items-center bg-slate-100 dark:bg-slate-950/60 p-4 rounded-xl">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Estimated cost (All-inclusive):
          </span>
          <p className="text-slate-550 dark:text-slate-400 text-xs mt-0.5">
            This price includes the part, labor, and travel fee to your place.
          </p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-primary">
            {part === "other" ? "Free Diagnosis" : `$${priceEstimate} AUD`}
          </span>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-5 rounded-xl flex items-center gap-2 cursor-pointer"
        >
          Continue
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
