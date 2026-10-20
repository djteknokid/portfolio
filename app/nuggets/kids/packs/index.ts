import { THOMAS_EDISON_PACK } from "./thomas-edison";
import type { Question } from "../../games/questions";

export interface KidsPack {
  name: string;
  tagline: string;
  portraitSearchTerm: string;
  cards: (Question & { knowledgeReveal: string; conversationTakeaway: string })[];
}

// Keyed by the person's name (lowercase, trimmed) for fast lookup
export const KIDS_PACKS: Record<string, KidsPack> = {
  "thomas edison": THOMAS_EDISON_PACK,
};

export function getPackForPerson(name: string): KidsPack | null {
  return KIDS_PACKS[name.toLowerCase().trim()] ?? null;
}
