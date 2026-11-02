const fs = require('fs');
const path = require('path');

const SOURCE_DIR_0 = path.join(__dirname, '../first 17');
const SOURCE_DIR_1 = path.join(__dirname, '../ezgif-split-3');
const SOURCE_DIR_2 = path.join(__dirname, '../ezgif-split-4');
const TARGET_DIR = path.join(__dirname, '../public/frames');

function prepFrames() {
  // Ensure target directory exists and clear it
  if (fs.existsSync(TARGET_DIR)) {
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TARGET_DIR, { recursive: true });

  const getSortedFiles = (dir) => {
    return fs.readdirSync(dir)
      .filter(file => !file.startsWith('.') && file.endsWith('.webp'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
  };

  const files0 = getSortedFiles(SOURCE_DIR_0);
  const files1 = getSortedFiles(SOURCE_DIR_1);
  const files2 = getSortedFiles(SOURCE_DIR_2);

  let frameCount = 1;

  const copyFiles = (files, sourceDir) => {
    for (const file of files) {
      const srcPath = path.join(sourceDir, file);
      const destFileName = `${String(frameCount).padStart(3, '0')}.webp`;
      const destPath = path.join(TARGET_DIR, destFileName);
      fs.copyFileSync(srcPath, destPath);
      frameCount++;
    }
  };

  copyFiles(files0, SOURCE_DIR_0);
  copyFiles(files1, SOURCE_DIR_1);
  copyFiles(files2, SOURCE_DIR_2);

  console.log(`Successfully copied ${frameCount - 1} frames to ${TARGET_DIR}`);
}

prepFrames();
