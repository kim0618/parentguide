import puppeteer from 'puppeteer';

async function generateIcon(size, filename) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size });

  const svgSize = Math.round(size * 0.7);
  const html = `<!DOCTYPE html>
<html><head><style>
  body { margin: 0; display: flex; align-items: center; justify-content: center;
         width: ${size}px; height: ${size}px; background: #1D4ED8; }
  svg { width: ${svgSize}px; height: ${svgSize}px; }
</style></head><body>
<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 2L4 7v9c0 7.18 5.12 13.4 12 15 6.88-1.6 12-7.82 12-15V7L16 2z" fill="white"/>
  <path d="M12 16.5l3 3 5.5-5.5" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="16" cy="10" r="2.2" fill="#1D4ED8" opacity="0.85"/>
</svg>
</body></html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `public/${filename}`, type: 'png' });
  await browser.close();
  console.log(`Generated ${filename} (${size}x${size})`);
}

await generateIcon(192, 'icon-192.png');
await generateIcon(512, 'icon-512.png');
