import type { Metadata } from "next";
import Image from "next/image";
import { SignupForm } from "../components/signup-form";
import { ClosingBanner, PageShell } from "../components/site-chrome";

export const metadata: Metadata = {
  title: "Create Your Account",
  description: "Start your ReeferBudz account and set up the safety information needed for community access.",
};

export default function Signup() {
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
            <p className="eyebrow">Step 1 of 2 · Account details</p>
            <h1>Come on in.<br /><span>Your circle is forming.</span></h1>
            <p className="hero-lead">
              Create your account, bring your interests, and help make
              ReeferBudz the kind of community you actually want to join.
            </p>
            <div className="signup-trust-list">
              <span>21+ community</span>
              <span>Friendship first</span>
              <span>Safety from day one</span>
            </div>
          </div>
          <div className="signup-mascot-stage">
            <span className="signup-bubble bubble-music">Music?</span>
            <span className="signup-bubble bubble-games">Gaming?</span>
            <span className="signup-bubble bubble-outdoors">Outdoors?</span>
            <Image
              src="/brand/reeferbudz-mascots.svg"
              alt="The ReeferBudz mascot pair welcoming a new member"
              width={1024}
              height={682}
              priority
            />
          </div>
        </div>
        <div className="form-card signup-form-card" id="signup-form">
          <div className="signup-form-heading">
            <span>01</span>
            <div>
              <p>Start with the basics</p>
              <h2>Create your account</h2>
            </div>
          </div>
          <SignupForm />
        </div>
      </section>
      <ClosingBanner
        eyebrow="One step closer"
        title="Account details done. High five."
        description="Next, choose the trusted emergency contact who will be part of your personal safety plan."
        actionLabel="Continue your signup"
        actionHref="#signup-form"
      />
    </PageShell>
  );
}
