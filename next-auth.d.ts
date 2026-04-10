import "next-auth"
import "next-auth/jwt"


declare module "next-auth" {
    interface User {
        id: string,
        Nome: string,
        role: string,
        Admin:number,
        BANNED: number
    } 


    interface Session {
        user: {
            id: string,
            Nome: string,
            role: string,
            Admin:number,
            BANNED: number
        } & DefaultSession["User"]
    }
}


declare module "next-auth/jwt" {
    interface JWT {
        id: string,
        Nome: string,
        role: string,
        Admin: number,
        BANNED: number,
        lastRefresh: number;
    }
}
