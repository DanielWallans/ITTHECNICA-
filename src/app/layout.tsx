import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "IT THECNICA — Tecnologia que impulsiona",
  description:
    "Manutenção de computadores, notebooks e impressoras, desenvolvimento web e sistemas de gestão personalizados.",
  openGraph: {
    title: "IT THECNICA — Tecnologia que impulsiona",
    description: "Do equipamento ao sistema, soluções inteligentes feitas para durar.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#08090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-[#08090b] text-[#f5f5f2] font-sans antialiased selection:bg-[#ff7417] selection:text-black min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
