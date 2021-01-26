const staticPV = "calculator-pv-v1";
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/src/logo192.png",
    "/src/logo512.png"
]
  
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticPV).then(cache => {
        cache.addAll(assets)
      })
    )
})
  
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})