import React from "react";
import {
  User,
  Mail,
  MapPin,
  Truck,
  Calendar,
  Clock,
  AlertCircle,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface ContactStepProps {
  name: string;
  setName: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  suburb: string;
  setSuburb: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  date: string;
  setDate: (val: string) => void;
  selectedHour: string;
  setSelectedHour: (val: string) => void;
  selectedMinute: string;
  setSelectedMinute: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  part: string;
  errors: Record<string, string>;
  isSubmitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export const ContactStep = ({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  suburb,
  setSuburb,
  address,
  setAddress,
  date,
  setDate,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
  notes,
  setNotes,
  part,
  errors,
  isSubmitting,
  onSubmit,
  onBack,
}: ContactStepProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {part === "other" && (
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border-2 border-amber-500/30 dark:border-amber-500/20 space-y-3">
          <label className="text-sm font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 animate-bounce" />
            Device Symptoms & Issue Description (Required):
          </label>
          <textarea
            placeholder="Please describe the issue in detail (e.g. won't turn on after drop, screen flashing, no sound, etc.) so our technician can prepare appropriate tools."
            rows={4}
            className={`w-full bg-white dark:bg-slate-950 border rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 text-sm transition-colors duration-200 ${
              errors.notes
                ? "border-rose-500 focus:border-rose-500 animate-shake"
                : "border-slate-200 dark:border-white/10"
            }`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          {errors.notes && (
            <p className="text-xs text-rose-500 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.notes}
            </p>
          )}
        </div>
      )}

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
            Our doorstep technician repairs the device live at your location.
          </p>
        </div>

        {/* Service Method Badge */}
        <div className="p-4 rounded-xl border border-primary bg-primary/10 text-slate-900 dark:text-white flex gap-4 items-center">
          <Truck className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <h4 className="font-bold text-xs">Doorstep Service (Mobile)</h4>
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
                <AlertCircle className="w-3.5 h-3.5" /> {errors.suburb}
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
                <AlertCircle className="w-3.5 h-3.5" /> {errors.address}
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
              Choose Time:
            </label>
            <div className="flex gap-2 items-center">
              <Select
                value={selectedHour}
                onChange={setSelectedHour}
                options={Array.from({ length: 11 }, (_, i) => {
                  const hr = i + 8;
                  return {
                    label:
                      hr > 12
                        ? `${hr - 12} PM`
                        : hr === 12
                          ? "12 PM"
                          : `${hr} AM`,
                    value: hr.toString(),
                  };
                })}
                triggerClassName="!w-28 bg-white border border-slate-200 dark:bg-slate-950 dark:border-white/10 text-slate-900 dark:text-white"
              />
              <span className="text-slate-400 font-bold">:</span>
              <Select
                value={selectedMinute}
                onChange={setSelectedMinute}
                options={[
                  { label: "00", value: "00" },
                  { label: "15", value: "15" },
                  { label: "30", value: "30" },
                  { label: "45", value: "45" },
                ]}
                triggerClassName="!w-24 bg-white border border-slate-200 dark:bg-slate-950 dark:border-white/10 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-white/5">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="border-slate-300 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-bold px-6 py-5 rounded-xl flex items-center gap-2 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-5 rounded-xl flex items-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Complete Booking"
          )}
        </Button>
      </div>
    </form>
  );
};
