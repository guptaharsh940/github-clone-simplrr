import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import according to your project structure

export async function GET(req: Request) {
    try {
        const posts = await db.post.findMany();
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
