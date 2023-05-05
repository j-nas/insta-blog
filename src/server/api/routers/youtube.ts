import ytdl from "ytdl-core";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";


export const youtubeRouter = createTRPCRouter({

  getVideoInfo: publicProcedure
    .input(z.object({ youtubeUrl: z.string() }))
    .query(async ({ input }) => {
      const info = await ytdl.getInfo(input.youtubeUrl);
      return {
        info,
      };
    }),
});