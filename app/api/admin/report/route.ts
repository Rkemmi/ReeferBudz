import { requireAdminUser } from "../../../admin/admin-auth";
import { createAdminReport } from "../../../../db/admin";
import { bodyIsTooLarge, acceptsJson, cleanText, json } from "../../_shared/request";

export async function POST(request: Request) {
  const admin = await requireAdminUser("/admin");

  if (!acceptsJson(request)) {
    return json({ message: "Send JSON." }, { status: 415 });
  }

  if (bodyIsTooLarge(request)) {
    return json({ message: "Request too large." }, { status: 413 });
  }

  const data = (await request.json()) as {
    subjectMemberId?: unknown;
    category?: unknown;
    summary?: unknown;
  };

  const subjectMemberId =
    typeof data.subjectMemberId === "string"
      ? data.subjectMemberId.trim() || null
      : null;
  const category = cleanText(data.category, 80);
  const summary = cleanText(data.summary, 600);

  if (category.length < 3 || summary.length < 12) {
    return json(
      { message: "Add a category and a short report summary." },
      { status: 400 },
    );
  }

  await createAdminReport({
    subjectMemberId,
    category,
    summary,
    createdByEmail: admin.email.toLowerCase(),
  });

  return json({ ok: true });
}
