// Construit index.html (page autonome) à partir de app/leri-sranantongo.html.
// Usage : node scripts/build.mjs
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("../app/leri-sranantongo.html", import.meta.url), "utf8");

const head = [
  "<!doctype html>",
  '<html lang="fr">',
  "<head>",
  '<meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
  "<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}" +
    "body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>",
  "</head>",
  "<body>",
].join("\n");

writeFileSync(new URL("../index.html", import.meta.url), `${head}\n${src}\n</body>\n</html>\n`);
console.log("index.html généré.");
