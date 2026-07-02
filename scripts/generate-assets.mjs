import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import puppeteer from 'puppeteer-core';

const require = createRequire(import.meta.url);
const fontkit = require('fontkit');

const ASSETS = path.resolve('assets');

function findChromeExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/local/bin/google-chrome',
    '/usr/bin/google-chrome',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }

  throw new Error('Chrome not found. Set CHROME_PATH to your browser executable.');
}
const INTER_MEDIUM = 'node_modules/@fontsource/inter/files/inter-latin-500-normal.woff';
const INTER_REGULAR = 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff';

const REF = {
  cap: 34,
  gap: 9,
  poleShift: -2,
  poleAbove: 40,
  pennantW: 20,
  pennantH: 11,
  bagGap: 29,
  bagScale: 0.68,
  llcGap: 12,
  llcRule: 30,
  poleStroke: 3,
};

const PALETTE = {
  light: {
    text: '#232323',
    bagBody: '#1B5E43',
    bagDark: '#0F2F22',
    bagPocket: '#154C36',
    pennant: '#C8472B',
    llcText: '#8A8A8A',
    llcRule: '#C9C9C9',
    bg: null,
  },
  reverse: {
    text: '#FFFFFF',
    bagBody: '#FFFFFF',
    bagDark: '#4A6B5C',
    bagPocket: '#C7D4CC',
    pennant: '#DD5436',
    llcText: '#B8C7BF',
    llcRule: '#4A6B5C',
    bg: '#0F2F22',
  },
};

function loadFont(filePath) {
  return fontkit.openSync(filePath);
}

function textPath(font, text, size, x, y) {
  const run = font.layout(text);
  const scale = size / font.unitsPerEm;
  const baseline = y;
  const paths = [];
  let cursor = x;

  run.glyphs.forEach((glyph, i) => {
    const pos = run.positions[i];
    const gx = cursor + (pos.xOffset || 0) * scale;
    const gy = baseline - (pos.yOffset || 0) * scale;
    const transform = `translate(${gx.toFixed(2)}, ${gy.toFixed(2)}) scale(${scale.toFixed(6)}, ${(-scale).toFixed(6)})`;
    const d = glyph.path.toSVG().replace(/^<path d="/, '').replace(/"\/>$/, '');
    paths.push(`<g transform="${transform}"><path d="${d}"/></g>`);
    cursor += (pos.xAdvance || 0) * scale;
  });

  return { markup: paths.join('\n'), width: cursor - x };
}

function measureText(font, text, size) {
  return textPath(font, text, size, 0, 0).width;
}

