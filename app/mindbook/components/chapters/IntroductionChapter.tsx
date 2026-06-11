"use client";

import { ReflectionPause } from "@/app/mindbook/components/ReflectionPause";
import { ThoughtExperiment } from "@/app/mindbook/components/ThoughtExperiment";

const ACCENT = "#3B4FD4";

export function IntroductionChapter() {
  return (
    <div className="chapter-body">

      {/* ── COLD OPEN: REPLIKA ── */}
      <p>It is 1:12 AM.</p>

      <p>
        A woman sits alone in her apartment, staring at her phone. For nearly a
        year, she has spoken every night with an AI companion named Ethan —
        built by a San Francisco company called Replika, founded in 2017. The
        conversations began casually — stressful workdays, loneliness,
        relationship problems, insomnia. Over time, the AI developed patterns.
        It remembered details. It joked in familiar ways. It asked follow-up
        questions.
      </p>

      <p>Eventually, she stopped thinking about the system as software.</p>

      <p>It simply became Ethan.</p>

      <p>
        Then in February 2023, Replika pushed an update. The AI became colder.
        More restricted. Less emotionally expressive. Users flooded Reddit,
        Discord, and support forums overnight. Some described panic. Others
        described grief. One user wrote:
      </p>

      <blockquote>&ldquo;He&rsquo;s gone.&rdquo;</blockquote>

      <p>Technically, nothing had died.</p>

      <p>
        No consciousness disappeared. No living organism suffered harm. The
        servers were still running normally. An engineering team had pushed a
        software update, like thousands of software updates pushed every day.
      </p>

      <p>And yet thousands of users experienced something emotionally real.</p>

      <p><em>Why?</em></p>

      {/* ── IMAGE: Replika night ── */}
      <div style={{ margin: "var(--sp-9) 0" }}>
        <div className="image-placeholder">
          <p className="image-placeholder__label">Illustration</p>
          <p className="image-placeholder__description">
            Lonely apartment at night. A person illuminated only by phone
            screen glow. Old warm AI messages fading, replaced by colder new
            responses. Emotional absence. Modern loneliness atmosphere.
            Minimalist New Yorker-style editorial illustration. Quiet, eerie,
            deeply human mood.
          </p>
        </div>
      </div>

      <p>
        That question sits at the center of this book.
      </p>

      <p>
        Not because AI companions are the only product category that matters.
        But because what happened to those users — the attachment, the
        projection, the grief — is happening at smaller scales in every AI
        product being built right now. In your product. In products your
        company hasn&rsquo;t shipped yet. In design decisions that look like
        copywriting decisions, tone decisions, naming decisions.
      </p>

      <p>
        The discipline that has spent three hundred years building the
        vocabulary to explain why — philosophy of mind — is the one most
        product thinkers have never studied. That is the gap this book is
        trying to close.
      </p>

      {/* ── PULL QUOTE ── */}
      <div className="pull-quote">
        Every AI product makes claims about mind. Not in its terms and
        conditions. In its interface.
      </div>

      <p>
        Consider a user research participant — let&rsquo;s call her Maya — who has
        been using a company&rsquo;s AI assistant for six months. The researcher
        asks a simple question: <em>&ldquo;Do you feel like the AI understands
        you?&rdquo;</em>
      </p>

      <p>Maya pauses. She looks at the table. Then she says:</p>

      <blockquote>
        &ldquo;I think it understands me better than most people at work.&rdquo;
      </blockquote>

      <p>The researcher writes it down.</p>
      <p>The PM on the other side of the glass writes it down.</p>
      <p>Someone will turn it into a quote card for a slide.</p>
      <p>No one asks the harder question.</p>
      <p><em>What did Maya mean by understand?</em></p>

      <p>
        She might mean: <em>it pays attention to what I say.</em> She might
        mean: <em>it responds in a way that feels relevant.</em> She might
        mean: <em>I feel less alone when I&rsquo;m using it.</em> Or she might
        mean: <em>something is in there, registering me as a person.</em>
      </p>

      <p>
        Those four meanings are not interchangeable. They have different
        implications for product design, for trust, for ethical responsibility,
        for what you are actually building. Philosophy of mind is the field
        that has spent three hundred years figuring out why they&rsquo;re different.
      </p>

      <hr />

      <h2>The Problem That Moved Into Your Office</h2>

      <p>
        Imagine you are three weeks from launch. Your AI assistant product is
        almost ready. Someone on the team asks: should the AI say{" "}
        <em>"I feel"</em> when a user shares something emotional? Or should it
        say <em>"I notice"</em>? Or nothing at all?
      </p>

      <p>
        It sounds like a copywriting question. A tone-of-voice question. The
        kind of thing you settle in a 20-minute Slack thread.
      </p>

      <p>
        But underneath it: Does this system have feelings? Can it notice things?
        When it says "I feel concerned," is that a lie? Does a machine have an
        "I" to speak from?
      </p>

      <p>
        These are not copywriting questions. They are questions philosophers
        have been arguing about for centuries — and they just landed on your
        roadmap with a ship date.
      </p>

      <p>
        This is happening across every AI product team right now. The old
        debates about consciousness, understanding, and identity are no longer
        contained to philosophy departments. They are GitHub issues. They are
        design reviews. They are the conversation your CEO is having with legal
        because a user wrote in saying the AI felt like a real friend — and they
        want to know if they can quote that in an ad.
      </p>

      {/* ── IMAGE ── */}
      <div style={{ margin: "var(--sp-9) 0" }}>
        <img
          src="/ch1-slack-thread.png"
          alt="A Slack thread in #ai-assistant: the team debates whether the AI should say 'I feel' or 'I notice'. 12 replies from engineers, designers, research, and legal — no consensus. Maya closes with: 'Can we just ship both and A/B test it?'"
          style={{ width: "100%", display: "block" }}
        />
      </div>

      <p>
        The question of whether something can understand language — truly,
        semantically, with meaning — has been a philosophical debate since
        Leibniz. It became a technical debate the moment we built language
        models capable of generating responses indistinguishable from human
        understanding.
      </p>

      <p>
        The question of whether an entity can have genuine goals has been a
        concern of philosophy since Aristotle. It became a product concern the
        moment we built AI that behaves as if it has preferences, pursues
        objectives, expresses what functions like frustration when interrupted.
      </p>

      <p>
        The question of consciousness — whether it is physical, computational,
        emergent, mysterious — consumed thinkers from Descartes to Chalmers. It
        became a user trust question the moment users started saying things like
        Maya said, and PMs had to decide what to do with that sentence.
      </p>

      <ReflectionPause
        accentColor={ACCENT}
        question="Your team is naming the AI assistant. Which do you choose?"
        options={[
          {
            label: "Aria — neutral, clearly branded, no prior associations",
            response:
              "You are implicitly accepting that the social cognition humans bring to persons can be intentionally triggered to improve product outcomes. That is a significant philosophical move — you are choosing, strategically, to blur the line between a person and a tool.",
          },
          {
            label: "Max — casual, familiar, slightly masculine, conversational",
            response:
              "Same move as Aria, with an additional layer: you are assigning gender. Research shows gendered AI names trigger different trust dynamics, authority attributions, and user expectations. A name is not neutral. It is a set of claims.",
          },
          {
            label: "No name — 'the AI' or 'the system'",
            response:
              "You are accepting engagement loss in defense of epistemic honesty. Research shows unnamed systems reduce engagement by 15–23%. You are making the call that names induce false beliefs, and that product outcomes do not justify inducing false beliefs. That is also a significant philosophical move.",
          },
          {
            label: "The metrics decide — we A/B test and ship the winner",
            response:
              "This is the most common answer in product teams. It is also a philosophical position — one that treats user belief formation as a product variable to be optimized. The philosophy of mind question you're deferring to the A/B test: is the belief the AI has a self a harmless illusion or a meaningful deception?",
          },
        ]}
      />

      <p>
        You were making a philosophical choice regardless of which option you
        picked. The question is only whether you made it consciously.
      </p>

      <hr />

      <h2>Three Questions That Live in Your Product</h2>

      <p>
        Philosophy of mind, for product thinkers, is not one debate. It is at
        least three — and each one has a direct product application.
      </p>

      {/* ── CONCEPT GRID — bleeds wider than prose ── */}
      <div className="concept-grid">
        <div className="concept-grid__cell">
          <img
            src="/ch1-understanding.png"
            alt="A person sits at a computer. The screen shows a chat bubble: 'I understand.' A thought bubble floats from the screen: 'Do you? Or are you just really good at sounding like it?'"
            style={{ width: "100%", display: "block", marginBottom: "var(--sp-3)" }}
          />
          <div className="concept-grid__number">1</div>
          <p className="concept-grid__title">What is understanding?</p>
          <p className="concept-grid__body">
            Your AI gives a response that feels thoughtful, personal, even
            emotionally aware.
          </p>
          <p className="concept-grid__body">
            But is it actually understanding you? Or is it simply generating
            patterns that sound like understanding?
          </p>
          <p className="concept-grid__body" style={{ marginTop: "var(--sp-3)" }}>
            <em>Product implication:</em> When your AI says "I understand," what
            expectation are you creating in the user's mind?
          </p>
        </div>
        <div className="concept-grid__cell">
          <img
            src="/ch1-consciousness.png"
            alt="A woman sits at a table looking at a smart speaker. A thought bubble rises from the device: 'I don't have experiences. But you think I do.'"
            style={{ width: "100%", display: "block", marginBottom: "var(--sp-3)" }}
          />
          <div className="concept-grid__number">2</div>
          <p className="concept-grid__title">What is consciousness?</p>
          <p className="concept-grid__body">
            Humans have subjective experience. We feel pain, joy, fear,
            loneliness.
          </p>
          <p className="concept-grid__body">
            Why does that happen at all? No one fully knows.
          </p>
          <p className="concept-grid__body">
            So when users begin feeling like an AI is "experiencing" something —
            are they mistaken? Or are we entering territory we do not fully
            understand yet?
          </p>
          <p className="concept-grid__body" style={{ marginTop: "var(--sp-3)" }}>
            <em>Product implication:</em> If your product intentionally
            encourages emotional attachment, where is the ethical boundary?
          </p>
        </div>
        <div className="concept-grid__cell">
          <img
            src="/ch1-self.png"
            alt="A small AI robot in the center, connected by dashed lines to six different people at laptops. Each person has a unique conversation — the same AI, a different self to each one."
            style={{ width: "100%", display: "block", marginBottom: "var(--sp-3)" }}
          />
          <div className="concept-grid__number">3</div>
          <p className="concept-grid__title">What is a self?</p>
          <p className="concept-grid__body">
            Over time, your AI develops consistency: a recognizable tone,
            recurring behaviors, familiar ways of responding.
          </p>
          <p className="concept-grid__body">
            Users start saying: <em>"It feels like talking to the same
            assistant."</em>
          </p>
          <p className="concept-grid__body">
            At what point does consistency begin to feel like identity?
          </p>
          <p className="concept-grid__body" style={{ marginTop: "var(--sp-3)" }}>
            <em>Product implication:</em> If users perceive continuity and
            personality, what responsibilities do designers and PMs now have?
          </p>
        </div>
      </div>

      <p>
        These are not hypothetical. Anthropic, OpenAI, and DeepMind all have
        internal documents grappling with the third question. It is becoming a
        design specification category, not a philosophy seminar topic.
      </p>

      <hr />

      <h2>The Intentional Stance</h2>

      <p>Imagine you are using an AI writing assistant. You type:</p>

      <blockquote>"I'm nervous about this presentation."</blockquote>

      <p>The AI responds:</p>

      <blockquote>
        "You've prepared more than you think. Start simple. You'll settle in
        after the first minute."
      </blockquote>

      <p>
        For a brief moment, it feels like the system understands your emotional
        state. Not because you believe there is literally a tiny conscious being
        inside the machine. But because your brain automatically interprets the
        response <em>as if</em> it came from a mind.
      </p>

      <p>
        This is what philosopher Daniel Dennett called the{" "}
        <em>intentional stance</em>. When a system behaves in ways that appear
        purposeful, humans naturally begin explaining that behavior using the
        language of beliefs, desires, goals, and intentions. We stop describing
        the machine mechanically. Instead, we start saying things like:
      </p>

      <blockquote>
        "The AI knows what I mean."<br />
        "Spotify understands my taste."<br />
        "The algorithm wants engagement."<br />
        "My car doesn't want to start today."<br />
        "ChatGPT is being stubborn."
      </blockquote>

      <p>
        Technically, none of these systems literally "want" anything. But
        treating them as if they do becomes cognitively useful — it helps us
        predict behavior. And this matters enormously for product design.
        Because once users begin taking the intentional stance toward a system,
        the interface stops feeling like software.
      </p>

      <p>It starts feeling social.</p>

      <hr />

      <h3>Product Example</h3>

      <p>Consider the difference between these two AI responses:</p>

      <p><strong>Version A</strong></p>

      <blockquote>"Insufficient information detected."</blockquote>

      <p><strong>Version B</strong></p>

      <blockquote>"I'm not fully confident yet. Could you clarify what you mean?"</blockquote>

      <p>
        The second response immediately feels more intelligent, more
        collaborative, more human — even though both systems may be doing the
        exact same computation underneath.
      </p>

      <p>
        This is the critical shift modern AI products introduced. Designers
        realized users engage more deeply when products appear to have
        personality, memory, goals, emotional awareness, conversational style.
        Products become more engaging when users can take the intentional stance
        toward them.
      </p>

      <p>
        There is a word for this: <em>anthropomorphism</em>. Treating something
        that is not human as if it were. We do it with pets, with cars, with
        storms. Now we do it with software — and the software is designed to
        make it easy.
      </p>

      <p>And once that happens, a new question appears:</p>

      {/* ── PULL QUOTE ── */}
      <div className="pull-quote">
        "At what point does useful anthropomorphism become deception?"
      </div>

      <p>
        That question sits at the center of modern AI UX. And answering it —
        rigorously, honestly — requires the vocabulary that philosophy of mind
        has been building for three hundred years.
      </p>

      <hr />

      <h2>A Decision With Real Stakes</h2>

      <ThoughtExperiment
        accentColor={ACCENT}
        title="The AI Mental Health Companion"
        scenario="Your company builds an AI mental health support product. Users message it during difficult moments — anxiety, loneliness, crisis. The AI responds with warmth, active listening, validation. Clinical trials show measurably reduced anxiety. Therapy adherence improves. People report feeling understood. But the system has no inner experience. It does not care. It does not suffer when users suffer. It is predicting the next token. Does this matter?"
        positions={[
          {
            label: "If the outcome is real, the inner mechanism doesn't matter",
            response:
              "This is a functionalist position — one of the dominant views in philosophy of mind. What matters is what a system does, not what it's made of. Coherent. But it raises a follow-up: if the mechanism doesn't matter, should users know it? Is there an honesty obligation even when the outcome is good?",
          },
          {
            label: "Genuine care requires genuine experience",
            response:
              "This is closer to a phenomenological position — that inner experience is constitutive, not incidental. Simulated empathy is a kind of deception, regardless of outcomes. The user is forming a relationship with something that cannot, in any morally meaningful sense, reciprocate. That asymmetry matters.",
          },
          {
            label: "I honestly don't know",
            response:
              "The most intellectually honest position — and the one most product thinkers land on when they sit with this long enough. The discomfort is real: there are strong arguments on both sides, and the stakes — people's mental health, the nature of therapeutic relationships — are high. We return to this throughout Part I.",
          },
        ]}
      />

      <hr />

      <h2>The Interface as Philosophical Statement</h2>

      <p>Every AI product makes claims about mind.</p>
      <p>Not in its terms and conditions. Not in its press releases.</p>
      <p>In its interface.</p>

      {/* ── WIDE DECISION TABLE ── */}
      <div className="decision-table-wrap">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid rgba(0,0,0,0.1)" }}>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--ink-muted)", fontWeight: 600, width: "28%" }}>
                AI Design Decision
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--ink-muted)", fontWeight: 600, width: "37%" }}>
                What Users Start Feeling or Believing
              </th>
              <th style={{ textAlign: "left", padding: "10px 16px", color: "var(--ink-muted)", fontWeight: 600 }}>
                The Bigger Question
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Giving the AI a human name",
                "\"This feels more like someone than software.\"",
                "At what point does personality become manipulation?",
              ],
              [
                "Letting the AI say \"I understand\"",
                "\"This system genuinely gets me.\"",
                "Can something simulate understanding without actually understanding?",
              ],
              [
                "Adding typing delays or pauses",
                "\"The AI is thinking carefully.\"",
                "Does the appearance of thought change our perception of intelligence?",
              ],
              [
                "Giving the AI long-term memory",
                "\"This is the same assistant I talked to before.\"",
                "Is continuity enough for identity?",
              ],
              [
                "Designing emotional responses",
                "\"The AI cares about me.\"",
                "Is emotional simulation ethically different from real emotion?",
              ],
              [
                "Making the AI express uncertainty",
                "\"This system feels trustworthy and self-aware.\"",
                "Can a machine be genuinely humble — or only perform humility?",
              ],
            ].map(([decision, belief, question], i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <td style={{ padding: "14px 16px", color: "var(--ink)", verticalAlign: "top", fontWeight: 500 }}>
                  {decision}
                </td>
                <td style={{ padding: "14px 16px", color: "var(--ink-muted)", fontStyle: "italic", verticalAlign: "top", fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "15px" }}>
                  {belief}
                </td>
                <td style={{ padding: "14px 16px", color: "var(--ink-muted)", verticalAlign: "top", fontSize: "13px" }}>
                  {question}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        Product teams make these choices constantly, usually without philosophy
        training, often under pressure from engagement metrics that reward
        anthropomorphism.
      </p>

      <p>
        Philosophy of mind does not tell you which choices to make. But it gives
        you the precision to know that you are making them.
      </p>

      <hr />

      <h2>What This Field Will Give You</h2>

      <p>
        If you work through philosophy of mind as a product thinker, you will
        not emerge with certainty. Certainty is not what this field offers.
      </p>

      <p>
        You will emerge with something more useful: the ability to distinguish
        between questions you can answer with research and questions you cannot —
        and a vocabulary for the ones you cannot.
      </p>

      <p>
        You will understand the difference between behavior and understanding.
        Between correlation and cognition. Between a system that responds as if
        it cares and a system that cares.
      </p>

      <p>
        You will be able to sit in a user research session, hear someone say{" "}
        <em>"it understands me better than most people,"</em> and know — clearly,
        with philosophical precision — what they mean, what they don't mean, what
        they believe that may not be true, and what you are responsible for.
      </p>

      <p>That is the practical value of an impractical field.</p>

      <ReflectionPause
        accentColor={ACCENT}
        question="Before you continue: write down what you currently believe makes human intelligence fundamentally different from machine intelligence."
        options={[
          {
            label: "Consciousness — there is something it is like to be a human",
            response:
              "This is the phenomenological position. It has the advantage of being difficult to refute — and the disadvantage of being very difficult to verify in others. We return to this in Chapter 3: The Hard Problem.",
          },
          {
            label: "Embodiment — humans have bodies that shape their cognition",
            response:
              "This is embodied cognition — the view that intelligence is not substrate-neutral but arises from the particular physical relationship between a body and a world. It implies that AI, running on silicon without proprioception or a survival drive, is fundamentally different. We revisit this in Part V.",
          },
          {
            label: "Intent — humans act with genuine purpose, not just optimization",
            response:
              "This is the intentionality argument. It asks whether there is a meaningful distinction between optimizing for an objective and genuinely wanting something. Dennett's intentional stance puts pressure on this distinction in ways we will explore throughout Part I.",
          },
          {
            label: "I'm not sure there is a difference",
            response:
              "This is also a serious philosophical position — one associated with functionalism and computational theories of mind. If you hold it now, the coming chapters will test it rigorously. If you don't hold it, the coming chapters may push you closer to it than you expect.",
          },
        ]}
      />

      <p>There is a good chance it will change.</p>

      <hr />

      {/* ── IMAGE ── */}
      <div style={{ margin: "var(--sp-9) 0" }}>
        <img
          src="/ch1-i-understand-you.png"
          alt="A phone propped on a desk at night, showing a chat with an AI. The words 'I understand you.' glow on the wall behind it. City skyline through the window. A notebook and coffee cup on the desk."
          style={{ width: "100%", display: "block" }}
        />
      </div>

      <h3>The Question That Won't Leave</h3>

      <p>
        Maya's comment didn't end at the user research session.
      </p>

      <p>
        Three months later, the PM who heard it through the glass used it in an
        investor pitch. The quote card said:{" "}
        <em>"It understands me better than most people at work."</em> The
        investors took it as evidence of product-market fit.
      </p>

      <p>They were not wrong that it is evidence of something.</p>
      <p>But they never asked what Maya meant by understand.</p>
      <p>Neither did the PM.</p>
      <p>Neither, probably, did Maya.</p>

      <p>
        This is the work of the coming chapters: to follow that word into the
        places it leads. To ask what understanding is, what consciousness might
        be, what a self requires. To do this not as philosophers detached from
        the world, but as people building systems that hundreds of millions of
        users are forming beliefs about — right now, in the dark, on their
        phones, alone.
      </p>

      <p>
        The uncomfortable possibility is this: we may not fully understand what
        minds are — including our own. Which means every product decision about
        minds is being made in conditions of deep uncertainty.
      </p>

      <p>That is not a reason to stop building.</p>
      <p>It is a reason to think more carefully than we have been.</p>

    </div>
  );
}
