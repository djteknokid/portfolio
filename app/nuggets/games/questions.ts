export type MechanicType = "grouping" | "matching" | "sequence" | "ranked" | "multiple-choice";

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

export interface MultipleChoiceQuestion extends BaseQuestion {
  mechanic: "multiple-choice";
  mediaUrl?: string;
  options: { id: string; text: string }[];
  correctIds: string[];
}

export type Question = GroupingQuestion | MatchingQuestion | SequenceQuestion | RankedQuestion | MultipleChoiceQuestion;

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
  {
    id: "jazz-swing-vs-other",
    question: "How Is Swing Different From Other Jazz?",
    mechanic: "grouping",
    topic: "jazz",
    zones: [
      { id: "swing",      label: "Swing",            color: "#f59e0b" },
      { id: "other-jazz", label: "Other Jazz Styles", color: "#a78bfa" },
    ],
    items: [
      { id: "big-bands",   label: "Big Bands",           emoji: "", correctGroup: "swing"      },
      { id: "dance-music", label: "Dance Music",         emoji: "", correctGroup: "swing"      },
      { id: "steady-beat", label: "Steady Beat",         emoji: "", correctGroup: "swing"      },
      { id: "lindy-hop",   label: "Lindy Hop",           emoji: "", correctGroup: "swing"      },
      { id: "small-combos",label: "Small Combos",        emoji: "", correctGroup: "other-jazz" },
      { id: "complex-solo",label: "Complex Solos",       emoji: "", correctGroup: "other-jazz" },
      { id: "exp-harmony", label: "Experimental Harmony",emoji: "", correctGroup: "other-jazz" },
      { id: "free-rhythm", label: "Free Rhythm",         emoji: "", correctGroup: "other-jazz" },
    ],
  },
  {
    id: "jazz-instruments",
    question: "Which Instruments Are Used in Jazz?",
    mechanic: "grouping",
    topic: "jazz",
    zones: [
      { id: "jazz", label: "Jazz Instruments", color: "#f59e0b" },
    ],
    items: [
      { id: "saxophone",   label: "Saxophone",   emoji: "", correctGroup: "jazz" },
      { id: "trumpet",     label: "Trumpet",     emoji: "", correctGroup: "jazz" },
      { id: "drum-kit",    label: "Drum Kit",    emoji: "", correctGroup: "jazz" },
      { id: "piano",       label: "Piano",       emoji: "", correctGroup: "jazz" },
      { id: "double-bass", label: "Double Bass", emoji: "", correctGroup: "jazz" },
      { id: "bagpipes",    label: "Bagpipes",    emoji: "", correctGroup: "none" },
      { id: "sitar",       label: "Sitar",       emoji: "", correctGroup: "none" },
      { id: "harpsichord", label: "Harpsichord", emoji: "", correctGroup: "none" },
      { id: "pan-flute",   label: "Pan Flute",   emoji: "", correctGroup: "none" },
    ],
  },

  // ── Wine Essentials ───────────────────────────────────────────────
  {
    id: "wine-what-is",
    question: "What Is Wine?",
    mechanic: "sequence",
    topic: "wine",
    sequence: [
      { id: "1", text: "Grapes Are Harvested — Ripe grapes are picked and crushed to release their juice." },
      { id: "2", text: "Yeast Starts Fermentation — Yeast converts grape sugar into alcohol." },
      { id: "3", text: "Wine Develops Flavor — Fermentation and optional aging shape its taste and aroma." },
      { id: "4", text: "Wine Is Bottled — The finished wine is prepared for drinking." },
    ],
  },
  {
    id: "wine-red-vs-white",
    question: "What's the Difference Between Red and White Wine?",
    mechanic: "grouping",
    topic: "wine",
    zones: [
      { id: "red",   label: "Red Wine",   color: "#f87171" },
      { id: "white", label: "White Wine", color: "#fde68a" },
    ],
    items: [
      { id: "skins",        label: "Fermented with grape skins",      emoji: "", correctGroup: "red"   },
      { id: "tannins",      label: "Tannins from grape skins",        emoji: "", correctGroup: "red"   },
      { id: "dark-fruit",   label: "Often darker fruit flavors",      emoji: "", correctGroup: "red"   },
      { id: "slight-cool",  label: "Commonly served slightly cool",   emoji: "", correctGroup: "red"   },
      { id: "no-skins",     label: "Usually fermented without skins", emoji: "", correctGroup: "white" },
      { id: "low-tannins",  label: "Typically lower tannins",         emoji: "", correctGroup: "white" },
      { id: "citrus",       label: "Often citrus or orchard fruit flavors", emoji: "", correctGroup: "white" },
      { id: "chilled",      label: "Commonly served chilled",         emoji: "", correctGroup: "white" },
    ],
  },
  {
    id: "wine-grapes",
    question: "5 Wine Grapes Everyone Should Know",
    mechanic: "matching",
    topic: "wine",
    pairs: [
      { id: "cab",  left: "Cabernet Sauvignon", right: "Bold, tannic red"      },
      { id: "mer",  left: "Merlot",             right: "Smooth, plummy red"    },
      { id: "pin",  left: "Pinot Noir",         right: "Light, delicate red"   },
      { id: "cha",  left: "Chardonnay",         right: "Rich or crisp white"   },
      { id: "sauv", left: "Sauvignon Blanc",    right: "Crisp, citrusy white"  },
    ],
  },
  {
    id: "wine-dry-sweet",
    question: "What Makes Wine Dry or Sweet?",
    mechanic: "sequence",
    topic: "wine",
    sequence: [
      { id: "1", text: "Grapes Contain Sugar — Ripe grapes naturally contain fermentable sugars." },
      { id: "2", text: "Yeast Consumes Sugar — During fermentation, yeast turns sugar into alcohol." },
      { id: "3", text: "Fermentation Determines Sweetness — More sugar converted generally means a drier wine." },
      { id: "4", text: "Residual Sugar Remains — Sugar left in the finished wine contributes to sweetness." },
    ],
  },
  {
    id: "wine-regions",
    question: "What Are the Major Wine Regions?",
    mechanic: "matching",
    topic: "wine",
    pairs: [
      { id: "bor", left: "Bordeaux",    right: "France"        },
      { id: "tus", left: "Tuscany",     right: "Italy"         },
      { id: "rio", left: "Rioja",       right: "Spain"         },
      { id: "nap", left: "Napa Valley", right: "United States" },
      { id: "men", left: "Mendoza",     right: "Argentina"     },
    ],
  },
  // ── Pop Culture ───────────────────────────────────────────────────
  {
    id: "mj-hits",
    question: "Greatest Michael Jackson Hits — in order",
    mechanic: "sequence",
    topic: "pop culture",
    sequence: [
      { id: "1", text: "Don't Stop 'Til You Get Enough" },
      { id: "2", text: "Billie Jean" },
      { id: "3", text: "Thriller" },
      { id: "4", text: "Bad" },
      { id: "5", text: "Smooth Criminal" },
      { id: "6", text: "Black or White" },
    ],
  },
  {
    id: "madonna-hits",
    question: "Greatest Madonna Hits — in order",
    mechanic: "sequence",
    topic: "pop culture",
    sequence: [
      { id: "1", text: "Holiday" },
      { id: "2", text: "Like a Virgin" },
      { id: "3", text: "Papa Don't Preach" },
      { id: "4", text: "Like a Prayer" },
      { id: "5", text: "Vogue" },
      { id: "6", text: "Hung Up" },
    ],
  },
  {
    id: "madonna-queen-of-pop",
    question: "How Did Madonna Become the Queen of Pop?",
    mechanic: "sequence",
    topic: "pop culture",
    sequence: [
      { id: "1", text: "Moves to New York to pursue dancing and music." },
      { id: "2", text: "Breaks into the club scene with hits like Holiday." },
      { id: "3", text: "Like a Virgin becomes a global hit, making her a superstar." },
      { id: "4", text: "Reinvents pop music through provocative videos, fashion, and performances." },
      { id: "5", text: "Like a Prayer and Vogue become massive hits, cementing her Queen of Pop status." },
    ],
  },
  {
    id: "elvis-king-of-rock",
    question: "How Did Elvis Become the King of Rock and Roll?",
    mechanic: "sequence",
    topic: "pop culture",
    sequence: [
      { id: "1", text: "Grows up in the South, influenced by gospel, blues, and country music." },
      { id: "2", text: "Records at Sun Records, blending musical styles into a new rockabilly sound." },
      { id: "3", text: "Heartbreak Hotel becomes a massive hit, launching him into national stardom." },
      { id: "4", text: "TV performances electrify teenagers, with his voice, dancing, and rebellious image." },
      { id: "5", text: "Hit songs and Hollywood movies turn Elvis into a global cultural icon." },
    ],
  },

  {
    id: "wine-cab-vs-merlot",
    question: "What's the Difference Between Cabernet and Merlot?",
    mechanic: "grouping",
    topic: "wine",
    zones: [
      { id: "cab",    label: "Cabernet Sauvignon", color: "#7c3aed" },
      { id: "merlot", label: "Merlot",             color: "#f87171" },
    ],
    items: [
      { id: "firm-tannins",  label: "Firmer tannins",             emoji: "", correctGroup: "cab"    },
      { id: "structured",    label: "Often more structured",      emoji: "", correctGroup: "cab"    },
      { id: "blackcurrant",  label: "Blackcurrant flavors",       emoji: "", correctGroup: "cab"    },
      { id: "ages-well",     label: "Often benefits from aging",  emoji: "", correctGroup: "cab"    },
      { id: "soft-tannins",  label: "Softer tannins",             emoji: "", correctGroup: "merlot" },
      { id: "rounder",       label: "Often rounder texture",      emoji: "", correctGroup: "merlot" },
      { id: "plum",          label: "Plum flavors",               emoji: "", correctGroup: "merlot" },
      { id: "approachable",  label: "Often approachable younger", emoji: "", correctGroup: "merlot" },
    ],
  },

  // ── Jazz: multiple-choice ─────────────────────────────────────────

  // Louis Armstrong — What a Wonderful World
  {
    id: "louis-armstrong-wwlw",
    question: "Name the artist and song title.",
    mechanic: "multiple-choice",
    topic: "jazz",
    mediaUrl: "https://www.youtube.com/embed/CaCSuzR4DwM?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1",
    options: [
      { id: "louis-armstrong",  text: "Louis Armstrong" },
      { id: "miles-davis",      text: "Miles Davis" },
      { id: "nat-king-cole",    text: "Nat King Cole" },
      { id: "frank-sinatra",    text: "Frank Sinatra" },
      { id: "what-a-wonderful", text: "What a Wonderful World" },
      { id: "la-vie-en-rose",   text: "La Vie en Rose" },
      { id: "summertime",       text: "Summertime" },
      { id: "fly-me-to-moon",   text: "Fly Me to the Moon" },
    ],
    correctIds: ["louis-armstrong", "what-a-wonderful"],
  },

  // Miles Davis — So What
  {
    id: "miles-davis-so-what",
    question: "Name the artist and song title. (Hint: Kind of Blue, 1959)",
    mechanic: "multiple-choice",
    topic: "jazz",
    mediaUrl: "https://www.youtube.com/embed/zqNTltOGh5c?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1",
    options: [
      { id: "miles-davis",       text: "Miles Davis" },
      { id: "john-coltrane",     text: "John Coltrane" },
      { id: "dave-brubeck",      text: "Dave Brubeck" },
      { id: "thelonious-monk",   text: "Thelonious Monk" },
      { id: "so-what",           text: "So What" },
      { id: "round-midnight",    text: "Round Midnight" },
      { id: "take-five",         text: "Take Five" },
      { id: "blue-in-green",     text: "Blue in Green" },
    ],
    correctIds: ["miles-davis", "so-what"],
  },

  // John Coltrane — My Favorite Things
  {
    id: "coltrane-my-favorite-things",
    question: "Name the artist and song title. (Hint: recorded in 1960)",
    mechanic: "multiple-choice",
    topic: "jazz",
    mediaUrl: "https://www.youtube.com/embed/qWG2dsXV5HI?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1",
    options: [
      { id: "john-coltrane",       text: "John Coltrane" },
      { id: "miles-davis-2",       text: "Miles Davis" },
      { id: "charlie-parker",      text: "Charlie Parker" },
      { id: "sonny-rollins",       text: "Sonny Rollins" },
      { id: "my-favorite-things",  text: "My Favorite Things" },
      { id: "a-love-supreme",      text: "A Love Supreme" },
      { id: "giant-steps",         text: "Giant Steps" },
      { id: "autumn-leaves",       text: "Autumn Leaves" },
    ],
    correctIds: ["john-coltrane", "my-favorite-things"],
  },

  // Dave Brubeck — Take Five
  {
    id: "brubeck-take-five",
    question: "Name the artist and song title. (Hint: unusual time signature)",
    mechanic: "multiple-choice",
    topic: "jazz",
    mediaUrl: "https://www.youtube.com/embed/vmDDOFXSgAs?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1",
    options: [
      { id: "dave-brubeck",       text: "Dave Brubeck" },
      { id: "oscar-peterson",     text: "Oscar Peterson" },
      { id: "bill-evans",         text: "Bill Evans" },
      { id: "thelonious-monk-2",  text: "Thelonious Monk" },
      { id: "take-five",          text: "Take Five" },
      { id: "all-blues",          text: "All Blues" },
      { id: "time-out",           text: "Time Out" },
      { id: "blue-rondo",         text: "Blue Rondo à la Turk" },
    ],
    correctIds: ["dave-brubeck", "take-five"],
  },

  // Chet Baker — My Funny Valentine
  {
    id: "chet-baker-my-funny-valentine",
    question: "Name the artist and song title. (Hint: West Coast cool jazz)",
    mechanic: "multiple-choice",
    topic: "jazz",
    mediaUrl: "https://www.youtube.com/embed/ni9Cp9mOOOg?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1",
    options: [
      { id: "chet-baker",          text: "Chet Baker" },
      { id: "frank-sinatra-2",     text: "Frank Sinatra" },
      { id: "nat-king-cole-2",     text: "Nat King Cole" },
      { id: "louis-armstrong-2",   text: "Louis Armstrong" },
      { id: "my-funny-valentine",  text: "My Funny Valentine" },
      { id: "almost-blue",         text: "Almost Blue" },
      { id: "but-not-for-me",      text: "But Not for Me" },
      { id: "the-thrill-is-gone",  text: "The Thrill Is Gone" },
    ],
    correctIds: ["chet-baker", "my-funny-valentine"],
  },

  // Thelonious Monk — Round Midnight
  {
    id: "monk-round-midnight",
    question: "Name the artist and song title. (Hint: bebop pioneer)",
    mechanic: "multiple-choice",
    topic: "jazz",
    mediaUrl: "https://www.youtube.com/embed/IrAfjW5qiyo?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=0&controls=1",
    options: [
      { id: "thelonious-monk-q",   text: "Thelonious Monk" },
      { id: "duke-ellington",      text: "Duke Ellington" },
      { id: "bill-evans-2",        text: "Bill Evans" },
      { id: "herbie-hancock",      text: "Herbie Hancock" },
      { id: "round-midnight-q",    text: "Round Midnight" },
      { id: "straight-no-chaser",  text: "Straight No Chaser" },
      { id: "blue-monk",           text: "Blue Monk" },
      { id: "in-walked-bud",       text: "In Walked Bud" },
    ],
    correctIds: ["thelonious-monk-q", "round-midnight-q"],
  },
];
