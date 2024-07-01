import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '../ui/button';
import { DotFilledIcon, StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
import Starbutton from '../starbutton';
interface Post {
    id: string;
    title: string;
    description?: string;
    published: boolean;
    authorId:string;
    stars: number;
    language: string;
    createdAt:string;
    // Add more properties as needed
}
interface RepocardProps {
    post: Post;
}

const Repocard:React.FC<RepocardProps> =  ({ post }) => {
    const [usern,setUser] = useState<string>("");
    
    useEffect(()=>{fetch("/api/getuser",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({authorId:post.authorId})
            }).then((res) => res.json()).then((data)=>{setUser(data)})

            

    })

    
    const isoDateString = post.createdAt;
const date = parseISO(isoDateString);
const relativeTime = formatDistanceToNow(date, { addSuffix: true });
    return (
        <div className='min-w-max'>
            <Card className='m-5'>
                <CardHeader>
                    <div className='flex'>
                        <div className='h-16 w-1/2 space-x-3 flex items-center'>
                            <Avatar>
                                <AvatarFallback>{usern.substring(0,2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='text-blue-400 font-bold'>{usern}/{post.title}</p>
                                <p className='text-muted-foreground text-xs'>Created {relativeTime}</p>
                            </div>
                        </div>
                        <div className='lg:w-1/6  md:w-1/12 lg:mr-0 md:mr-8 h-16 ml-auto flex items-center '>
                            <Starbutton post={post}/>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className='text-muted-foreground text-sm'>{post.description}</p>
                </CardContent>
                <CardFooter>
                    <div className='text-muted-foreground flex items-center text-sm'>
                        <p>{post.language}</p>
                        <DotFilledIcon/>
                        <div className='flex space-x-1 items-center'>
                            <StarIcon/>
                            <p>{post.stars}</p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Repocard;
