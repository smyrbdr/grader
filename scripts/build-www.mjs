// index.html'den Android uygulamasına girecek "www" klasörünü üretir.
// Web sürümündeki CDN bağlantıları, uygulamanın içine gömülen yerel kopyalarla değiştirilir;
// böylece uygulama açılırken internetten kütüphane indirmez.
import {readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const www = join(root, 'www');
const nm = join(root, 'node_modules');

rmSync(www, {recursive: true, force: true});
mkdirSync(join(www, 'vendor'), {recursive: true});

const copies = [
  ['katex/dist/katex.min.css', 'vendor/katex/katex.min.css'],
  ['katex/dist/katex.min.js', 'vendor/katex/katex.min.js'],
  ['katex/dist/contrib/auto-render.min.js', 'vendor/katex/auto-render.min.js'],
  ['katex/dist/fonts', 'vendor/katex/fonts'],
  ['pdfjs-dist/build/pdf.min.js', 'vendor/pdf.min.js'],
  ['pdfjs-dist/build/pdf.worker.min.js', 'vendor/pdf.worker.min.js'],
  ['xlsx/dist/xlsx.full.min.js', 'vendor/xlsx.full.min.js'],
];
for (const [from, to] of copies) {
  const src = join(nm, from);
  if (!existsSync(src)) throw new Error(`Bulunamadı: ${from} (önce "npm install" çalıştırın)`);
  mkdirSync(dirname(join(www, to)), {recursive: true});
  cpSync(src, join(www, to), {recursive: true});
}

let html = readFileSync(join(root, 'index.html'), 'utf8');
const swaps = [
  ['https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css', 'vendor/katex/katex.min.css'],
  ['https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js', 'vendor/katex/katex.min.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js', 'vendor/katex/auto-render.min.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js', 'vendor/pdf.worker.min.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', 'vendor/pdf.min.js'],
  ['https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js', 'vendor/xlsx.full.min.js'],
];
for (const [cdn, local] of swaps) {
  if (!html.includes(cdn)) throw new Error(`index.html içinde beklenen bağlantı yok: ${cdn}`);
  html = html.split(cdn).join(local);
}
writeFileSync(join(www, 'index.html'), html);
if (existsSync(join(root, 'privacy.html'))) cpSync(join(root, 'privacy.html'), join(www, 'privacy.html'));
console.log('www klasörü hazır.');
