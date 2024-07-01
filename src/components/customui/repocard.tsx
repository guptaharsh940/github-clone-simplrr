import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { DotFilledIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons'
const Repocard = () => {
    return (

        <div>
        <Card className='m-5'>
        <CardHeader>
            <div className='flex'>
        <div className='h-16 w-1/2 space-x-3  flex items-center'>
                <Avatar>
                <AvatarFallback>HG</AvatarFallback>
                </Avatar>
                <div>
                <p className='text-blue-400 font-bold'>username/repository</p>
                <p className='text-muted-foreground text-xs'>Updated time</p>
                </div>
            </div>
            <div className='w-1/6 h-16 ml-auto flex items-center '>
            <Button variant="secondary" className='ml-auto mr-5'><div className='flex space-x-2 items-center'><StarFilledIcon className='text-yellow-500'/><p>Starred</p></div></Button>
            </div>
            </div>

        </CardHeader>
        <CardContent>
            <p className='text-muted-foreground text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe eaque placeat tempora ad? Minima sequi pariatur deserunt inventore, ducimus soluta illo voluptatem laudantium expedita dicta odit delectus, corrupti, impedit neque?</p>
        </CardContent>
        <CardFooter>
            <div className='text-muted-foreground flex items-center text-sm'>
            <p>Language</p>
            <DotFilledIcon/>
            <div className='flex space-x-1 items-center'>
            <StarIcon/>
            <p>23</p>
            </div>
            </div>
        </CardFooter>
        </Card>
        </div>
    )
}

export default Repocard