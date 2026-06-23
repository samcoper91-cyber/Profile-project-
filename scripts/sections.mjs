import { chromium } from "playwright";

const URL = process.env.URL || "http://localhost:5174/";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: "networkidle" });

// scroll through once so reveals fire and stay (once:true)
await page.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  for (let y = 0; y <= document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await sleep(120);
  }
  window.scrollTo(0, 0);
  await sleep(300);
});

for (const id of ["services", "work", "about", "recommendations", "contact"]) {
  const el = await page.$(`#${id}`);
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await el.screenshot({ path: `/tmp/sec_${id}.png` });
  }
}

await browser.close();
console.log("section shots written");
