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

  // ── Jazz Essentials ───────────────────────────────────────────────
  {
    id: "jazz-origins",
    question: "What Is Jazz?",
    mechanic: "sequence",
    topic: "jazz",
    sequence: [
      { id: "1", text: "Jazz emerges from Black musical traditions in New Orleans." },
      { id: "2", text: "Blues, ragtime, and improvisation shape its distinctive sound in Southern communities." },
      { id: "3", text: "The Great Migration brings jazz to Chicago and New York." },
      { id: "4", text: "Radio, clubs, and recordings make jazz a defining American musical form." },
    ],
  },
  {
    id: "jazz-elements",
    question: "What Makes Jazz, Jazz?",
    mechanic: "grouping",
    topic: "jazz",
    zones: [
      { id: "jazz", label: "Jazz Elements", color: "#f59e0b" },
    ],
    items: [
      { id: "improvisation", label: "Improvisation",              emoji: "", correctGroup: "jazz" },
      { id: "swing",         label: "Swing Rhythm",               emoji: "", correctGroup: "jazz" },
      { id: "blue-notes",    label: "Blue Notes",                 emoji: "", correctGroup: "jazz" },
      { id: "syncopation",   label: "Syncopation",                emoji: "", correctGroup: "jazz" },
      { id: "call-response", label: "Call and Response",          emoji: "", correctGroup: "jazz" },
      { id: "scripted",      label: "Strictly Scripted Performance", emoji: "", correctGroup: "none" },
      { id: "edm",           label: "Electronic Dance Beats",     emoji: "", correctGroup: "none" },
      { id: "operatic",      label: "Operatic Singing",           emoji: "", correctGroup: "none" },
    ],
  },
  {
    id: "jazz-legends",
    question: "5 Jazz Legends Everyone Should Know",
    mechanic: "matching",
    topic: "jazz",
    pairs: [
      { id: "armstrong", left: "Louis Armstrong",  right: "What a Wonderful World" },
      { id: "ellington", left: "Duke Ellington",   right: "Take the 'A' Train"     },
      { id: "davis",     left: "Miles Davis",      right: "So What"                },
      { id: "coltrane",  left: "John Coltrane",    right: "Giant Steps"            },
      { id: "fitzgerald",left: "Ella Fitzgerald",  right: "Summertime"             },
    ],
  },
  {
    id: "jazz-styles",
    question: "What Are the Different Types of Jazz?",
    mechanic: "matching",
    topic: "jazz",
    pairs: [
      { id: "nola",   left: "New Orleans Jazz", right: "Collective improvisation"      },
      { id: "swing",  left: "Swing",            right: "Big bands and dance rhythms"   },
      { id: "bebop",  left: "Bebop",            right: "Fast, complex improvisation"   },
      { id: "cool",   left: "Cool Jazz",        right: "Relaxed, understated sound"    },
      { id: "fusion", left: "Jazz Fusion",      right: "Jazz mixed with rock and funk" },
    ],
  },
  {
    id: "jazz-vs-blues",
    question: "What's the Difference Between Blues and Jazz?",
    mechanic: "grouping",
    topic: "jazz",
    zones: [
      { id: "blues", label: "Blues", color: "#60a5fa" },
      { id: "jazz",  label: "Jazz",  color: "#f59e0b" },
    ],
    items: [
      { id: "storytelling",  label: "Personal storytelling",    emoji: "", correctGroup: "blues" },
      { id: "emotional",     label: "Emotional expression",     emoji: "", correctGroup: "blues" },
      { id: "repeating",     label: "Repeating patterns",       emoji: "", correctGroup: "blues" },
      { id: "improvisation", label: "Improvisation",            emoji: "", correctGroup: "jazz"  },
      { id: "rhythmic",      label: "Rhythmic freedom",         emoji: "", correctGroup: "jazz"  },
      { id: "harmonic",      label: "Harmonic exploration",     emoji: "", correctGroup: "jazz"  },
    ],
  },
  {
    id: "jazz-new-orleans",
    question: "Why Was New Orleans the Birthplace of Jazz?",
    mechanic: "sequence",
    topic: "jazz",
    sequence: [
      { id: "1", text: "A French Colonial Port — Founded in 1718, New Orleans becomes a major Mississippi River trading center." },
      { id: "2", text: "African Musical Traditions — Enslaved Africans bring rhythms, songs, and musical traditions to the city." },
      { id: "3", text: "Caribbean Influence — Refugees from Haiti and Caribbean trade introduce additional musical styles and rhythms." },
      { id: "4", text: "A Unique Musical Melting Pot — Black musicians blend African, Caribbean, and European influences, giving birth to jazz around 1900." },
    ],
  },
  {
    id: "jazz-swing",
    question: "What Is Swing Music?",
    mechanic: "sequence",
    topic: "jazz",
    sequence: [
      { id: "1", text: "Jazz Gets People Dancing — In the 1920s, jazz becomes popular in dance halls and clubs across America." },
      { id: "2", text: "Big Bands Take Over — Larger jazz orchestras develop powerful, danceable rhythms with trumpets, saxophones, and trombones." },
      { id: "3", text: "Swing Becomes a Craze — In the 1930s, bandleaders like Benny Goodman and Duke Ellington help bring swing to national audiences." },
      { id: "4", text: "America Dances to Swing — Radio, ballrooms, and dances like the Lindy Hop make swing a defining sound of the 1930s and early 1940s." },
    ],
  },
];
