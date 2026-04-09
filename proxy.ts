import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";


const ROUTE_PERMISSIONS: Record<string, string[]> ={
  "/dashboard": ["USER", "ADMIN","MODERATOR","DEV","SUPERVISOR","OWNER"],
  "/dashboard/banneds": ["ADMIN","MODERATOR","DEV","SUPERVISOR","OWNER"],
  "/dashboard/tickets": ["ADMIN","DEV","SUPERVISOR","OWNER"],
  "/dashboard/ipbanneds": ["ADMIN","MODERATOR","DEV","SUPERVISOR","OWNER"],
  "/dashboard/admins": ["ADMIN","MODERATOR","DEV","SUPERVISOR","OWNER"],
  "/dashboard/chatlogs": ["ADMIN","DEV","SUPERVISOR","OWNER"],
  "/dashboard/jail": ["ADMIN","MODERATOR","DEV","SUPERVISOR","OWNER"],
  "/dashboard/logs": ["ADMIN","DEV","SUPERVISOR","OWNER"],
  "/dashboard/muted": ["ADMIN","MODERATOR","DEV","SUPERVISOR","OWNER"],
  "/dashboard/purchases": ["DEV","SUPERVISOR","OWNER"],
  "/dashboard/server": ["SUPERVISOR","OWNER"],
  "/dashboard/auditorium": ["SUPERVISOR","OWNER"],
  "/dashboard/accounts": ["OWNER"],
  "/dashboard/anticheat": ["OWNER"],
  "/dashboard/objects": ["OWNER"],
  "/dashboard/serials": ["OWNER"],
  "/dashboard/maps": ["OWNER"],
}


function getRequiredRoles(pathname: string) {
  const match = Object.keys(ROUTE_PERMISSIONS)
  .sort((a, b) => b.length - a.length)
  .find((route) => pathname.startsWith(route));

  return match ? ROUTE_PERMISSIONS[match] : null;
}

export default auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session

  // Redireciona não autenticados
  if (!isLoggedIn && nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if(isLoggedIn && nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Verifica permissão por role
  const requiredRoles = getRequiredRoles(nextUrl.pathname)

  if (requiredRoles && isLoggedIn) {
    const userRole = session?.user?.role

    if (!userRole || !requiredRoles.includes(userRole)) {
      // Autenticado mas sem permissão → 403
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
