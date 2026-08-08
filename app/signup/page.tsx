import type { Metadata } from "next";
import Link from "next/link";
import { ClosingBanner, PageShell } from "../components/site-chrome";
import { StaticImage as Image } from "../components/static-image";

export const metadata: Metadata = {
  title: "Create Your Account",
  description: "Start your ReeferBudz account with secure hosted sign-in, then build your friendship-first member profile.",
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
            <p className="eyebrow">Step 1 of 2 · Secure account access</p>
            <h1>Your circle<br /><span>starts here.</span></h1>
            <p className="hero-lead">
              Sign in securely, then build a profile around your interests,
              boundaries, and the friendships you want to find.
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
              <p>First things first</p>
              <h2>Access your account securely</h2>
            </div>
          </div>
          <div className="signup-form account-form auth-entry">
            <p className="auth-kicker">No ReeferBudz password required</p>
            <h3>One secure sign-in. Then make the profile yours.</h3>
            <p>Our hosted sign-in provider handles account access, so ReeferBudz never receives or stores your password.</p>
            <Link className="button auth-primary-action" href="/signin-with-chatgpt?return_to=%2Fonboarding">
              Continue with secure sign-in <span aria-hidden="true">→</span>
            </Link>
            <ol className="signup-next-steps" aria-label="What happens next">
              <li><span>1</span><div><strong>Sign in securely</strong><p>Confirm control of your sign-in email.</p></div></li>
              <li><span>2</span><div><strong>Complete member setup</strong><p>Add your birthday, accept the community promise, and choose your privacy settings.</p></div></li>
              <li><span>3</span><div><strong>Build your circle</strong><p>Share interests and friendship goals when you are ready.</p></div></li>
            </ol>
            <div className="auth-explainer">
              <strong>Clear and honest age gating</strong>
              <p>Your provider confirms control of your sign-in email. During member setup, you’ll enter your birthday and self-attest that you are 21 or older. ReeferBudz does not currently verify legal identity or age through a third-party service.</p>
            </div>
            <p className="auth-signin-note">Already started? <Link href="/signin-with-chatgpt?return_to=%2Fmember">Sign in to Member Home</Link></p>
          </div>
        </div>
      </section>
      <ClosingBanner
        eyebrow="Ready when you are"
        title="Bring your interests. Keep your boundaries."
        description="Secure sign-in opens the door. You stay in control of the profile and privacy choices that shape your ReeferBudz experience."
        scene="signup"
        sceneLabel="Making your place in the circle"
        mascotAlt="The ReeferBudz mascots setting up a new member's interest table"
        actionLabel="Start secure sign-in"
        actionHref="/signin-with-chatgpt?return_to=%2Fonboarding"
      />
    </PageShell>
  );
}
