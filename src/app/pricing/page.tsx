import React from "react";
import LayoutComponents from "@/components/layouts/LayoutComponents";
import { TextGradient } from "@/components/common/TextGradient";
import { REPAIR_PRICES } from "@/lib/data/repairPrices";
import {
  IPHONE_MODELS,
  PARTS,
  SERVICE_DETAILS,
} from "@/modules/pricing/constants/data";
import { SearchFilters } from "@/modules/pricing/components/SearchFilters";
import { PricingCards } from "@/modules/pricing/components/PricingCards";
import { SingleServiceCard } from "@/modules/pricing/components/SingleServiceCard";
import { TechComparison } from "@/modules/pricing/components/TechComparison";
import { ServiceDetails } from "@/modules/pricing/components/ServiceDetails";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const model = (resolvedSearchParams.model as string) || "iphone-16-pro-max";
  const part = (resolvedSearchParams.part as string) || "screen";

  const modelData =
    IPHONE_MODELS.find((m) => m.id === model) || IPHONE_MODELS[0];
  const partData = PARTS.find((p) => p.id === part) || PARTS[0];

  const modelName = modelData.name;
  const partName = partData.name;

  const title = `${modelName} ${partName} Price | On-Site Sydney - WeFixiPhone`;
  const description = `Check transparent pricing for ${modelName} ${partName.toLowerCase()} on-site in Sydney. Premium repair completed at your home or office in 20 mins with 12-month warranty.`;
  const canonicalUrl = `https://www.wefixiphone.com.au/pricing?model=${model}&part=${part}`;

  return {
    title,
    description,
    applicationName: "WeFixiPhone",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-AU": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "WeFixiPhone",
      images: [
        {
          url: "/logo_1200x630.png",
          width: 1200,
          height: 630,
          alt: `${modelName} ${partName} - WeFixiPhone`,
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
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const model = (resolvedSearchParams.model as string) || "iphone-16-pro-max";
  const part = (resolvedSearchParams.part as string) || "screen";

  const modelData =
    IPHONE_MODELS.find((m) => m.id === model) || IPHONE_MODELS[0];
  const prices = REPAIR_PRICES[model] || REPAIR_PRICES["iphone-x"];

  const isTiered = part === "screen" || part === "battery";

  const tierPrices =
    part === "screen"
      ? {
          standard: prices.screenStandard,
          premium: prices.screenPremium,
          genuine: prices.screenGenuine,
        }
      : {
          standard: prices.batteryStandard,
          premium: prices.batteryPremium,
          genuine: prices.batteryGenuine,
        };

  const singleServicePrice = (() => {
    switch (part) {
      case "back-glass":
        return prices.backGlass;
      case "charging":
        return prices.chargingPort;
      case "camera":
        return prices.camera;
      case "audio":
        return prices.audio;
      case "housing":
        return prices.housing;
      case "software":
        return prices.software;
      default:
        return 99;
    }
  })();

  const serviceDetail = SERVICE_DETAILS[part];

  return (
    <LayoutComponents fullWidth>
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header text */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <TextGradient
              as="h1"
              className="text-4xl sm:text-5xl font-black tracking-tight leading-tight"
            >
              Transparent Pricing
            </TextGradient>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
              Our all-inclusive pricing covers replacement parts, local
              technician travel costs, and professional on-site installation. No
              hidden fees, guaranteed.
            </p>
          </div>

          {/* Calculator Section */}
          <SearchFilters selectedModel={model} selectedPart={part} />

          {/* Pricing cards grid */}
          {isTiered ? (
            <>
              <PricingCards
                selectedModel={model}
                selectedPart={part}
                prices={tierPrices}
              />
              <TechComparison modelName={modelData.name} selectedPart={part} />
            </>
          ) : (
            serviceDetail && (
              <SingleServiceCard
                selectedModel={model}
                selectedPart={part}
                price={singleServicePrice}
                modelName={modelData.name}
                serviceDetails={serviceDetail}
              />
            )
          )}

          {/* General Information Callout */}
          <div className="max-w-4xl mx-auto">
            <ServiceDetails />
          </div>
        </div>
      </div>
    </LayoutComponents>
  );
}
