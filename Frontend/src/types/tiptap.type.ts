import type { JSONContent } from "@tiptap/core";

type HTMLContent = string;
export type Content = HTMLContent | JSONContent | JSONContent[] | null;