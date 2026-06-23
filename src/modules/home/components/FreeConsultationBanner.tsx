"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  ArrowRight,
  Loader2,
  Upload,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import Image from "@/components/ui/Image";
import { Routes } from "@/lib/enum/routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const generateDiagnosticEmailHTML = (params: {
  name: string;
  phone: string;
  email: string;
  description: string;
  deviceImage?: string;
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 24px; text-align: center; border-bottom: 2px solid #3b82f6;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">WeFix <span style="color: #3b82f6;">iPhone</span></h1>
        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Free Diagnostic Request</p>
      </div>
      
      <!-- Body -->
      <div style="padding: 24px; background-color: #ffffff;">
        <h2 style="color: #0f172a; margin-top: 0; font-size: 18px; font-weight: 700; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">New Consultation Request</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
          A customer has requested a free diagnostic and doorstep consultation because they are unsure of the issue.
        </p>

        <!-- Details Card -->
        <div style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Customer Name:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${params.name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Phone:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${params.phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 6px 0; color: #0f172a;">${params.email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0 0 0; color: #64748b; font-weight: 600; vertical-align: top; border-top: 1px solid #e2e8f0;">Issue Description:</td>
              <td style="padding: 12px 0 0 0; color: #0f172a; border-top: 1px solid #e2e8f0; line-height: 1.5;">${params.description.replace(/\n/g, "<br/>")}</td>
            </tr>
            ${
              params.deviceImage
                ? `
            <tr>
              <td style="padding: 12px 0 0 0; color: #64748b; font-weight: 600; vertical-align: top; border-top: 1px solid #e2e8f0;">Device Photo:</td>
              <td style="padding: 12px 0 0 0; border-top: 1px solid #e2e8f0;">
                <img src="cid:devicePhoto" alt="Uploaded Device Image" style="max-width: 100%; max-height: 240px; border-radius: 8px; border: 1px solid #e2e8f0; display: block; margin-top: 6px;" />
              </td>
            </tr>
            `
                : ""
            }
          </table>
        </div>

        <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 12px 16px; color: #1e3a8a; font-size: 13px; line-height: 1.4;">
          <strong>Next Action:</strong> Contact the customer within 1 business hour to discuss symptoms, confirm their location, and schedule the doorstep diagnostic service.
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

export const FreeConsultationBanner = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim() || !description.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const emailContent = generateDiagnosticEmailHTML({
        name,
        phone,
        email,
        description,
        deviceImage: bannerImage || undefined,
      });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: `🔍 Free Diagnostic Inquiry – ${name}`,
          message: emailContent,
          deviceImage: bannerImage || undefined,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        toast.success("Request sent successfully! We will contact you soon.");
        setName("");
        setPhone("");
        setEmail("");
        setDescription("");
        setBannerImage("");
      } else {
        toast.error(
          "Failed to send request. Please check your network or try again.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full relative min-h-[420px] py-12  flex items-center bg-slate-950 overflow-hidden border-y border-slate-900">
      {/* Background Image of Luxury iPhones */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <Image
          src="/cta_iphones_wide_banner.png"
          alt="Premium iPhone Models Showcase"
          width={1920}
          height={500}
          className="w-full h-full object-cover object-[center_right] md:object-[top_right] opacity-40 md:opacity-85"
        />
      </div>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: CTA Content & Buttons */}
          <div className="lg:col-span-7 space-y-10 text-left">
            <div className="space-y-2">
              <span className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-bold uppercase tracking-wider border border-amber-500/20">
                Special Offer
              </span>
              <h3 className="text-2xl md:text-4xl font-black mb-6 tracking-tight text-white leading-tight">
                Free Consultation & Diagnostic
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-slate-300 max-w-xl">
                Not sure what is wrong with your iPhone? Our mobile technician
                can inspect it at your doorstep completely free of charge.{" "}
                <span className="text-primary font-semibold">
                  No repair, no fee!
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div>
                <Button
                  onClick={() => router.push(Routes.BOOKING)}
                  className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold rounded-xl py-5 px-6 flex items-center justify-center gap-2 text-sm transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <span>Book Diagnostic Online</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <a href="tel:0433263105" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 rounded-xl py-5 px-6 text-sm font-bold transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <Phone className="w-4 h-4 animate-pulse" />
                  <span>Call 0433 263 105</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Side: Glassmorphic Diagnostic Form */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              {/* Decorative radial gradient for glassmorphism pop */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

              <h4 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                Need Help?
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Tell us your phone status and we will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-colors duration-200"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    required
                    placeholder="Describe what's wrong (e.g., green screen lines, won't charge, dropped in water...)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary text-xs transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Image Upload Option */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-slate-300 flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                    Upload Phone Photo (Optional):
                  </label>

                  {bannerImage ? (
                    <div className="relative inline-block rounded-xl overflow-hidden border border-white/10 bg-slate-950">
                      <img
                        src={bannerImage}
                        alt="Device Preview"
                        className="max-h-36 object-contain rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setBannerImage("")}
                        className="absolute top-1 right-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 shadow-lg transition-colors duration-150 cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        id="banner-photo-upload"
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
                            setBannerImage(compressedBase64);
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
                        htmlFor="banner-photo-upload"
                        className={`flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-primary bg-slate-950/60 rounded-xl p-3.5 text-center cursor-pointer transition-all duration-200 ${
                          isCompressing ? "opacity-60 pointer-events-none" : ""
                        }`}
                      >
                        {isCompressing ? (
                          <>
                            <Loader2 className="w-4 h-4 text-primary animate-spin mb-1" />
                            <span className="text-[10px] text-slate-400">
                              Compressing image...
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 text-slate-400 mb-1" />
                            <span className="text-[10px] font-semibold text-slate-300">
                              Click to upload phone photo
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/95 text-white font-extrabold rounded-xl py-3.5 px-5 flex items-center justify-center gap-2 text-xs transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <span>Request Free Consultation</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
