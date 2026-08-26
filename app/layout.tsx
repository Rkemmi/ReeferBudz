import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl, isPublicLaunchMode } from "./launch-mode";

const siteUrl = getSiteUrl();
const launchDescription =
  "ReeferBudz is a Cleveland-born 21+ friendship-first social community for cannabis-friendly adults. Join the launch list to hear when opening access begins.";
const defaultDescription =
  "A 21+ friendship-first community for cannabis-friendly adults to make friends, discover local connections, and find their smoke circle.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReeferBudz | Find Your Smoke Circle",
    template: "%s | ReeferBudz",
  },
  description: isPublicLaunchMode() ? launchDescription : defaultDescription,
  openGraph: {
    title: "ReeferBudz | Find Your Smoke Circle",
    description: isPublicLaunchMode() ? launchDescription : "Friendship and community for cannabis-friendly adults 21+.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ReeferBudz mascots setting up a Cleveland lakefront community gathering" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReeferBudz | Find Your Smoke Circle",
    description: isPublicLaunchMode() ? launchDescription : "Friendship and community for cannabis-friendly adults 21+.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/brand/reeferbudz-emblem.svg",
    shortcut: "/brand/reeferbudz-emblem.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
