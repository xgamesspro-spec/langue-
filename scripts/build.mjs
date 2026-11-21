// Construit le dossier site/ : une application web installable sur téléphone, qui marche hors ligne.
// Source : app/leri-sranantongo.html (la même page que la version claude.ai) + pwa/ (icônes, manifeste, service worker, polices).
//
// Sécurité de la version publiée :
// - aucune requête vers un autre site (polices hébergées dans site/fonts, plus de Google Fonts) ;
// - politique de sécurité (CSP) stricte : seuls les scripts de cette page (identifiés par leur empreinte) peuvent s'exécuter ;
// - aucune information de provenance envoyée quand on suit un lien (referrer).
//
// Usage : node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, readdirSync, rmSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const at = p => new URL(p, root);

let src = readFileSync(at("app/leri-sranantongo.html"), "utf8");

// Polices : remplace Google Fonts par les fichiers locaux.
const before = src;
src = src.replace(/^<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\n/gm, "");
src = src.replace(/^<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>$/m, '<link rel="stylesheet" href="fonts/fonts.css">');
if (src === before || /fonts\.(googleapis|gstatic)\.com/.test(src)) throw new Error("Les liens Google Fonts n'ont pas été remplacés.");

const registerSW =
  '<script>if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) ' +
  'addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));</script>';

// Empreintes des scripts de la page, pour la CSP.
const scripts = [...(src + registerSW).matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const hashes = scripts.map(s => `'sha256-${createHash("sha256").update(s, "utf8").digest("base64")}'`);
const csp = [
  "default-src 'none'",
  `script-src ${hashes.join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "object-src 'none'",
].join("; ");

const head = [
  "<!doctype html>",
  '<html lang="fr">',
  "<head>",
  '<meta charset="utf-8">',
  `<meta http-equiv="Content-Security-Policy" content="${csp}">`,
  '<meta name="referrer" content="no-referrer">',
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
  '<meta name="theme-color" content="#1F6B45">',
  '<meta name="apple-mobile-web-app-capable" content="yes">',
  '<meta name="mobile-web-app-capable" content="yes">',
  '<meta name="apple-mobile-web-app-title" content="Leri Sranan">',
  '<link rel="manifest" href="manifest.webmanifest">',
  '<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">',
  '<link rel="apple-touch-icon" href="apple-touch-icon.png">',
  "<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}" +
    "body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>",
  "</head>",
  "<body>",
].join("\n");

const html = `${head}\n${src}\n${registerSW}\n</body>\n</html>\n`;
const version = createHash("sha256").update(html).digest("hex").slice(0, 12);

rmSync(at("site/fonts"), { recursive: true, force: true });
mkdirSync(at("site/fonts"), { recursive: true });
const fontFiles = readdirSync(at("pwa/fonts"));
for (const f of fontFiles) copyFileSync(at("pwa/fonts/" + f), at("site/fonts/" + f));
const fontUrls = fontFiles.filter(f => /\.(woff2|css)$/.test(f)).map(f => "./fonts/" + f);

writeFileSync(at("site/index.html"), html);
const sw = readFileSync(at("pwa/sw.js"), "utf8")
  .replaceAll("__VERSION__", version)
  .replaceAll("__FONTS__", JSON.stringify(fontUrls));
if (/__[A-Z]+__/.test(sw)) throw new Error("sw.js : un mot-clé n'a pas été remplacé.");
writeFileSync(at("site/sw.js"), sw);
for (const f of ["manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"]) {
  copyFileSync(at("pwa/" + f), at("site/" + f));
}
writeFileSync(at("site/.nojekyll"), ""); // GitHub Pages : servir les fichiers tels quels
console.log(`site/ généré (version ${version}, ${scripts.length} scripts protégés par la CSP).`);
