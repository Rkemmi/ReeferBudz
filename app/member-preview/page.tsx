import type { Metadata } from "next";
import LiveReeferBudzPage from "../member/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live ReeferBudz Preview",
  robots: { index: false, follow: false },
};

export default async function LiveReeferBudzPreview() {
  return LiveReeferBudzPage({
    searchParams: Promise.resolve({ preview: "1" }),
  });
}
