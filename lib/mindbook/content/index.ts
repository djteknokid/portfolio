import { introduction } from "./introduction";

type ChapterContent = {
  slug: string;
  content: string;
};

const contentMap: Record<string, ChapterContent> = {
  introduction,
};

export function getChapterContent(slug: string): ChapterContent | null {
  return contentMap[slug] ?? null;
}
