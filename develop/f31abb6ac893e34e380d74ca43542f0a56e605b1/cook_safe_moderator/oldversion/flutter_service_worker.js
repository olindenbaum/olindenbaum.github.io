'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "9deffc3895ad49ed383b0f3fb108956f",
"assets/FontManifest.json": "01700ba55b08a6141f33e168c4a6c22f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/images/defaultAvatar.jpg": "d5f51047d8bd6327ec4a74361a7aae7f",
"assets/images/favicon.ico": "6fa40b18241f63bc08805ac763ac91b9",
"assets/LICENSE": "6fc1ab00c9e41d4cb9de92d712f6ec81",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "100b7d193a942c4c53888bdb2de3d26f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "4e8378f8caefa888084d30c5368604ec",
"/": "4e8378f8caefa888084d30c5368604ec",
"main.dart.js": "c5a1d98b7585e0eebfdc2291dc49652a",
"manifest.json": "bb75104b3c6d5217a82fd44ac2dd5b2c"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
