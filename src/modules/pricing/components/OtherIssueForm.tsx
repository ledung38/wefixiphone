"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Upload, Trash2, Image as ImageIcon } from "lucide-react";
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
        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Free Diagnostic Request (Pricing Page)</p>
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

export const OtherIssueForm = () => {
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formImage, setFormImage] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formName.trim() ||
      !formPhone.trim() ||
      !formEmail.trim() ||
      !formDesc.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setFormSubmitting(true);
    try {
      const emailContent = generateDiagnosticEmailHTML({
        name: formName,
        phone: formPhone,
        email: formEmail,
        description: formDesc,
        deviceImage: formImage || undefined,
      });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formEmail,
          subject: `🔍 Free Diagnostic Inquiry – ${formName}`,
          message: emailContent,
          deviceImage: formImage || undefined,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        toast.success("Request sent successfully! We will contact you soon.");
        setFormName("");
        setFormPhone("");
        setFormEmail("");
        setFormDesc("");
        setFormImage("");
      } else {
        toast.error(
          "Failed to send request. Please check your network or try again.",
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left side: Info */}
        <div className="space-y-5">
          <div className="space-y-3">
            <span className="inline-flex px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wider border border-amber-500/20">
              Free Diagnostic
            </span>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              {`Not Sure What's Wrong?`}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-md">
              Our mobile technician can inspect your iPhone at your doorstep
              completely free of charge.{" "}
              <span className="text-primary font-semibold">
                No repair, no fee!
              </span>
            </p>
          </div>

          <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              Free on-site diagnostic at your home or office
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              No obligation – only pay if you decide to repair
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              Sydney-wide coverage, 7 days a week
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
              {`We'll contact you within 1 hour to schedule`}
            </li>
          </ul>
        </div>

        {/* Right side: Glassmorphic Form */}
        <div className="bg-primary/5 dark:bg-primary/10 backdrop-blur-md border border-primary/20 dark:border-primary/15 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-2">
            Describe Your Issue
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Tell us your phone status and we will get back to you shortly.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            <div>
              <input
                type="text"
                required
                placeholder="Your Full Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-white/95 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-xs transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Phone Number"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full bg-white/95 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-xs transition-all duration-200"
                />
              </div>
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-white/95 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-xs transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <textarea
                required
                placeholder="Describe symptoms (e.g., green screen, won't turn on, dropped in water...)"
                value={formDesc}
                onChange={(e) => setFormDesc(e.target.value)}
                rows={3}
                className="w-full bg-white/95 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 rounded-xl py-2.5 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-xs transition-all duration-200 resize-none"
              />
            </div>

            {/* Image Upload Option */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-bold text-slate-700 dark:text-slate-350 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5 text-primary" />
                Upload Phone Photo (Optional):
              </label>

              {formImage ? (
                <div className="relative inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950">
                  <img
                    src={formImage}
                    alt="Device Preview"
                    className="max-h-36 object-contain rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setFormImage("")}
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
                    id="pricing-photo-upload"
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
                        setFormImage(compressedBase64);
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
                    htmlFor="pricing-photo-upload"
                    className={`flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-white/10 hover:border-primary dark:hover:border-primary/50 bg-white dark:bg-slate-950/40 rounded-xl p-3.5 text-center cursor-pointer transition-all duration-200 ${
                      isCompressing ? "opacity-60 pointer-events-none" : ""
                    }`}
                  >
                    {isCompressing ? (
                      <>
                        <Loader2 className="w-4 h-4 text-primary animate-spin mb-1" />
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">
                          Compressing image...
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-slate-400 dark:text-slate-500 mb-1" />
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-350">
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
              disabled={formSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-xs transition-all shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 transform active:scale-[0.98] duration-150 cursor-pointer disabled:opacity-50"
            >
              {formSubmitting ? (
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
  );
};
