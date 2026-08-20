import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Masthead } from "@/components/site/masthead";
import { Footer } from "@/components/site/footer";
import { profile } from "@/content/profile";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — security operations and IT infrastructure`,
    template: `%s — ${profile.name}`,
  },
  description:
    "SIEM deployment, identity and access management, threat intelligence and APT analysis, written up in full with the screenshots to back it up.",
  openGraph: {
    title: `${profile.name} — security operations and IT infrastructure`,
    description:
      "Four hands-on security write-ups: SIEM deployment, IAM, threat intelligence, APT analysis.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plex.variable} ${plexMono.variable} h-full`}
    >
      <body className="grain flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Masthead />
        <main id="main" className="relative z-0 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
