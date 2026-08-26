import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireChatGPTUser } from "../chatgpt-auth";
import {
  findDiscoverableMembers,
  findMemberByEmail,
  memberHasAppAccess,
  publicLocation,
} from "../../db/members";
import { MemberShell } from "../components/member-shell";
import type { MemberRecord } from "../../db/members";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Member Preview",
  robots: { index: false, follow: false },
};

const LOCAL_PREVIEW_MEMBER: MemberRecord = {
  id: "local-preview",
  email: "preview@reeferbudz.local",
  display_name: "Rachel",
  birth_date: "1990-01-01",
  adult_attested_at: "2026-08-07T12:00:00.000Z",
  email_confirmed_at: "2026-08-07T12:00:00.000Z",
  email_confirmation_source: "local-preview",
  guidelines_version: "2026-07-29",
  guidelines_accepted_at: "2026-08-07T12:00:00.000Z",
  onboarding_completed_at: "2026-08-07T12:00:00.000Z",
  bio: "Cleveland creative building community, making new friends, and finding good energy around the city.",
  interests: JSON.stringify([
    "Creative projects",
    "Live music",
    "Lake days",
    "Local events",
  ]),
  friendship_goals:
    "Meet genuine people for events, creative hangs, and laid-back adventures around Cleveland.",
  city: "Cleveland",
  region: "Ohio",
  location_visibility: "city_region",
  discoverable: 1,
  status: "active",
  created_at: "2026-08-07T12:00:00.000Z",
  updated_at: "2026-08-07T12:00:00.000Z",
};

const PREVIEW_BUDZ = [
  {
    id: "preview-sage",
    name: "Sage",
    age: 28,
    location: "Tremont, Cleveland",
    distance: "2.4 miles away",
    interests: ["Live music", "Coffee", "Art"],
  },
  {
    id: "preview-marcus",
    name: "Marcus",
    age: 31,
    location: "Ohio City, Cleveland",
    distance: "3.1 miles away",
    interests: ["Gaming", "Dogs", "Concerts"],
  },
  {
    id: "preview-jordan",
    name: "Jordan",
    age: 26,
    location: "Lakewood, Ohio",
    distance: "5.7 miles away",
    interests: ["Outdoors", "Food", "Photography"],
  },
  {
    id: "preview-maya",
    name: "Maya",
    age: 33,
    location: "Cleveland Heights, Ohio",
    distance: "7.8 miles away",
    interests: ["Movies", "Local events", "Kayaking"],
  },
];

function calculateAge(birthDate: string) {
  const birth = new Date(`${birthDate}T00:00:00`);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  const monthDifference = today.getMonth() - birth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birth.getDate())
  ) {
    age -= 1;
  }

  return age;
}

