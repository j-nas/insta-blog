"use client";

import { useEditor, EditorContent, mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";

type Props = {
  content?: string;
  setContent: (content: string) => void;
};
type Levels = 1 | 2 | 3;
const classes: Record<Levels, string> = {
  1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  2: "scroll-m-20 border-b py-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  3: "scroll-m-20 text-2xl py-1 font-semibold tracking-tight",
};

const Tiptap = ({ content, setContent }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        paragraph: {
          HTMLAttributes: {
            class: "leading-7 [&:not(:first-child)]:mt-6",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "mt-6 border-l-2 pl-6 italic",
          },
        },
        code: {
          HTMLAttributes: {
            class:
              "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "my-2 relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold max-w-[100ch] overflow-x-auto",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "my-6 ml-6 list-disc [&>li]:mt-2",
          },
        },
        bold: {
          HTMLAttributes: {
            class: "font-semibold",
          },
        },
        italic: {
          HTMLAttributes: {
            class: "italic",
          },
        },
      }),
      Heading.configure({ levels: [1, 2, 3] }).extend({
        levels: [1, 2, 3],
        renderHTML({ node, HTMLAttributes }) {
          const level: Levels = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];

          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: classes[level],
            }),
            0,
          ];
        },
      }),
    ],
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "!border-red-300 border-4 p-6 max-h-[80vh] overflow-y-auto 0md:w-11/12 mx-auto mt-24 self-center",
      },
    },

    content: content,
  });

  return <EditorContent className=" max-h-[80vh] w-full  " editor={editor} />;
};

export default Tiptap;
