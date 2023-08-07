import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import { AlertCircle, Loader, Loader2 } from "lucide-react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Small, P, Blockquote } from "@/components/typography";
import { formatSeconds } from "@/utils/format";
import ytdl from "ytdl-core";
import Link from "next/link";
type Props = {
  youtubeUrl: string;
};

export function VideoInfoDialog({ youtubeUrl }: Props) {
  const {
    data: videoData,
    isLoading: videoIsLoading,
    isError: videoIsError,
    error: videoError,
    refetch: refetchVideo,
  } = api.youtube.getVideoInfo.useQuery(
    {
      youtubeUrl,
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: () => {
        void refetchTranscriptStatus();
      },
    }
  );
  console.log(videoData);
  const {
    data: transcriptStatus,
    isLoading: transcriptIsLoading,
    refetch: refetchTranscriptStatus,
  } = api.transcript.getTranscriptStatus.useQuery(
    {
      youtubeUrl,
    },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
  const info = videoData?.info;

  const generateTranscript = api.transcript.generateTranscript.useMutation();
  const { data: subtitleData, isLoading: subtitleIsLoading } =
    api.youtube.getCaptions.useQuery({ youtubeUrl });
  const handleTranscriptGeneration = async () => {
    const result = await generateTranscript.mutateAsync(
      { youtubeId: info?.videoDetails.videoId as string },
      {
        onSuccess: () => {
          console.log("hello");
        },
      }
    );
    console.log(result);
  };

  return (
    <Dialog
      onOpenChange={() => {
        void refetchVideo();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="default">Get Started</Button>
      </DialogTrigger>
      {videoIsLoading && <LoadingSpinner />}
      {videoIsError && <ErrorAlert errorMessage={videoError.message} />}
      {info && (
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="mt-2">
              {info.videoDetails.title}
            </DialogTitle>
            <DialogDescription className="line-clamp-6 text-left">
              <Image
                src={info.videoDetails.thumbnails[0]?.url as string}
                width={125}
                height={150}
                alt={info.videoDetails.title}
                className="float-right m-1 aspect-auto w-auto rounded-sm"
              />
              {info.videoDetails.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Small className="text-right">Video Runtime</Small>
              <P className="!mt-0 leading-none">
                {formatSeconds(parseInt(info.videoDetails.lengthSeconds))}
              </P>
            </div>
            <P>Video ID: {info.videoDetails.videoId}</P>
          </div>
          {parseInt(info.videoDetails.lengthSeconds) <= 60 * 15 ? (
            <DialogFooter className="gap-2">
              <GenerateTranscriptButton
                handleTranscriptGeneration={handleTranscriptGeneration}
                isLoading={transcriptIsLoading}
                transcriptStatus={transcriptStatus as string}
              />
              <Button asChild>
                <Link href={`/new-post?t=${info.videoDetails.videoId}`}>
                  Generate Blog Post
                </Link>
              </Button>
            </DialogFooter>
          ) : (
            <DialogFooter className="gap-2">
              For best results, please select a video that is less than 15
              minutes long.
            </DialogFooter>
          )}
        </DialogContent>
      )}
    </Dialog>
  );
}

VideoInfoDialog.displayName = "VideoInfoDialog";

const LoadingSpinner = () => (
  <DialogContent>
    <Loader2 className="h-32 w-full animate-spin" />
  </DialogContent>
);

type ErrorProps = {
  errorMessage: string;
};

const ErrorAlert = ({ errorMessage }: ErrorProps) => (
  <DialogContent>
    <Alert variant="destructive" className="mx-auto w-11/12">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Video not found. Please check your URL and try again.
      </AlertDescription>
    </Alert>
  </DialogContent>
);

type TranscriptStatusProps = {
  transcriptStatus: string;
  isLoading: boolean;
  handleTranscriptGeneration: () => Promise<void>;
};

const GenerateTranscriptButton = ({
  transcriptStatus,
  isLoading,
  handleTranscriptGeneration,
}: TranscriptStatusProps) => {
  if (isLoading) {
    return (
      <Button disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        Fetching transcript
      </Button>
    );
  }
  if (transcriptStatus === "not found") {
    return (
      <Button onClick={handleTranscriptGeneration} type="submit">
        Generate transcript
      </Button>
    );
  }
  if (transcriptStatus === "processing") {
    return (
      <Button disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        Generating transcript
      </Button>
    );
  }
  if (transcriptStatus === "complete") {
    return <Button disabled>Transcript ready</Button>;
  }
  return (
    <Button variant="destructive" disabled>
      Error
    </Button>
  );
};
