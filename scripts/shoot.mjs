import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5174/";

const browser = await chromium.launch({ channel: "chrome" });

async function settleScroll(page) {
  // Step through the page so every IntersectionObserver reveal fires.
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(window.innerHeight * 0.75);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await sleep(220);
    }
    window.scrollTo(0, document.body.scrollHeight);
    await sleep(500);
    window.scrollTo(0, 0);
    await sleep(500);
  });
}

// ---- Desktop ----
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await desktop.goto(URL, { waitUntil: "networkidle" });
await desktop.waitForTimeout(1600); // let hero entrance finish
await desktop.screenshot({ path: "/tmp/shot_hero.png" });
await settleScroll(desktop);
await desktop.screenshot({ path: "/tmp/shot_full.png", fullPage: true });

// ---- Mobile ----
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
await mobile.goto(URL, { waitUntil: "networkidle" });
await mobile.waitForTimeout(1600);
await mobile.screenshot({ path: "/tmp/shot_mobile_hero.png" });
await settleScroll(mobile);
await mobile.screenshot({ path: "/tmp/shot_mobile_full.png", fullPage: true });

await browser.close();
console.log("screenshots written to /tmp/shot_*.png");