function bagMarkPaths(palette, ox = 0, oy = 0, scale = 1) {
  const s = scale;
  const g = (x, y, w, h, rx = 0) =>
    `M${ox + (x + rx) * s},${oy + y * s} h${(w - 2 * rx) * s} a${rx * s},${rx * s} 0 0 1 ${rx * s},${rx * s} v${(h - 2 * rx) * s} a${rx * s},${rx * s} 0 0 1 ${-rx * s},${rx * s} h${-(w - 2 * rx) * s} a${rx * s},${rx * s} 0 0 1 ${-rx * s},${-rx * s} v${-(h - 2 * rx) * s} a${rx * s},${rx * s} 0 0 1 ${rx * s},${-rx * s} z`;

  const body = g(8, 18, 34, 52, 4);
  const opening = `M${ox + 10 * s},${oy + 18 * s} Q${ox + 25 * s},${oy + 10 * s} ${ox + 40 * s},${oy + 18 * s}`;
  const pocket = g(14, 38, 22, 18, 2);
  const strap = `M${ox + 8 * s},${oy + 22 * s} Q${ox + 2 * s},${oy + 38 * s} ${ox + 8 * s},${oy + 54 * s}`;
  const legL = `M${ox + 16 * s},${oy + 70 * s} L${ox + 12 * s},${oy + 78 * s} L${ox + 20 * s},${oy + 70 * s} Z`;
  const legR = `M${ox + 30 * s},${oy + 70 * s} L${ox + 26 * s},${oy + 78 * s} L${ox + 34 * s},${oy + 70 * s} Z`;

  const drone = (cx, lean) => {
    const tipX = ox + (cx + lean) * s;
    const tipY = oy + 2 * s;
    const baseX = ox + cx * s;
    const baseY = oy + 20 * s;
    const bandY = oy + 8 * s;
    return {
      shaft: `M${baseX},${baseY} L${tipX},${tipY}`,
      band: `M${ox + (cx - 1.5) * s},${bandY} h${3 * s}`,
    };
  };

  const d1 = drone(18, -4);
  const d2 = drone(25, 0);
  const d3 = drone(32, 4);

  return `
    <g id="bag-mark">
      <path d="${legL}" fill="${palette.bagDark}"/>
      <path d="${legR}" fill="${palette.bagDark}"/>
      <path d="${body}" fill="${palette.bagBody}"/>
      <path d="${pocket}" fill="${palette.bagPocket}"/>
      <path d="${opening}" fill="none" stroke="${palette.bagDark}" stroke-width="${2 * s}" stroke-linecap="round"/>
      <path d="${strap}" fill="none" stroke="${palette.bagDark}" stroke-width="${2.5 * s}" stroke-linecap="round"/>
      <path d="${d1.shaft}" stroke="${palette.text}" stroke-width="${2.2 * s}" stroke-linecap="round"/>
      <path d="${d2.shaft}" stroke="${palette.text}" stroke-width="${2.2 * s}" stroke-linecap="round"/>
      <path d="${d3.shaft}" stroke="${palette.text}" stroke-width="${2.2 * s}" stroke-linecap="round"/>
      <path d="${d1.band}" stroke="${palette.bagBody}" stroke-width="${2 * s}" stroke-linecap="round"/>
      <path d="${d2.band}" stroke="${palette.bagBody}" stroke-width="${2 * s}" stroke-linecap="round"/>
      <path d="${d3.band}" stroke="${palette.bagBody}" stroke-width="${2 * s}" stroke-linecap="round"/>
    </g>`;
}

function flagstick(palette, x, baseline, capTop) {
  const poleTop = baseline - REF.poleAbove;
  const pennantY = capTop - REF.pennantH - 4;
  const pennantX = x + REF.poleStroke / 2 + 2;
  return `
    <line x1="${x}" y1="${baseline}" x2="${x}" y2="${poleTop}" stroke="${palette.text}" stroke-width="${REF.poleStroke}" stroke-linecap="round"/>
    <polygon points="${pennantX},${pennantY} ${pennantX + REF.pennantW},${pennantY + REF.pennantH / 2} ${pennantX},${pennantY + REF.pennantH}" fill="${palette.pennant}"/>
  `;
}

