// FrameStory Studios - Service Worker
// Provides 0ms instant image loading for repeat visitors via CacheStorage

const CACHE_NAME = "framestory-assets-v1";
const IMAGE_CACHE = "framestory-images-v1";

// Cache static app assets on install
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Clean up old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key !== IMAGE_CACHE) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// CacheFirst strategy for images
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Intercept image requests (/images/)
  if (url.pathname.startsWith("/images/") || event.request.destination === "image") {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Instant 0ms return from local memory/disk cache!
            return cachedResponse;
          }

          // If not in cache, fetch from network and cache for next time
          return fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => {
              // Return cached fallback if offline and available
              return cachedResponse;
            });
        });
      })
    );
    return;
  }
});
