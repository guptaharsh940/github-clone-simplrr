import { NextResponse } from "next/server";
import {db} from "@/lib/db"

export async function POST(req:Request){
    try{
        const body = await req.json();
        const {username,password} = body;

        const existingUserByUsername = await db.user.findUnique(
            {
                where:{username:username}
            }
        );
        if(existingUserByUsername){
            return NextResponse.json({user:null,message:"User with this username already exists"},{status:409})

        }

        const newUser = await db.user.create({
            data:{
                username,
                password
            }
        })
        return NextResponse.json(newUser,{status:200});

    }
    catch(error){
        return NextResponse.json({message:"Something went wrong"},{status:500})
        
    }
    
}