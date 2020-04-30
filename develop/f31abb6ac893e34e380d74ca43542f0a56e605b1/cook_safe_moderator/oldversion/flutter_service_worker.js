'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ed1e60f948fd143db2e6e93c94e240d5",
"assets/FontManifest.json": "18eda8e36dfa64f14878d07846d6e17f",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/images/defaultAvatar.jpg": "d5f51047d8bd6327ec4a74361a7aae7f",
"assets/images/favicon.ico": "6fa40b18241f63bc08805ac763ac91b9",
"assets/images/logo.png": "7fed134c353618f5f41ee03a75261e40",
"assets/LICENSE": "fab281a7a3fc7217b3a6b095da52c41e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "5a37ae808cf9f652198acde612b5328d",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "2bca5ec802e40d3f4b60343e346cedde",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "2aa350bd2aeab88b601a593f793734c0",
"favicon.png": "100b7d193a942c4c53888bdb2de3d26f",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "4e8378f8caefa888084d30c5368604ec",
"/": "4e8378f8caefa888084d30c5368604ec",
"main.dart.js": "e17c57dbc6c7ceb86e2ff09f2cb6055c",
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
