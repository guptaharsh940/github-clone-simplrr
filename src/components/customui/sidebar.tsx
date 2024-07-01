"use client";
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';

const Sidebar = () => {
    const session =useSession();
    return (
        <div className='min-h-screen fixed mr-auto border-r border-gray-700 w-[400px] flex'>
            <div className='m-5 h-16 space-x-3 p-3 flex items-center'>
                <Avatar>
                <AvatarFallback>{(session?.data?.user.username)?(session?.data?.user.username.substring(0,2)):("NU")}</AvatarFallback>
                </Avatar>
                <p>{(session?.data?.user.username)?(session?.data?.user.username):("NULL")}</p>
            </div>

            
        </div>
    )
}

export default Sidebar