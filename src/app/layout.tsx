import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Base metadata setting
const baseUrl = "https://wefixiphone-sydney.com.au";
const siteName = "WeFixiPhone";
const description =
  "Dịch vụ sửa chữa iPhone tận nơi chuyên nghiệp tại Sydney. Thay màn hình, thay pin lấy ngay trong 20 phút trước mặt khách hàng. Bảo hành 12 tháng, thợ sửa đến tận nơi.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} - Sửa chữa iPhone tận nơi tại Sydney`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "sửa iphone tận nơi sydney",
    "thay màn hình iphone sydney",
    "thay pin iphone sydney",
    "sửa iphone tại nhà sydney",
    "iphone screen replacement sydney",
    "iphone battery replacement sydney",
    "sửa chữa điện thoại sydney",
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
    title: `${siteName} - Sửa chữa iPhone tận nơi tại Sydney`,
    description,
    siteName,
    images: [
      {
        url: `/hero_repair.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Sửa iPhone tận nơi`,
      },
    ],
    locale: "en_AU",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Sửa chữa iPhone tận nơi tại Sydney`,
    description,
    images: [`/hero_repair.png`],
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
    ],
    apple: "/logo-maskable.png",
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
    google: "your-google-search-console-id",
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
              image: `${baseUrl}/hero_repair.png`,
              description,
              url: baseUrl,
              telephone: "+61-451 210 238",
              email: "info@wefixiphone.com.au",
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
                reviewCount: "2000",
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
              logo: `${baseUrl}/hero_repair.png`,
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
        </ThemeProvider>
      </body>
    </html>
  );
}
