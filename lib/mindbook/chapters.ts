export type Chapter = {
  number: number;
  title: string;
  slug: string;
  pmNote?: string;
};

export type Part = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  accentColor: string;
  chapters: Chapter[];
};

export const parts: Part[] = [
  {
    id: "part-1",
    number: 1,
    title: "PHILOSOPHY OF MIND",
    subtitle: "What is a mind — and why does your answer change what you build?",
    accentColor: "#3B4FD4",
    chapters: [
      {
        number: 1,
        title: "Why Product Thinkers Need This Field",
        slug: "introduction",
        pmNote: "The discipline you never studied is the one your work depends on.",
      },
      {
        number: 2,
        title: "What Is a Mind?",
        slug: "what-is-a-mind",
        pmNote: "Dualism, functionalism, and the PM question hiding inside both.",
      },
      {
        number: 3,
        title: "The Hard Problem",
        slug: "hard-problem",
        pmNote: "Why consciousness can't be measured — and what that means for your metrics.",
      },
      {
        number: 4,
        title: "Other Minds",
        slug: "other-minds",
        pmNote: "You cannot directly observe your user's experience. You never could.",
      },
      {
        number: 5,
        title: "Functionalism",
        slug: "functionalism",
        pmNote: "When the implementation doesn't matter — and when it does.",
      },
    ],
  },
  {
    id: "part-2",
    number: 2,
    title: "COGNITIVE SCIENCE",
    subtitle: "How humans actually process information — not how you assume they do",
    accentColor: "#7B3FB5",
    chapters: [
      {
        number: 6,
        title: "Mental Representation",
        slug: "mental-representation",
        pmNote: "The internal model every user carries. You're shipping to that, not to reality.",
      },
      {
        number: 7,
        title: "Attention Is a Bottleneck",
        slug: "attention-bottleneck",
        pmNote: "Every UI decision is a bid for a finite resource. Most bids lose.",
      },
      {
        number: 8,
        title: "Memory Is Reconstructive",
        slug: "memory",
        pmNote: "Users don't remember your product. They reconstruct it. Those are different things.",
      },
      {
        number: 9,
        title: "Perception Precedes Understanding",
        slug: "perception",
        pmNote: "The user has already formed an opinion before they've read a word.",
      },
      {
        number: 10,
        title: "Schemas and Frames",
        slug: "schemas",
        pmNote: "Why users misread your UI — and why more instructions won't fix it.",
      },
    ],
  },
  {
    id: "part-3",
    number: 3,
    title: "LINGUISTICS",
    subtitle: "Language as the medium of product thinking",
    accentColor: "#1A7A5E",
    chapters: [
      {
        number: 11,
        title: "Syntax vs. Semantics",
        slug: "syntax-semantics",
        pmNote: "Structure is not meaning. Your PRD can be grammatically perfect and still wrong.",
      },
      {
        number: 12,
        title: "What Words Actually Mean",
        slug: "semantics",
        pmNote: "Feature naming is a product decision. Most teams treat it as a copy decision.",
      },
      {
        number: 13,
        title: "What People Actually Hear",
        slug: "pragmatics",
        pmNote: "Context changes meaning. Your users live in a different context than you.",
      },
      {
        number: 14,
        title: "Framing Effects",
        slug: "framing",
        pmNote: "The same fact framed two ways produces opposite decisions.",
      },
      {
        number: 15,
        title: "Metaphor Is Infrastructure",
        slug: "metaphor",
        pmNote: "The desktop. The folder. The cloud. Metaphors define the ceiling of what a product can be.",
      },
      {
        number: 16,
        title: "Ambiguity",
        slug: "ambiguity",
        pmNote: "When to resolve it and when leaving it open is the right design.",
      },
    ],
  },
  {
    id: "part-4",
    number: 4,
    title: "ARTIFICIAL INTELLIGENCE",
    subtitle: "What AI actually is — and what symbolic systems reveals about it",
    accentColor: "#B5451A",
    chapters: [
      {
        number: 17,
        title: "Symbolic AI vs. Connectionism",
        slug: "symbolic-vs-connectionist",
        pmNote: "The 70-year argument that explains why AI products behave the way they do.",
      },
      {
        number: 18,
        title: "The Turing Test Was the Wrong Question",
        slug: "turing-test",
        pmNote: "What the right question is — and why it should change how you evaluate AI features.",
      },
      {
        number: 19,
        title: "Tokens Are Not Words",
        slug: "tokens",
        pmNote: "The LLM's unit of thought is not the user's unit of meaning.",
      },
      {
        number: 20,
        title: "The Chinese Room",
        slug: "chinese-room",
        pmNote: "Searle's argument — and what it means to build products on top of systems that simulate understanding.",
      },
      {
        number: 21,
        title: "Grounding",
        slug: "grounding",
        pmNote: "Why AI outputs feel hollow — and the design problem that creates.",
      },
    ],
  },
  {
    id: "part-5",
    number: 5,
    title: "NEUROSCIENCE",
    subtitle: "The biological constraints that shape every user",
    accentColor: "#7A5C1A",
    chapters: [
      {
        number: 22,
        title: "The Brain Is Not a Computer",
        slug: "brain-not-computer",
        pmNote: "The metaphor is useful. But knowing where it breaks is more useful.",
      },
      {
        number: 23,
        title: "Emotion Is Not Separate From Cognition",
        slug: "emotion-cognition",
        pmNote: "Damasio's somatic marker hypothesis — and why 'rational' product decisions aren't.",
      },
      {
        number: 24,
        title: "Embodied Cognition",
        slug: "embodied-cognition",
        pmNote: "The body shapes the mind. Context is not a wrapper around experience — it is the experience.",
      },
    ],
  },
  {
    id: "part-6",
    number: 6,
    title: "PHILOSOPHY OF LANGUAGE",
    subtitle: "Reference, truth, and what your product claims to mean",
    accentColor: "#1A5E7A",
    chapters: [
      {
        number: 25,
        title: "How Words Refer to Things",
        slug: "reference",
        pmNote: "Frege, Russell, Kripke — and why your product's vocabulary is making promises you may not keep.",
      },
      {
        number: 26,
        title: "Meaning Is Use",
        slug: "meaning-is-use",
        pmNote: "Wittgenstein's language games — and why your product's meaning is decided by users, not designers.",
      },
      {
        number: 27,
        title: "What Your Product Says Without Saying It",
        slug: "implicit-meaning",
        pmNote: "Every design choice is a claim. Most of them are unexamined.",
      },
      {
        number: 28,
        title: "What Symbolic Systems Can't Tell You",
        slug: "limits",
        pmNote: "The field's own open questions. The most honest place to end.",
      },
    ],
  },
];

export const allChapters: Chapter[] = parts.flatMap((p) => p.chapters);

export function getPartByChapterSlug(slug: string): Part | undefined {
  return parts.find((p) => p.chapters.some((c) => c.slug === slug));
}

export function getChapterBySlug(slug: string): Chapter | undefined {
  return allChapters.find((c) => c.slug === slug);
}
