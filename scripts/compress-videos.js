import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videosDir = path.resolve(__dirname, '../public/videos');
const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.mov'));

console.log(`Found ${files.length} .mov files in ${videosDir}`);
console.log(`Using ffmpeg: ${ffmpegPath}`);

let totalOriginalSize = 0;
let totalCompressedSize = 0;

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const inputPath = path.join(videosDir, file);
  const outputFileName = file.replace(/\.mov$/i, '.mp4');
  const outputPath = path.join(videosDir, outputFileName);

  const originalStat = fs.statSync(inputPath);
  totalOriginalSize += originalStat.size;
  const originalMb = (originalStat.size / (1024 * 1024)).toFixed(2);

  console.log(`\n[${i + 1}/${files.length}] Compressing: ${file} (${originalMb} MB)...`);

  try {
    // Run ffmpeg compression
    execFileSync(ffmpegPath, [
      '-y',
      '-i', inputPath,
      '-c:v', 'libx264',
      '-crf', '26',
      '-preset', 'medium',
      '-vf', "scale='min(720,iw)':-2",
      '-pix_fmt', 'yuv420p',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-movflags', '+faststart',
      outputPath
    ], { stdio: 'inherit' });

    const compressedStat = fs.statSync(outputPath);
    totalCompressedSize += compressedStat.size;
    const compressedMb = (compressedStat.size / (1024 * 1024)).toFixed(2);
    const reductionPercent = (((originalStat.size - compressedStat.size) / originalStat.size) * 100).toFixed(1);

    console.log(`✓ Generated ${outputFileName}: ${compressedMb} MB (${reductionPercent}% smaller)`);
  } catch (err) {
    console.error(`Failed to compress ${file}:`, err.message);
  }
}

const totalOrigMb = (totalOriginalSize / (1024 * 1024)).toFixed(2);
const totalCompMb = (totalCompressedSize / (1024 * 1024)).toFixed(2);
const totalReduction = (((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100).toFixed(1);

console.log('\n=======================================');
console.log(`Original total size:   ${totalOrigMb} MB`);
console.log(`Compressed total size: ${totalCompMb} MB`);
console.log(`Total reduction:       ${totalReduction}% saved!`);
console.log('=======================================');
