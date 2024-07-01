import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Adjust the import according to your project structure


export async function POST(req: Request) {
    const { isStar, authorId, postId } = await req.json();

    try {
        await db.$transaction(async (db) => {
            if (!isStar) {
                
                const r1 = await db.star.create({
                    data: {
                        userId: authorId,
                        postId: postId
                    }
                });

                const r2 = await db.post.update({
                    where: { id: postId },
                    data: {
                        stars: {
                            increment: 1
                        }
                    }
                });
            } else {
                await db.star.deleteMany({
                    where: {
                        userId: authorId,
                        postId: postId
                    }
                });

                await db.post.update({
                    where: { id: postId },
                    data: {
                        stars: {
                            decrement: 1
                        }
                    }
                });
            }
        });

        return NextResponse.json(true, { status: 200 });
    } catch (error) {
        console.error('Transaction failed:', error);
        return NextResponse.json({ error: 'Failed to update star and post' }, { status: 500 });
    }
}
