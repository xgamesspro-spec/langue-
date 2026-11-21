// Construit le dossier site/ : une application web installable sur téléphone, qui marche hors ligne.
// Source : app/leri-sranantongo.html (la même page que la version claude.ai) + pwa/ (icônes, manifeste, service worker).
// Usage : node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { createHash } from "node:crypto";

const root = new URL("../", import.meta.url);
const at = p => new URL(p, root);

const src = readFileSync(at("app/leri-sranantongo.html"), "utf8");

const head = [
  "<!doctype html>",
  '<html lang="fr">',
  "<head>",
  '<meta charset="utf-8">',
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

const registerSW =
  '<script>if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) ' +
  'addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));</script>';

const html = `${head}\n${src}\n${registerSW}\n</body>\n</html>\n`;
const version = createHash("sha256").update(html).digest("hex").slice(0, 12);

mkdirSync(at("site"), { recursive: true });
writeFileSync(at("site/index.html"), html);
writeFileSync(at("site/sw.js"), readFileSync(at("pwa/sw.js"), "utf8").replace("__VERSION__", version));
for (const f of ["manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"]) {
  copyFileSync(at("pwa/" + f), at("site/" + f));
}
console.log(`site/ généré (version ${version}).`);
