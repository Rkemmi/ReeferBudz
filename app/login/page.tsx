import type { Metadata } from "next";
import Link from "next/link";
import { StaticImage as Image } from "../components/static-image";

export const metadata: Metadata = {
  title: "Log In",
  description: "Return to your ReeferBudz member circle through secure hosted sign-in.",
  robots: { index: false, follow: false },
};

const signInHref = "/signin-with-chatgpt?return_to=%2Fmember";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-welcome" aria-labelledby="login-title">
        <Link className="login-brand" href="/" aria-label="ReeferBudz home">
          <Image
            src="/brand/reeferbudz-wordmark.svg"
            alt="ReeferBudz"
            width={320}
            height={116}
            priority
          />
        </Link>

        <div className="login-welcome-copy">
          <p className="eyebrow eyebrow-light">Welcome back, Bud</p>
          <h1 id="login-title">Your circle is right where you left it.</h1>
          <p>
            Pick up your profile, discover community-minded Budz, and keep
            building friendships that feel real.
          </p>
        </div>

        <div className="login-mascot-stage">
          <span className="login-message login-message-one">Good to see you!</span>
          <span className="login-message login-message-two">Let&apos;s roll.</span>
          <Image
            src="/brand/reeferbudz-mascots.svg"
            alt="The ReeferBudz mascot pair welcoming a returning member"
            width={1024}
            height={682}
            priority
          />
        </div>
      </section>

      <section className="login-access" aria-label="Member login">
        <div className="login-card">
          <span className="login-sticker">21+ only</span>
          <p className="eyebrow">Member access</p>
          <h2>Come on in.</h2>
          <p className="login-card-intro">
            Continue through our secure hosted sign-in to reach your ReeferBudz
            member home.
          </p>

          <a className="button login-button" href={signInHref}>
            Continue to secure sign-in <span aria-hidden="true">→</span>
          </a>

          <div className="login-privacy-note">
            <span aria-hidden="true">●</span>
            <div>
              <strong>Your password stays private</strong>
              <p>
                Sign-in is handled by our hosted provider. ReeferBudz never
                receives or stores your password.
              </p>
            </div>
          </div>

          <div className="login-divider"><span>New to the circle?</span></div>

          <Link className="login-create-link" href="/signup">
            Create your ReeferBudz account <span aria-hidden="true">→</span>
          </Link>

          <p className="login-age-note">
            ReeferBudz is for adults 21+. Age is self-attested during member
            setup and is not independently verified.
          </p>
        </div>

        <nav className="login-help-links" aria-label="Login help and policies">
          <Link href="/contact">Need help?</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/community-guidelines">Community Guidelines</Link>
        </nav>
      </section>
    </main>
  );
}
