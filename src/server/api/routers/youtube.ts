import ytdl from "ytdl-core";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import axios from "axios";



export const youtubeRouter = createTRPCRouter({

  getVideoInfo: publicProcedure
    .input(z.object({ youtubeUrl: z.string() }))
    .query(async ({ input }) => {
      const info = await ytdl.getInfo(input.youtubeUrl);
      return {
        info,
      };
    }),
  getCaptions: publicProcedure
    .input(z.object({ youtubeUrl: z.string() }))
    .query(async ({ input }) => {
      const info = await ytdl.getInfo(input.youtubeUrl);
      const xmlUrl = info.player_response.captions?.playerCaptionsTracklistRenderer.captionTracks[0]?.baseUrl
      if (!xmlUrl) throw new Error("No captions found")
      const xml = await axios.get(xmlUrl)
      console.log(xml.data)
    }
    ),
});