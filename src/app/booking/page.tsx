import { BookingContent } from "@/app/booking/page.client";
import React from "react";
import { Metadata } from "next";

const url = "https://wefixiphone.com.au/booking";
const title = "Book an On-Site iPhone Repair";
const description =
  "Schedule your mobile iPhone screen or battery replacement on-site in Sydney. Choose your location, date, and time, and our technician will come to you.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "WeFixiPhone",
  alternates: {
    canonical: url,
    languages: {
      "en-AU": url,
    },
  },
  openGraph: {
    title,
    description,
    url,
    siteName: "WeFixiPhone",
    images: [
      {
        url: "/hero_repair.png",
        width: 1200,
        height: 630,
        alt: "Book an On-Site iPhone Repair - WeFixiPhone",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/hero_repair.png"],
    creator: "@wefixiphone",
  },
};

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
