'use server'

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn } from "@/lib/auth";

export default async function LoginAction(prevState:AuthError|undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      Nome: formData.get("Nome") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/dashboard",
    });
  } catch (e) {
    // next-auth server `signIn` performs navigation by throwing a Next.js redirect.
    // Don't swallow it, otherwise the client sees an "Erro interno" while the session is created.
    if (isRedirectError(e)) throw e;

    if (e instanceof AuthError) {
      console.error(`[AUTH] Sign in error: ${e.type}`, e);
      if (e.type === "CredentialsSignin") {
        return { success: false, message: "Dados invalidos" };
      }
    }

    console.error("[AUTH] Unexpected error during sign in:", e);
    return { success: false, message: "Erro interno" };
  }
}
