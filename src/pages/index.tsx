import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import ytdl from "ytdl-core";
import { api } from "@/utils/api";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { VideoInfoDialog } from "@/components/VideoInfoDialog";
import GithubCorner from "@/components/GithubCorner";

const Home: NextPage = () => {
  const [youtubeUrl, setYoutubeUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );

  return (
    <>
      <Head>
        <title>InstaBlog</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GithubCorner />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-prism ">
        <H1 className="m-6 border-b-2 border-b-border">
          Insta
          <span className="bg-gradient-to-tr from-orange-900 to-orange-400 to-50% bg-clip-text text-transparent">
            Blog
          </span>
        </H1>
        <Card className="w-full max-w-sm bg-card/40 backdrop-blur-sm ">
          <CardHeader>
            <CardTitle>Start with a video</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="videoUrl">Youtube URL</Label>
            <Input
              id="videoUrl"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <VideoInfoDialog youtubeUrl={youtubeUrl} />
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

Home.displayName = "Home";

export default Home;
