import { QuestionMarkIcon } from '@radix-ui/react-icons'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
const Help = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="fixed flex justify-center items-center bottom-0 right-0 m-5 w-10 h-10 rounded-full border border-gray-400 bg-gray-900 hover:bg-gray-600">
                    <QuestionMarkIcon />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Help</DialogTitle>
                    <DialogDescription>
                        This is how you need to use it
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-10 py-4 ">
                    <ul>
                        <li>You can either login with existing user credentials </li>
                        <ul className='text-muted-foreground ml-3'>
                            <li>username - testuser</li>
                            <li>password - testuser</li>
                        </ul>
                        <li>Or you can signup </li>
                        <li>Currently the features which are working are </li>
                        <ul className='text-muted-foreground ml-3'>
                            <li>Adding a new Repository</li>
                            <li>Starring a Repository</li>
                            <li>Creating a new user</li>
                            <li>Filter</li>
                        </ul>
                        <li>Currently the features which are not working are </li>
                        <ul className='text-muted-foreground ml-3'>
                            <li>Sort</li>
                            <li>Search</li>
                            <li>Editing a user</li>
                            <li>Deleting a repository</li>
                        </ul>
                        </ul>
                    </div>
            </DialogContent>
        </Dialog>
    )
        
    
}

export default Help


