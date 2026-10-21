import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetUrl = process.argv[2] || 'http://192.168.208.192:3000';

async function generateCard() {
  console.log(`Generating QR code card for: ${targetUrl}`);

  // Generate QR Code as SVG string with error correction level H
  const qrSvg = await QRCode.toString(targetUrl, {
    type: 'svg',
    margin: 0, // No extra outer margin so it scales edge-to-edge inside its box
    color: {
      dark: '#1c1917',
      light: '#ffffff'
    },
    errorCorrectionLevel: 'H'
  });

  // Extract the actual dynamic viewBox produced by QRCode library
  const viewBoxMatch = qrSvg.match(/viewBox="([^"]+)"/);
  const qrViewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 33 33';

  // Extract inner SVG content (paths)
  const qrInner = qrSvg
    .replace(/<\?xml.*?\?>/i, '')
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '');

  // Card dimensions (standard 4x6 inch printable card: 600 x 860 px)
  const width = 600;
  const height = 860;
  const qrSize = 310;
  const qrX = Math.round((width - qrSize) / 2); // Exactly 145px -> perfectly centered!
  const qrY = 250;

  const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
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
  <text x="${width / 2}" y="615" class="scan-text">Point the camera</text>

  <!-- Footer Captions -->
  <text x="${width / 2}" y="685" class="footer-title">For My Babe Neelu</text>
  <text x="${width / 2}" y="728" class="footer-sub">Couple Rewind 💕</text>
</svg>`;

  const outSvgPath = path.join(__dirname, 'qr_gift_card.svg');
  const publicSvgPath = path.join(__dirname, 'public', 'qr_gift_card.svg');
  const brainSvgPath = path.join('C:\\Users\\DELL\\.gemini\\antigravity-ide\\brain\\2742ca23-4e32-47ed-9282-451e94839651', 'qr_gift_card.svg');

  fs.writeFileSync(outSvgPath, fullSvg, 'utf8');
  fs.writeFileSync(publicSvgPath, fullSvg, 'utf8');
  try {
    fs.writeFileSync(brainSvgPath, fullSvg, 'utf8');
  } catch (e) {}

  console.log(`✅ Saved perfectly centered QR Gift Card SVG to:\n- ${outSvgPath}\n- ${publicSvgPath}`);
}

generateCard().catch(console.error);
