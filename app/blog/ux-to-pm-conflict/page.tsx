import Image from "next/image";
import Link from "next/link";

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#f0f1f3] text-[#1a2235]">
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Back */}
        <Link href="/" className="text-xs text-[#1a2235]/40 hover:text-[#1a2235] transition-colors tracking-widest uppercase mb-12 inline-block">
          ← Back
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#1a2235] text-white">Blog</span>
          <span className="text-xs text-[#1a2235]/30">Sep 2026</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#1a2235] leading-snug mb-8">
          I Went From UX to PM. Now I See Where the Conflict Begins.
        </h1>

        {/* Image */}
        <div className="mb-10">
          <Image
            src="/blog-ux-vs-product.png"
            alt="Is this a UX decision or a Product decision?"
            width={800}
            height={600}
            className="w-full rounded-sm"
          />
        </div>

        {/* Body */}
        <div className="space-y-6 text-sm text-[#1a2235]/70 leading-7">

          <p>So far, I think a lot of it comes down to 3 things:</p>

          <ul className="space-y-2 pl-1">
            <li>1. It&apos;s not clear enough what UX owns vs. what Product owns.</li>
            <li>2. We don&apos;t build the relationship and safe environment for conflict early enough.</li>
            <li>3. PM protects the KPI. UX protects the user. But the KPI often isn&apos;t talked about enough — sometimes it only exists in the PM&apos;s head.</li>
          </ul>

          <p className="font-semibold text-[#1a2235]">Starting with #1.</p>

          <p>UX often says, &ldquo;It&apos;s frustrating that everyone thinks they can design.&rdquo;</p>
          <p>Product often says, &ldquo;UX gets so sensitive when I comment on a design.&rdquo;</p>
          <p>And I think this conflict is only going to increase now that AI allows PMs to create high-fidelity prototypes in a matter of hours.</p>

          <p>The problem isn&apos;t that everyone has an opinion about design.<br/>
          The problem is that we don&apos;t clearly separate <em>having an opinion</em> from <em>owning the decision</em>.<br/>
          When that&apos;s unclear, an opinion can easily feel like someone stepping into your territory.</p>

          <p className="font-semibold text-[#1a2235]">So how do I approach this now that I&apos;ve been on both sides?</p>

          <p>At first, I thought there must be a rule:<br/>
          PM decides WHAT. UX decides HOW.<br/>
          But every project is different. Every product is at a different stage. The line is never that clean.</p>

          <p>So instead of trying to define a perfect rule, I started asking one question constantly:</p>

          <p className="text-base font-bold text-[#1a2235] border-l-2 border-[#1a2235] pl-4">
            &ldquo;Is this a UX decision or a Product decision?&rdquo;
          </p>

          <ol className="space-y-1 pl-1">
            <li>1. I ask it with UX.</li>
            <li>2. I ask it with engineers when UX isn&apos;t in the room.</li>
            <li>3. I even ask myself when I&apos;m writing a PRD or Jira ticket.</li>
          </ol>

          <p>It&apos;s less about getting the answer right every time and more about building the habit of asking.<br/>
          And UX sees that too. They know I&apos;m being mindful of their ownership.</p>

          <p>Then we can challenge each other&apos;s thinking without challenging each other&apos;s roles.<br/>
          We&apos;re challenging the work, not each other&apos;s roles.<br/>
          Like everything else, it takes practice.</p>

          <hr className="border-[#1a2235]/10 my-8" />

          <p className="text-[#1a2235]/40 italic">Next: Why I think you need to build the environment for conflict before the conflict happens.</p>

        </div>
      </div>
    </main>
  );
}
