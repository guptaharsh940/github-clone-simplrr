"use client";
import Navbar from "@/components/customui/navbar";
import Repocard from "@/components/customui/repocard";
import Sidebar from "@/components/customui/sidebar";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Redirecting...</p>;
  }


  return (
    <div>
      <Navbar/>
      <div className="mt-20 flex flex-row">
        
      <Sidebar/>

      <div className="flex ml-[400px]">
        <div className="">
        <Repocard/>
        <Repocard/>
        <Repocard/>
        <Repocard/>
        </div>
      </div>
      </div>
    </div>
  );
}
