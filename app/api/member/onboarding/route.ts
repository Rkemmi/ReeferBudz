import { env } from "cloudflare:workers";
import { getChatGPTUser } from "../../../chatgpt-auth";
import {
  CURRENT_GUIDELINES_VERSION,
  findMemberByEmail,
} from "../../../../db/members";
import { sendWelcomeEmail } from "../../../email/welcome-email";

type OnboardingInput = {
  displayName?: unknown;
  birthDate?: unknown;
  adultAttestation?: unknown;
  guidelinesAcceptance?: unknown;
  bio?: unknown;
  interests?: unknown;
  friendshipGoals?: unknown;
  city?: unknown;
  region?: unknown;
  locationVisibility?: unknown;
  discoverable?: unknown;
};

const clean = (value: unknown, maximum: number) =>
  typeof value === "string" ? value.trim().slice(0, maximum) : "";

function isAtLeast21(dateValue: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) return false;
  const birthDate = new Date(`${dateValue}T12:00:00Z`);
  if (Number.isNaN(birthDate.valueOf())) return false;
  const now = new Date();
  const cutoff = new Date(Date.UTC(now.getUTCFullYear() - 21, now.getUTCMonth(), now.getUTCDate(), 23, 59, 59));
  return birthDate <= cutoff && birthDate.getUTCFullYear() >= 1900;
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ message: "Sign in to continue." }, { status: 401 });
  const member = await findMemberByEmail(user.email);
  return Response.json({ member, email: user.email });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ message: "Sign in to continue." }, { status: 401 });

  const data = (await request.json()) as OnboardingInput;
  const displayName = clean(data.displayName, 50);
  const birthDate = clean(data.birthDate, 10);
  const bio = clean(data.bio, 500);
  const friendshipGoals = clean(data.friendshipGoals, 240);
  const city = clean(data.city, 80);
  const region = clean(data.region, 80);
  const interests = Array.isArray(data.interests)
    ? data.interests.map((item) => clean(item, 40)).filter(Boolean).slice(0, 10)
    : [];
  const locationVisibility = data.locationVisibility;

  if (
    displayName.length < 2 ||
    !isAtLeast21(birthDate) ||
    data.adultAttestation !== true ||
    data.guidelinesAcceptance !== true ||
    bio.length < 20 ||
    friendshipGoals.length < 10 ||
    interests.length < 1 ||
    !["city_region", "region_only", "hidden"].includes(String(locationVisibility))
  ) {
    return Response.json(
      { message: "Complete every required field, confirm you are 21+, and accept the Community Guidelines." },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const existing = await findMemberByEmail(user.email);
  const id = existing?.id ?? crypto.randomUUID();
  await env.DB.prepare(`INSERT INTO members (
    id, email, display_name, birth_date, adult_attested_at,
    email_confirmed_at, email_confirmation_source, guidelines_version, onboarding_completed_at,
    guidelines_accepted_at, bio, interests, friendship_goals, city, region,
    location_visibility, discoverable, status, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?, ?)
  ON CONFLICT(email) DO UPDATE SET
    display_name = excluded.display_name,
    birth_date = excluded.birth_date,
    adult_attested_at = excluded.adult_attested_at,
    guidelines_version = excluded.guidelines_version,
    onboarding_completed_at = excluded.onboarding_completed_at,
    guidelines_accepted_at = excluded.guidelines_accepted_at,
    bio = excluded.bio,
    interests = excluded.interests,
    friendship_goals = excluded.friendship_goals,
    city = excluded.city,
    region = excluded.region,
    location_visibility = excluded.location_visibility,
    discoverable = excluded.discoverable,
    status = 'active',
    updated_at = excluded.updated_at`)
    .bind(
      id,
      user.email.toLowerCase(),
      displayName,
      birthDate,
      now,
      now,
      "dispatch-authenticated-email",
      CURRENT_GUIDELINES_VERSION,
      now,
      now,
      bio,
      JSON.stringify(interests),
      friendshipGoals,
      city || null,
      region || null,
      locationVisibility,
      data.discoverable === false ? 0 : 1,
      existing?.created_at ?? now,
      now,
    )
    .run();

  let welcomeEmail: "sent" | "not_configured" | "failed" = "not_configured";
  if (!existing) {
    const emailEnvironment = env as unknown as Record<string, string | undefined>;
    welcomeEmail = await sendWelcomeEmail(
      { email: user.email, displayName, memberId: id },
      {
        apiKey: emailEnvironment.RESEND_API_KEY,
        from: emailEnvironment.WELCOME_EMAIL_FROM,
        appBaseUrl: emailEnvironment.APP_BASE_URL,
      },
    );
  }

  return Response.json({ ok: true, redirectTo: "/member", welcomeEmail });
}
