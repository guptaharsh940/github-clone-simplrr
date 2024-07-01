"use client";
import { CaretDownIcon, GitHubLogoIcon, HamburgerMenuIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { signOut } from 'next-auth/react'

const Navbar = () => {
    return (
        <div className='top-0 left = 0 w-screen fixed min-h-20 flex  border-b border-gray-700 bg-black'>
            <div className='min-h-full flex items-center justify-center'>
                <Button variant="outline" className='pb-full ml-2'>
                    <HamburgerMenuIcon />
                </Button>
                <GitHubLogoIcon className='m-5' width="40" height="40" />
                <Button variant="ghost" className='pb-full'>
                    <p className='font-semibold text-base'>Dashboard</p>
                </Button>
            </div>
            <div className='ml-auto min-h-full flex items-center justify-center mr-6'>
                <div className='relative w-auto mr-4'>
                    <Input type='search' placeholder='Search' className='block w-full pl-10' />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon />
                    </div>
                </div>
                <Button variant="outline" className='mr-4'>
                    <PlusIcon />
                    <CaretDownIcon />
                </Button>
                <div className='rounded-full overflow-hidden mr-4' >
                    <HoverCard>
                <HoverCardTrigger>
                    
                <Avatar>
                <AvatarFallback>HG</AvatarFallback>
                </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className='w-30'>
                    <Button variant="destructive" onClick={(e) => {signOut()}}>Logout</Button>
                </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </div>
    )
}

export default Navbar