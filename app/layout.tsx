import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AgeGate } from "@/components/access/age-gate";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://games.gaybkk.co"),
  title: {
    default: "GAYBKK GAMES — Play Bold. Stay Fabulous.",
    template: "%s · GAYBKK GAMES",
  },
  description:
    "แพลตฟอร์มมินิเกมและปาร์ตี้สำหรับผู้ใหญ่ 18+ จากชุมชน gaybkk.co",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body>
        <AgeGate>
          <div className="site-frame">
            <SiteHeader />
            <main className="site-main">{children}</main>
            <SiteFooter />
          </div>
        </AgeGate>
      </body>
    </html>
  );
}
