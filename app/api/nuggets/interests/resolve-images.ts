/**
 * Resolve Wikipedia page titles → Wikimedia thumbnail URLs.
 * Uses the pageimages API in batch (up to 50 titles per request).
 */
export async function resolveWikimediaImages(
  terms: string[],
  size = 400
): Promise<Record<string, string>> {
  if (terms.length === 0) return {};

  const url =
    `https://en.wikipedia.org/w/api.php?` +
    new URLSearchParams({
      action: "query",
      titles: terms.join("|"),
      prop: "pageimages",
      format: "json",
      pithumbsize: String(size),
      origin: "*",
    });

  const res = await fetch(url, {
    headers: { "User-Agent": "Wellversed/1.0 (educational app)" },
    next: { revalidate: 86400 }, // cache 24h in Next.js edge
  });

  if (!res.ok) return {};

  const data = await res.json() as {
    query: { pages: Record<string, { title: string; thumbnail?: { source: string } }> };
  };

  const result: Record<string, string> = {};
  for (const page of Object.values(data.query?.pages ?? {})) {
    if (page.thumbnail?.source) {
      // Map back by normalized title
      result[page.title.toLowerCase()] = page.thumbnail.source;
    }
  }

  // Also map by original input terms (case-insensitive)
  const mapped: Record<string, string> = {};
  for (const term of terms) {
    const found = result[term.toLowerCase()];
    if (found) mapped[term] = found;
  }

  return mapped;
}
