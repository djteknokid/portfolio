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
    name: "How Did We Get Here",
    description: "Big events that explain the world today.",
    topics: ["history"],
    thumbId: "berlin-wall-fall",
    cardCount: 40,
  },
  {
    slug: "wwii",
    label: "World War II",
    name: "The War That Changed Everything",
    description: "Six years that redrew every border on the map.",
    topics: ["WWII"],
    thumbId: "wwii-beginning",
    cardCount: 3,
  },
  {
    slug: "cold-war",
    label: "Cold War",
    name: "Us vs. Them",
    description: "Decades of standoff between two superpowers.",
    topics: ["Cold War"],
    thumbId: "cold-war-begin",
    cardCount: 2,
  },
  {
    slug: "music",
    label: "Music",
    name: "Why K-pop Took Over",
    description: "The industry behind the biggest pop machine on earth.",
    topics: ["K-pop"],
    thumbId: "south-korea-global-rise",
    cardCount: 2,
  },
  {
    slug: "culture",
    label: "Culture",
    name: "Korea Goes Global",
    description: "Dramas, food, and soft power — how it spread.",
    topics: ["Korean culture"],
    thumbId: "korean-culture-appeal",
    cardCount: 1,
  },
];

export function getSet(slug: string): NuggetSet | undefined {
  return NUGGET_SETS.find((s) => s.slug === slug);
}
