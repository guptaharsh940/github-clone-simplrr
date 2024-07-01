import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { repoName, description, language, userId } = body;

        // Check if the repository name already exists
        // const existingRepo = await db.post.findMany({
        //     where: { title: repoName}
        // });

        // if (existingRepo!=undefined) {
        //     return NextResponse.json(
        //         { post: null, message: "Repository with this name already exists" },
        //         { status: 409 }
        //     );
        // }

        // Create a new post with the provided data
        const newPost = await db.post.create({
            data: {
                title: repoName,
                description: description,
                language: language,
                stars: 0, // Initialize stars with 0
                published: true, // Default published value
                authorId: userId
            }
        });


        return NextResponse.json(newPost, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: JSON.stringify(error)}, { status: 500 });
    }
}
