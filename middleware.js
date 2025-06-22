import { auth } from "@/auth";

export function middleware(req) {
  console.log("middleware appelé par :", req.nextUrl.pathname);

  // Tu peux utiliser ici auth(req) si besoin d'authentification
  return auth(req);
}


export const config ={
    matcher: ["/login"]
}