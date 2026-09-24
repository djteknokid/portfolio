/**
 * Instagram Follower Scanner
 * Opens real Chrome, logs in, visits follower profiles slowly, writes data/ig-followers.json
 *
 * Usage: npx ts-node scripts/ig-scan-followers.ts
 * Env:   IG_USERNAME, IG_PASSWORD (or set below)
 * Env:   IG_SESSION_FILE (default: data/ig-session.json) for cookie persistence
 * Env:   IG_MAX_PROFILES (default: 30) per session
 */

import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const IG_USERNAME = process.env.IG_USERNAME || "";
const IG_PASSWORD = process.env.IG_PASSWORD || "";
const SESSION_FILE = path.resolve(process.env.IG_SESSION_FILE || "data/ig-session.json");
const OUTPUT_FILE = path.resolve("data/ig-followers.json");
const STATUS_FILE = path.resolve("data/ig-scan-status.json");
const MAX_PROFILES = parseInt(process.env.IG_MAX_PROFILES || "30", 10);

interface FollowerData {
  username: string;
  fullName: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postCount: number;
  isVerified: boolean;
  profilePicUrl: string;
  scannedAt: string;
}

interface ScanStatus {
  running: boolean;
  scanned: number;
  total: number;
  currentUsername: string;
  startedAt: string;
  lastUpdated: string;
  error?: string;
}

function readExisting(): FollowerData[] {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      return JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
    }
  } catch {}
  return [];
}

function writeData(data: FollowerData[]) {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
}

function writeStatus(status: Partial<ScanStatus>) {
  const existing: ScanStatus = fs.existsSync(STATUS_FILE)
    ? JSON.parse(fs.readFileSync(STATUS_FILE, "utf-8"))
    : { running: false, scanned: 0, total: 0, currentUsername: "", startedAt: new Date().toISOString(), lastUpdated: new Date().toISOString() };
  const updated = { ...existing, ...status, lastUpdated: new Date().toISOString() };
  fs.writeFileSync(STATUS_FILE, JSON.stringify(updated, null, 2));
}

// Human-like random delay
function randomDelay(minMs: number, maxMs: number): Promise<void> {
  const ms = Math.floor(Math.random() * (maxMs - minMs) + minMs);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Parse Instagram number strings like "1.2K", "45.3K", "1.1M"
function parseCount(text: string): number {
  if (!text) return 0;
  const clean = text.replace(/,/g, "").trim();
  const match = clean.match(/^([\d.]+)([KkMm]?)$/);
  if (!match) return 0;
  const num = parseFloat(match[1]);
  const suffix = match[2].toUpperCase();
  if (suffix === "K") return Math.round(num * 1000);
  if (suffix === "M") return Math.round(num * 1000000);
  return Math.round(num);
}

async function promptCredentials(): Promise<{ username: string; password: string }> {
  if (IG_USERNAME && IG_PASSWORD) return { username: IG_USERNAME, password: IG_PASSWORD };
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q: string) => new Promise<string>(r => rl.question(q, r));
  const username = await ask("Instagram username: ");
  const password = await ask("Instagram password: ");
  rl.close();
  return { username, password };
}

