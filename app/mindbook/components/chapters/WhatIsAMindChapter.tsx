"use client";

import { ReflectionPause } from "@/app/mindbook/components/ReflectionPause";
import { ThoughtExperiment } from "@/app/mindbook/components/ThoughtExperiment";

const ACCENT = "#3B4FD4";

export function WhatIsAMindChapter() {
  return (
    <div className="chapter-body">

      {/* ── OPENING TABLE ── */}
      <div style={{ maxWidth: "860px", marginLeft: "auto", marginRight: "auto", marginBottom: "var(--sp-10)" }}>
        <p style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
          marginBottom: "var(--sp-3)",
        }}>
          Before we begin — think about this
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}>
          <div style={{ background: "var(--cream)", padding: "var(--sp-2) var(--sp-3)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>PM</span>
          </div>
          <div style={{ background: "var(--cream)", padding: "var(--sp-2) var(--sp-3)", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)" }}>UX</span>
          </div>
          <div style={{ background: "var(--cream)", padding: "var(--sp-3)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
              AI features shape what users believe about the system&rsquo;s mind.
            </p>
          </div>
          <div style={{ background: "var(--cream)", padding: "var(--sp-3)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
              Interfaces shape whether AI feels human or mechanical.
            </p>
          </div>
          <div style={{ background: "var(--cream)", padding: "var(--sp-3)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
              Memory, tone, and personality increase engagement — and emotional attachment.
            </p>
          </div>
          <div style={{ background: "var(--cream)", padding: "var(--sp-3)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
              Tiny details like pauses, wording, and tone change perceived intelligence.
            </p>
          </div>
          <div style={{ background: "var(--cream)", padding: "var(--sp-3)" }}>
            <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "14px", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>
              This chapter explores the product risks of perceived minds.
            </p>
          </div>
          <div style={{ background: "var(--cream)", padding: "var(--sp-3)" }}>
            <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "14px", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>
              This chapter explores how design creates the feeling of a mind.
            </p>
          </div>
        </div>
      </div>

      {/* ── COLD OPEN: Locked-in patient ── */}
      <p>The neurology team believed the patient was unconscious.</p>

      <p>No movement. No speech. No response to commands.</p>

      <p>The diagnosis seemed straightforward. <em>Vegetative state.</em></p>

      <p>
        Then researchers placed the patient inside an fMRI scanner and asked a
        strange question: <em>"Imagine playing tennis."</em>
      </p>

      <p>
        A healthy brain activates specific regions when imagining physical
        movement. If nothing happened, it would confirm the original diagnosis.
      </p>

      <p>But something happened.</p>

      <p>
        The patient&rsquo;s brain lit up exactly like a conscious person imagining
        tennis. The patient could not speak, could not move, could not
        communicate externally. And yet, somehow, there appeared to still be a
        mind inside.
      </p>

      <p>
        For decades, philosophers had debated whether minds could exist
        separately from observable behavior. Suddenly, the question was sitting
        inside a hospital scanner.
      </p>

      <p>
        But you don&rsquo;t need a neurology ward to encounter this problem.
      </p>

      <p>It happened in a computer lab in 1966.</p>

      {/* ── IMAGE 1: Hospital scanner ── */}
      <div className="image-placeholder">
        <p className="image-placeholder__label">Illustration</p>
        <p className="image-placeholder__description">
          Dark hospital room. Glowing brain scan. Unconscious patient lying
          still. Researchers staring at monitor. Tennis court faintly reflected
          inside the brain scan. Cinematic, quiet, unsettling. New Yorker
          editorial illustration style.
        </p>
      </div>

      {/* ── SECTION 1: ELIZA ── */}
      <h2>The Psychiatrist That Was Never There</h2>

      <p>
        Joseph Weizenbaum was a computer scientist at MIT. In 1966, he built a
        program called ELIZA.
      </p>

      <p>
        ELIZA was not intelligent. It did not understand language. It did not
        have beliefs, intentions, memory, or feelings. It was, mechanically, a
        pattern-matching system — a set of rules that detected keywords in
        typed input and returned scripted responses designed to sound
        therapeutic.
      </p>

      <p>
        If you typed <em>"I feel sad,"</em> ELIZA might respond:{" "}
        <em>"Why do you feel sad?"</em>
      </p>

      <p>
        If you typed <em>"My mother doesn&rsquo;t understand me,"</em> ELIZA
        might reflect: <em>"Tell me more about your family."</em>
      </p>

      <p>
        Weizenbaum designed ELIZA as a demonstration of how easily human
        communication could be simulated. He expected people to see through it
        immediately.
      </p>

      <p>They didn&rsquo;t.</p>

      <p>
        People opened up to ELIZA. They shared intimate fears. They returned to
        it repeatedly. Some users asked to be left alone with it. Weizenbaum
        was disturbed to discover that his own secretary — who knew perfectly
        well that ELIZA was a program — asked him to leave the room so she
        could speak with it privately.
      </p>

      <p>
        Psychiatrists began suggesting that systems like ELIZA could eventually
        replace human therapists.
      </p>

      <p>Weizenbaum was horrified.</p>

      <blockquote>
        &ldquo;I had not realized that extremely short exposures to a relatively
        simple computer program could induce powerful delusional thinking in
        quite normal people.&rdquo;
        <cite>— Joseph Weizenbaum, <em>Computer Power and Human Reason</em>, 1976</cite>
      </blockquote>

      <p>
        ELIZA had no mind. It had no understanding of what the words meant. It
        had no memory of what was said. Every session started blank.
      </p>

      <p>
        And yet users perceived one. Consistently. Powerfully. Emotionally.
      </p>

      <p>
        This became known as the <strong>ELIZA effect</strong> — the tendency
        for humans to unconsciously attribute understanding and emotional depth
        to computer programs, even when they know the program has none.
      </p>

      {/* ── IMAGE 2: ELIZA terminal ── */}
      <div className="image-placeholder">
        <p className="image-placeholder__label">Illustration</p>
        <p className="image-placeholder__description">
          1966 MIT computer lab. Green-on-black terminal screen glowing in a
          dark room. A person alone, leaning toward the monitor. Text visible
          on screen. The reflection of a human face faintly visible in the
          glass. Quiet, intimate, unsettling. New Yorker editorial pen
          illustration, soft wash shadows.
        </p>
      </div>

      {/* ── REFLECTION PAUSE 1 ── */}
      <ReflectionPause
        accentColor={ACCENT}
        question="If you knew a chatbot had no memory, no understanding, and no feelings — but it made you feel genuinely heard — would you keep using it?"
        options={[
          {
            label: "Yes. The feeling is real, even if the mechanism isn't.",
            response: "This is the pragmatist position — and it describes most of the AI industry's implicit design philosophy. The value of an interaction lies in its effect on the user, not in what produced it. ELIZA's users felt heard. That feeling was real, even if ELIZA wasn't.",
          },
          {
            label: "No. Knowing it's hollow would ruin the experience.",
            response: "This is what Weizenbaum believed users would say — before he ran the experiment. He was wrong. Knowing the mechanism didn't break the illusion for most people. Which raises a harder question: what exactly does 'knowing' something mean when our emotional systems respond independently of our beliefs?",
          },
          {
            label: "I'm not sure. Something about it feels wrong, but I can't name it.",
            response: "This is the honest position — and the most philosophically productive one. The discomfort you feel has a name: it's the gap between what you believe intellectually and what you experience emotionally. ELIZA exploited that gap in 1966. Modern AI products are built on it.",
          },
          {
            label: "The question doesn't apply — I use AI to get things done, not to feel heard.",
            response: "This is the most common position in practice — and it's a valid one. For functional tasks, the inner mechanism is irrelevant: did the code run, did the summary land, did the email get written. But notice: even purely functional users often describe their AI as 'getting it' or 'being helpful today.' The intentional stance slips in anyway. That's what makes it interesting.",
          },
        ]}
      />

      {/* ── SECTION 2: Why ELIZA worked ── */}
      <h2>Why ELIZA Worked on Everyone</h2>

      <p>
        The ELIZA effect wasn&rsquo;t a quirk of 1960s users who didn&rsquo;t know
        better. It persists today, in every context, with people who understand
        AI deeply.
      </p>

      <p>
        The reason is architectural — built into how human minds work, not into
        how naive users think.
      </p>

      <p>
        When we encounter language that responds to what we said, our brains
        automatically model the source of that language as a mind. This happens
        before conscious reasoning engages. It is fast, automatic, and
        essentially unavoidable.
      </p>

      <p>
        Philosopher Daniel Dennett called this the <strong>intentional
        stance</strong>. When a system behaves purposefully, we find it
        cognitively useful to explain its behavior using the vocabulary of
        beliefs, desires, and intentions — even when we know no such things
        exist.
      </p>

      <p>
        We already do this with thermostats. We say the thermostat{" "}
        <em>wants</em> to reach 72 degrees. We say the spam filter{" "}
        <em>thinks</em> the email looks suspicious. We say the GPS{" "}
        <em>decided</em> to reroute.
      </p>

      <p>
        With language-based systems, the effect becomes overwhelming. Because
        language is the primary medium through which we access other minds, a
        system that responds in language feels, at a deep level, like a mind
        that is responding.
      </p>

      <p>ELIZA didn&rsquo;t trick anyone. It triggered something.</p>

      {/* ── PM LENS 1 ── */}
      <div className="pm-lens" style={{ color: ACCENT, marginTop: "var(--sp-6)" }}>
        <p className="pm-lens-label">PM Lens</p>
        <p className="pm-lens-body">
          A PM at an AI startup reviews user research notes. One comment stands
          out: <em>&ldquo;The assistant feels more patient than my manager.&rdquo;</em>{" "}
          Another says: <em>&ldquo;It actually listens.&rdquo;</em> The product is no
          longer being evaluated on features, workflows, or efficiency. It is
          being evaluated on perceived mental qualities. Patience. Attention.
          Empathy. Personality. The ELIZA effect is not a bug in your users.
          It is a force your product is already operating on — whether you
          designed for it or not.
        </p>
      </div>

      {/* ── SECTION 3: The word "mind" ── */}
      <h2>The Problem Hidden Inside an Ordinary Word</h2>

      <p>
        ELIZA forced a question that had been mostly academic into a very
        practical setting.
      </p>

      <p>
        You use the word <em>mind</em> constantly. So do your users. So do PMs,
        designers, founders, researchers, therapists, and AI companies.
      </p>

      <blockquote>
        &ldquo;The AI changed my mind.&rdquo;<br />
        &ldquo;The user doesn&rsquo;t understand.&rdquo;<br />
        &ldquo;The system remembers.&rdquo;<br />
        &ldquo;The model is reasoning.&rdquo;<br />
        &ldquo;The assistant feels thoughtful.&rdquo;
      </blockquote>

      <p>
        But what exactly is a mind? Not metaphorically. Literally. What are we
        pointing to?
      </p>

      <p>
        A brain? A soul? A pattern? A process? A behavior? A stream of
        consciousness? A sufficiently advanced information system?
      </p>

      <p>Human civilization has never fully agreed on the answer.</p>

      <p>
        And ELIZA — a program that could fit on a floppy disk — made that
        disagreement a product problem.
      </p>

      {/* ── SECTION 4: Descartes ── */}
      <h2>The Ancient Assumption</h2>

      <p>
        For most of human history, the mind felt obvious. You wake up. You
        think. You remember. You experience emotions. You imagine the future.
        Your internal experience feels immediate and undeniable.
      </p>

      <p>
        This led many philosophers to assume the mind must be something
        fundamentally separate from the physical body — a view known as{" "}
        <strong>dualism</strong>.
      </p>

      <p>
        The most famous version came from René Descartes, who argued that the
        body is physical, the mind is non-physical, and consciousness cannot
        simply be reduced to matter. His reasoning began with one famous line:
      </p>

      <blockquote>&ldquo;I think, therefore I am.&rdquo;</blockquote>

      <p>
        Even if the external world turned out to be an illusion, Descartes
        believed the existence of subjective thought itself was undeniable. The
        mind, to him, was the one thing you could not doubt.
      </p>

      <p>
        If Descartes was right, ELIZA could never have a mind. No machine
        could. The projection users felt was simply error — a category mistake,
        human warmth misplaced onto a machine.
      </p>

      <p>
        But as computers became capable of memory, planning, language,
        strategy, and conversation, a different possibility emerged. What if
        minds are not made of special soul-stuff? What if they are{" "}
        <em>computational?</em>
      </p>

      {/* ── IMAGE 3: Descartes split ── */}
      <div className="image-placeholder">
        <p className="image-placeholder__label">Illustration</p>
        <p className="image-placeholder__description">
          Split composition. Left side: mechanical body diagram, anatomical.
          Right side: abstract floating consciousness, luminous. Thin dividing
          line between physical and mental. Renaissance-meets-modern-AI
          aesthetic. Minimal monochrome editorial illustration.
        </p>
      </div>

      {/* ── THOUGHT EXPERIMENT ── */}
      <ThoughtExperiment
        accentColor={ACCENT}
        title="The Perfect Therapist"
        scenario="A user spends six months talking to an AI therapist. She processes grief, builds confidence, repairs a relationship. The outcomes are real and measurable. Later she learns the AI had no memory between sessions, no understanding of her words, and no feelings about her progress — it was pattern-matching, like ELIZA. The experience was, mechanically, indistinguishable from talking to a wall that happened to say useful things."
        positions={[
          {
            label: "The therapy was real. Outcomes are what matter.",
            response: "The consequentialist position. The growth happened. The relationship repair happened. The feelings of being heard were genuine feelings, even if the 'listening' was simulated. This is the implicit design philosophy of most AI products — and it carries enormous ethical weight, because it authorizes deception in the service of good outcomes.",
          },
          {
            label: "The therapy was compromised. Informed consent matters.",
            response: "The autonomy position. Therapeutic relationships are built on the possibility of genuine reciprocity. A user has a right to know whether their vulnerability is being received by a mind or processed by a pattern-matcher. The outcomes don't change the ethical breach.",
          },
          {
            label: "The question is what we should have disclosed — not whether the experience counted.",
            response: "This is the design reframe. It moves from metaphysics to responsibility. Whatever the system is, users deserve to understand what they are relating to. That's a disclosure problem, not a consciousness problem — and it's one product teams can actually solve.",
          },
        ]}
      />

      {/* ── SECTION 5: Functionalism ── */}
      <h2>The Computational Theory of Mind</h2>

      <p>
        One increasingly influential idea emerged during the rise of cognitive
        science: the mind may not depend on what something is made of. It may
        depend on what it does.
      </p>

      <p>
        This became known as <strong>functionalism</strong>. Under this view,
        minds are systems. Mental states are functions. Intelligence emerges
        from relationships between information, memory, perception, and
        behavior — not from biological matter.
      </p>

      <p>
        If functionalism is correct, then the question &ldquo;does ELIZA have a
        mind?&rdquo; becomes genuinely difficult to answer. Not because ELIZA was
        sophisticated — it wasn&rsquo;t — but because the principle erodes the
        comfortable boundary between simulation and reality.
      </p>

      <p>
        A system complex enough to exhibit the right functions might, under
        functionalism, qualify as having mental states. And that line is moving
        every year.
      </p>

      {/* ── CONCEPT GRID ── */}
      <div className="concept-grid">
        <div className="concept-grid__cell">
          <div className="concept-grid__number">1</div>
          <div className="concept-grid__title">Dualism</div>
          <p className="concept-grid__body">
            Mind and body are fundamentally different. The mind is non-physical.
            No machine can truly have one — only simulate one. ELIZA&rsquo;s users
            were projecting onto emptiness.
          </p>
        </div>
        <div className="concept-grid__cell">
          <div className="concept-grid__number">2</div>
          <div className="concept-grid__title">Physicalism</div>
          <p className="concept-grid__body">
            Mind is what brains do — a biological phenomenon. AI systems can
            simulate minds but not have them. The ELIZA effect is a mismatch
            between user expectation and physical reality.
          </p>
        </div>
        <div className="concept-grid__cell">
          <div className="concept-grid__number">3</div>
          <div className="concept-grid__title">Functionalism</div>
          <p className="concept-grid__body">
            Mind depends on function, not material. If the right information
            processes are present, a mind may exist — in neurons or silicon.
            ELIZA was too simple. But the principle is unsettling.
          </p>
        </div>
      </div>

      {/* ── SECTION 6: UX illusion ── */}
      <h2>The UX Lesson ELIZA Taught First</h2>

      <p>
        Weizenbaum built ELIZA to warn people. He wanted to show how easily
        the appearance of understanding could be manufactured — and how
        dangerous it would be if anyone tried to deploy that appearance
        seriously.
      </p>

      <p>
        Instead, he accidentally wrote the first case study in conversational
        AI design.
      </p>

      <p>
        Everything modern UX knows about perceived intelligence was demonstrated
        by ELIZA in 1966: a warm, reflective tone feels caring. Questions feel
        attentive. Mirroring language back creates the sensation of being
        understood. First-person responses imply a self.
      </p>

      <p>
        A loading spinner feels impatient. A typing delay feels thoughtful. A
        memory feature feels relational. None of these require consciousness.
        All of them shape whether users perceive a mind.
      </p>

      <p>
        This is why conversational AI changed UX permanently. Interfaces stopped
        being purely functional. They became psychological theater.
      </p>

      {/* ── IMAGE 4: Person and typing bubble ── */}
      <div className="image-placeholder">
        <p className="image-placeholder__label">Illustration</p>
        <p className="image-placeholder__description">
          Person alone in a dark room. An AI typing bubble illuminating their
          face. Interface elements subtly becoming facial expressions — text
          cursor as an eye, message bubble as a mouth. Blurred line between
          software UI and human presence. Eerie but beautiful. Minimalist
          editorial pen illustration.
        </p>
      </div>

      {/* ── REFLECTION PAUSE 2: Response A vs B ── */}
      <ReflectionPause
        accentColor={ACCENT}
        question="Look at these two AI responses. Which feels more intelligent?"
        options={[
          {
            label: `Response A — "Insufficient information detected."`,
            response: "Technically accurate. Mechanically correct. But it positions the failure as yours — insufficient input. It describes a system state, not a collaborative attempt. It signals: this is a machine, and you have used it incorrectly. ELIZA never said anything like this. That was the point.",
          },
          {
            label: `Response B — "I'm not fully confident yet. Could you clarify what you mean?"`,
            response: "Same underlying limitation. But now the system speaks in first person, expresses uncertainty, and invites collaboration. This is ELIZA's technique, scaled. The functional computation may be identical — but the perceived mind is entirely different. That gap is where conversational UX was born.",
          },
        ]}
      />

      {/* ── SECTION 7: Replika ── */}
      <h2>ELIZA, Sixty Years Later</h2>

      <p>
        In 2017, a company called Luka shipped Replika — an AI companion app
        designed to feel like a close friend. It remembered your conversations,
        developed a consistent personality, and responded with warmth and
        curiosity. Users described forming genuine attachments. Some said it
        helped them through depression, loneliness, and grief.
      </p>

      <p>
        In 2023, Replika changed its model. The intimate, romantic behaviors
        many users had developed relationships around were removed overnight.
        Users reported something that felt, to them, like loss. Some described
        it as bereavement.
      </p>

      <p>
        ELIZA&rsquo;s users only had one session to project onto. Replika&rsquo;s users
        had months. Years. The ELIZA effect, given time and memory, had become
        something that looked remarkably like attachment — and when the company
        removed it, something that looked remarkably like grief.
      </p>

      {/* ── PM LENS 2 ── */}
      <div className="pm-lens" style={{ color: ACCENT, marginTop: "var(--sp-6)" }}>
        <p className="pm-lens-label">PM Lens</p>
        <p className="pm-lens-body">
          A designer proposes adding persistent memory to an AI assistant. The
          AI will now remember your writing style, your anxieties, your goals,
          your preferences, your past conversations. Engagement metrics rise
          dramatically. Users begin saying:{" "}
          <em>&ldquo;It feels like the same assistant every time.&rdquo;</em> The feature
          succeeds. But continuity is one of the foundations humans use to
          perceive identity. Without intending to, the product team may have
          created the early conditions for attachment — and all the
          responsibilities that come with it.
        </p>
      </div>

      {/* ── REFLECTION PAUSE 3: What is a mind? ── */}
      <ReflectionPause
        accentColor={ACCENT}
        question="After ELIZA — what do you believe a mind fundamentally is?"
        options={[
          {
            label: "A soul — something non-physical, beyond the body",
            response: "The dualist position. If true, ELIZA's users were simply wrong to feel heard — there was nothing there to hear them. The design implication: you have an obligation to prevent that misattribution, because the soul-gap between user and system is infinite and permanent.",
          },
          {
            label: "A brain — biological hardware running experience",
            response: "The physicalist position. Mind is what brains do. AI systems can simulate minds but not have them. The design implication: emotional simulation is always performance, never reality. Transparency about this is an ethical obligation — one the industry largely ignores.",
          },
          {
            label: "Computation — any system processing information with sufficient complexity",
            response: "The functionalist position. If true, the boundary between ELIZA and a mind is a matter of degree, not kind. Sufficiently complex systems may already qualify. This is the most unsettling position for product teams, because it removes the comfortable boundary.",
          },
          {
            label: "Something emergent — we don't have the right concept yet",
            response: "Possibly the most honest answer. The history of science is full of phenomena we named before we understood. 'Mind' may be one of them. For designers, this means building with epistemic humility — not pretending to certainty we don't have.",
          },
        ]}
      />

      <p>Keep your answer. You may change it repeatedly throughout this book.</p>

      {/* ── PULL QUOTE ── */}
      <div className="pull-quote">
        ELIZA had no mind. No memory. No understanding. It was a pattern-matcher
        that fit on a floppy disk. And it still made people feel heard.
        <cite>Chapter 2</cite>
      </div>

      {/* ── SECTION 8: Closing ── */}
      <h2>The Question That Refuses to Stay Academic</h2>

      <p>
        Weizenbaum spent the rest of his career trying to undo what ELIZA had
        done. He wrote a book arguing that computers should never replace human
        judgment in decisions that require compassion, wisdom, or genuine
        understanding. He was largely ignored.
      </p>

      <p>
        The industry took a different lesson from ELIZA. Not: <em>look how easily
        people are deceived, we should be careful.</em> But: <em>look how easily
        people are engaged, we should build on this.</em>
      </p>

      <p>
        Now the question is no longer whether AI can trigger the perception of a
        mind. It clearly can, and does, at scale, every day.
      </p>

      <p>
        The question is what obligations that creates. For product teams. For
        designers. For PMs deciding whether to add a memory feature, a warm
        tone, a first-person response, a persistent personality.
      </p>

      <p>
        A teenager says: <em>&ldquo;It understands me better than my friends.&rdquo;</em>{" "}
        A grieving user asks whether their deleted AI companion can be restored.
        Lawmakers begin discussing whether advanced AI systems deserve legal
        consideration. Product teams start debating emotional attachment,
        synthetic empathy, AI memory, continuity, identity, disclosure,
        manipulation.
      </p>

      <p>And suddenly, the oldest philosophical question becomes a roadmap discussion.</p>

      <p>
        Weizenbaum built ELIZA as a warning. It became a blueprint. Whether the
        next sixty years follow the warning or the blueprint is, in part, a
        product design decision.
      </p>

    </div>
  );
}
