import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google";

function getGoogleCredentials(){
    // const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    // const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
    const clientId = '539498977901-re0m5041g5tlqm8n3qmo0tlqov6jemos.apps.googleusercontent.com'
    const clientSecret = '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'
    console.log(clientId, clientSecret)

    if(!clientId || clientId.length == 0){
        throw new Error('Missing Google client Id')
    }

    if(!clientSecret || clientSecret.length == 0){
        throw new Error('Missing Google client Secrect')
    }
    
    return {clientId, clientSecret}
}

export const authOptions : NextAuthOptions = {
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages:{
        signIn: '/login'
    },
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret
        })
    ],
    callbacks: {
        async jwt ({token, user}){
            const dbUser = (await db.get(`user:${token.id}`)) as User | null

            if (!dbUser){
                token.id = user!.id
                return token
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            }
        },
        async session({session, token}){
            if(token){
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
            }

            return session
        },
        redirect(){
            return '/dashboard'
        }
    }
}