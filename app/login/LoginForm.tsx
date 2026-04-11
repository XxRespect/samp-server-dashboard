
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { AlertCircleIcon, User, Lock, LogIn } from 'lucide-react'
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

import { useSession, signIn } from 'next-auth/react'
import { Spinner } from '@/components/ui/spinner'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

function LoginForm() {
  const router = useRouter();
  const { status } = useSession();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard');
    }
  }, [status, router]);

  if (status === 'authenticated') {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        <span>Redirecionando...</span>
      </div>
    );
  }

  return (
    <>
      {errorMessage && (
        <Alert variant='destructive' className="m-2">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setErrorMessage(null);

          const formData = new FormData(e.currentTarget);
          const Nome = String(formData.get('Nome') ?? '');
          const password = String(formData.get('password') ?? '');

          startTransition(async () => {
            const result = await signIn('credentials', {
              Nome,
              password,
              redirect: false,
            });

            if (result?.error) {
              setErrorMessage('Dados invalidos');
              return;
            }

            // Navigate to dashboard. Using the URL from NextAuth when available is more reliable.
            router.replace(result?.url ?? '/dashboard');
            router.refresh();
          });
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="Nome" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Nick
            </Label>
            <Input
              id="Nome"
              name="Nome"
              type="text"
              placeholder="Enter your nick"
              required
              className="pl-8"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" name="password" type="password" required className="pl-8" />
          </div>

          <Button
            type="submit"
            className="w-full hover:cursor-pointer hover:transition-all hover:shadow-lg hover:shadow-primary/50 gap-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner />
                <p>Processing</p>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Login
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
