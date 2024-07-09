import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';
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
const Starbutton:React.FC<{post:Post; userId:String;}> = ({post,userId}) => {
    const [isStar,setIsStar] = useState<boolean>(false);
    useEffect(() => {
        fetch("/api/checkstar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authorId: userId, postId: post.id })
        })
        .then((res) => res.json())
        .then((data) => {
            setIsStar(data);
        });
    }, [])

    const handlebuttonclick = async () =>{
        await fetch("/api/setstar",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({isStar:isStar,authorId:userId,postId:post.id})
        })
        setIsStar(!isStar)
    }
    return (
        <Button variant="secondary" className='ml-auto mr-5 ' onClick={()=>{handlebuttonclick()}}>
                                {isStar?(
                                <div className='flex space-x-2 items-center'>
                                    <StarFilledIcon className='text-yellow-500'/>
                                    <p>Starred</p>
                                </div>):(<div className='flex space-x-2 items-center'>
                                    <StarIcon/>
                                    <p>Star</p>
                                </div>)}
                            </Button>
    )
}

export default Starbutton