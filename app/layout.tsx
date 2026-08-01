import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReeferBudz | Find Your Smoke Circle",
    description:
      "Friendship and community for cannabis-friendly adults 21+.",
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
