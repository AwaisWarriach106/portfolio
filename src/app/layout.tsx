import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { profile } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${profile.name} — Full-stack engineer`,
    template: `%s · ${profile.name}`,
  },
  description: `${profile.headline} Based in ${profile.location}.`,
  openGraph: {
    title: `${profile.name} — Portfolio`,
    description: profile.headline,
    type: "website",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Portfolio`,
    description: profile.headline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
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
      <body className="min-h-full flex flex-col text-base font-normal leading-relaxed text-zinc-300 antialiased">
        <a
          href="#main-content"
          className="fixed left-4 z-[200] -translate-y-[140%] rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg transition-transform duration-200 focus:translate-y-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--accent)]"
          style={{ top: "max(0.75rem, env(safe-area-inset-top, 0px))" }}
        >
          Skip to main content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
