"use client";
import { CaretDownIcon, GitHubLogoIcon, HamburgerMenuIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
interface Filter{
    isUser:boolean;
    isStarredRepo:boolean;
    lang:string;
  }
interface ChildComponentProps {
    filter: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
  
import { signOut, useSession } from 'next-auth/react'
import NewRepoForm from '../form/newrepo';
import Sidebar from './sidebar';
const Navbar: React.FC<ChildComponentProps> = ({setFilter,filter}) => {
    const session = useSession();
    return (
        <div className='top-0 left = 0 w-screen fixed min-h-20 flex  border-b border-gray-700 bg-black'>
            <div className='min-h-full flex items-center justify-center'>
                <Sheet>
                    <SheetTrigger><Button variant="outline" className='lg:hidden pb-full ml-2'>
                        <HamburgerMenuIcon />
                    </Button></SheetTrigger>
                    <SheetContent side={"left"}>
                        <Sidebar  setFilter={setFilter} filter={filter}/>
                    </SheetContent>
                </Sheet>


                <GitHubLogoIcon className='m-5' width="40" height="40" />
                <Button variant="ghost" className='pb-full'>
                    <p className='font-semibold text-base'>Dashboard</p>
                </Button>
            </div>
            <div className='ml-auto min-h-full flex items-center justify-center mr-6 '>
                <div className='relative w-auto mr-4 hidden md:block lg:block'>
                    <Input type='search' placeholder='Search' className='block w-full pl-10' />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon />
                    </div>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className='mr-4'>
                            <PlusIcon />
                            <CaretDownIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='w-fit'>
                        <DialogTitle>
                            Create New Repository
                        </DialogTitle>
                        <NewRepoForm />
                    </DialogContent>
                </Dialog>
                <div className='rounded-full overflow-hidden mr-1 lg:mr-4' >
                    <HoverCard>
                        <HoverCardTrigger>

                            <Avatar>
                                <AvatarFallback>{(session?.data?.user.username) ? (session?.data?.user.username.substring(0, 2).toUpperCase()) : ("NU")}</AvatarFallback>
                            </Avatar>
                        </HoverCardTrigger>
                        <HoverCardContent className='w-30'>
                            <Button variant="destructive" onClick={(e) => { signOut() }}>Logout</Button>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </div>
    )
}

export default Navbar