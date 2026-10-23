import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\8e3eae98-db25-4cdb-ab18-be382ff6c7f8';

const targetUrl = process.argv[2] || 'https://formyneelu.vercel.app';

async function generate() {
  console.log(`Generating QR Gift Card for: ${targetUrl}`);

  // 1. High Resolution Standalone QR Code (PNG)
  const qrPngBuffer = await QRCode.toBuffer(targetUrl, {
    width: 1024,
    margin: 2,
    color: {
      dark: '#1c1917',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'H'
  });

  fs.writeFileSync(path.join(rootDir, 'qr_code.png'), qrPngBuffer);
  fs.writeFileSync(path.join(publicDir, 'qr_code.png'), qrPngBuffer);
  try { fs.writeFileSync(path.join(brainDir, 'qr_code.png'), qrPngBuffer); } catch (e) {}
  console.log('✓ Generated qr_code.png (1024x1024)');

  // 2. High Resolution Vector QR SVG
  const qrSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 0,
    color: {
      dark: '#111827',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'H'
  });

  const viewBoxMatch = qrSvg.match(/viewBox="([^"]+)"/);
  const qrViewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 33 33';
  const qrInner = qrSvg
    .replace(/<\?xml.*?\?>/i, '')
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '');

  fs.writeFileSync(path.join(rootDir, 'qr_code.svg'), qrSvg);
  fs.writeFileSync(path.join(publicDir, 'qr_code.svg'), qrSvg);
  console.log('✓ Generated qr_code.svg');

  // 3. Complete Printable Gift Card (Exact Match to Reference Photo)
  // Dimensions: 800 x 1200 px (standard 2:3 ratio, crisp 300 DPI print ready)
  const width = 800;
  const height = 1200;
  const qrSize = 420;
  const qrX = Math.round((width - qrSize) / 2); // 190px (perfectly centered)
  const qrY = 400;

  const cardSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .bg { fill: #ffffff; }
      .card-border { fill: none; stroke: #e5e7eb; stroke-width: 2.5; rx: 32; }
      .title-text {
        font-family: 'Segoe UI', -apple-system, 'Century Gothic', Arial, sans-serif;
        font-size: 60px;
        font-weight: 800;
        fill: #111827;
        text-anchor: middle;
        letter-spacing: -0.01em;
      }
      .divider-line { stroke: #374151; stroke-width: 2; stroke-linecap: round; }
      .heart-symbol {
        font-family: 'Segoe UI Symbol', Arial, sans-serif;
        font-size: 26px;
        fill: #1f2937;
        text-anchor: middle;
      }
      .scan-instruction {
        font-family: 'Segoe UI', -apple-system, Arial, sans-serif;
        font-size: 22px;
        font-weight: 500;
        fill: #4b5563;
        text-anchor: middle;
        letter-spacing: 0.02em;
      }
      .couple-rewind {
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 42px;
        font-weight: 500;
        font-style: italic;
        fill: #111827;
        text-anchor: middle;
        letter-spacing: 0.02em;
      }
    </style>
  </defs>

  <!-- Clean Minimalist Card Background -->
  <rect width="${width}" height="${height}" class="bg" />
  <rect x="30" y="30" width="${width - 60}" height="${height - 60}" class="card-border" />

  <!-- Header: "A special Gift" (Matching Reference Image) -->
  <text x="${width / 2}" y="195" class="title-text">A special</text>
  <text x="${width / 2}" y="270" class="title-text">Gift</text>

  <!-- Divider with Heart: ——— ♡ ——— -->
  <line x1="225" y1="325" x2="365" y2="325" class="divider-line" />
  <text x="${width / 2}" y="333" class="heart-symbol">♡</text>
  <line x1="435" y1="325" x2="575" y2="325" class="divider-line" />

  <!-- Perfectly Centered Crisp QR Code with subtle white padding -->
  <g transform="translate(${qrX}, ${qrY})">
    <rect width="${qrSize}" height="${qrSize}" fill="#ffffff" rx="12" />
    <svg width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}" preserveAspectRatio="xMidYMid meet">
      ${qrInner}
    </svg>
  </g>

  <!-- Subtitle: Point the camera -->
  <text x="${width / 2}" y="910" class="scan-instruction">Point the camera</text>

  <!-- Footer: Couple Rewind -->
  <text x="${width / 2}" y="985" class="couple-rewind">Couple Rewind</text>
</svg>`;

  fs.writeFileSync(path.join(rootDir, 'qr_gift_card.svg'), cardSvg, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'qr_gift_card.svg'), cardSvg, 'utf8');
  try { fs.writeFileSync(path.join(brainDir, 'qr_gift_card.svg'), cardSvg, 'utf8'); } catch (e) {}
  console.log('✓ Generated qr_gift_card.svg');

  // 4. Render High Resolution 300 DPI PNG Card using Sharp
  const cardPngBuffer = await sharp(Buffer.from(cardSvg), { density: 300 })
    .png({ quality: 100 })
    .toBuffer();

  fs.writeFileSync(path.join(rootDir, 'qr_gift_card.png'), cardPngBuffer);
  fs.writeFileSync(path.join(publicDir, 'qr_gift_card.png'), cardPngBuffer);
  try { fs.writeFileSync(path.join(brainDir, 'qr_gift_card.png'), cardPngBuffer); } catch (e) {}
  console.log('✓ Rendered high-res qr_gift_card.png (Print Ready)');

  console.log('\n======================================================');
  console.log(`Successfully generated QR Gift Card for: ${targetUrl}`);
  console.log('Files generated:');
  console.log('- qr_gift_card.png (High-Res Printable Card)');
  console.log('- qr_gift_card.svg (Vector Card)');
  console.log('- qr_code.png (Standalone 1024x1024 QR Code)');
  console.log('======================================================');
}

generate().catch(console.error);
