const fs = require('fs');
const path = require('path');

const puppeteer = require('puppeteer');

const [, , captureType] = process.argv;

const screenshotDir = path.resolve(__dirname, captureType);

async function main() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 640, height: 480 });
  await page.goto(`file://${__dirname}/docs/index.html`);
  await new Promise(resolve => setTimeout(resolve, 300));
  await page.screenshot({ path: path.resolve(screenshotDir, 'index.png') });

  await page.close();
  await browser.close();
}

fs.mkdirSync(
  screenshotDir,
  { recursive: true }
);

main();
