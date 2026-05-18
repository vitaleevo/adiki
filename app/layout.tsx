import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
import { site } from "@/lib/site-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Material gastável de escritório em Angola`,
    template: `%s | ${site.shortName}`
  },
  description: site.description,
  keywords: [
    "material de escritório Angola",
    "papelaria corporativa Luanda",
    "material gastável escritório",
    "fornecedor de escritório",
    "ADIKI ALVANIR Angola"
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "pt_AO",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Soluções profissionais para escritório`,
    description: site.description,
    images: [
      {
        url: "/brand/adiki-logo-gold.png",
        width: 1600,
        height: 1600,
        alt: site.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/brand/adiki-logo-gold.png"]
  },
  icons: {
    icon: "/brand/adiki-logo-gold.png",
    apple: "/brand/adiki-logo-gold.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida 4 de Fevereiro, Nº 23",
      addressLocality: "Ingombota",
      addressRegion: "Luanda",
      addressCountry: "AO"
    },
    sameAs: Object.values(site.socials)
  };

  return (
    <html lang="pt-AO" className={`${inter.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
