export interface NuggetSet {
  slug: string;
  label: string;
  /** topic values that belong to this set */
  topics: string[];
  thumbId: string;
}

export const NUGGET_SETS: NuggetSet[] = [
  {
    slug: "history",
    label: "History",
    topics: ["history"],
    thumbId: "berlin-wall-fall",
  },
  {
    slug: "wwii",
    label: "WWII",
    topics: ["WWII"],
    thumbId: "wwii-beginning",
  },
  {
    slug: "cold-war",
    label: "Cold War",
    topics: ["Cold War"],
    thumbId: "cold-war-begin",
  },
  {
    slug: "music",
    label: "Music",
    topics: ["K-pop"],
    thumbId: "south-korea-global-rise",
  },
  {
    slug: "culture",
    label: "Culture",
    topics: ["Korean culture"],
    thumbId: "korean-culture-appeal",
  },
];

export function getSet(slug: string): NuggetSet | undefined {
  return NUGGET_SETS.find((s) => s.slug === slug);
}
