import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import * as fs from "fs";
import * as path from "path";

const OUTPUT_FILE = path.resolve("data/ig-followers.json");
const STATUS_FILE = path.resolve("data/ig-scan-status.json");

function readJson(file: string) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {}
  return null;
}

export async function GET() {
  const status = readJson(STATUS_FILE) || { running: false, scanned: 0, total: 0 };
  const followers = readJson(OUTPUT_FILE) || [];
  return NextResponse.json({ status, followers });
}

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  // Check if already running
  const status = readJson(STATUS_FILE);
  if (status?.running) {
    return NextResponse.json({ error: "Scan already running" }, { status: 409 });
  }

  // Ensure data dir exists
  const dataDir = path.resolve("data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  // Spawn the scraper detached so it survives beyond this request
  const child = spawn(
    "npx",
    ["ts-node", "--project", "tsconfig.scripts.json", "scripts/ig-scan-followers.ts"],
    {
      detached: true,
      stdio: "ignore",
      env: {
        ...process.env,
        IG_USERNAME: username,
        IG_MAX_PROFILES: "30",
      },
      cwd: process.cwd(),
    }
  );
  child.unref();

  return NextResponse.json({ ok: true, pid: child.pid });
}
