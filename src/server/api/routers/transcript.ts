import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getAudio } from "@/lib/audio";
import { createTranscript } from "@/lib/openai";

export const transcriptRouter = createTRPCRouter({
  generateTranscript: publicProcedure
    .input(z.object({ youtubeId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // check if transcript already exists
      const transcript = await ctx.prisma.transcript.findUnique({
        where: {
          youtubeId: input.youtubeId,
        },
      });
      if (transcript) {
        if (transcript.status === "IN_PROGRESS") return "in progress";
        if (transcript.status === "COMPLETE") return "complete";
      }
      // create transcript
      await ctx.prisma.transcript.create({
        data: {
          youtubeId: input.youtubeId,
          status: "IN_PROGRESS",
        },
      });
      // get audio
      const audio = await getAudio(input.youtubeId);
      const newTranscript = await createTranscript(
        audio.audioBufferResult,
        `audio.${audio.format}`,
        audio.title
      );
      // update transcript
      await ctx.prisma.transcript.update({
        where: {
          youtubeId: input.youtubeId,
        },
        data: {
          status: "COMPLETE",
          transcript: newTranscript.text,
        },
      });
      return "complete";
    }),
  getTranscriptStatus: publicProcedure
    .input(z.object({ youtubeUrl: z.string() }))
    .query(async ({ input, ctx }) => {
      const youtubeId = input.youtubeUrl.split("v=")[1];
      const transcript = await ctx.prisma.transcript.findUnique({
        where: {
          youtubeId
        },
      });

      if (transcript) {
        if (transcript.status === "IN_PROGRESS") return "in progress";
        if (transcript.status === "COMPLETE") return "complete";
        if (transcript.status === "FAILED") return "error";
      }
      return "not found";
    }
    ),
});