export default async function LiveReeferBudzPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const previewRequested = (await searchParams).preview === "1";
  const host = (await headers()).get("host")?.split(":")[0];

  const localPreview =
    previewRequested &&
    (host === "localhost" ||
      host === "127.0.0.1" ||
      host?.startsWith("localhost") ||
      host?.startsWith("127.0.0.1"));
  const user = localPreview ? null : await requireChatGPTUser("/member");

  const member = localPreview
    ? LOCAL_PREVIEW_MEMBER
    : await findMemberByEmail(user!.email);

  if (!member) redirect("/onboarding");
  if (!localPreview && !memberHasAppAccess(member)) redirect("/onboarding");

  const matches = localPreview
    ? []
    : await findDiscoverableMembers(member);

  return (
    <MemberShell displayName={member.display_name} active="home">
      <main className="member-main live-page">
        <section className="live-hero">
          <div className="live-hero-overlay" />

          <div className="live-hero-content">
            <p className="live-kicker">EARLY MEMBER PREVIEW · CLEVELAND BORN · FRIENDSHIP FIRST</p>

            <h1>
              MEMBER
              <span>PREVIEW</span>
            </h1>

            <p className="live-hero-copy">
              This is the current member preview: a first look at profile,
              discovery, privacy, and safer-community building blocks.
            </p>

            <div className="live-location-pill">
              <span aria-hidden="true">●</span>
              Cleveland, Ohio preview community
            </div>
          </div>
        </section>

        <section className="live-directory">
          <div className="live-directory-inner">
            <div className="live-directory-heading">
              <div>
                <p className="live-section-kicker">CURRENT DISCOVERY SLICE</p>
                <h2>Budz the current preview can show.</h2>
                <p>
                  Browse active, discoverable members and learn what you share
                  before deeper connection tools expand.
                </p>
              </div>

              <a
                className="live-preferences-link"
                href="/member/settings#privacy"
              >
                Preferences →
              </a>
            </div>

            <form className="live-filter-bar" aria-label="Live Budz filters">
              <label>
                <span>Distance</span>
                <select defaultValue="25" disabled>
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                  <option value="50">Within 50 miles</option>
                  <option value="100">Within 100 miles</option>
                </select>
              </label>

              <label>
                <span>Age</span>
                <select defaultValue="all" disabled>
                  <option value="all">21+</option>
                  <option value="21-29">21–29</option>
                  <option value="30-39">30–39</option>
                  <option value="40-49">40–49</option>
                  <option value="50+">50+</option>
                </select>
              </label>

              <label>
                <span>Interests</span>
                <select defaultValue="all" disabled>
                  <option value="all">All interests</option>
                  <option value="outdoors">Outdoors</option>
                  <option value="music">Music</option>
                  <option value="gaming">Gaming</option>
                  <option value="creative">Creative</option>
                  <option value="events">Local events</option>
                </select>
              </label>

              <label>
                <span>Sort</span>
                <select defaultValue="nearby" disabled>
                  <option value="nearby">Nearest</option>
                  <option value="recent">Recently active</option>
                  <option value="new">Newest Budz</option>
                </select>
              </label>

              <button type="button" disabled>Preview filters</button>
            </form>
            <p className="field-help">
              These controls show the direction of future filtering. In the
              current preview, they are intentionally not active yet.
            </p>

            {localPreview ? (
              <section
                className="live-member-grid"
                aria-label="Preview Live ReeferBudz profiles"
              >
                {PREVIEW_BUDZ.map((bud) => (
                  <article className="live-member-card" key={bud.id}>
                    <div className="live-photo-placeholder">
                        <span className="live-status-badge">
                          <i aria-hidden="true" />
                          PREVIEW
                        </span>

                      <span className="live-avatar-letter">
                        {bud.name.slice(0, 1)}
                      </span>
                    </div>

                    <div className="live-member-info">
                      <h3>
                        {bud.name}, {bud.age}
                      </h3>

                      <p className="live-member-distance">{bud.distance}</p>
                      <p className="live-member-location">{bud.location}</p>

                      <div className="live-member-tags">
                        {bud.interests.map((interest) => (
                          <span key={interest}>{interest}</span>
                        ))}
                      </div>

                      <a href="/member/profile">View Profile →</a>
                    </div>
                  </article>
                ))}
              </section>
            ) : matches.length ? (
              <section
                className="live-member-grid"
                aria-label="ReeferBudz member profiles"
              >
                {matches.map((match) => {
                  const interests = JSON.parse(match.interests) as string[];

                  return (
                    <article className="live-member-card" key={match.id}>
                      <div className="live-photo-placeholder">
                        <span className="active-status-badge">
                          Active discoverable member
                        </span>

                        <span className="live-avatar-letter">
                          {match.display_name.slice(0, 1).toUpperCase()}
                        </span>
                      </div>

                      <div className="live-member-info">
                        <h3>
                          {match.display_name}
                          {match.birth_date
                            ? `, ${calculateAge(match.birth_date)}`
                            : ""}
                        </h3>

                        <p className="live-member-location">
                          {publicLocation(match)}
                        </p>

                        <div className="live-member-tags">
                          {interests.slice(0, 3).map((interest) => (
                            <span key={interest}>{interest}</span>
                          ))}
                        </div>

                        <a href={`/member/profile?member=${match.id}`}>
                          View Profile →
                        </a>
                      </div>
                    </article>
                  );
                })}
              </section>
            ) : (
              <section className="live-empty">
                <p className="live-section-kicker">YOUR CIRCLE IS GROWING</p>
                <h3>No nearby Budz are ready to show yet.</h3>
                <p>
                  We only show active, discoverable members who chose to share
                  a general location.
                </p>

                <a href="/member/discover">Discover Budz →</a>
              </section>
            )}

            <div className="live-directory-note">
              <strong>Live presence is not active yet.</strong>
              <span>
                ReeferBudz does not currently show who is online, active right
                now, or available for instant chat. Any future presence system
                should stay privacy-conscious.
              </span>
            </div>
          </div>
        </section>

        <section className="live-story-banner">
          <div className="live-story-copy">
            <p className="live-section-kicker">FROM INTRO TO POSSIBILITY</p>

            <h2>
              Plans are better
              <span>with good Budz.</span>
            </h2>

            <p>
              Meet people through shared interests first. Messaging and richer
              planning tools are part of the next deeper slice, not something
              this preview claims to fully provide today.
            </p>

            <a href="/member/discover">See Discover Budz →</a>
          </div>

          <div
            className="live-story-art"
            aria-label="Two ReeferBudz making plans"
          >
            <img
              src="/brand/reeferbudz-mascots.svg"
              alt="Two ReeferBudz mascots"
            />

            <div className="live-story-messages">
              <span>West Side Market Saturday?</span>
              <span>I&apos;m down! 🌿</span>
            </div>
          </div>
        </section>

        <footer className="live-footer">
          <div className="live-footer-brand">
            <img
              src="/brand/reeferbudz-primary-on-dark.svg"
              alt="ReeferBudz — Find Your Smoke Circle"
            />

            <p>
              Friendship-first community for cannabis-friendly adults 21+.
            </p>
          </div>

          <div>
            <strong>Explore</strong>
            <a href="/member">Member Preview</a>
            <a href="/member/discover">Discover Budz</a>
            <span>Messages — Coming Soon</span>
            <span>Smoke Circles — Coming Soon</span>
          </div>

          <div>
            <strong>Community</strong>
            <a href="/safety">Safety</a>
            <a href="/community-guidelines">Community Guidelines</a>
            <a href="/contact">Contact</a>
          </div>

          <div>
            <strong>Legal &amp; Access</strong>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/accessibility">Accessibility</a>
          </div>

          <small>
            © 2026 ReeferBudz™ · For adults 21+. No cannabis sales or
            transactions.
          </small>
        </footer>
      </main>
    </MemberShell>
  );
}
