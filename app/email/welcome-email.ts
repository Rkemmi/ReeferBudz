type WelcomeEmailInput = {
  email: string;
  displayName: string;
  memberId: string;
};

type EmailConfiguration = {
  apiKey?: string;
  from?: string;
  appBaseUrl?: string;
};

export type WelcomeEmailResult = "sent" | "not_configured" | "failed";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export function buildWelcomeEmail(displayName: string, appBaseUrl: string) {
  const safeName = escapeHtml(displayName);
  const safeBaseUrl = appBaseUrl.replace(/\/$/, "");
  const memberHomeUrl = `${safeBaseUrl}/login`;

  return {
    subject: `Welcome to the circle, ${displayName}`,
    text: `Welcome to ReeferBudz, ${displayName}!

Your profile is ready. Return to Member Home: ${memberHomeUrl}

ReeferBudz is a friendship-first community for adults 21+. Cannabis sales, delivery, transactions, dating or hookup solicitation, unsafe consumption, and impaired driving are not allowed.

Community Guidelines: ${safeBaseUrl}/community-guidelines
Privacy: ${safeBaseUrl}/privacy

You received this one-time account email because you completed ReeferBudz member onboarding.`,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f2f5f3;color:#101612;font-family:Arial,sans-serif">
    <div style="display:none;max-height:0;overflow:hidden">Your ReeferBudz profile is ready. Welcome to the circle.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f5f3;padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:3px solid #12382b;border-radius:24px;overflow:hidden">
          <tr><td style="background:#12382b;padding:34px 38px;color:#ffffff">
            <p style="margin:0 0 10px;color:#9be23b;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Welcome to ReeferBudz</p>
            <h1 style="margin:0;font-size:34px;line-height:1.1;color:#ffffff">You made it into the circle, ${safeName}.</h1>
          </td></tr>
          <tr><td style="padding:36px 38px">
            <p style="margin:0 0 18px;font-size:18px;line-height:1.6">Your profile is ready. Come back anytime to manage your profile, check your privacy settings, and discover community-minded Budz.</p>
            <p style="margin:28px 0"><a href="${memberHomeUrl}" style="display:inline-block;background:#9be23b;border:2px solid #12382b;border-radius:999px;color:#101612;font-weight:800;padding:14px 22px;text-decoration:none">Go to Member Home →</a></p>
            <div style="background:#f2f5f3;border-left:6px solid #2f6f8f;padding:18px 20px">
              <strong style="color:#12382b">Friendship first. Always.</strong>
              <p style="margin:7px 0 0;font-size:14px;line-height:1.5;color:#56605a">ReeferBudz is for adults 21+. Cannabis sales, delivery, transactions, dating or hookup solicitation, unsafe consumption, and impaired driving are not allowed.</p>
            </div>
            <p style="margin:26px 0 0;font-size:14px"><a href="${safeBaseUrl}/community-guidelines" style="color:#0e7a3e">Community Guidelines</a> · <a href="${safeBaseUrl}/privacy" style="color:#0e7a3e">Privacy</a></p>
          </td></tr>
          <tr><td style="background:#12382b;padding:20px 38px;color:#ffffff;font-size:12px;line-height:1.5">You received this one-time account email because you completed ReeferBudz member onboarding. ReeferBudz™ · Cleveland born.</td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  };
}

export async function sendWelcomeEmail(
  input: WelcomeEmailInput,
  configuration: EmailConfiguration,
): Promise<WelcomeEmailResult> {
  const { apiKey, from, appBaseUrl } = configuration;
  if (!apiKey || !from || !appBaseUrl) return "not_configured";

  const content = buildWelcomeEmail(input.displayName, appBaseUrl);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
        "idempotency-key": `welcome-member/${input.memberId}`,
      },
      body: JSON.stringify({
        from,
        to: [input.email],
        subject: content.subject,
        html: content.html,
        text: content.text,
      }),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
