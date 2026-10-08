export interface NuggetSet {
  slug: string;
  label: string;
  name: string;         // pack name, e.g. "Iron Curtain"
  description: string;  // one-line tagline
  topics: string[];
  thumbId: string;
  cardCount: number;
}

export const NUGGET_SETS: NuggetSet[] = [
  {
    slug: "history",
    label: "History",
    name: "Turning Points",
    description: "The moments that bent the arc of civilization.",
    topics: ["history"],
    thumbId: "berlin-wall-fall",
    cardCount: 40,
  },
  {
    slug: "wwii",
    label: "World War II",
    name: "Total War",
    description: "Six years that reshaped every border on the map.",
    topics: ["WWII"],
    thumbId: "wwii-beginning",
    cardCount: 3,
  },
  {
    slug: "cold-war",
    label: "Cold War",
    name: "Iron Curtain",
    description: "Forty years of tension fought without a single battle.",
    topics: ["Cold War"],
    thumbId: "cold-war-begin",
    cardCount: 2,
  },
  {
    slug: "music",
    label: "Music",
    name: "Wave",
    description: "How Korean pop conquered the world one song at a time.",
    topics: ["K-pop"],
    thumbId: "south-korea-global-rise",
    cardCount: 2,
  },
  {
    slug: "culture",
    label: "Culture",
    name: "Hallyu",
    description: "The soft power behind dramas, food, and a global identity.",
    topics: ["Korean culture"],
    thumbId: "korean-culture-appeal",
    cardCount: 1,
  },
];

export function getSet(slug: string): NuggetSet | undefined {
  return NUGGET_SETS.find((s) => s.slug === slug);
}
