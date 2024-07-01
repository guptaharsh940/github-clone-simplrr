"use client";
import Navbar from "@/components/customui/navbar";
import Repocard from "@/components/customui/repocard";
import Sidebar from "@/components/customui/sidebar";
import Loader from "@/components/loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface Post {
  id: string;
  title: string;
  description?: string;
  published: boolean;
  authorId: string;
  stars: number;
  language: string;
  createdAt: string;
  // Add more properties as needed
}
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[] | never>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);



  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  if (status === "loading") {
    return <Loader/>;
  }

  if (status === "unauthenticated") {
    return <Loader/>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex mt-20 flex-row">
        <div className="hidden lg:flex">
        <Sidebar />
        </div>
        <div className="flex  lg:w-3/4 lg:ml-auto md:w-full sm:w-full">
          <div className="flex flex-col w-full">
            {posts.map((post) =>
              <Repocard key={post.id} post={post} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
