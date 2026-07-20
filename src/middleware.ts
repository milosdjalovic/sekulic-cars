import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "config");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
