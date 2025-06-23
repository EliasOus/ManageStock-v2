import { auth } from "@/auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth: middleware } = NextAuth(authConfig);

const dashboardPath = [
  "/dashboard",
  "/dashboard/recherche",
  "/dashboard/receptions",
  "/dashboard/retours",
  "/dashboard/utilisateurs",
  "/dashboard/inventaire",
];

export default middleware((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;

  const isConnecte = Boolean(req.auth);

  console.log("🚦 middleware path:", path);
  console.log("🔐 session:", req.auth);
  console.log("✅ isConnecte:", Boolean(req.auth));

  if (
    (path === "/login" || path === "/inscription" || path === "/") &&
    isConnecte
  )
    return NextResponse.redirect(new URL("/dashboard", nextUrl));

  if (dashboardPath.includes(path) && !isConnecte)
    return NextResponse.redirect(new URL("/", nextUrl));

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/inscription", "/dashboard/:path*", "/"],
};
