import React from "react";
import LayoutComponents from "@/components/layouts/LayoutComponents";
import { BookingWizard } from "@/modules/booking/components/BookingWizard";
import { Metadata } from "next";

const url = "https://www.wefixiphone.com.au/booking";
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
        url: "/logo_1200x630.png",
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
    images: ["/logo_1200x630.png"],
    creator: "@wefixiphone",
  },
};

interface BookingPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const resolvedSearchParams = await searchParams;

  const model = (resolvedSearchParams.model as string) || "iphone-15-pro-max";
  const part = (resolvedSearchParams.part as string) || "screen";
  const quality = (resolvedSearchParams.quality as string) || "Premium Quality";
  const price = resolvedSearchParams.price
    ? parseInt(resolvedSearchParams.price as string)
    : 0;

  return (
    <LayoutComponents fullWidth>
      <div className="w-full min-h-screen bg-primary/20 dark:bg-slate-950 text-slate-900 dark:text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <React.Suspense
              fallback={
                <div className="min-h-[400px] flex items-center justify-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
                  <span className="text-sm text-slate-500 animate-pulse font-semibold">
                    Loading booking form...
                  </span>
                </div>
              }
            >
              <BookingWizard
                initialModel={model}
                initialPart={part}
                initialQuality={quality}
                initialPrice={price}
              />
            </React.Suspense>
          </div>
        </div>
      </div>
    </LayoutComponents>
  );
}
