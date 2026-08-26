import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const launchModeRoutes = new Set([
  "/how-it-works",
  "/safety",
  "/our-story",
  "/community-guidelines",
  "/contact",
  "/privacy",
  "/terms",
  "/accessibility",
  "/early-access",
  "/signup",
  "/login",
  "/shop",
  "/member-preview",
]);

export function proxy(request: NextRequest) {
  if (process.env.PUBLIC_LAUNCH_MODE !== "true") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (!launchModeRoutes.has(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|brand/|og.png|api/launch-list).*)"],
};
