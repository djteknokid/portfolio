export type MechanicType = "grouping" | "matching" | "sequence" | "ranked";

interface BaseQuestion {
  id: string;
  question: string;
  mechanic: MechanicType;
  topic: string;
}

export interface GroupingQuestion extends BaseQuestion {
  mechanic: "grouping";
  zones: { id: string; label: string; color: string }[];
  items: { id: string; label: string; emoji: string; correctGroup: string }[];
}

export interface MatchingQuestion extends BaseQuestion {
  mechanic: "matching";
  pairs: { id: string; left: string; right: string }[];
}

export interface SequenceQuestion extends BaseQuestion {
  mechanic: "sequence";
  sequence: { id: string; text: string }[];
}

export interface RankedQuestion extends BaseQuestion {
  mechanic: "ranked";
  items: { id: string; title: string; emoji: string; description: string }[];
}

export type Question = GroupingQuestion | MatchingQuestion | SequenceQuestion | RankedQuestion;

export const GAME_QUESTIONS: Question[] = [
  {
    id: "axis-allies",
    question: "Which countries fought on which side in World War II?",
    mechanic: "grouping",
    topic: "WWII",
    zones: [
      { id: "allies", label: "Allied Powers", color: "#60a5fa" },
      { id: "axis",   label: "Axis Powers",   color: "#f87171" },
    ],
    items: [
      { id: "usa",     label: "United States",  emoji: "🇺🇸", correctGroup: "allies" },
      { id: "uk",      label: "United Kingdom", emoji: "🇬🇧", correctGroup: "allies" },
      { id: "ussr",    label: "Soviet Union",   emoji: "🇷🇺", correctGroup: "allies" },
      { id: "france",  label: "France",         emoji: "🇫🇷", correctGroup: "allies" },
      { id: "china",   label: "China",          emoji: "🇨🇳", correctGroup: "allies" },
      { id: "germany", label: "Germany",        emoji: "🇩🇪", correctGroup: "axis"   },
      { id: "japan",   label: "Japan",          emoji: "🇯🇵", correctGroup: "axis"   },
      { id: "italy",   label: "Italy",          emoji: "🇮🇹", correctGroup: "axis"   },
    ],
  },
  {
    id: "nato",
    question: "Which countries were founding members of NATO in 1949?",
    mechanic: "grouping",
    topic: "Cold War",
    zones: [
      { id: "nato",     label: "Founding NATO Members", color: "#60a5fa" },
      { id: "non-nato", label: "Not in NATO",            color: "#a78bfa" },
    ],
    items: [
      { id: "usa",         label: "United States",  emoji: "🇺🇸", correctGroup: "nato"     },
      { id: "uk",          label: "United Kingdom", emoji: "🇬🇧", correctGroup: "nato"     },
      { id: "france",      label: "France",         emoji: "🇫🇷", correctGroup: "nato"     },
      { id: "canada",      label: "Canada",         emoji: "🇨🇦", correctGroup: "nato"     },
      { id: "norway",      label: "Norway",         emoji: "🇳🇴", correctGroup: "nato"     },
      { id: "denmark",     label: "Denmark",        emoji: "🇩🇰", correctGroup: "nato"     },
      { id: "portugal",    label: "Portugal",       emoji: "🇵🇹", correctGroup: "nato"     },
      { id: "italy",       label: "Italy",          emoji: "🇮🇹", correctGroup: "nato"     },
      { id: "germany",     label: "Germany",        emoji: "🇩🇪", correctGroup: "non-nato" },
      { id: "ussr",        label: "Soviet Union",   emoji: "🇷🇺", correctGroup: "non-nato" },
      { id: "sweden",      label: "Sweden",         emoji: "🇸🇪", correctGroup: "non-nato" },
      { id: "switzerland", label: "Switzerland",    emoji: "🇨🇭", correctGroup: "non-nato" },
    ],
  },
  {
    id: "asian-communism",
    question: "Which Asian countries were communist during the Cold War?",
    mechanic: "grouping",
    topic: "Cold War",
    zones: [
      { id: "communist", label: "Communist Countries", color: "#f87171" },
    ],
    items: [
      { id: "china",       label: "China",         emoji: "🇨🇳", correctGroup: "communist" },
      { id: "north-korea", label: "North Korea",   emoji: "🇰🇵", correctGroup: "communist" },
      { id: "mongolia",    label: "Mongolia",      emoji: "🇲🇳", correctGroup: "communist" },
      { id: "north-viet",  label: "North Vietnam", emoji: "🇻🇳", correctGroup: "communist" },
      { id: "japan",       label: "Japan",         emoji: "🇯🇵", correctGroup: "none"      },
      { id: "south-korea", label: "South Korea",   emoji: "🇰🇷", correctGroup: "none"      },
      { id: "philippines", label: "Philippines",   emoji: "🇵🇭", correctGroup: "none"      },
      { id: "thailand",    label: "Thailand",      emoji: "🇹🇭", correctGroup: "none"      },
    ],
  },
  {
    id: "wwii-capitals",
    question: "What were the capital cities of the major World War II powers?",
    mechanic: "matching",
    topic: "WWII",
    pairs: [
      { id: "germany-pair", left: "Germany",       right: "Berlin"          },
      { id: "japan-pair",   left: "Japan",          right: "Tokyo"           },
      { id: "uk-pair",      left: "United Kingdom", right: "London"          },
      { id: "france-pair",  left: "France",         right: "Paris"           },
      { id: "italy-pair",   left: "Italy",          right: "Rome"            },
      { id: "usa-pair",     left: "United States",  right: "Washington D.C." },
    ],
  },
  {
    id: "wwii-sequence",
    question: "How did World War II begin?",
    mechanic: "sequence",
    topic: "WWII",
    sequence: [
      { id: "1", text: "Hitler takes Austria and Czechoslovakia. Britain and France warn Poland will be different." },
      { id: "2", text: "Germany invades Poland, attacking with tanks and aircraft." },
      { id: "3", text: "Hitler expects Britain and France to back down. They don't — both declare war." },
      { id: "4", text: "The Soviet Union invades Poland from the east. Europe is at war." },
    ],
  },
  {
    id: "kpop-list",
    question: "5 essential K-pop artists and groups",
    mechanic: "ranked",
    topic: "K-pop",
    items: [
      { id: "bts",       title: "BTS",              emoji: "🎤", description: "Global breakthrough. Helped make Korean-language pop music a worldwide mainstream phenomenon." },
      { id: "blackpink", title: "BLACKPINK",         emoji: "💎", description: "Global girl-group phenomenon. Connected K-pop with international fashion and luxury brands." },
      { id: "psy",       title: "PSY",               emoji: "🕺", description: "Viral breakthrough. Gangnam Style introduced millions to Korean pop entertainment in 2012." },
      { id: "bigbang",   title: "BIGBANG",           emoji: "🔥", description: "Influential second-generation group. Helped shape K-pop's modern sound and artist-driven identity." },
      { id: "snsd",      title: "Girls' Generation", emoji: "⭐", description: "Defining girl group. Helped establish the modern K-pop idol model across Asia." },
    ],
  },
  {
    id: "kpop-matching",
    question: "5 K-Pop Stars Everyone Should Know — match the artist to their signature hit",
    mechanic: "matching",
    topic: "K-pop",
    pairs: [
      { id: "bts-pair",    left: "BTS",                          right: "Dynamite"         },
      { id: "bp-pair",     left: "BLACKPINK",                    right: "How You Like That" },
      { id: "psy-pair",    left: "PSY",                          right: "Gangnam Style"     },
      { id: "rose-pair",   left: "ROSÉ & Bruno Mars",            right: "APT."              },
      { id: "huntrx-pair", left: "HUNTR/X (KPop Demon Hunters)", right: "Golden"            },
    ],
  },
  {
    id: "korean-food",
    question: "5 Korean Foods Everyone Should Know — match the food to its description",
    mechanic: "matching",
    topic: "Korean culture",
    pairs: [
      { id: "kimchi",   left: "Kimchi",              right: "Spicy fermented cabbage"         },
      { id: "kbbq",     left: "Korean BBQ",           right: "Grilled meat wrapped in lettuce" },
      { id: "bibimbap", left: "Bibimbap",             right: "Rice mixed with vegetables"      },
      { id: "tteok",    left: "Tteokbokki",           right: "Spicy, chewy rice cakes"         },
      { id: "kfc",      left: "Korean Fried Chicken", right: "Extra-crispy, saucy chicken"     },
    ],
  },
];
