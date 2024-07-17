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

interface Filter{
  isUser:boolean;
  isStarredRepo:boolean;
  lang:string;
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

  const [filter,setFilter] = useState<Filter>({isUser:false,isStarredRepo:false,lang:'Null'});

  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams({
        id: session?.user?.id ? (session?.user?.id) : ("Null"),
        isUser: filter.isUser ? ("True") : ("Null"),
        language: filter.lang,
        isStar: filter.isStarredRepo ? ('True') : ("False"),
        // Add more parameters as needed
      });
      const response = await fetch(`/api/posts?${params.toString()}`);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts(); // Fetch immediately on mount/update

    const intervalId = setInterval(fetchPosts, 20000); // Fetch every 20 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [session, filter]);

  if (status === "loading") {
    return <Loader/>;
  }

  if (status === "unauthenticated") {
    return <Loader/>;
  }

  return (
    <div>
      <Navbar setFilter={setFilter} filter={filter}/>
      <div className="flex mt-20 flex-row">
        <div className="hidden lg:flex">
        <Sidebar setFilter={setFilter} filter={filter}/>
        </div>
        <div className="flex  lg:w-3/4 lg:ml-auto md:w-full sm:w-full">
          <div className="flex flex-col w-full">
            {posts.map((post) =>
              <Repocard key={post.id} post={post} userId={session?.user?.id?(session?.user?.id):("Null")}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
