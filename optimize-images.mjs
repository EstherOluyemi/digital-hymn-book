import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import path from 'path';

const folders = [
  'public/images/categories',
  'public/images/home'
];

for (const folder of folders) {
  const outputFolder = path.join(folder, 'optimized');

  await mkdir(outputFolder, { recursive: true });

  const files = await readdir(folder);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const inputPath = path.join(folder, file);
    const fileName = path.parse(file).name;
    const outputPath = path.join(outputFolder, `${fileName}.webp`);

    await sharp(inputPath)
      .resize({
        width: 1600,
        withoutEnlargement: true
      })
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log(`Optimized: ${file} → ${fileName}.webp`);
  }
}

console.log('Image optimization complete!');