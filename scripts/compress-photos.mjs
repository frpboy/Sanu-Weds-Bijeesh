/**
 * Compresses save-the-date photos from /photos → /public/photos
 * Skips duplicate files (those with " (1)" or " (2)" in the name)
 * Output: photo1.jpg … photoN.jpg at max 1920px wide, 85% quality
 */
import sharp from "sharp";
import { readdirSync, mkdirSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "photos");
const DEST = join(__dirname, "..", "public", "photos");

mkdirSync(DEST, { recursive: true });

// Only take originals — skip files with " (1)" or " (2)" in the name
const files = readdirSync(SRC)
  .filter((f) => {
    const ext = extname(f).toLowerCase();
    return (
      (ext === ".jpeg" || ext === ".jpg") &&
      !f.includes("(1)") &&
      !f.includes("(2)")
    );
  })
  .sort();

console.log(`Found ${files.length} original photos to compress.\n`);

for (let i = 0; i < files.length; i++) {
  const src = join(SRC, files[i]);
  const dest = join(DEST, `photo${i + 1}.jpg`);

  const info = await sharp(src)
    .rotate()                      // auto-orient using EXIF, keep original dimensions
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(dest);

  const sizeMB = (info.size / 1024 / 1024).toFixed(2);
  console.log(`  photo${i + 1}.jpg  ${info.width}×${info.height}  ${sizeMB} MB  ← ${files[i]}`);
}

console.log(`\nDone. ${files.length} photos saved to public/photos/`);
