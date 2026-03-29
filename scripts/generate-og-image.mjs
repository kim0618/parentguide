import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, '../public/og-default.png');

const html = `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%);
    font-family: 'Nanum Gothic', sans-serif;
  }
  .card {
    width: 1080px;
    height: 510px;
    background: white;
    border-radius: 24px;
    box-shadow: 0 8px 40px rgba(29, 78, 216, 0.12);
    padding: 60px 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top {
    display: flex;
    align-items: flex-start;
    gap: 24px;
  }
  .shield {
    flex-shrink: 0;
    width: 72px;
    height: 72px;
  }
  .brand {
    font-size: 28px;
    font-weight: 800;
    color: #1D4ED8;
    letter-spacing: -0.5px;
  }
  .main-title {
    font-size: 52px;
    font-weight: 800;
    color: #111827;
    line-height: 1.35;
    letter-spacing: -1px;
    margin-top: 20px;
  }
  .desc {
    font-size: 24px;
    color: #6B7280;
    line-height: 1.6;
    margin-top: 12px;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid #E5E7EB;
    padding-top: 24px;
  }
  .tags {
    display: flex;
    gap: 12px;
  }
  .tag {
    background: #EFF6FF;
    color: #1D4ED8;
    font-size: 18px;
    font-weight: 600;
    padding: 8px 20px;
    border-radius: 100px;
  }
  .url {
    font-size: 20px;
    color: #9CA3AF;
    font-weight: 500;
  }
</style>
</head>
<body>
  <div class="card">
    <div>
      <div class="top">
        <svg class="shield" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2L4 7v9c0 7.18 5.12 13.4 12 15 6.88-1.6 12-7.82 12-15V7L16 2z" fill="#1D4ED8"/>
          <path d="M12 16.5l3 3 5.5-5.5" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="16" cy="10" r="2.2" fill="white" opacity="0.85"/>
        </svg>
        <span class="brand">부모혜택</span>
      </div>
      <h1 class="main-title">부모님 복지·건강·은퇴<br/>정보를 한곳에</h1>
      <p class="desc">기초연금, 장기요양, 건강검진, 금융사기 예방까지<br/>믿을 수 있는 정보를 쉽게 정리했습니다</p>
    </div>
    <div class="bottom">
      <div class="tags">
        <span class="tag">연금·복지</span>
        <span class="tag">건강·돌봄</span>
        <span class="tag">금융·안전</span>
      </div>
      <span class="url">parentguide.kr</span>
    </div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.screenshot({ path: OUTPUT, type: 'png' });
await browser.close();

console.log('✓ og-default.png (1200x630) 생성 완료');
