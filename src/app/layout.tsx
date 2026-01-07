import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  metadataBase: new URL('https://corvicac.org'),
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}