async function main() {
  const { username, password } = await promptCredentials();

  writeStatus({ running: true, scanned: 0, total: 0, currentUsername: "", startedAt: new Date().toISOString(), error: undefined });

  const browser = await chromium.launch({
    headless: false,
    channel: "chrome", // use real installed Chrome
    args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  });

  // Load saved session if exists
  let context;
  if (fs.existsSync(SESSION_FILE)) {
    try {
      const cookies = JSON.parse(fs.readFileSync(SESSION_FILE, "utf-8"));
      context = await browser.newContext({ storageState: cookies });
      console.log("Loaded saved session.");
    } catch {
      context = await browser.newContext();
    }
  } else {
    context = await browser.newContext();
  }

  const page = await context.newPage();

  // Remove automation hints
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
  });

  try {
    // --- Login ---
    await page.goto("https://www.instagram.com/accounts/login/", { waitUntil: "networkidle" });
    await randomDelay(2000, 4000);

    // Check if already logged in
    const isLoggedIn = await page.locator('svg[aria-label="Home"]').isVisible().catch(() => false);

    if (!isLoggedIn) {
      console.log("Logging in...");
      await page.fill('input[name="username"]', username);
      await randomDelay(500, 1200);
      await page.fill('input[name="password"]', password);
      await randomDelay(500, 1000);
      await page.click('button[type="submit"]');
      await page.waitForURL(/instagram\.com\/(accounts\/onetap|$)/, { timeout: 30000 });
      await randomDelay(2000, 4000);

      // Save not now on "Save Login Info"
      const saveNotNow = page.locator('button:has-text("Not Now"), a:has-text("Not Now")');
      if (await saveNotNow.isVisible({ timeout: 5000 }).catch(() => false)) {
        await saveNotNow.click();
        await randomDelay(1000, 2000);
      }

      // Save session cookies
      await context.storageState({ path: SESSION_FILE });
      console.log("Session saved.");
    } else {
      console.log("Already logged in via saved session.");
    }

    // --- Navigate to followers list ---
    await page.goto(`https://www.instagram.com/${username}/followers/`, { waitUntil: "networkidle" });
    await randomDelay(2000, 4000);

    // Open followers modal via profile link
    await page.goto(`https://www.instagram.com/${username}/`, { waitUntil: "networkidle" });
    await randomDelay(2000, 3000);

    const followersLink = page.locator('a[href*="/followers/"]').first();
    await followersLink.click();
    await randomDelay(2000, 3000);

    // Scroll to load followers in the modal
    const modal = page.locator('div[role="dialog"]');
    await modal.waitFor({ timeout: 10000 });

    console.log("Loading followers list...");
    // Scroll the modal to load more followers
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("End");
      await randomDelay(800, 1500);
      await modal.evaluate(el => el.scrollTop += 800);
      await randomDelay(800, 1500);
    }

    // Collect follower usernames from the modal
    const followerLinks = await modal.locator('a[href^="/"]').evaluateAll(
      (els: HTMLAnchorElement[]) => els.map(el => el.href)
    );
    const followerUsernames = [...new Set(
      followerLinks
        .map(h => h.replace("https://www.instagram.com", "").replace(/\//g, ""))
        .filter(u => u && !u.includes("?") && u !== username && u.length > 0)
    )];

    console.log(`Found ${followerUsernames.length} followers in modal`);

    // Close modal
    await page.keyboard.press("Escape");
    await randomDelay(1000, 2000);

    // Load existing data (resume support)
    const existing = readExisting();
    const alreadyScanned = new Set(existing.map(f => f.username));
    const toScan = followerUsernames.filter((u: string) => !alreadyScanned.has(u)).slice(0, MAX_PROFILES);

    writeStatus({ running: true, total: followerUsernames.length, scanned: existing.length });
    console.log(`Will scan ${toScan.length} new profiles (${existing.length} already done)`);

    const results = [...existing];

    for (let i = 0; i < toScan.length; i++) {
      const followerUsername = toScan[i] as string;
      writeStatus({ running: true, currentUsername: followerUsername, scanned: results.length });
      console.log(`[${i + 1}/${toScan.length}] Visiting @${followerUsername}...`);

      try {
        await page.goto(`https://www.instagram.com/${followerUsername}/`, { waitUntil: "domcontentloaded", timeout: 15000 });
        await randomDelay(2000, 4000);

        // Extract profile data from the page
        const profileData = await page.evaluate(() => {
          // Try to get data from meta tags and page content
          const getMetaContent = (name: string) => {
            const el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            return el ? (el as HTMLMetaElement).content : "";
          };

          const description = getMetaContent("description") || getMetaContent("og:description") || "";
          const title = getMetaContent("og:title") || document.title || "";

          // Parse "X Followers, Y Following, Z Posts" from description
          const followersMatch = description.match(/([\d,.]+[KkMm]?)\s*Followers/i);
          const followingMatch = description.match(/([\d,.]+[KkMm]?)\s*Following/i);
          const postsMatch = description.match(/([\d,.]+[KkMm]?)\s*Posts/i);

          // Get bio from description (everything after the counts line)
          const bioMatch = description.match(/Posts\s*[-–]\s*(.+)/s);
          const bio = bioMatch ? bioMatch[1].trim().slice(0, 200) : "";

          const imgEl = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
          const profilePicUrl = imgEl?.content || "";

          const isVerified = document.title.includes("✓") || document.querySelector('[aria-label="Verified"]') !== null;
          const fullName = title.split("(")[0]?.replace("@", "")?.trim() || "";

          return {
            followersRaw: followersMatch?.[1] || "0",
            followingRaw: followingMatch?.[1] || "0",
            postsRaw: postsMatch?.[1] || "0",
            bio,
            profilePicUrl,
            isVerified,
            fullName,
          };
        });

        const follower: FollowerData = {
          username: followerUsername,
          fullName: profileData.fullName as string,
          bio: profileData.bio,
          followersCount: parseCount(profileData.followersRaw),
          followingCount: parseCount(profileData.followingRaw),
          postCount: parseCount(profileData.postsRaw),
          isVerified: profileData.isVerified,
          profilePicUrl: profileData.profilePicUrl,
          scannedAt: new Date().toISOString(),
        };

        results.push(follower);
        writeData(results);
        console.log(`  ✓ followers:${follower.followersCount} following:${follower.followingCount} posts:${follower.postCount}`);

        // Human-like burst + pause pattern
        const isBurstEnd = (i + 1) % 7 === 0;
        if (isBurstEnd && i < toScan.length - 1) {
          const pauseMs = Math.floor(Math.random() * 300000 + 300000); // 5–10 min
          console.log(`Taking a ${Math.round(pauseMs / 60000)} min break...`);
          await randomDelay(pauseMs, pauseMs + 30000);
        } else {
          // 30s–3min between profiles
          await randomDelay(30000, 180000);
        }
      } catch (err) {
        console.warn(`  ✗ Could not scan @${followerUsername}: ${err}`);
        await randomDelay(10000, 20000);
      }
    }

    writeStatus({ running: false, scanned: results.length });
    console.log(`\nDone. Scanned ${results.length} profiles. Data saved to ${OUTPUT_FILE}`);

  } catch (err) {
    writeStatus({ running: false, error: String(err) });
    console.error("Fatal error:", err);
  } finally {
    await context.storageState({ path: SESSION_FILE }).catch(() => {});
    await browser.close();
  }
}

main().catch(console.error);
