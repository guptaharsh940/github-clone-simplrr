import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import according to your project structure

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { authorId } = body;
        const userdata = await db.user.findUnique(
            {where:{id:authorId}}
        );
        return NextResponse.json(userdata?.username, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
