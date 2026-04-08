import AppFooter from "@/components/AppFooter";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta no dashboard.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className={`${roboto.className} relative flex min-h-screen flex-col overflow-hidden`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/gtasawallpaper.jpg')"}}
        />
        <div aria-hidden="true" className="absolute inset-0 bg-black/55" />

        <main className="relative flex flex-1 items-center justify-center px-4">
          {children}
        </main>

        <div className="relative">
          <AppFooter />
        </div>
      </div>
    </>
  );
}
