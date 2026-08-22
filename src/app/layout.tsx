
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://archstrucgroup.com"),

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },

  title: {
    default: "Archstruc Group | Architectural & Engineering Solutions",
    template: "%s | Archstruc Group",
  },

  description:
    "Archstruc Group provides architectural design, structural engineering, construction and project solutions in Kenya.",

  applicationName: "Archstruc Group",

  keywords: [
    "Archstruc Group",
    "Archstruc",
    "architecture Kenya",
    "architectural design Kenya",
    "structural engineering Kenya",
    "construction Kenya",
    "building design Kenya",
    "engineering services Kenya",
    "construction company Kenya",
  ],

  alternates: {
    canonical: "https://archstrucgroup.com/",
  },

  openGraph: {
    type: "website",
    url: "https://archstrucgroup.com/",
    siteName: "Archstruc Group",
    title: "Archstruc Group | Architectural & Engineering Solutions",
    description:
      "Architectural design, structural engineering, construction and project solutions in Kenya.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Archstruc Group logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Archstruc Group | Architectural & Engineering Solutions",
    description:
      "Architectural design, structural engineering, construction and project solutions in Kenya.",
    images: ["/icon.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://archstrucgroup.com/#website",
      name: "Archstruc Group",
      alternateName: "Archstruc",
      url: "https://archstrucgroup.com/",
    },
    {
      "@type": "Organization",
      "@id": "https://archstrucgroup.com/#organization",
      name: "Archstruc Group",
      url: "https://archstrucgroup.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://archstrucgroup.com/icon.png",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

