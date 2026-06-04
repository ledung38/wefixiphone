import PricingPage from "@/app/pricing/page.client";
import { Metadata } from "next";

const url = "https://www.wefixiphone.com.au/pricing";
const title = "Transparent iPhone Repair Pricing";
const description =
  "Check pricing for screen replacements, battery replacements, and other repairs for all iPhone models (iPhone X to iPhone 17 series) on-site in Sydney.";

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
        alt: "Transparent iPhone Repair Pricing - WeFixiPhone",
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

export default function Page() {
  return <PricingPage />;
}
