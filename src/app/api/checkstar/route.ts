import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import according to your project structure

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { authorId,postId } = body;
        const userdata = await db.star.findMany(
            {where:{userId:authorId,postId:postId}}
        );
        if(Object.keys(userdata).length === 0){
            return NextResponse.json(false, { status: 200 });
        }
        else{
            
            return NextResponse.json(true, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch star' }, { status: 500 });
    }
}
