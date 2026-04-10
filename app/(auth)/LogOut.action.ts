import { signOut } from '@/lib/auth'


export default async function LogOutAction() {
    await signOut()
}