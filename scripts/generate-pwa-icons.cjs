const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'icons');

const COLORS = {
  bg: [15, 23, 42, 255],
  fg: [226, 232, 240, 255],
  accent: [59, 130, 246, 255]
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function setPixel(png, x, y, color) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const idx = (png.width * y + x) << 2;
  png.data[idx] = color[0];
  png.data[idx + 1] = color[1];
  png.data[idx + 2] = color[2];
  png.data[idx + 3] = color[3];
}

function drawRect(png, x, y, w, h, color) {
  for (let yy = y; yy < y + h; yy += 1) {
    for (let xx = x; xx < x + w; xx += 1) {
      setPixel(png, xx, yy, color);
    }
  }
}

function fill(png, color) {
  drawRect(png, 0, 0, png.width, png.height, color);
}

function generateIcon(size, fileName, options = {}) {
  const png = new PNG({ width: size, height: size });
  fill(png, COLORS.bg);

  const safePadding = Math.round(size * (options.maskable ? 0.3 : 0.22));
  const safeSize = size - safePadding * 2;

  const letterStroke = Math.max(2, Math.round(safeSize * 0.18));
  const tWidth = Math.round(safeSize * 0.55);
  const iWidth = Math.max(letterStroke, Math.round(safeSize * 0.2));
  const gap = Math.round(safeSize * 0.12);

  const totalWidth = tWidth + gap + iWidth;
  const startX = Math.round((size - totalWidth) / 2);
  const topY = Math.round(safePadding + safeSize * 0.15);
  const height = Math.round(safeSize * 0.7);

  // T
  drawRect(png, startX, topY, tWidth, letterStroke, COLORS.fg);
  drawRect(
    png,
    startX + Math.round((tWidth - letterStroke) / 2),
    topY,
    letterStroke,
    height,
    COLORS.fg
  );

  // I (accent)
  const iX = startX + tWidth + gap;
  drawRect(png, iX, topY, iWidth, letterStroke, COLORS.accent);
  drawRect(png, iX, topY, iWidth, height, COLORS.accent);
  drawRect(png, iX, topY + height - letterStroke, iWidth, letterStroke, COLORS.accent);

  const buffer = PNG.sync.write(png);
  fs.writeFileSync(path.join(OUTPUT_DIR, fileName), buffer);
}

ensureDir(OUTPUT_DIR);

generateIcon(192, 'icon-192.png');
generateIcon(512, 'icon-512.png');
generateIcon(192, 'icon-192-maskable.png', { maskable: true });
generateIcon(512, 'icon-512-maskable.png', { maskable: true });
generateIcon(180, 'apple-touch-icon.png');

console.log('PWA icons generated in', OUTPUT_DIR);
