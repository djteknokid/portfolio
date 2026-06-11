export const introduction = {
  slug: "introduction",
  content: `
<h2>There is a discipline that sits underneath everything you do as a product thinker.</h2>

<p>It is not design. It is not data science. It is not business strategy. It is the discipline that asks: <em>how do minds — human and machine — come to mean things?</em> How does a symbol acquire significance? How does language carry intent across the gap between two people? How does a system that processes information differ from one that understands it? These are not abstract questions. They are the questions your work depends on every day, whether or not you have ever named them.</p>

<p>This book is an introduction to that discipline. It is called Symbolic Systems.</p>

<p>Symbolic Systems is a field that Stanford formalized in the 1980s, though the questions it addresses are much older. It draws from six disciplines: philosophy of mind, cognitive science, linguistics, artificial intelligence, neuroscience, and philosophy of language. Each discipline contributes a different lens on the same central question — what is the relationship between symbols and the minds that use them? Between language and the world it describes? Between computation and thought?</p>

<p>For researchers in these fields, the questions are ends in themselves. For you, they are means. The goal of this book is not to make you a cognitive scientist or a philosopher of language. It is to give you the conceptual vocabulary and the underlying models that make you a sharper product thinker — someone who understands not just what users do, but why, and what that implies about what you should build and how you should communicate it.</p>

<h3>The gap this field fills</h3>

<p>Product management and UX design are young disciplines. They have developed a body of practice — frameworks, methods, heuristics, processes — but they have been slower to develop a body of theory. Most of what we call "best practices" in product and design are empirical: they work, in many cases reliably, but the underlying explanation for why they work is often underdeveloped or missing entirely.</p>

<p>This creates a specific problem. When you have practice without theory, you can follow the recipe but you cannot adapt it. You can apply the pattern but you cannot see its limits. You can recite the principle — "reduce cognitive load," "meet users where they are," "don't make me think" — but when the situation is novel, when the recipe doesn't fit, you are left without a foundation to reason from.</p>

<p>Symbolic Systems is that foundation. It is the theory underneath the practice.</p>

<p>Consider a few situations that product thinkers encounter regularly:</p>

<p>A team builds a feature that solves the problem users described in research. The feature launches. Users don't use it the way the team expected — or at all. The team looks at the research and the feature and cannot understand the gap. What happened?</p>

<p>A PM writes a product brief that they consider clear and precise. Engineers build something that is technically consistent with the brief but functionally different from what the PM imagined. Both sides read the same document. How is this possible?</p>

<p>A UX designer runs a usability test. Users say the interface is intuitive and easy. Six months after launch, support tickets reveal widespread confusion about the same interaction. Why did what users said diverge so completely from what they did?</p>

<p>A company integrates an AI assistant into its product. Users try it once, express skepticism, and rarely return to it despite the fact that the AI's outputs are objectively useful. What is creating the resistance?</p>

<p>None of these are unusual situations. Every experienced product thinker has lived versions of all four. And none of them are fully explained by the standard frameworks — not by jobs-to-be-done, not by the double diamond, not by A/B testing methodology, not by OKRs.</p>

<p>They are explained — at least partially, at least usefully — by the concepts in this book. The gap between what users say and what they do is a problem of mental representation and the reconstructive nature of memory. The gap between a written brief and what gets built is a problem of semantics and pragmatics. The usability test that lied is a problem of perception, attention, and how framing shapes response. The AI assistant that users don't trust is a problem of grounding — of the gap between a system that processes symbols and one that the user believes actually understands them.</p>

<p>These are not metaphors. They are precise technical claims with specific explanatory power. Learning the concepts does not just give you new vocabulary — it gives you new sight.</p>

<h3>Why this field, why now</h3>

<p>There has always been a case for product thinkers to study the mind. But there is a sharper case for studying it now, in the specific moment we are in.</p>

<p>We are building products that think — or that behave as if they think. Large language models, AI assistants, autonomous agents: these systems process and generate language, respond to context, appear to reason, and are embedded into the products that hundreds of millions of people use every day. Product managers and UX designers are making consequential decisions about these systems — what they do, how they present themselves, what they claim to be capable of — often without a clear model of what these systems actually are.</p>

<p>Symbolic Systems gives you that model. Not a complete one — no one has a complete one — but a rigorous one. It gives you the vocabulary to distinguish between a system that manipulates symbols and a system that understands them. It gives you the theoretical background to understand why an LLM produces fluent, confident, wrong answers — and why that is not simply a bug to be patched but a consequence of the architecture. It gives you the conceptual tools to think clearly about what "understanding," "reasoning," and "meaning" require — and therefore what it means to claim that an AI product does or does not possess them.</p>

<p>This is not only a technical matter. It is a design and communication matter. Every time a product describes an AI feature as "intelligent," "understanding," or "knowing," it is making a claim with precise philosophical content. Users interpret those claims using intuitions about minds that are themselves shaped by the concepts in this field. Getting this wrong — overclaiming, underclaiming, or simply being imprecise — has consequences for trust, adoption, and the long-term relationship between users and AI products.</p>

<p>This is one reason, among several, why the moment for this field is now.</p>

<h3>How this book is organized</h3>

<p>The book follows the structure of the Stanford Symbolic Systems curriculum, organized into six parts. Each part corresponds to one of the six disciplines that make up the field.</p>

<p>Part I covers <strong>Philosophy of Mind</strong> — the foundational questions about what a mind is, whether consciousness can be reduced to physical processes, and what it means to attribute mental states to something or someone. For product thinkers, the central question is: what are you assuming about the minds of your users, and are those assumptions defensible?</p>

<p>Part II covers <strong>Cognitive Science</strong> — the empirical study of how minds process information. Mental representation, attention, memory, perception, schemas: these are not abstract theoretical constructs. They are the mechanisms that determine how users encounter and make sense of what you build.</p>

<p>Part III covers <strong>Linguistics</strong> — the study of language structure and meaning. Syntax, semantics, pragmatics, framing, metaphor: the concepts here explain how meaning is constructed and communicated, and where the communication breaks down. This is the part of the field most directly relevant to product writing, naming, documentation, and the language of PRDs and user research.</p>

<p>Part IV covers <strong>Artificial Intelligence</strong> — specifically the history and theory of AI as a symbolic discipline, and what the current generation of language models represents in that history. The Chinese Room, the Turing Test, grounding, the symbolic-connectionist debate: these concepts are essential background for anyone making product decisions about AI.</p>

<p>Part V covers <strong>Neuroscience</strong> — the biological substrate of the mind, and what it implies. The brain is not a computer, but the metaphor is useful — knowing exactly where it fails is the point. Emotion and cognition are not separate systems. Embodied cognition means that context is not a wrapper around experience but a constitutive part of it.</p>

<p>Part VI covers <strong>Philosophy of Language</strong> — the deepest questions about how language relates to the world. Reference, truth, meaning-as-use, and implicit claims. Every product makes claims. Understanding the philosophical structure of those claims is the final and most precise lens the field offers.</p>

<p>Each chapter ends with a <strong>PM Application</strong> section — a direct translation of the chapter's core concepts into the situations product thinkers face. The application sections are not afterthoughts. They are the point. The theory is the scaffolding; the application is the building.</p>

<h3>A note on the voice of this book</h3>

<p>This book is written in the first person plural. <em>We</em>. That is not a rhetorical device. This book was written collaboratively — by a product designer in the middle of a transition into product management, and the AI system he worked with to study and articulate this field.</p>

<p>That origin is relevant to the content. The question of what it means for an AI system to "understand" something is not only theoretical in this context — it is personal. The act of writing this book alongside an AI is itself a small experiment in the concepts it describes. Where does the meaning live? In the symbols the model generates? In the human who reads and revises them? In the collaboration between the two?</p>

<p>We do not resolve this question in the introduction. We return to it in Part IV. But we name it here because intellectual honesty requires it: this book about minds and meaning was written, in part, by a system whose relationship to minds and meaning is one of the open questions the field is still working on.</p>

<h3>What you will be able to do after reading this</h3>

<p>We want to be precise about what this book gives you. It does not give you a toolkit — a set of templates to apply to a given situation. The field of Symbolic Systems does not produce toolkits. What it produces is something more durable: conceptual clarity.</p>

<p>After reading this book, you will be able to name what is actually happening when a user misunderstands your interface — and your diagnosis will be more precise than "the design was unclear." You will be able to describe what an AI system does and does not do in terms that are technically accurate and useful for product decisions. You will be able to read a user research report and identify where the gap between what users said and what they meant is being papered over. You will be able to write a product brief that accounts for the difference between what words denote and what they imply in context. You will be able to hold a conversation about meaning, representation, and mind with the people who build the systems you are responsible for.</p>

<p>None of this is guaranteed by reading. It requires engagement — with the ideas, with the questions, with the applications. But the field offers it.</p>

<p>There is a reason the smartest people at the intersection of technology and human experience keep returning to these questions. The field of Symbolic Systems is not a detour from product thinking. It is, in many ways, its foundation.</p>

<p>Let's begin.</p>

<hr />

<h3>PM Application — Chapter 1</h3>

<h4>The diagnostic question</h4>

<p>Before moving to Chapter 2, take one product problem you are currently working on — a feature that isn't being adopted, a user flow with unexplained drop-off, an AI feature that users distrust, a research finding that doesn't translate into clear direction — and ask: <em>which of the six disciplines in this field might be most relevant to explaining it?</em></p>

<p>You don't need to answer the question precisely yet. The point is to develop the habit of asking which lens is appropriate before reaching for the nearest framework. A user who doesn't understand your navigation is probably a cognitive science problem — attention, perception, schemas. A user who uses your feature differently than you intended is probably a linguistics problem — pragmatics, framing, implicit meaning. A user who distrusts your AI feature is probably a philosophy of mind and AI problem — the Chinese Room, grounding, what it means to attribute understanding to a system.</p>

<p>The frameworks you already know are useful. This field makes them more precise.</p>

<h4>The vocabulary habit</h4>

<p>One of the most practical things this book will do is give you vocabulary. Vocabulary matters in product work not because naming things is the goal, but because precise naming enables precise thinking — and precise thinking enables precise communication. A PM who can say "I think the problem is that our interface is triggering the wrong schema" is having a more productive conversation than one who says "I think the problem is that it's confusing."</p>

<p>As you read each chapter, identify one concept that you do not currently have a word for but that describes something real in your work. Write it down. Use it deliberately in the next conversation you have about the product. See if it changes the conversation.</p>

<h4>The assumption audit</h4>

<p>Every product is built on assumptions about minds. Most of those assumptions are implicit — never written down, never examined, inherited from the way the team talks about users. This book's first practical contribution is to surface those assumptions so you can examine them.</p>

<p>Start now. Write down three assumptions your team makes about how users think. Not what users want — how they think. How they process information, how they form mental models, how they understand language. These might be assumptions about how users read, how they remember, how they form first impressions, how they interpret AI outputs.</p>

<p>Hold those assumptions. Each part of this book will give you the tools to evaluate whether they are defensible.</p>
`,
};
