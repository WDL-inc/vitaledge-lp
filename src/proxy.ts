import { NextRequest, NextResponse } from "next/server";

const USER = process.env.BASIC_AUTH_USER;
const PASS = process.env.BASIC_AUTH_PASSWORD;

export function proxy(req: NextRequest) {
  if (!USER || !PASS) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");

  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Vitaledge Preview"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
