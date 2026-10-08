export interface NuggetSet {
  slug: string;
  number: string;
  name: string;
  description: string;
  topics: string[];
  thumbId: string;
  cardCount: number;
}

export const NUGGET_SETS: NuggetSet[] = [
  {
    slug: "world-history",
    number: "001",
    name: "1900s World History",
    description: "The wars, revolutions, and rivalries that made the modern world.",
    topics: ["history", "WWII", "Cold War"],
    thumbId: "berlin-wall-fall",
    cardCount: 45,
  },
  {
    slug: "music",
    number: "002",
    name: "K-Pop Essentials",
    description: "Know the artists, songs, and culture.",
    topics: ["K-pop"],
    thumbId: "south-korea-global-rise",
    cardCount: 2,
  },
  {
    slug: "culture",
    number: "003",
    name: "Korean Culture Essentials",
    description: "The soft power behind the global wave.",
    topics: ["Korean culture"],
    thumbId: "korean-culture-appeal",
    cardCount: 1,
  },
];

export function getSet(slug: string): NuggetSet | undefined {
  return NUGGET_SETS.find((s) => s.slug === slug);
}
