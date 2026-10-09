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
    slug: "culture",
    number: "002",
    name: "Korean Culture Essentials",
    description: "K-pop, dramas, food, and the wave that went global.",
    topics: ["Korean culture", "K-pop"],
    thumbId: "korean-culture-appeal",
    cardCount: 3,
  },
  {
    slug: "jazz",
    number: "003",
    name: "Jazz Essentials",
    description: "Things everyone should know about jazz, even if they're not a fan.",
    topics: ["jazz"],
    thumbId: "jazz-origins",
    cardCount: 9,
  },
  {
    slug: "wine",
    number: "004",
    name: "Wine Essentials",
    description: "Know enough about wine to order confidently and sound like you mean it.",
    topics: ["wine"],
    thumbId: "wine-regions",
    cardCount: 6,
  },
  {
    slug: "pop-culture",
    number: "005",
    name: "Pop Culture",
    description: "The artists, moments, and movements that defined modern popular culture.",
    topics: ["pop culture"],
    thumbId: "mj-hits",
    cardCount: 4,
  },
];

export function getSet(slug: string): NuggetSet | undefined {
  return NUGGET_SETS.find((s) => s.slug === slug);
}
