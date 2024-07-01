import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface User{
        id:string|null,
        username:string|null
    }
    interface Session{
        user:User & {
            id:string,
            username:string
        }
        token:{
            id:string,
            username:string
        }
    }
}