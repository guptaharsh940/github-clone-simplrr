import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import according to your project structure

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const language = url.searchParams.get('language')
        const id = url.searchParams.get('id')
        const isStar = url.searchParams.get('isStar')
        const isUser = url.searchParams.get('isUser')
        const whereClause: any = {};
        if (language!='Null') {
            whereClause.language = language;
        }
        if (isUser!='Null' && isUser=='True') {
            whereClause.authorId = id;
        }
        if(isStar!='Null' && isStar=='True'){
            const posts = await db.star.findMany({
                select: {
                    postId: true
                },
                where: {
                    // Add your filtering criteria here, e.g., active users
                    userId: id?(id):("null")
                }
            });
            const postIds = posts.map(post => post.postId);
            whereClause.id = {in:postIds};
    
        }
        
        const posts = await db.post.findMany({
            where:whereClause
        });
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
