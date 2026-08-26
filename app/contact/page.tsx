import type { Metadata } from "next";
import Link from "next/link";
import { ClosingBanner, PageShell } from "../components/site-chrome";
import { StaticImage as Image } from "../components/static-image";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
  return (
    <PageShell current="contact">
      <div className="rb-public-page rb-contact-page">
        <section className="rb-cleveland-hero rb-cleveland-hero--contact">
          <Image
            className="rb-cleveland-hero-image"
            src="/brand/scenes/live-cleveland-hero.jpg"
            alt="Downtown Cleveland glowing at night behind the contact page"
            fill
            priority
            sizes="100vw"
          />
          <div className="rb-cleveland-hero-copy">
            <p className="rb-eyebrow">Contact</p>
            <h1>We’d love to hear from you.</h1>
            <p>
              Have a question, need help, or want to share something with the
              ReeferBudz™ team? Send us a message and we&apos;ll make sure it gets
              to the right place.
            </p>
          </div>
          <aside className="rb-cleveland-card">
            <strong>Cleveland, OH</strong>
            <p>Cleveland born.<br />Friendship first.</p>
          </aside>
        </section>

        <section className="rb-contact-layout">
          <div className="rb-contact-form">
            <h2>Reach the right inbox</h2>
            <p>
              ReeferBudz is still growing its support workflows. For now, the
              clearest path is to email the purpose that best matches your
              message.
            </p>
            <p>
              General response timing is still being established, so please do
              not use email for emergencies or urgent in-the-moment safety help.
            </p>
            <div className="rb-contact-direct-list" aria-label="Direct ReeferBudz contact routes">
              <article>
                <h3>Member support</h3>
                <p>Questions about sign-in, onboarding, account access, or privacy settings.</p>
                <a className="button button-small" href="mailto:support@reeferbudz.com">support@reeferbudz.com</a>
              </article>
              <article>
                <h3>Safety concern</h3>
                <p>Report something uncomfortable, inappropriate, or concerning.</p>
                <a className="button button-small" href="mailto:safety@reeferbudz.com">safety@reeferbudz.com</a>
              </article>
              <article>
                <h3>Press or business</h3>
                <p>Partnership questions, media outreach, or founder-facing business requests.</p>
                <a className="button button-small" href="mailto:hello@reeferbudz.com">hello@reeferbudz.com</a>
              </article>
              <article>
                <h3>Founder feedback</h3>
                <p>Ideas, encouragement, and thoughtful early feedback on the community direction.</p>
                <a className="button button-small" href="mailto:founder@reeferbudz.com">founder@reeferbudz.com</a>
              </article>
            </div>
          </div>

          <div className="rb-contact-cards">
            <article>
              <h3>What to include</h3>
              <p>Your name, the email tied to your account if relevant, the page or issue you hit, and the best way to reply.</p>
            </article>
            <article>
              <h3>What not to send</h3>
              <p>Do not send passwords, payment details, government ID images, or anyone else’s private information.</p>
            </article>
            <article>
              <h3>Emergency reminder</h3>
              <p>
                ReeferBudz does not monitor email as an emergency response
                channel. If someone is in immediate danger, contact local
                emergency services right away.
              </p>
            </article>
            <article>
              <h3>Current reality</h3>
              <p>Some support and moderation workflows are still being built, so honest routing matters more than a fancy form right now.</p>
            </article>
          </div>
        </section>

        <ClosingBanner
          eyebrow="Good finds."
          title={
            <>
              <span>Good friends.</span>
            </>
          }
          description={
            <>
              Sometimes the best connections start with simply
              <br />
              getting out, exploring your city, and sharing the day
              <br />
              with a friend.
            </>
          }
          scene="contact"
          sceneLabel="Cleveland community day"
          mascotAlt="The ReeferBudz mascots exploring Cleveland together"
        />
        <section className="rb-contact-support">
          <h2>Need immediate help?</h2>
          <p>
            ReeferBudz does not provide emergency services. If you or someone
            else is in immediate danger, contact your local emergency services.
          </p>
          <Link className="text-action" href="/safety">
            Review Safety guidance →
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
