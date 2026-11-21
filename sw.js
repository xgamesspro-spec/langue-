// Service worker de Leri Sranantongo : garde l'application sur le téléphone pour qu'elle marche hors ligne.
// La version et la liste des polices sont remplies à chaque construction (node scripts/build.mjs).
// Il ne gère que les fichiers du site lui-même : aucune requête vers un autre site.
const CACHE = "leri-sranantongo-7f879bad6176";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"].concat(["./fonts/bricolage-grotesque-latin-40c2cb34.woff2","./fonts/bricolage-grotesque-latin-ext-fdb6b064.woff2","./fonts/fonts.css","./fonts/ibm-plex-mono-latin-9c2bd7b0.woff2","./fonts/ibm-plex-mono-latin-e5509a1e.woff2","./fonts/ibm-plex-mono-latin-ext-3e9c5ad6.woff2","./fonts/ibm-plex-mono-latin-ext-876101ac.woff2","./fonts/source-sans-3-latin-48884e38.woff2","./fonts/source-sans-3-latin-6bf953ec.woff2","./fonts/source-sans-3-latin-ext-023468e5.woff2","./fonts/source-sans-3-latin-ext-52ee6432.woff2"]);

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("leri-sranantongo-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // La page elle-même : le réseau d'abord (pour recevoir les mises à jour), la copie gardée sinon.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); } return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Icônes, manifeste et polices : la copie gardée d'abord, rafraîchie en arrière-plan.
  event.respondWith(
    caches.match(req).then(hit => {
      const network = fetch(req)
        .then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
        .catch(() => hit);
      return hit || network;
    })
  );
});
