
'use client'



import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {  AlertCircleIcon } from 'lucide-react'
import { 
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"




import Form from 'next/form'
import LoginAction from './LoginAction'
import { useActionState } from 'react'
import { redirect } from 'next/navigation'

function LoginForm() {

    const [state, formAction, isPending] = useActionState(LoginAction, null)

    return (
        <>
            <Form action={formAction}>
                {state?.message && (
                    <Alert variant='destructive' className="m-2">
                        <AlertCircleIcon className="h-4 w-4" />
                       
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                )}
                <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="Nome">Nick</Label>
                        <Input
                            id="Nome"
                            name="Nome"
                            type="text"
                            placeholder="Nick"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full hover:bg-primary hover:cursor-pointer hover:transition-all hover:shadow-lg hover:shadow-white-500/60">
                        Login
                    </Button>
                </div>
            </Form>
        </>
    )
}

export default LoginForm
