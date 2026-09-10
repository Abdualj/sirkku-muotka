import type { Metadata } from "next";
import { Caveat, Work_Sans } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import { sanityFetch } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sirkku Muotka",
  description: "Selected works by artist Sirkku Muotka.",
};

type SiteSettings = { siteTitle?: string; brandName?: string };

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const siteSettings = await sanityFetch<SiteSettings>(siteSettingsQuery);
  const brandName = siteSettings?.brandName || "Sirkku\nMuotka";

  return (
    <html lang="en" className={`${caveat.variable} ${workSans.variable}`}>
      <body>
        <div className="layout">
          <Sidebar brandName={brandName} />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
