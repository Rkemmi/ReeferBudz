import { requireAdminUser } from "../../../admin/admin-auth";
import { saveCommunityEvent, type AdminEventStatus } from "../../../../db/admin";
import { bodyIsTooLarge, acceptsJson, cleanText, json } from "../../_shared/request";

function toIsoDateTimeLocal(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) return null;
  return new Date(`${value}:00`).toISOString();
}

export async function POST(request: Request) {
  const admin = await requireAdminUser("/admin");

  if (!acceptsJson(request)) {
    return json({ message: "Send JSON." }, { status: 415 });
  }

  if (bodyIsTooLarge(request)) {
    return json({ message: "Request too large." }, { status: 413 });
  }

  const data = (await request.json()) as {
    id?: unknown;
    title?: unknown;
    description?: unknown;
    city?: unknown;
    region?: unknown;
    startsAt?: unknown;
    endsAt?: unknown;
    status?: unknown;
  };

  const id = cleanText(data.id, 80);
  const title = cleanText(data.title, 100);
  const description = cleanText(data.description, 800);
  const city = cleanText(data.city, 80);
  const region = cleanText(data.region, 80);
  const startsAt = toIsoDateTimeLocal(cleanText(data.startsAt, 16));
  const endsAtRaw = cleanText(data.endsAt, 16);
  const endsAt = endsAtRaw ? toIsoDateTimeLocal(endsAtRaw) : null;
  const status = cleanText(data.status, 20);

  if (title.length < 3 || description.length < 12 || !startsAt) {
    return json(
      { message: "Add an event title, description, and start time." },
      { status: 400 },
    );
  }

  if (!["draft", "published", "cancelled"].includes(status)) {
    return json({ message: "Choose a valid event status." }, { status: 400 });
  }

  await saveCommunityEvent({
    id: id || undefined,
    title,
    description,
    city: city || null,
    region: region || null,
    startsAt,
    endsAt,
    status: status as AdminEventStatus,
    createdByEmail: admin.email.toLowerCase(),
  });

  return json({ ok: true });
}
