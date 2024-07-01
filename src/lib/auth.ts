import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import { db } from "./db";
export const authOptions: NextAuthOptions = {
    adapter:PrismaAdapter(db), 
    secret: process.env.NEXTAUTH_SECRET,
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn:'/',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                
                if(!credentials?.username || !credentials?.password){
                    return {id:null,username:null};
                }
                const existingUser = await db.user.findUnique({
                    where:{username:credentials?.username}
                });
                if(!existingUser){
                    return null;
                }

                if(existingUser.password!=credentials.password){
                    return {id:null,username:null};
                }
                return{
                    id:existingUser.id,
                    username:existingUser.username
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user){
                return{
                    ...token,
                    id:user.id,
                    username:user.username,
                }
            }
            return token
        },
        async session({session,token}){
            return{
                ...session,
                user:{
                    ...session.user,
                    id:token.id,
                    username:token.username
                }
            }
        }
    }
}