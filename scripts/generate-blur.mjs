import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";

const COUNT = 10;
const blurs = {};

for (let i = 1; i <= COUNT; i++) {
  const src = `public/photos/photo${i}.jpg`;
  try {
    const buf = await sharp(src)
      .resize(12, 18)        // tiny — just enough for a smooth blur
      .jpeg({ quality: 25 })
      .toBuffer();
    blurs[`photo${i}`] = `data:image/jpeg;base64,${buf.toString("base64")}`;
    console.log(`  photo${i}.jpg → ${buf.length} bytes`);
  } catch (e) {
    console.warn(`  skipped photo${i}.jpg:`, e.message);
  }
}

mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/photo-blurs.json", JSON.stringify(blurs, null, 2));
console.log(`\nWritten src/data/photo-blurs.json (${COUNT} entries)`);
