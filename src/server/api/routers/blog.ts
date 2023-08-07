import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createBlogPost, createSummary } from "@/lib/openai";
import ytdl from "ytdl-core";
import DOMPurify from "isomorphic-dompurify";
import { marked } from 'marked'

export const blogRouter = createTRPCRouter({
  generateBlog: publicProcedure
    .input(z.object({ youtubeId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const transcript = await ctx.prisma.transcript.findUniqueOrThrow({
        where: {
          youtubeId: input.youtubeId,
        },
      });
      if (transcript.status === "IN_PROGRESS") return "in progress";
      const title = (await ytdl.getInfo(transcript.youtubeId)).videoDetails.title;
      const summary = await createSummary(transcript.transcript as string, title);
      const markdown = await createBlogPost(
        summary.choices[0]?.message?.content as string,
        title
      );

      const html = DOMPurify.sanitize(marked(
        markdown.choices[0]?.message?.content as string
      ));
      return {
        title,
        html,
        transcriptId: transcript.id,
      }
    }),
});
