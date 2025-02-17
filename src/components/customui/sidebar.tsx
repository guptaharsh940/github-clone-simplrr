"use client";
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authOptions } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import { Checkbox } from "@/components/ui/checkbox"
import { Select,SelectContent,SelectItem,SelectTrigger, SelectValue } from "@/components/ui/select"
interface Filter{
    isUser:boolean;
    isStarredRepo:boolean;
    lang:string;
    sortby:string;
  }
interface ChildComponentProps {
    filter: Filter;
    setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}
  
const Sidebar: React.FC<ChildComponentProps>  = ({setFilter,filter}) => {

    const session = useSession();
    const handleMyRepo=(e:boolean|string)=>{
        if(e === true||e===false){
            setFilter({...filter,isUser:e})
        }
        
    }
    const handleStarredRepo=(e:boolean|string)=>{
        if(e === true||e===false){
            setFilter({...filter,isStarredRepo:e})
        }
        
    }
    const handleSetLang= (e:string)=>{
        setFilter({...filter,lang:e})
    }
    const handleSort = (e:string)=>{
        setFilter({...filter,sortby:e})
    }
    return (
        <div className='min-h-screen fixed mr-auto border-r border-gray-700 lg:w-1/4 w-full flex flex-col'>
            <div className='m-5 h-16 space-x-3 p-3 flex items-center'>
                <Avatar>
                    <AvatarFallback>{(session?.data?.user.username) ? (session?.data?.user.username.substring(0, 2).toUpperCase()) : ("NU")}</AvatarFallback>
                </Avatar>
                <p>{(session?.data?.user.username) ? (session?.data?.user.username) : ("NULL")}</p>
            </div>
            <div className='m-5 p-3'>
                <p className='text-xl font-bold'>Filter Options:</p>
                <div className='flex space-x-2 items-center mt-3'>                
                    <Checkbox id="myrepo" onCheckedChange={(e)=>{handleMyRepo(e)}} checked={filter.isUser}/>
                    <label
                        htmlFor="terms"
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Show Only My Repositories
                    </label>
                    </div>
                <div className='flex space-x-2 items-center mt-3'>                
                    <Checkbox id="starredrepo"  onCheckedChange={(e)=>{handleStarredRepo(e)}} checked={filter.isStarredRepo}/>
                    <label
                        htmlFor="terms"
                        className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Show Starred Repositories
                    </label>
                    </div>
                
            <p className='text-lg font-bold my-5'>Based on Language:</p>
            <div className='flex w-fit'>
                    <Select onValueChange={(e)=>(handleSetLang(e))} value={filter.lang=='Null'?"":filter.lang}>
                        <SelectTrigger>
                        <SelectValue  placeholder="Select a Language"/>
                        
                        </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="Java" >Java</SelectItem>
                                <SelectItem value="C++" >C++</SelectItem>
                                <SelectItem value="Python" >Python</SelectItem>
                                <SelectItem value="TypeScript" >TypeScript</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
            
            <p className='text-lg font-bold my-5'>Sort By</p>
            <div className='flex w-fit'>
                    <Select onValueChange={(e)=>(handleSort(e))} value={filter.sortby}>
                        <SelectTrigger>
                        <SelectValue  placeholder="Sort By"/>
                        
                        </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="timeDesc" >Newest First</SelectItem>
                                <SelectItem value="timeAsc" >Oldest First</SelectItem>
                                <SelectItem value="starDesc" >Most Starred</SelectItem>
                                <SelectItem value="starAsc" >Least Starred</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        </div>


        </div>
    )
}

export default Sidebar