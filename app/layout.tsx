import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://reeferbudz-community.rkemmi.chatgpt.site"),
  title: {
    default: "ReeferBudz | Find Your Smoke Circle",
    template: "%s | ReeferBudz",
  },
  description:
    "A 21+ friendship-first community for cannabis-friendly adults to make friends, discover local connections, and find their smoke circle.",
  openGraph: {
    title: "ReeferBudz | Find Your Smoke Circle",
    description:
      "Friendship and community for cannabis-friendly adults 21+.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ReeferBudz mascots setting up a Cleveland lakefront community gathering" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReeferBudz | Find Your Smoke Circle",
    description:
      "Friendship and community for cannabis-friendly adults 21+.",
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
