import ytdl from "ytdl-core";

export async function getAudio(youtubeId: string) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
  const audioInfo = await ytdl.getInfo(youtubeUrl);
  const audioFormat = ytdl.chooseFormat(audioInfo.formats, {
    quality: "lowestaudio",
  });

  const audioReadable = ytdl.downloadFromInfo(audioInfo, {
    format: audioFormat,
  });
  const audioChunks: Uint8Array[] = [];
  console.log("audio format: ", audioFormat.container);
  const audioBuffer = new Promise<Buffer>((resolve, _reject) => {
    audioReadable
      .on("data", (chunk) => {
        audioChunks.push(chunk as Uint8Array);
      })

      .on("end", () => {
        const audioBuffer = Buffer.concat(audioChunks);
        console.log("Size of audio buffer: ", audioBuffer.length);
        resolve(audioBuffer);
      });
  });

  const audioBufferResult = await audioBuffer;

  return {
    audioBufferResult,
    title: audioInfo.videoDetails.title,
    format: audioFormat.container,
  };
}
