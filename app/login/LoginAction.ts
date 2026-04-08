'use server'

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { signIn } from "@/lib/auth";

export default async function LoginAction(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      Nome: formData.get("Nome") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
  } catch (e) {
    if (e instanceof AuthError && e.type === "CredentialsSignin") {
      return { success: false, message: "Dados invalidos" };
    }

    return { success: false, message: "Erro interno" };
  }

  redirect("/dashboard");
}
