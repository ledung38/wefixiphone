"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { generateBookingEmailHTML } from "@/app/booking/utils";
import { IPHONE_MODELS, BOOKING_PARTS } from "../../pricing/constants/data";
import { calculatePrice } from "../utils/price";
import { DeviceStep } from "./DeviceStep";
import { ContactStep } from "./ContactStep";
import { SuccessStep } from "./SuccessStep";

interface BookingWizardProps {
  initialModel: string;
  initialPart: string;
  initialQuality: string;
  initialPrice: number;
}

export const BookingWizard = ({
  initialModel,
  initialPart,
  initialQuality,
  initialPrice,
}: BookingWizardProps) => {
  const [step, setStep] = useState(1);

  // Form states
  const [model, setModel] = useState(initialModel);
  const [part, setPart] = useState(initialPart);
  const [quality, setQuality] = useState(initialQuality);
  const [suburb, setSuburb] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [priceEstimate, setPriceEstimate] = useState(initialPrice);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormattedTime = (hourStr: string, minuteStr: string) => {
    const hour = parseInt(hourStr);
    const displayHr =
      hour > 12 ? `${hour - 12}` : hour === 12 ? "12" : `${hour}`;
    const ampm = hour >= 12 ? "PM" : "AM";
    return `${displayHr}:${minuteStr} ${ampm}`;
  };

  // Recalculate price dynamically when model/part/quality changes
  useEffect(() => {
    const computedPrice = calculatePrice(model, part, quality);
    setPriceEstimate(computedPrice);
  }, [model, part, quality]);

  // Validation function
  const validateStep = () => {
    const newErrors: Record<string, string> = {};

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
      if (part === "other" && !notes.trim()) {
        newErrors.notes = "Please describe your device issue or symptoms";
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
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-slate-900 dark:text-white">
      {step === 1 && (
        <DeviceStep
          model={model}
          setModel={setModel}
          part={part}
          setPart={setPart}
          quality={quality}
          setQuality={setQuality}
          priceEstimate={priceEstimate}
          onNext={handleNext}
        />
      )}

      {step === 2 && (
        <ContactStep
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          suburb={suburb}
          setSuburb={setSuburb}
          address={address}
          setAddress={setAddress}
          date={date}
          setDate={setDate}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          selectedMinute={selectedMinute}
          setSelectedMinute={setSelectedMinute}
          notes={notes}
          setNotes={setNotes}
          part={part}
          errors={errors}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onBack={handleBack}
        />
      )}

      {step === 3 && (
        <SuccessStep
          bookingId={bookingId}
          selectedModelName={selectedModelName}
          selectedPartName={selectedPartName}
          quality={quality}
          part={part}
          address={address}
          suburb={suburb}
          date={date}
          timeString={getFormattedTime(selectedHour, selectedMinute)}
          priceEstimate={priceEstimate}
        />
      )}
    </div>
  );
};
