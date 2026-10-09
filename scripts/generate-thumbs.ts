import fs from "fs";
import path from "path";
import https from "https";
import sequences from "../lib/nuggets/gold-sequences.json";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY not set");
  process.exit(1);
}

const OUT_DIR = path.join(process.cwd(), "public/nuggets/thumbs");
fs.mkdirSync(OUT_DIR, { recursive: true });

function thumbPath(id: string) {
  return path.join(OUT_DIR, `${id}.jpg`);
}

// Override prompts for sequences blocked by the safety system
const PROMPT_OVERRIDES: Record<string, string> = {
  "hitler-rise-to-power": "1930s Germany — a crowd gathered in a large public square, dramatic storm clouds, black and white editorial illustration, dark cinematic atmosphere, no faces, symbolic imagery of political upheaval",
  "holocaust-how": "Empty railway tracks leading to a distant horizon, barbed wire fence at sunset, somber memorial aesthetic, dark editorial illustration, no people, historical documentary style",
  "nazi-germany-fall": "Ruined architecture and rubble in a European city, 1945, black and white editorial photograph style, dramatic sky, symbolic of wartime destruction, no people",
};

function buildPrompt(entry: { id: string; question: string; topic: string; tags: string[] }): string {
  if (PROMPT_OVERRIDES[entry.id]) return PROMPT_OVERRIDES[entry.id];
  const tags = entry.tags.slice(0, 4).join(", ");
  return (
    `Editorial illustration for: "${entry.question}". ` +
    `Topic: ${entry.topic}. Key themes: ${tags}. ` +
    `Style: cinematic, high-contrast, dark background (#080808), photorealistic or painterly. ` +
    `No text, no labels, no UI. Square 1:1 crop. Bold, iconic, single focal point.`
  );
}

async function generateImage(prompt: string): Promise<string> {
  const body = JSON.stringify({
    model: "gpt-image-1",
    prompt,
    n: 1,
    size: "1024x1024",
    quality: "medium",
    output_format: "jpeg",
  });

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${err}`);
  }

  const json = await res.json() as { data: { url?: string; b64_json?: string }[] };
  const item = json.data[0];
  if (item.url) return item.url;
  // gpt-image-1 may return b64_json instead of url
  if (item.b64_json) return `data:image/jpeg;base64,${item.b64_json}`;
  throw new Error("No url or b64_json in response");
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    function get(u: string) {
      https.get(u, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          file.close();
          get(response.headers.location!);
          return;
        }
        response.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      }).on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    get(url);
  });
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const entries = sequences as { id: string; question: string; topic: string; tags: string[] }[];
  console.log(`Generating thumbnails for ${entries.length} sequences…\n`);

  let generated = 0;
  let skipped = 0;

  for (const entry of entries) {
    const dest = thumbPath(entry.id);
    if (fs.existsSync(dest)) {
      console.log(`  ✓ skip  ${entry.id}`);
      skipped++;
      continue;
    }

    const prompt = buildPrompt(entry);    console.log(`  ⟳ gen   ${entry.id}`);
    console.log(`          "${entry.question}"`);

    try {
      const result = await generateImage(prompt);
      if (result.startsWith("data:image")) {
        // base64 response — write directly
        const b64 = result.split(",")[1];
        fs.writeFileSync(dest, Buffer.from(b64, "base64"));
      } else {
        await downloadFile(result, dest);
      }
      console.log(`  ✓ saved ${entry.id}.jpg`);
      generated++;
      await sleep(13000);
    } catch (err) {
      console.error(`  ✗ error ${entry.id}:`, err);
      // Don't stop — continue with next
    }
  }

  console.log(`\nDone. Generated: ${generated}, Skipped: ${skipped}`);
}

main();
