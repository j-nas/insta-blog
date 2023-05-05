import axios from 'axios';
import { encode, decode } from 'gpt-3-encoder'
import type { CreateTranscriptionResponse, CreateChatCompletionResponse } from 'openai';
import { env } from '@/env.mjs';
import FormData from 'form-data';

const TOKEN_LIMIT = 3500;

const chatUrl = "https://api.openai.com/v1/chat/completions";
const whisperUrl = "https://api.openai.com/v1/audio/transcriptions";


export function trimTokens(input: string) {
  const encoded = encode(input);
  if (encoded.length <= TOKEN_LIMIT) {
    return input;
  }
  const amountToTrim = encoded.length - TOKEN_LIMIT;
  return decode(encoded.slice(0, -amountToTrim));
}

export async function createBlogPost(text: string, title: string) {
  const chatUrl = "https://api.openai.com/v1/chat/completions";
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are writing a blog post, using a youtube transcript summary as a prompt. You will output the blog post in markdown.",
      },
      {
        role: "user",
        content: `Please write a 2000 word blog post, formatted in markdown, about ${title}. The prompt as follows: ${trimTokens(text)}`,
      },
    ],
  };

  const response = await axios.post(chatUrl, JSON.stringify(requestBody), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
  })

  return response.data as CreateChatCompletionResponse;


}
export async function createSummary(text: string, title: string) {
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are summarizing a youtube transcript. Try to keep it under 1000 words.",
      },
      {
        role: "user",
        content: `Please summarize this youtube transcript, about ${title}. The transcript as follows: ${trimTokens(text)}`,
      },
    ],
  };

  const response = await axios.post(chatUrl, JSON.stringify(requestBody), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
  })

  return response.data as CreateChatCompletionResponse;


}

export async function createTranscript(
  file: Buffer,
  fileName: string,
  prompt: string
) {
  const formData = new FormData();

  formData.append("file", file, {
    filename: fileName,
    contentType: "audio/webm",
  });
  formData.append("model", "whisper-1");
  formData.append("response_format", "json");
  formData.append("language", "en");
  formData.append("prompt", prompt);

  // Send a POST request to the OpenAI API
  const response = await axios.post(whisperUrl, formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
  });
  return response.data as CreateTranscriptionResponse;
}
