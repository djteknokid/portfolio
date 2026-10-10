export type MechanicType = "grouping" | "matching" | "sequence" | "ranked" | "multiple-choice" | "pronunciation" | "visual-recognition";

interface BaseQuestion {
  id: string;
  question: string;
  mechanic: MechanicType;
  topic: string;
  thumbId?: string;  // overrides id when the thumb filename differs
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

export interface PronunciationQuestion extends BaseQuestion {
  mechanic: "pronunciation";
  audioUrl: string;
  phonetic?: string;
  definition?: string;
}

export interface VisualRecognitionQuestion extends BaseQuestion {
  mechanic: "visual-recognition";
  imageIds: string[];        // 2–4 thumbIds
  options: { id: string; label: string }[];
  correctId: string;
  explanation?: string;      // visual clues shown after answering
}

export type Question = GroupingQuestion | MatchingQuestion | SequenceQuestion | RankedQuestion | MultipleChoiceQuestion | PronunciationQuestion | VisualRecognitionQuestion;

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
    question: "Which countries were founding members of NATO?",
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
      { id: "psy",       title: "PSY",               emoji: "🕺", description: "Viral breakthrough. Gangnam Style introduced millions to Korean pop entertainment." },
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
      { id: "1", text: "A French Colonial Port — New Orleans becomes a major Mississippi River trading center." },
      { id: "2", text: "African Musical Traditions — Enslaved Africans bring rhythms, songs, and musical traditions to the city." },
      { id: "3", text: "Caribbean Influence — Refugees from Haiti and Caribbean trade introduce additional musical styles and rhythms." },
      { id: "4", text: "A Unique Musical Melting Pot — Black musicians blend African, Caribbean, and European influences, giving birth to jazz." },
    ],
  },
  {
    id: "jazz-swing",
    question: "What Is Swing Music?",
    mechanic: "sequence",
    topic: "jazz",
    sequence: [
      { id: "1", text: "Jazz Gets People Dancing — Jazz becomes popular in dance halls and clubs across America." },
      { id: "2", text: "Big Bands Take Over — Larger jazz orchestras develop powerful, danceable rhythms with trumpets, saxophones, and trombones." },
      { id: "3", text: "Swing Becomes a Craze — Bandleaders like Benny Goodman and Duke Ellington help bring swing to national audiences." },
      { id: "4", text: "America Dances to Swing — Radio, ballrooms, and dances like the Lindy Hop make swing the defining sound of an era." },
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
    question: "Name the artist and song title. (Hint: Kind of Blue)",
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
    question: "Name the artist and song title. (Hint: a jazz reimagining of a show tune)",
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

  // ── Coffee ────────────────────────────────────────────────────────

  // 01 — What Makes Espresso Different?
  {
    id: "coffee-espresso",
    question: "How does an espresso machine turn ground coffee into a concentrated shot?",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-esp-1", text: "Finely grind roasted coffee beans" },
      { id: "c-esp-2", text: "Pack the grounds into a portafilter" },
      { id: "c-esp-3", text: "Force hot water through under pressure" },
      { id: "c-esp-4", text: "Extract concentrated coffee into a cup" },
      { id: "c-esp-5", text: "A golden crema may form on top" },
    ],
  },

  // 02 — Arabica vs. Robusta
  {
    id: "coffee-arabica-robusta",
    question: "Coffee comes primarily from two species. Can you tell them apart?",
    mechanic: "grouping",
    topic: "coffee",
    zones: [
      { id: "arabica", label: "Arabica",  color: "#a78bfa" },
      { id: "robusta", label: "Robusta",  color: "#fb923c" },
    ],
    items: [
      { id: "ar-1", label: "Smoother, more complex flavors",      emoji: "", correctGroup: "arabica" },
      { id: "ar-2", label: "Generally lower caffeine",            emoji: "", correctGroup: "arabica" },
      { id: "ar-3", label: "Often grown at higher elevations",    emoji: "", correctGroup: "arabica" },
      { id: "ar-4", label: "Common in specialty coffee",          emoji: "", correctGroup: "arabica" },
      { id: "ro-1", label: "Stronger, often more bitter flavors", emoji: "", correctGroup: "robusta" },
      { id: "ro-2", label: "Generally higher caffeine",           emoji: "", correctGroup: "robusta" },
      { id: "ro-3", label: "Often grown at lower elevations",     emoji: "", correctGroup: "robusta" },
      { id: "ro-4", label: "Common in instant coffee and espresso blends", emoji: "", correctGroup: "robusta" },
    ],
  },

  // 03 — Recognize These Coffee Drinks
  {
    id: "coffee-drinks",
    question: "Match each popular coffee drink with its description.",
    mechanic: "matching",
    topic: "coffee",
    pairs: [
      { id: "espresso",    left: "Espresso",    right: "Small, concentrated coffee shot" },
      { id: "americano",   left: "Americano",   right: "Espresso diluted with hot water" },
      { id: "latte",       left: "Latte",        right: "Espresso with plenty of steamed milk" },
      { id: "cappuccino",  left: "Cappuccino",  right: "Espresso, steamed milk, and substantial foam" },
      { id: "macchiato",   left: "Macchiato",   right: "Espresso marked with a little milk or foam" },
      { id: "flat-white",  left: "Flat White",  right: "Espresso with steamed milk and fine microfoam" },
    ],
  },

  // 04 — Bean to Cup
  {
    id: "coffee-cherries",
    question: "Before coffee reaches your cup, what happens to it?",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-btc-1", text: "Coffee cherries grow on trees" },
      { id: "c-btc-2", text: "Ripe cherries are harvested" },
      { id: "c-btc-3", text: "Beans are processed and dried" },
      { id: "c-btc-4", text: "Green coffee beans are roasted" },
      { id: "c-btc-5", text: "Roasted beans are ground" },
      { id: "c-btc-6", text: "Hot water extracts the coffee" },
    ],
  },

  // 05 — Latte vs. Cappuccino
  {
    id: "coffee-latte-cappuccino",
    question: "Both drinks contain espresso and milk. Which characteristics belong to each?",
    mechanic: "grouping",
    topic: "coffee",
    zones: [
      { id: "latte",      label: "Latte",      color: "#60a5fa" },
      { id: "cappuccino", label: "Cappuccino", color: "#f472b6" },
    ],
    items: [
      { id: "lc-1", label: "Typically more steamed milk",              emoji: "", correctGroup: "latte" },
      { id: "lc-2", label: "Thin layer of microfoam",                  emoji: "", correctGroup: "latte" },
      { id: "lc-3", label: "Creamier, milk-forward experience",        emoji: "", correctGroup: "latte" },
      { id: "lc-4", label: "Often served in a larger cup",             emoji: "", correctGroup: "latte" },
      { id: "cp-1", label: "Typically less liquid milk",               emoji: "", correctGroup: "cappuccino" },
      { id: "cp-2", label: "More pronounced foam layer",               emoji: "", correctGroup: "cappuccino" },
      { id: "cp-3", label: "Stronger coffee presence relative to milk",emoji: "", correctGroup: "cappuccino" },
      { id: "cp-4", label: "Often served in a smaller cup",            emoji: "", correctGroup: "cappuccino" },
    ],
  },

  // 06 — Largest Coffee Producer
  {
    id: "coffee-brazil",
    question: "Which country is the world's largest coffee producer?",
    mechanic: "multiple-choice",
    topic: "coffee",
    options: [
      { id: "colombia",  text: "Colombia" },
      { id: "ethiopia",  text: "Ethiopia" },
      { id: "brazil",    text: "Brazil" },
      { id: "vietnam",   text: "Vietnam" },
    ],
    correctIds: ["brazil"],
  },

  // 07 — Light vs. Dark Roast
  {
    id: "coffee-roasting",
    question: "What happens to coffee beans as roasting progresses?",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-rst-1", text: "Green beans enter the roaster" },
      { id: "c-rst-2", text: "Beans dry and begin turning yellow" },
      { id: "c-rst-3", text: "Beans brown as aromas develop" },
      { id: "c-rst-4", text: "First crack signals a major roasting stage" },
      { id: "c-rst-5", text: "Continued roasting produces darker flavors" },
      { id: "c-rst-6", text: "Very dark roasts develop smoky, bitter notes" },
    ],
  },

  // 08 — What Is Specialty Coffee?
  {
    id: "coffee-specialty",
    question: "What most accurately defines specialty coffee?",
    mechanic: "multiple-choice",
    topic: "coffee",
    options: [
      { id: "caffeine",   text: "Coffee with extra caffeine" },
      { id: "quality",    text: "Coffee evaluated for exceptional quality" },
      { id: "expensive",  text: "Coffee served only in expensive cafés" },
      { id: "espresso",   text: "Coffee made exclusively with espresso machines" },
    ],
    correctIds: ["quality"],
  },

  // 09 — Where Did Coffee Come From?
  {
    id: "coffee-ethiopia",
    question: "How did coffee spread from Africa into a global drinking culture?",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-his-1", text: "Wild Arabica coffee grows in Ethiopia" },
      { id: "c-his-2", text: "Coffee cultivation and drinking develop in Yemen" },
      { id: "c-his-3", text: "Coffeehouses flourish in the Ottoman world" },
      { id: "c-his-4", text: "Coffee becomes popular in European cities" },
      { id: "c-his-5", text: "Coffee cultivation spreads across the Americas" },
      { id: "c-his-6", text: "Coffee becomes a global everyday beverage" },
    ],
  },

  // 10 — Coffee Vocabulary
  {
    id: "coffee-vocabulary",
    question: "Match these six coffee terms to their meanings.",
    mechanic: "matching",
    topic: "coffee",
    pairs: [
      { id: "crema",         left: "Crema",          right: "Golden foam that can form on espresso" },
      { id: "barista",       left: "Barista",         right: "Person trained to prepare coffee drinks" },
      { id: "extraction",    left: "Extraction",      right: "Dissolving flavor compounds from coffee using water" },
      { id: "bloom",         left: "Bloom",           right: "Initial release of gas when water wets fresh grounds" },
      { id: "single-origin", left: "Single Origin",   right: "Coffee sourced from one identifiable origin" },
      { id: "tamping",       left: "Tamping",         right: "Compressing ground coffee in an espresso portafilter" },
    ],
  },

  // 11 — Which Countries Drink the Most Coffee?
  {
    id: "coffee-top-consumers",
    question: "Rank these countries by total domestic coffee consumption, highest to lowest.",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "usa",     text: "🇺🇸 United States" },
      { id: "brazil",  text: "🇧🇷 Brazil" },
      { id: "germany", text: "🇩🇪 Germany" },
      { id: "japan",   text: "🇯🇵 Japan" },
      { id: "france",  text: "🇫🇷 France" },
    ],
  },

  // 12 — Which Countries Drink the Most Coffee Per Person?
  {
    id: "coffee-per-capita",
    question: "Rank these countries by annual coffee consumption per person, highest to lowest.",
    mechanic: "ranked",
    topic: "coffee",
    items: [
      { id: "finland", title: "Finland", emoji: "🇫🇮", description: "#1 per person" },
      { id: "norway",  title: "Norway",  emoji: "🇳🇴", description: "#2 per person" },
      { id: "iceland", title: "Iceland", emoji: "🇮🇸", description: "#3 per person" },
      { id: "denmark", title: "Denmark", emoji: "🇩🇰", description: "#4 per person" },
      { id: "sweden",  title: "Sweden",  emoji: "🇸🇪", description: "#5 per person" },
    ],
  },

  // 13 — How Did Coffee Conquer Europe?
  {
    id: "coffee-europe",
    question: "Put these milestones in the correct historical order.",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-eu-1", text: "Coffee drinking spreads through the Ottoman Empire" },
      { id: "c-eu-2", text: "Venice becomes an early European coffee trading center" },
      { id: "c-eu-3", text: "London's coffeehouses become popular meeting places" },
      { id: "c-eu-4", text: "Paris develops its famous café culture" },
      { id: "c-eu-5", text: "European colonial powers expand coffee cultivation overseas" },
    ],
  },

  // 14 — How Did Starbucks Become a Global Coffee Giant?
  {
    id: "coffee-starbucks",
    question: "Put these Starbucks milestones in chronological order.",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-sb-1", text: "Starbucks opens in Seattle selling coffee beans" },
      { id: "c-sb-2", text: "Howard Schultz joins the company" },
      { id: "c-sb-3", text: "Schultz develops an Italian-inspired coffeehouse business" },
      { id: "c-sb-4", text: "Schultz's company acquires Starbucks" },
      { id: "c-sb-5", text: "Starbucks goes public" },
      { id: "c-sb-6", text: "Starbucks expands into thousands of locations worldwide" },
    ],
  },

  // 15 — What's the Best Water Temperature for Brewing Coffee?
  {
    id: "coffee-temp",
    question: "Arrange these brewing temperatures from coldest to hottest.",
    mechanic: "ranked",
    topic: "coffee",
    items: [
      { id: "t-fridge",  title: "40°F / 4°C",   emoji: "🧊", description: "Refrigerated water" },
      { id: "t-room",    title: "70°F / 21°C",   emoji: "🌡️", description: "Room temperature" },
      { id: "t-cool",    title: "175°F / 79°C",  emoji: "♨️", description: "Cooler hot brewing" },
      { id: "t-filter",  title: "200°F / 93°C",  emoji: "☕", description: "Typical filter-coffee brewing" },
      { id: "t-boiling", title: "212°F / 100°C", emoji: "💧", description: "Boiling water at sea level" },
    ],
  },

  // 16 — How Is Cold Brew Actually Made?
  {
    id: "coffee-cold-brew",
    question: "Arrange the steps to make classic cold brew coffee.",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-cb-1", text: "Coarsely grind roasted coffee beans" },
      { id: "c-cb-2", text: "Combine grounds with cool water" },
      { id: "c-cb-3", text: "Steep for several hours" },
      { id: "c-cb-4", text: "Filter out the coffee grounds" },
      { id: "c-cb-5", text: "Serve chilled, diluting if needed" },
    ],
  },

  // 17 — How Did Instant Coffee Become a Global Staple?
  {
    id: "coffee-instant",
    question: "Arrange these milestones in instant coffee history.",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-ic-1", text: "Early soluble-coffee products emerge" },
      { id: "c-ic-2", text: "Instant coffee gains commercial traction" },
      { id: "c-ic-3", text: "Nescafé launches in Switzerland" },
      { id: "c-ic-4", text: "Instant coffee becomes widely used during World War II" },
      { id: "c-ic-5", text: "Freeze-drying improves instant coffee production" },
      { id: "c-ic-6", text: "Premium instant coffee products enter the modern market" },
    ],
  },

  // 18 — Which Countries Buy the Most Coffee From Abroad?
  {
    id: "coffee-importers",
    question: "Rank these countries by green coffee imports in 2025, highest to lowest.",
    mechanic: "ranked",
    topic: "coffee",
    items: [
      { id: "imp-usa",     title: "United States", emoji: "🇺🇸", description: "#1 importer" },
      { id: "imp-germany", title: "Germany",       emoji: "🇩🇪", description: "#2 importer" },
      { id: "imp-italy",   title: "Italy",         emoji: "🇮🇹", description: "#3 importer" },
      { id: "imp-japan",   title: "Japan",         emoji: "🇯🇵", description: "#4 importer" },
      { id: "imp-spain",   title: "Spain",         emoji: "🇪🇸", description: "#5 importer" },
    ],
  },

  // 19 — Starbucks vs. Luckin
  {
    id: "coffee-chains",
    question: "Rank these coffee chains by worldwide store count at end of 2025, highest to lowest.",
    mechanic: "ranked",
    topic: "coffee",
    items: [
      { id: "chain-starbucks", title: "Starbucks",     emoji: "🟢", description: "~41,000 stores" },
      { id: "chain-luckin",    title: "Luckin Coffee", emoji: "🔵", description: "31,048 stores" },
    ],
  },

  // 20 — How Did Italy Invent Modern Espresso?
  {
    id: "coffee-espresso-history",
    question: "Put these milestones in the history of espresso machines in chronological order.",
    mechanic: "sequence",
    topic: "coffee",
    sequence: [
      { id: "c-esp-1", text: "Angelo Moriondo patents an early coffee machine" },
      { id: "c-esp-2", text: "Luigi Bezzera improves espresso technology" },
      { id: "c-esp-3", text: "Early espresso machines spread through Italian cafés" },
      { id: "c-esp-4", text: "Achille Gaggia patents a pressure-based system" },
      { id: "c-esp-5", text: "Gaggia's lever machines help popularize crema" },
      { id: "c-esp-6", text: "Modern espresso culture spreads internationally" },
    ],
  },

  // ── Wine Pronunciation ───────────────────────────────────────────────────
  {
    id: "wine-cabernet-sauvignon",
    question: "Pronounce: Cabernet Sauvignon",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-cabernet-sauvignon.mp3",
    phonetic: "KAB-er-nay SOH-vin-yohn",
    definition: "The world's most planted red grape. Full-bodied with dark fruit, firm tannins, and age-worthiness. Bordeaux's signature variety.",
  },
  {
    id: "wine-merlot",
    question: "Pronounce: Merlot",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-merlot.mp3",
    phonetic: "mer-LOH",
    definition: "Softer and rounder than Cabernet. Plum and cherry flavors with velvety tannins. The dominant grape in Pomerol and Saint-Émilion.",
  },
  {
    id: "wine-pinot-noir",
    question: "Pronounce: Pinot Noir",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-pinot-noir.mp3",
    phonetic: "PEE-noh NWAHR",
    definition: "Burgundy's great red grape. Notoriously finicky to grow. Light-bodied, silky, with red fruit and earthy complexity. Also used in Champagne.",
  },
  {
    id: "wine-chardonnay",
    question: "Pronounce: Chardonnay",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-chardonnay.mp3",
    phonetic: "shar-doh-NAY",
    definition: "The world's most popular white grape. Ranges from lean and mineral in Chablis to rich and buttery in California. Blank canvas for winemaker style.",
  },
  {
    id: "wine-sauvignon-blanc",
    question: "Pronounce: Sauvignon Blanc",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-sauvignon-blanc.mp3",
    phonetic: "SOH-vin-yohn BLONK",
    definition: "Crisp, herbaceous white with citrus and grassy notes. Loire Valley's Sancerre is the benchmark. New Zealand's Marlborough made it globally famous.",
  },
  {
    id: "wine-riesling",
    question: "Pronounce: Riesling",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-riesling.mp3",
    phonetic: "REEZ-ling",
    definition: "Germany's noble white grape. Aromatic, high-acid, low-alcohol. Ranges from bone dry to lusciously sweet. Ages better than almost any white wine.",
  },
  {
    id: "wine-bordeaux",
    question: "Pronounce: Bordeaux",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-bordeaux.mp3",
    phonetic: "bor-DOH",
    definition: "France's most prestigious wine region. Left Bank is Cabernet-dominant; Right Bank is Merlot-dominant. Home to the famous 1855 classification.",
  },
  {
    id: "wine-burgundy",
    question: "Pronounce: Burgundy",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-burgundy.mp3",
    phonetic: "BUR-gun-dee",
    definition: "France's Bourgogne region — Pinot Noir and Chardonnay only. Tiny plots called 'climats' define quality. The most complex terroir-driven wines on earth.",
  },
  {
    id: "wine-champagne",
    question: "Pronounce: Champagne",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-champagne.mp3",
    phonetic: "sham-PAIN",
    definition: "Sparkling wine from the Champagne region of France only. Made by secondary fermentation in the bottle. Pinot Noir, Meunier, and Chardonnay grapes.",
  },
  {
    id: "wine-rioja",
    question: "Pronounce: Rioja",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-rioja.mp3",
    phonetic: "ree-OH-ha",
    definition: "Spain's most famous red wine region. Tempranillo-based, oak-aged. Crianza, Reserva, and Gran Reserva indicate aging time.",
  },
  {
    id: "wine-sommelier",
    question: "Pronounce: Sommelier",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-sommelier.mp3",
    phonetic: "suh-mel-YAY",
    definition: "A trained wine professional responsible for selecting, pairing, and serving wine in a restaurant. The Master Sommelier exam is one of the hardest in any field.",
  },
  {
    id: "wine-brut",
    question: "Pronounce: Brut",
    mechanic: "pronunciation",
    topic: "wine",
    audioUrl: "/nuggets/audio/wine-brut.mp3",
    phonetic: "BROOT",
    definition: "The driest style of Champagne and sparkling wine. Less than 12g/L residual sugar. When you order Champagne without specifying, this is what you'll get.",
  },

  // ── Art Essentials — Volume 1 ──────────────────────────────────────────────

  // 01 — Van Gogh Visual Recognition
  {
    id: "art-vangogh",
    question: "Who painted these three works?",
    mechanic: "visual-recognition",
    topic: "art",
    imageIds: ["art-vangogh-starry-night", "art-vangogh-sunflowers", "art-vangogh-self-portrait"],
    options: [
      { id: "vangogh",  label: "Vincent van Gogh" },
      { id: "monet",    label: "Claude Monet" },
      { id: "picasso",  label: "Pablo Picasso" },
      { id: "cezanne",  label: "Paul Cézanne" },
    ],
    correctId: "vangogh",
    explanation: "Van Gogh's signature: thick, swirling brushstrokes that make everything feel alive and in motion. His skies writhe, his flowers vibrate. No other painter puts that much physical energy into every inch of canvas.",
  },

  // 02 — Monet Visual Recognition
  {
    id: "art-monet",
    question: "Who painted these water scenes and gardens?",
    mechanic: "visual-recognition",
    topic: "art",
    imageIds: ["art-monet-water-lilies", "art-monet-impression-sunrise", "art-monet-haystacks"],
    options: [
      { id: "monet",    label: "Claude Monet" },
      { id: "vangogh",  label: "Vincent van Gogh" },
      { id: "renoir",   label: "Pierre-Auguste Renoir" },
      { id: "degas",    label: "Edgar Degas" },
    ],
    correctId: "monet",
    explanation: "Monet paints light, not objects. His surfaces are built from dabs of color that dissolve edges and shimmer. Stand close and it looks like chaos. Step back and the water, sky, and reflection snap into place.",
  },

  // 03 — Picasso Visual Recognition
  {
    id: "art-picasso",
    question: "Who created these fragmented compositions?",
    mechanic: "visual-recognition",
    topic: "art",
    imageIds: ["art-picasso-demoiselles", "art-picasso-three-musicians", "art-picasso-harlequin"],
    options: [
      { id: "picasso",  label: "Pablo Picasso" },
      { id: "braque",   label: "Georges Braque" },
      { id: "matisse",  label: "Henri Matisse" },
      { id: "leger",    label: "Fernand Léger" },
    ],
    correctId: "picasso",
    explanation: "Cubism shows multiple angles at once — a face seen from front and side simultaneously. Picasso breaks the rule that a painting must show one moment from one viewpoint, as if asking: why should art pretend the world is flat?",
  },

  // 04 — Dalí Visual Recognition
  {
    id: "art-dali",
    question: "Who painted these dreamlike, impossible scenes?",
    mechanic: "visual-recognition",
    topic: "art",
    imageIds: ["art-dali-persistence", "art-dali-elephants", "art-dali-narcissus"],
    options: [
      { id: "dali",     label: "Salvador Dalí" },
      { id: "magritte", label: "René Magritte" },
      { id: "ernst",    label: "Max Ernst" },
      { id: "miro",     label: "Joan Miró" },
    ],
    correctId: "dali",
    explanation: "Dalí paints the logic of dreams: objects that belong in the real world become strange, melted, or combined with things they should never touch. His technique was photorealistic — the more precisely he painted, the more unsettling the result.",
  },

  // 05 — How Did Western Art Evolve?
  {
    id: "art-movements-sequence",
    question: "Put these Western art movements in chronological order.",
    mechanic: "sequence",
    topic: "art",
    sequence: [
      { id: "a-mv-1", text: "Renaissance — rebirth of classical ideals and perspective" },
      { id: "a-mv-2", text: "Baroque — drama, contrast, and religious grandeur" },
      { id: "a-mv-3", text: "Romanticism — emotion, nature, and the sublime" },
      { id: "a-mv-4", text: "Impressionism — light, everyday scenes, broken brushwork" },
      { id: "a-mv-5", text: "Modernism — abstraction, experimentation, breaking rules" },
    ],
  },

  // 06 — Who Painted What? — Da Vinci / Michelangelo
  {
    id: "art-masters-matching",
    question: "Match each masterpiece to its creator.",
    mechanic: "matching",
    topic: "art",
    pairs: [
      { id: "mona-lisa",    left: "Mona Lisa",             right: "Leonardo da Vinci" },
      { id: "last-supper",  left: "The Last Supper",       right: "Leonardo da Vinci" },
      { id: "creation",     left: "The Creation of Adam",  right: "Michelangelo" },
      { id: "david",        left: "David (sculpture)",     right: "Michelangelo" },
      { id: "scream",       left: "The Scream",            right: "Edvard Munch" },
      { id: "pearl",        left: "Girl with a Pearl Earring", right: "Johannes Vermeer" },
    ],
  },

  // 07 — Impressionism or Cubism?
  {
    id: "art-movement-grouping",
    question: "Sort these works into the movement they belong to.",
    mechanic: "grouping",
    topic: "art",
    zones: [
      { id: "impressionism", label: "Impressionism", color: "#60a5fa" },
      { id: "cubism",        label: "Cubism",        color: "#f87171" },
    ],
    items: [
      { id: "water-lilies",    label: "Water Lilies — Monet",           emoji: "🌸", correctGroup: "impressionism" },
      { id: "magpie",          label: "The Magpie — Monet",             emoji: "❄️", correctGroup: "impressionism" },
      { id: "moulin-rouge",    label: "At the Moulin Rouge — Toulouse-Lautrec", emoji: "🎪", correctGroup: "impressionism" },
      { id: "les-demoiselles", label: "Les Demoiselles d'Avignon — Picasso",    emoji: "🎭", correctGroup: "cubism" },
      { id: "three-musicians", label: "Three Musicians — Picasso",      emoji: "🎵", correctGroup: "cubism" },
      { id: "violin",          label: "Violin and Candlestick — Braque", emoji: "🎻", correctGroup: "cubism" },
    ],
  },

  // 08 — How Did Picasso Change Modern Art?
  {
    id: "art-picasso-sequence",
    question: "Put these milestones in Picasso's artistic life in order.",
    mechanic: "sequence",
    topic: "art",
    sequence: [
      { id: "a-pic-1", text: "Blue Period — melancholic figures in shades of blue" },
      { id: "a-pic-2", text: "Rose Period — warmer tones, circus performers" },
      { id: "a-pic-3", text: "Les Demoiselles d'Avignon — the proto-Cubist breakthrough" },
      { id: "a-pic-4", text: "Analytic Cubism with Georges Braque — fragmented forms" },
      { id: "a-pic-5", text: "Synthetic Cubism — collage and bold flat color" },
      { id: "a-pic-6", text: "Guernica — monumental anti-war statement" },
    ],
  },

  // 09 — Which Famous Paintings Came First?
  {
    id: "art-timeline",
    question: "Rank these iconic works from oldest to most recent.",
    mechanic: "ranked",
    topic: "art",
    items: [
      { id: "last-supper-yr",  title: "The Last Supper",            emoji: "✝️",  description: "Leonardo da Vinci" },
      { id: "girl-pearl-yr",   title: "Girl with a Pearl Earring",  emoji: "💎", description: "Vermeer" },
      { id: "scream-yr",       title: "The Scream",                 emoji: "😱", description: "Munch" },
      { id: "starry-yr",       title: "The Starry Night",          emoji: "🌌", description: "Van Gogh" },
      { id: "water-lily-yr",   title: "Water Lilies series",       emoji: "🌸", description: "Monet" },
    ],
  },

  // 10 — What Makes a Painting Worth Millions?
  {
    id: "art-value",
    question: "Sort these factors into what drives art value vs. what doesn't.",
    mechanic: "grouping",
    topic: "art",
    zones: [
      { id: "drives-value",   label: "Drives Value",     color: "#4ade80" },
      { id: "doesnt-matter",  label: "Doesn't Determine Value", color: "#f87171" },
    ],
    items: [
      { id: "provenance",    label: "Documented ownership history",    emoji: "📜", correctGroup: "drives-value" },
      { id: "rarity",        label: "Few works by the artist survive", emoji: "🔒", correctGroup: "drives-value" },
      { id: "auction-record",label: "Record price at auction",         emoji: "🔨", correctGroup: "drives-value" },
      { id: "museum-shows",  label: "Exhibited in major museums",      emoji: "🏛️", correctGroup: "drives-value" },
      { id: "colors-used",   label: "Number of colors in the painting",emoji: "🎨", correctGroup: "doesnt-matter" },
      { id: "canvas-size",   label: "Physical size of the canvas",     emoji: "📐", correctGroup: "doesnt-matter" },
    ],
  },

  // ── Art Essentials — Artist Pronunciations ────────────────────────────────

  {
    id: "art-pronounce-vangogh",
    question: "Pronounce: Vincent van Gogh",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-vangogh-starry-night",
    audioUrl: "/nuggets/audio/art-vangogh.mp3",
    phonetic: "VIN-sent van GOH",
    definition: "Dutch Post-Impressionist. Painted The Starry Night, Sunflowers, and hundreds of self-portraits in just a decade. Sold one painting in his lifetime.",
  },
  {
    id: "art-pronounce-monet",
    question: "Pronounce: Claude Monet",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-monet-water-lilies",
    audioUrl: "/nuggets/audio/art-monet.mp3",
    phonetic: "klohd moh-NAY",
    definition: "French Impressionist. Founded the movement that gave us soft light and broken brushwork. Spent the last 30 years painting his own garden at Giverny.",
  },
  {
    id: "art-pronounce-picasso",
    question: "Pronounce: Pablo Picasso",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-picasso-demoiselles",
    audioUrl: "/nuggets/audio/art-picasso.mp3",
    phonetic: "PAH-blo pee-KAH-so",
    definition: "Spanish Cubist. Co-invented Cubism with Georges Braque — the first style to abandon a single viewpoint. His full name has 23 words.",
  },
  {
    id: "art-pronounce-davinci",
    question: "Pronounce: Leonardo da Vinci",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-davinci-mona-lisa",
    audioUrl: "/nuggets/audio/art-davinci.mp3",
    phonetic: "lay-oh-NAR-doh dah VIN-chee",
    definition: "Italian Renaissance polymath. Painted the Mona Lisa and The Last Supper. Also filled 7,000+ pages of notebooks with engineering, anatomy, and invention sketches.",
  },
  {
    id: "art-pronounce-michelangelo",
    question: "Pronounce: Michelangelo",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-michelangelo-creation",
    audioUrl: "/nuggets/audio/art-michelangelo.mp3",
    phonetic: "MY-kel-AN-jeh-loh",
    definition: "Italian Renaissance sculptor and painter. Spent four years painting the Sistine Chapel ceiling lying on his back. Regarded it as inferior to his sculpture.",
  },
  {
    id: "art-pronounce-dali",
    question: "Pronounce: Salvador Dalí",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-dali-persistence",
    audioUrl: "/nuggets/audio/art-dali.mp3",
    phonetic: "SAL-vah-dor dah-LEE",
    definition: "Spanish Surrealist. Painted The Persistence of Memory. His photorealistic technique made the impossible look undeniably real — that tension is the whole point.",
  },
  {
    id: "art-pronounce-rembrandt",
    question: "Pronounce: Rembrandt van Rijn",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-vangogh-starry-night",
    audioUrl: "/nuggets/audio/art-rembrandt.mp3",
    phonetic: "REM-brant van RINE",
    definition: "Dutch Golden Age master. Famous for dramatic light emerging from darkness — a technique called chiaroscuro. Painted The Night Watch. Died bankrupt.",
  },
  {
    id: "art-pronounce-vermeer",
    question: "Pronounce: Johannes Vermeer",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-vermeer-pearl",
    audioUrl: "/nuggets/audio/art-vermeer.mp3",
    phonetic: "yo-HAH-nes ver-MEER",
    definition: "Dutch Baroque painter. Left only 34–36 known works. Girl with a Pearl Earring is his most famous — it took 300 years for the world to notice how good he was.",
  },
  {
    id: "art-pronounce-kahlo",
    question: "Pronounce: Frida Kahlo",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-davinci-mona-lisa",
    audioUrl: "/nuggets/audio/art-kahlo.mp3",
    phonetic: "FREE-dah KAH-loh",
    definition: "Mexican painter. Made 55 self-portraits, many depicting physical and emotional pain from a near-fatal bus accident at 18. Said she painted her own reality.",
  },
  {
    id: "art-pronounce-warhol",
    question: "Pronounce: Andy Warhol",
    mechanic: "pronunciation",
    topic: "art",
    thumbId: "art-picasso-three-musicians",
    audioUrl: "/nuggets/audio/art-warhol.mp3",
    phonetic: "AN-dee WOR-hol",
    definition: "American Pop artist. Turned Campbell's soup cans and Marilyn Monroe into fine art. Called his studio The Factory and made celebrity the subject of art.",
  },
];
