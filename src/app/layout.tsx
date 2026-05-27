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
const baseUrl = "https://spotless-cleaning-psi.vercel.app";
const siteName = "Spotless Cleaning";
const description =
  "Professional cleaning services in Sydney. Deep cleaning, regular maintenance, end of lease cleaning, restaurant and mould cleaning. 2000+ happy clients, 8+ years experience.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteName} - Professional Cleaning Services Sydney`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "cleaning services Sydney",
    "house cleaning",
    "deep cleaning",
    "restaurant cleaning",
    "end of lease cleaning",
    "professional cleaners",
    "residential cleaning",
    "commercial cleaning",
    "window cleaning",
    "regular cleaning",
  ],
  authors: [
    {
      name: "Spotless Cleaning",
      url: baseUrl,
    },
  ],
  creator: "Spotless Cleaning",
  publisher: "Spotless Cleaning",

  // Open Graph
  openGraph: {
    type: "website",
    url: baseUrl,
    title: `${siteName} - Professional Cleaning Services Sydney`,
    description,
    siteName,
    images: [
      {
        url: `/screenshot-wide.png`,
        width: 1200,
        height: 630,
        alt: `${siteName} - Professional Cleaning`,
      },
    ],
    locale: "en_AU",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Professional Cleaning Services Sydney`,
    description,
    images: [`/screenshot-wide.png`],
    creator: "@spotlesscleaning",
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
              name: "Spotless Cleaning",
              image: `${baseUrl}/og-image.jpg`,
              description,
              url: baseUrl,
              telephone: "+61-451 210 238",
              email: "cleaningsydney102@gmail.com",
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
                "https://www.facebook.com/sydney.spotlesscleaning",
                "https://www.instagram.com/sydney.spotlesscleaning",
                "https://www.google.com/maps/place/Spotless+Cleaning",
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
              name: "Spotless Cleaning",
              url: baseUrl,
              logo: `${baseUrl}/logo.png`,
              description,
              sameAs: [
                "https://www.facebook.com/sydney.spotlesscleaning",
                "https://www.instagram.com/sydney.spotlesscleaning",
                "https://www.google.com/maps/place/Spotless+Cleaning",
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
                  name: "Services",
                  item: `${baseUrl}/service`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Booking",
                  item: `${baseUrl}/booking`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "About Us",
                  item: `${baseUrl}/about-us`,
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Pricing",
                  item: `${baseUrl}/pricing`,
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
          defaultTheme="system"
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