function buildLockup(palette, { includeBg = false, markOnly = false, markWhite = false } = {}) {
  const fontMed = loadFont(INTER_MEDIUM);
  const fontReg = loadFont(INTER_REGULAR);
  const size = REF.cap;
  const baseline = 80;
  const capTop = baseline - size * 0.75;

  const markPalette = markWhite
    ? { ...palette, bagBody: '#FFFFFF', text: '#FFFFFF' }
    : palette;

  const bagW = 50 * REF.bagScale;
  const bagH = 80 * REF.bagScale;
  const bagX = 0;
  const bagY = baseline - bagH + 8;

  let textX = markOnly ? 0 : bagX + bagW + REF.bagGap;
  const bagSvg = markOnly
    ? bagMarkPaths(markPalette, 0, 0, 1.2)
    : bagMarkPaths(markPalette, bagX, bagY, REF.bagScale);

  let wordSvg = '';
  let llcSvg = '';
  let totalW = markOnly ? 60 : bagW + REF.bagGap;
  let totalH = markOnly ? 90 : baseline + 40;

  if (!markOnly) {
    const bag = textPath(fontMed, 'BAG', size, textX, baseline);
    textX += bag.width + REF.gap;

    const poleX = textX + REF.poleShift;
    const pole = flagstick(palette, poleX, baseline, capTop);
    textX += REF.poleStroke + REF.gap;

    const pper = textPath(fontMed, 'PPER', size, textX, baseline);
    textX += pper.width;

    const wordW = textX - (bagW + REF.bagGap);
    const llcSize = size * 0.42;
    const llcText = 'LLC';
    const llcWid = measureText(fontReg, llcText, llcSize);
    const llcY = baseline + 22;
    const llcX = (bagW + REF.bagGap) + (wordW - llcWid) / 2;
    const ruleY = llcY - llcSize * 0.35;
    const ruleLeftX = llcX - REF.llcGap - REF.llcRule;
    const ruleRightX = llcX + llcWid + REF.llcGap;
    const llc = textPath(fontReg, llcText, llcSize, llcX, llcY);

    wordSvg = `
      <g fill="${palette.text}">${bag.markup}</g>
      ${pole}
      <g fill="${palette.text}">${pper.markup}</g>
    `;
    llcSvg = `
      <line x1="${ruleLeftX}" y1="${ruleY}" x2="${ruleLeftX + REF.llcRule}" y2="${ruleY}" stroke="${palette.llcRule}" stroke-width="1"/>
      <g fill="${palette.llcText}">${llc.markup}</g>
      <line x1="${ruleRightX}" y1="${ruleY}" x2="${ruleRightX + REF.llcRule}" y2="${ruleY}" stroke="${palette.llcRule}" stroke-width="1"/>
    `;

    totalW = Math.max(textX + 10, ruleRightX + REF.llcRule + 10);
    totalH = llcY + 20;
  } else {
    totalW = 60;
    totalH = 90;
  }

  const pad = 20;
  const w = totalW + pad * 2;
  const h = totalH + pad * 2 + (includeBg ? 0 : 0);
  const bgRect = includeBg
    ? `<rect width="${w}" height="${h}" fill="${palette.bg}"/>`
    : '';

  const content = `
    <g transform="translate(${pad}, ${pad})">
      ${bagSvg}
      ${wordSvg}
      ${llcSvg}
    </g>
  `;

  return { svg: `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n${bgRect}\n${content}\n</svg>`, w, h };
}

async function exportPng(browser, svgPath, pngPath, targetWidth) {
  const svg = fs.readFileSync(svgPath, 'utf8');
  const viewBoxMatch = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const vw = parseFloat(viewBoxMatch[1]);
  const vh = parseFloat(viewBoxMatch[2]);
  const scale = targetWidth / vw;
  const height = Math.round(vh * scale);

  const page = await browser.newPage();
  await page.setViewport({ width: targetWidth, height, deviceScaleFactor: 1 });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent">${svg}</body></html>`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: pngPath, omitBackground: true, clip: { x: 0, y: 0, width: targetWidth, height } });
  await page.close();
}

async function main() {
  fs.mkdirSync(ASSETS, { recursive: true });

  const variants = [
    { name: 'bagpiper-lockup-light', palette: PALETTE.light, opts: {} },
    { name: 'bagpiper-lockup-reverse', palette: PALETTE.reverse, opts: { includeBg: true } },
    { name: 'bagpiper-mark', palette: PALETTE.light, opts: { markOnly: true } },
    { name: 'bagpiper-mark-white', palette: PALETTE.reverse, opts: { markOnly: true, markWhite: true, includeBg: true } },
  ];

  for (const v of variants) {
    const { svg } = buildLockup(v.palette, v.opts);
    const svgPath = path.join(ASSETS, `${v.name}.svg`);
    fs.writeFileSync(svgPath, svg);
    console.log(`Wrote ${svgPath}`);
  }

  const browser = await puppeteer.launch({
    executablePath: findChromeExecutable(),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const pngExports = [
    ['bagpiper-lockup-light.svg', 'bagpiper-lockup-light.png', 2400],
    ['bagpiper-lockup-reverse.svg', 'bagpiper-lockup-reverse.png', 2400],
    ['bagpiper-mark.svg', 'bagpiper-mark.png', 1200],
    ['bagpiper-mark-white.svg', 'bagpiper-mark-white.png', 1200],
  ];

  for (const [svgName, pngName, width] of pngExports) {
    const svgPath = path.join(ASSETS, svgName);
    const pngPath = path.join(ASSETS, pngName);
    await exportPng(browser, svgPath, pngPath, width);
    console.log(`Wrote ${pngPath}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
