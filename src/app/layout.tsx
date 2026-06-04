import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/Sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Base metadata setting
const baseUrl = "https://www.wefixiphone.com.au";
const siteName = "WeFixiPhone";
const description =
  "Professional mobile on-site iPhone repair in Sydney. Screen and battery replacements completed in 20 minutes right in front of you. 12-month warranty, direct doorstep service.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} - On-Site iPhone Repair in Sydney`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "on-site iphone repair sydney",
    "iphone screen replacement sydney",
    "iphone battery replacement sydney",
    "home iphone repair sydney",
    "iphone screen replacement sydney",
    "iphone battery replacement sydney",
    "mobile phone repair sydney",
    "wefixiphone sydney",
  ],
  authors: [
    {
      name: "WeFixiPhone Sydney",
      url: baseUrl,
    },
  ],
  creator: "WeFixiPhone Sydney",
  publisher: "WeFixiPhone Sydney",

  // Open Graph
  openGraph: {
    type: "website",
    url: baseUrl,
    title: `${siteName} - On-Site iPhone Repair in Sydney`,
    description,
    siteName,
    images: [
      {
        url: `/logo_1200x630.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} - On-Site iPhone Repair`,
      },
    ],
    locale: "en_AU",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - On-Site iPhone Repair in Sydney`,
    description,
    images: [`/logo_1200x630.png`],
    creator: "@wefixiphone",
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },

  // Canonical
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-AU": `${baseUrl}`,
    },
  },

  // Icons
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/logo_500x500.png",
  },

  // Manifest
  manifest: "/site.webmanifest",

  // App links
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteName,
  },

  // Verification
  verification: {
    google: "3Xa-dmqbOguKwSdaIQreaUQEJFoelDE0qtndSRF8D-M",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* <meta name="google-site-verification" content="3Xa-dmqbOguKwSdaIQreaUQEJFoelDE0qtndSRF8D-M" /> */}
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": baseUrl,
              name: "WeFixiPhone Sydney",
              image: `${baseUrl}/logo_1200x630.png`,
              description,
              url: baseUrl,
              telephone: "+61-433 263 105",
              email: "wefixiphone102@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Sydney, NSW",
                addressLocality: "Sydney",
                addressRegion: "NSW",
                postalCode: "2000",
                addressCountry: "AU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "-33.8688",
                longitude: "151.2093",
              },
              sameAs: [
                "https://www.facebook.com/wefixiphone.sydney",
                "https://www.instagram.com/wefixiphone.sydney",
              ],
              priceRange: "$$",
              areaServed: "Sydney, NSW, Australia",
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "-33.8688",
                  longitude: "151.2093",
                },
                geoRadius: "50",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "50",
              },
            }),
          }}
        />

        {/* Structured Data - Organization (Schema.org) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WeFixiPhone Sydney",
              url: baseUrl,
              logo: `${baseUrl}/logo_500x500.png`,
              description,
              sameAs: [
                "https://www.facebook.com/wefixiphone.sydney",
                "https://www.instagram.com/wefixiphone.sydney",
              ],
            }),
          }}
        />

        {/* Breadcrumb Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: baseUrl,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Pricing",
                  item: `${baseUrl}/pricing`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Booking",
                  item: `${baseUrl}/booking`,
                },
              ],
            }),
          }}
        />

        {/* Apple icons */}
        <link rel="apple-touch-icon" href="/logo-maskable.png" />

        {/* Android Chrome */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader
            color="var(--primary)"
            zIndex={100000}
            showSpinner={false}
            crawlSpeed={200}
            crawl={true}
            height={3}
          />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
