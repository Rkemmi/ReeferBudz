import type { Metadata } from "next";
import { ContentPage } from "../components/content-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <ContentPage
      eyebrow="Privacy Policy"
      title="How ReeferBudz handles information in the current website and member preview."
      intro="Last updated August 13, 2026. This page explains what information ReeferBudz may collect, why it may be used, and the current limits of the product."
      banner={{
        eyebrow: "Privacy with plain language",
        title: "You should not have to guess what happens to your information.",
        description: "The goal is to explain the current website and member-preview reality clearly, not hide it behind vague promises.",
        scene: "privacy",
        sceneLabel: "Privacy first",
        mascotAlt: "The ReeferBudz mascots respecting personal space and privacy",
      }}
      sections={[
        {
          title: "Scope",
          body: (
            <>
              <p>
                This Privacy Policy applies to the public ReeferBudz website,
                early-access intake, secure sign-in flow, and the current member
                preview experience.
              </p>
              <p>
                It does not promise that every planned community feature is
                already live. As the product changes, this policy may need to be
                updated.
              </p>
            </>
          ),
        },
        {
          title: "Information ReeferBudz may collect",
          body: (
            <ul>
              <li>Name or display name you choose to provide</li>
              <li>Email address used for early access or secure sign-in</li>
              <li>Optional Cleveland-area ZIP code, neighborhood, and friendship goals you share through the Founding Budz waitlist</li>
              <li>Date of birth and 21+ self-attestation during member setup</li>
              <li>Profile details such as bio, interests, friendship goals, city, and region</li>
              <li>Safety-related information you intentionally submit, such as a Guardian contact</li>
              <li>Technical and usage information needed to operate the website and member preview</li>
            </ul>
          ),
        },
        {
          title: "Why information may be used",
          body: (
            <ul>
              <li>To operate the website, early-access program, and member preview</li>
              <li>To understand Cleveland-area interest clusters for the Founding Budz waitlist</li>
              <li>To create and maintain your account and profile</li>
              <li>To support privacy-aware discovery between members who opted in</li>
              <li>To respond to support, safety, operational, or legal issues</li>
              <li>To improve product quality, reliability, and safety over time</li>
            </ul>
          ),
        },
        {
          title: "Current age and identity limits",
          body: (
            <>
              <p>
                ReeferBudz is intended for adults age 21 and older.
                ReeferBudz does not currently use a third-party identity or
                legal age-verification provider.
              </p>
              <p>
                In the current member setup flow, age is self-attested and
                account access is tied to secure sign-in, not government ID
                verification.
              </p>
            </>
          ),
        },
        {
          title: "What other members may see",
          body: (
            <>
              <p>
                Other members may see the profile information you choose to make
                visible in the member experience, such as your display name,
                bio, interests, friendship goals, and general location setting.
              </p>
              <p>
                ReeferBudz is designed around general location sharing. Exact
                private addresses are not requested for public profile display.
              </p>
            </>
          ),
        },
        {
          title: "How information may be shared",
          body: (
            <>
              <p>
                ReeferBudz may share information with service providers that
                help operate the website and member experience, with vendors
                needed for secure sign-in, hosting, email, analytics, or
                database operations, and when required for safety, legal, or
                security reasons.
              </p>
              <p>
                ReeferBudz does not present itself as a cannabis marketplace and
                does not use the platform to arrange cannabis transactions,
                delivery, or illegal activity.
              </p>
            </>
          ),
        },
        {
          title: "Retention",
          body: (
            <p>
              ReeferBudz may retain information for as long as reasonably needed
              to operate the current experience, support safety and operational
              review, meet legal obligations, or resolve disputes. Formal data
              retention and deletion workflows are still being expanded.
            </p>
          ),
        },
        {
          title: "Cookies and technical storage",
          body: (
            <p>
              ReeferBudz may use cookies or similar technical mechanisms needed
              for session handling, secure sign-in, website functionality,
              preference storage, and performance monitoring. A separate cookie
              management experience is not currently published.
            </p>
          ),
        },
        {
          title: "Your current choices",
          body: (
            <ul>
              <li>You can choose how much profile information to provide</li>
              <li>You can set profile location visibility to hidden, region only, or city and region</li>
              <li>You can turn discoverability on or off in member settings</li>
              <li>You can contact ReeferBudz about privacy questions at privacy@reeferbudz.com</li>
            </ul>
          ),
        },
        {
          title: "Security and limits",
          body: (
            <>
              <p>
                ReeferBudz aims to use reasonable safeguards appropriate for the
                current stage of the product, but no website or online service
                can promise absolute security.
              </p>
              <p>
                Some support, moderation, export, and deletion workflows are
                still being built. This policy should be read with that product
                stage in mind.
              </p>
            </>
          ),
        },
        {
          title: "Contact",
          body: (
            <p>
              Questions, concerns, or privacy-related requests may be sent to
              privacy@reeferbudz.com or through the Contact page.
            </p>
          ),
        },
      ]}
    />
  );
}
