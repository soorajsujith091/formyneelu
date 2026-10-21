import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetUrl = 'https://formyneelu.vercel.app';
const brainDir = 'C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\2742ca23-4e32-47ed-9282-451e94839651';

async function generateAll() {
  console.log(`Generating QR codes for: ${targetUrl}`);

  // 1. High Resolution Standalone PNG
  const pngPath = path.join(__dirname, 'qr_code.png');
  const pngPublic = path.join(__dirname, 'public', 'qr_code.png');
  const pngBrain = path.join(brainDir, 'qr_code.png');

  await QRCode.toFile(pngPath, targetUrl, {
    width: 1024,
    margin: 2,
    color: {
      dark: '#1c1917',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'H'
  });

  fs.copyFileSync(pngPath, pngPublic);
  try { fs.copyFileSync(pngPath, pngBrain); } catch (e) {}
  console.log('✅ Generated high-res qr_code.png (1024x1024)');

  // 2. Vector SVG QR Code
  const qrSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 0,
    color: {
      dark: '#1c1917',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'H'
  });

  const svgPath = path.join(__dirname, 'qr_code.svg');
  const svgPublic = path.join(__dirname, 'public', 'qr_code.svg');
  const svgBrain = path.join(brainDir, 'qr_code.svg');

  fs.writeFileSync(svgPath, qrSvg, 'utf8');
  fs.copyFileSync(svgPath, svgPublic);
  try { fs.copyFileSync(svgPath, svgBrain); } catch (e) {}
  console.log('✅ Generated vector qr_code.svg');

  // 3. Full Printable 4x6" Romantic Gift Card SVG
  const viewBoxMatch = qrSvg.match(/viewBox="([^"]+)"/);
  const qrViewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 33 33';

  const qrInner = qrSvg
    .replace(/<\?xml.*?\?>/i, '')
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '');

  const width = 600;
  const height = 860;
  const qrSize = 310;
  const qrX = Math.round((width - qrSize) / 2); // 145px
  const qrY = 250;

  const giftCardSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&amp;family=Outfit:wght@400;500;600;700&amp;family=Dancing+Script:wght@700&amp;display=swap');
      .bg { fill: #ffffff; }
      .card-border { fill: none; stroke: #e7e5e4; stroke-width: 1.5; rx: 20; }
      .title { font-family: 'Playfair Display', Georgia, serif; font-size: 40px; font-weight: 700; fill: #1c1917; text-anchor: middle; letter-spacing: 0.02em; }
      .heart-line { stroke: #d6d3d1; stroke-width: 1.5; }
      .heart-symbol { fill: #e11d48; font-size: 20px; text-anchor: middle; font-family: Arial, sans-serif; }
      .scan-text { font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600; fill: #78716c; text-anchor: middle; letter-spacing: 0.12em; text-transform: uppercase; }
      .footer-title { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; font-weight: 600; font-style: italic; fill: #1c1917; text-anchor: middle; }
      .footer-sub { font-family: 'Dancing Script', cursive; font-size: 25px; font-weight: 700; fill: #e11d48; text-anchor: middle; }
      .url-text { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500; fill: #a8a29e; text-anchor: middle; letter-spacing: 0.05em; }
    </style>
  </defs>

  <!-- Clean Card Background -->
  <rect width="${width}" height="${height}" class="bg" />
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" class="card-border" />

  <!-- Top Title -->
  <text x="${width / 2}" y="115" class="title">A special</text>
  <text x="${width / 2}" y="165" class="title">Gift</text>

  <!-- Symmetric Center Divider with Heart -->
  <line x1="175" y1="205" x2="275" y2="205" class="heart-line" />
  <text x="${width / 2}" y="212" class="heart-symbol">♥</text>
  <line x1="325" y1="205" x2="425" y2="205" class="heart-line" />

  <!-- Perfectly Centered QR Code -->
  <g transform="translate(${qrX}, ${qrY})">
    <rect width="${qrSize}" height="${qrSize}" fill="#ffffff" />
    <svg width="${qrSize}" height="${qrSize}" viewBox="${qrViewBox}" preserveAspectRatio="xMidYMid meet">
      ${qrInner}
    </svg>
  </g>

  <!-- Point The Camera Instruction -->
  <text x="${width / 2}" y="615" class="scan-text">Point your camera to scan</text>

  <!-- Footer Captions -->
  <text x="${width / 2}" y="680" class="footer-title">For My Babe Neelu</text>
  <text x="${width / 2}" y="722" class="footer-sub">Couple Rewind 💕</text>
  <text x="${width / 2}" y="765" class="url-text">formyneelu.vercel.app</text>
</svg>`;

  const cardSvgPath = path.join(__dirname, 'qr_gift_card.svg');
  const cardSvgPublic = path.join(__dirname, 'public', 'qr_gift_card.svg');
  const cardSvgBrain = path.join(brainDir, 'qr_gift_card.svg');

  fs.writeFileSync(cardSvgPath, giftCardSvg, 'utf8');
  fs.copyFileSync(cardSvgPath, cardSvgPublic);
  try { fs.copyFileSync(cardSvgPath, cardSvgBrain); } catch (e) {}
  console.log('✅ Generated printable romantic qr_gift_card.svg');
}

generateAll().catch(console.error);
