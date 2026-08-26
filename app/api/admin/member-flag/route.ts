import { requireAdminUser } from "../../../admin/admin-auth";
import { createMemberFlag } from "../../../../db/admin";
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
    memberId?: unknown;
    reason?: unknown;
  };

  const memberId =
    typeof data.memberId === "string" ? data.memberId.trim() : "";
  const reason = cleanText(data.reason, 280);

  if (!memberId || reason.length < 8) {
    return json(
      { message: "Add a member and a short review reason." },
      { status: 400 },
    );
  }

  await createMemberFlag({
    memberId,
    reason,
    createdByEmail: admin.email.toLowerCase(),
  });

  return json({ ok: true });
}
