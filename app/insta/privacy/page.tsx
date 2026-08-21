export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500 text-sm">Stats and Strategy · Last updated August 21, 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-300">What this app does</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Stats and Strategy is a personal analytics tool that connects to your Instagram Professional account and displays your account performance data — including follower count, post engagement, reach, impressions, and comment activity. It also provides AI-powered content suggestions based on your post history and audience demographics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-300">Data we access</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            We request the following permissions from Instagram via the official Meta API:
          </p>
          <ul className="text-zinc-500 text-sm space-y-1.5 list-disc list-inside">
            <li><span className="text-zinc-400">instagram_business_basic</span> — your profile, media, and basic account info</li>
            <li><span className="text-zinc-400">instagram_business_manage_insights</span> — reach, impressions, and engagement metrics</li>
            <li><span className="text-zinc-400">instagram_business_manage_comments</span> — comments on your posts</li>
            <li><span className="text-zinc-400">instagram_business_manage_messages</span> — direct message metadata</li>
            <li><span className="text-zinc-400">instagram_business_content_publish</span> — future content scheduling (not currently active)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-300">How we store your data</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Your Instagram access token is stored in your browser&apos;s localStorage and is never transmitted to or stored on our servers. All Instagram API requests are made directly from your browser to Meta&apos;s servers.
          </p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Chat messages sent to the AI assistant are stored in our database (Supabase) associated with your Instagram username, so the assistant can maintain conversation context across sessions. These messages are not shared with third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-300">Third-party services</h2>
          <ul className="text-zinc-500 text-sm space-y-1.5 list-disc list-inside">
            <li><span className="text-zinc-400">Meta / Instagram Graph API</span> — source of all Instagram data</li>
            <li><span className="text-zinc-400">OpenAI</span> — powers the AI chat assistant and content ideas feature</li>
            <li><span className="text-zinc-400">Supabase</span> — stores chat message history</li>
          </ul>
          <p className="text-zinc-500 text-sm leading-relaxed">
            We do not sell, share, or monetize your data in any form.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-300">Data deletion</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            To disconnect your Instagram account, clear your browser&apos;s localStorage. To request deletion of your chat history stored in our database, contact us at the address below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-medium text-zinc-300">Contact</h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            For any questions about this privacy policy or your data, contact:{" "}
            <a href="mailto:djteknokid@gmail.com" className="text-white hover:underline">
              djteknokid@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
