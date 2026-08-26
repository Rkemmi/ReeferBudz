import { env } from "cloudflare:workers";
import { notFound } from "next/navigation";
import { requireChatGPTUser, type ChatGPTUser } from "../chatgpt-auth";

function parseAllowedEmails() {
  return (env.ADMIN_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function getAllowedAdminEmails() {
  return parseAllowedEmails();
}

export async function requireAdminUser(returnTo = "/admin"): Promise<ChatGPTUser> {
  const user = await requireChatGPTUser(returnTo);

  if (!parseAllowedEmails().includes(user.email.toLowerCase())) {
    notFound();
  }

  return user;
}
