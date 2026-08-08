export const MAX_JSON_BODY_BYTES = 16_384;

export function acceptsJson(request: Request) {
  return request.headers.get("content-type")?.toLowerCase().startsWith("application/json") ?? false;
}

export function bodyIsTooLarge(request: Request) {
  const contentLength = Number(request.headers.get("content-length"));
  return Number.isFinite(contentLength) && contentLength > MAX_JSON_BODY_BYTES;
}

export function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

export function isValidEmail(email: string) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return Response.json(data, { ...init, headers });
}
