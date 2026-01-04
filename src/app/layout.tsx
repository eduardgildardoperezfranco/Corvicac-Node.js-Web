import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CORVICAC - Justicia, Igualdad, Respeto",
    template: "%s | CORVICAC"
  },
  description: "Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano. Trabajamos por la reconstrucción del tejido social y la defensa de los derechos humanos.",
  keywords: ["CORVICAC", "ONG", "Colombia", "conflicto armado", "víctimas", "derechos humanos", "justicia", "paz"],
  authors: [{ name: "CORVICAC" }],
  creator: "CORVICAC",
  publisher: "CORVICAC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://corvicac.org",
    title: "CORVICAC - Justicia, Igualdad, Respeto",
    description: "Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano",
    siteName: "CORVICAC",
    images: [
      {
        url: "/LogoCorvicac3D.png",
        width: 1200,
        height: 630,
        alt: "CORVICAC Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CORVICAC - Justicia, Igualdad, Respeto",
    description: "Corporación de Afrocolombianos y Mestizos Víctimas del Conflicto Armado Interno Colombiano",
    images: ["/LogoCorvicac3D.png"],
    creator: "@CORVICAC",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://corvicac.org",
    languages: {
      'es-CO': 'https://corvicac.org/es',
    },
  },
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import StructuredData from "@/components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${poppins.variable}`}
      itemScope
      itemType="https://schema.org/WebPage"
    >
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#1E7F43" />
        <meta name="msapplication-TileColor" content="#1E7F43" />
        <StructuredData type="NGO" />
      </head>
      <body
        className="antialiased flex flex-col min-h-screen"
        itemProp="mainContentOfPage"
        suppressHydrationWarning
      >
        <Header />
        <div className="flex-grow">
          <Container maxWidth="full" padding="md">
            {children}
          </Container>
        </div>
        <Footer />
        <AccessibilityPanel />
      </body>
    </html>
  );
}
