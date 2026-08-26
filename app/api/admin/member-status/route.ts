import { requireAdminUser } from "../../../admin/admin-auth";
import { updateMemberStatus, type AdminMemberStatus } from "../../../../db/admin";
import { bodyIsTooLarge, acceptsJson, json } from "../../_shared/request";

export async function PATCH(request: Request) {
  await requireAdminUser("/admin");

  if (!acceptsJson(request)) {
    return json({ message: "Send JSON." }, { status: 415 });
  }

  if (bodyIsTooLarge(request)) {
    return json({ message: "Request too large." }, { status: 413 });
  }

  const data = (await request.json()) as {
    memberId?: unknown;
    status?: unknown;
  };

  const memberId =
    typeof data.memberId === "string" ? data.memberId.trim() : "";
  const status =
    typeof data.status === "string" ? data.status.trim() : "";

  if (!memberId) {
    return json({ message: "Choose a member first." }, { status: 400 });
  }

  if (!["active", "review", "disabled"].includes(status)) {
    return json({ message: "Choose a valid account status." }, { status: 400 });
  }

  await updateMemberStatus(memberId, status as AdminMemberStatus);
  return json({ ok: true });
}
