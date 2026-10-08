export interface NuggetSet {
  slug: string;
  number: string;       // "001", "002", etc.
  name: string;         // "WWII Essentials"
  description: string;
  topics: string[];
  thumbId: string;
  cardCount: number;
}

export const NUGGET_SETS: NuggetSet[] = [
  {
    slug: "history",
    number: "001",
    name: "History Essentials",
    description: "The events everyone should know.",
    topics: ["history"],
    thumbId: "berlin-wall-fall",
    cardCount: 40,
  },
  {
    slug: "wwii",
    number: "002",
    name: "WWII Essentials",
    description: "The war everyone should understand.",
    topics: ["WWII"],
    thumbId: "wwii-beginning",
    cardCount: 3,
  },
  {
    slug: "cold-war",
    number: "003",
    name: "Cold War Essentials",
    description: "The rivalry that shaped our world.",
    topics: ["Cold War"],
    thumbId: "cold-war-begin",
    cardCount: 2,
  },
  {
    slug: "music",
    number: "004",
    name: "K-Pop Essentials",
    description: "Know the artists, songs, and culture.",
    topics: ["K-pop"],
    thumbId: "south-korea-global-rise",
    cardCount: 2,
  },
  {
    slug: "culture",
    number: "005",
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
