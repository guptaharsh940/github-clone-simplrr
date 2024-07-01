"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@radix-ui/react-dialog"
import { useSession } from "next-auth/react"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { Textarea } from "@/components/ui/textarea"


const formSchema = z.object({
    repoName: z.string()
        .min(1, 'Repository Name is required')
        .regex(/^[a-zA-Z0-9-]+$/, 'Repository Name should contain no spaces and special characters except "-"'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(100, 'Description must be less than 100 characters'),
    language: z.enum(['Java', 'C++', 'Python', 'TypeScript'])
});

const NewRepoForm = () => {
    const session =useSession();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            repoName: "",
            description: "",
            language: 'Java'            
        },
    })

    const router = useRouter()

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        let val = {...values, userId:""}
        val.userId = session.data?.user?.id ? session.data.user.id : "null";
        

        const response = await fetch('/api/repo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(val)
        })
        if (response.ok) {
            router.push('/')
        } else {
            console.error("Repository creation failed")
        }
    }
    return (
        <div className="w-fit flex justify-center items-center">
            <div className="w-80">
                
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="repoName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Repository Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Repository Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter Description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select>
                                            <SelectTrigger>
                                            <SelectValue placeholder="Select a Language" />
                                            </SelectTrigger>
                                            <FormControl>
                                                <SelectContent {...field}>
                                                    <SelectItem value="Java" >Java</SelectItem>
                                                    <SelectItem value="C++" >C++</SelectItem>
                                                    <SelectItem value="Python" >Python</SelectItem>
                                                    <SelectItem value="TypeScript" >TypeScript</SelectItem>
                                                </SelectContent>
                                            </FormControl>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">
                                    <DialogClose>
                                    Create Repository
                                    </DialogClose>
                                    </Button>
                            </form>
                        </Form>
                    </div>
                
            </div>
        </div>
    )
}

export default NewRepoForm;
