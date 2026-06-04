import Home from "@/modules/home/index";
import LayoutComponents from "@/components/layouts/LayoutComponents";
import { Metadata } from "next";

const url = "https://wefixiphone.com.au";
const title = "WeFixiPhone - Mobile On-Site iPhone Repair Sydney";
const description =
  "Professional on-site iPhone screen & battery replacements in Sydney. Done in 20 minutes in front of you. 12-month warranty, direct doorstep service.";

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
        alt: "WeFixiPhone - On-Site iPhone Repair",
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

export default function HomePage() {
  return (
    <LayoutComponents fullWidth>
      <Home />
    </LayoutComponents>
  );
}
