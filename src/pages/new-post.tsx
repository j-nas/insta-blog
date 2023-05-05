import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Tiptap from "@/components/Tiptap";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

const Page: NextPage = () => {
  const [content, setContent] = useState("");
  const youtubeId = useRouter().query.t as string;
  const generateBlogPost = api.blog.generateBlog.useMutation();
  const { isLoading, isSuccess } = generateBlogPost;

  const handleBlogPostGeneration = async () => {
    const result = await generateBlogPost.mutateAsync(
      {
        youtubeId,
      },
      {
        onSuccess: (data) => {
          if (data !== "in progress") {
            setContent(data.html);
          }
        },
      }
    );
    console.log(result);
  };

  return (
    <div className="container flex min-h-screen flex-col place-items-center">
      <Button onClick={handleBlogPostGeneration}>Generate Blog Post</Button>
      {isLoading && <Loader2Icon className="h-40 w-40 animate-spin" />}
      {isSuccess && <Tiptap setContent={setContent} content={content} />}
    </div>
  );
};

Page.displayName = "New Blog Post";
export default Page;
