/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/ban-ts-comment
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);

const CACHE_NAME = 'sk-time4photo-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Add other static assets you want to cache here
  // For Vite, these paths might need to be adjusted based on build output
  // For example, if JS bundle is /assets/index.js, add it here
  '/manifest.json',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
