import type { Metadata } from "next";
import Link from "next/link";
import { ClosingBanner, PageShell } from "../components/site-chrome";
import { StaticImage as Image } from "../components/static-image";
import { StickerReservationForm } from "../components/sticker-reservation-form";

export const metadata: Metadata = {
  title: "Prelaunch Merch Interest",
  description:
    "Preview the first ReeferBudz merchandise concept and register interest in a possible founding sticker drop.",
};

const products = [
  {
    name: "Starter Sticker Pack",
    type: "Three-piece founding set",
    price: "$10 planned",
    image: "/shop/find-your-bud-sticker.png",
    alt: "Find Your Bud ReeferBudz sticker",
    note: "Find Your Bud, Support Your Local Budz, and Keep the Spark.",
  },
] as const;

export default function Shop() {
  return (
    <PageShell current="shop">
      <section className="shop-hero">
        <div className="shop-hero-copy">
          <p className="eyebrow">Prelaunch merch interest</p>
          <h1>Wear the idea.<br /><span>Help test demand first.</span></h1>
          <p className="hero-lead">
            This page is a lightweight interest check for the first
            ReeferBudz sticker concept. It is not a full store, and nothing is
            being charged today.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#reserve-a-pack">Reserve a $10 pack →</Link>
            <Link className="text-action" href="#founding-drop">See what’s included</Link>
          </div>
          <small>Merchandise concept only · No cannabis · No payment today</small>
        </div>
        <div className="shop-sticker-stack" aria-label="ReeferBudz starter sticker previews">
          <Image src="/shop/find-your-bud-sticker.png" alt="Find Your Bud sticker" width={975} height={975} priority />
          <Image src="/shop/support-local-budz-sticker.png" alt="Support Your Local Budz sticker" width={975} height={975} priority />
          <Image src="/shop/keep-the-spark-sticker.png" alt="Keep the Spark sticker" width={750} height={1050} priority />
        </div>
      </section>

      <section className="shop-purpose" aria-label="What purchases will support">
          <p>Why ask about merch this early?</p>
        <div>
          <span>Safer community tools</span>
          <span>Website development</span>
          <span>Legal preparation</span>
          <span>First-member launch</span>
        </div>
      </section>

      <section className="shop-products" id="founding-drop">
        <div className="section-heading">
          <p className="eyebrow">The Founding Budz Drop</p>
          <h2>Three original stickers. One simple first step.</h2>
          <p>
            These are concept previews from artwork already created for
            ReeferBudz. The planned launch price is $10, but production,
            shipping, and launch timing are still being evaluated.
          </p>
        </div>
        <div className="product-grid product-grid--single">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-art">
                <Image src={product.image} alt={product.alt} width={1400} height={1400} />
                <span>Preview</span>
              </div>
              <div className="product-copy">
                <p>{product.type}</p>
                <h3>{product.name}</h3>
                <strong>{product.price}</strong>
                <p>{product.note}</p>
                <Link href="#reserve-a-pack">Reserve a pack for free →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sticker-reservation" id="reserve-a-pack">
        <div className="sticker-reservation-copy">
          <p className="eyebrow">Interest only</p>
          <h2>Reserve your sticker pack.</h2>
          <p>
            Tell us how many packs you might buy. ReeferBudz can use the total
            to judge whether a small first print run makes sense and email you
            before any payment is ever requested.
          </p>
          <div className="reservation-price"><strong>$10</strong><span>planned price for all three stickers</span></div>
        </div>
        <div className="form-card">
          <span className="form-sticker">First Drop</span>
          <StickerReservationForm />
        </div>
      </section>

      <section className="shop-trust">
        <div>
          <p className="eyebrow">Built responsibly</p>
          <h2>This is not a full store and not a launch requirement.</h2>
        </div>
        <div className="shop-trust-grid">
          <article><strong>Nothing charged yet</strong><p>This preview gathers interest while suppliers, costs, and fulfillment are finalized.</p></article>
          <article><strong>Merchandise only</strong><p>No cannabis is sold, shipped, delivered, or included in any ReeferBudz product.</p></article>
          <article><strong>Safety stays free</strong><p>Reporting, blocking, privacy, and essential safety features will never depend on a purchase.</p></article>
        </div>
      </section>

      <ClosingBanner
        eyebrow="Help light the first spark"
        title="Start small. Keep the spark moving."
        description="Reserve a pack now so the first print run matches real demand. Nothing is charged today."
        scene="gathering"
        sceneLabel="Built by the Budz"
        mascotAlt="The two ReeferBudz mascots together beside the lakefront community circle"
        actionLabel="Reserve my pack—free"
        actionHref="#reserve-a-pack"
      />
    </PageShell>
  );
}
