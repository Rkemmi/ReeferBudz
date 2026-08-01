import type { Metadata } from "next";
import Image from "next/image";
import { EmergencyContactForm } from "../../components/signup-form";
import { ClosingBanner, PageShell } from "../../components/site-chrome";

export const metadata: Metadata = {
  title: "Emergency Contact",
  description: "Add the trusted emergency contact connected to your ReeferBudz safety settings.",
};

export default function EmergencyContact() {
  return (
    <PageShell>
      <section className="signup-page">
        <div className="signup-intro">
          <Image
            className="signup-logo"
            src="/brand/reeferbudz-wordmark.svg"
            alt="ReeferBudz"
            width={320}
            height={116}
            priority
          />
          <div className="signup-copy">
            <p className="eyebrow">Step 2 of 2 · Safety setup</p>
            <h1>Choose someone<br /><span>you trust.</span></h1>
            <p className="hero-lead">
              Add the person who can support your safety plan if a future
              hangout check-in suggests you may need help.
            </p>
            <div className="signup-trust-list">
              <span>Your choice</span>
              <span>Safety use only</span>
              <span>Change anytime</span>
            </div>
          </div>
          <div className="signup-mascot-stage emergency-mascot-stage">
            <span className="signup-bubble bubble-music">Guardian ready</span>
            <span className="signup-bubble bubble-games">Check-ins on</span>
            <span className="signup-bubble bubble-outdoors">Your control</span>
            <Image
              src="/brand/reeferbudz-mascots.svg"
              alt="The ReeferBudz mascot pair representing trusted support"
              width={1024}
              height={682}
              priority
            />
          </div>
        </div>
        <div className="form-card signup-form-card" id="emergency-contact-form">
          <div className="signup-form-heading">
            <span>02</span>
            <div>
              <p>Complete your safety setup</p>
              <h2>Add your trusted contact</h2>
            </div>
          </div>
          <div className="contact-permission-note">
            <strong>Ask before you add them</strong>
            <p>
              Your contact should know that ReeferBudz may reach them only for
              safety purposes you authorize.
            </p>
          </div>
          <EmergencyContactForm />
        </div>
      </section>
      <div className="emergency-closing" id="safety-banner">
        <ClosingBanner
          eyebrow="Safety is part of belonging"
          title="Someone you trust. A plan you control."
          description="Emergency contacts support future Guardian check-ins and hangout alarms—they never replace emergency services."
          actionLabel="Finish safety setup"
          actionHref="#emergency-contact-form"
        />
      </div>
    </PageShell>
  );
}
