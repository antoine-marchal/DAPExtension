// background.js - service worker for privileged fetches
// Handles requests from content scripts to fetch resources (JSON/text)
'use strict';

// Ensure service worker becomes active immediately
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || message.type !== 'fetchJson') return;
  (async () => {
    try {
      const resp = await fetch(message.url);
      if (!resp.ok) {
        sendResponse({ success: false, error: `HTTP ${resp.status} ${resp.statusText}` });
        return;
      }
      const text = await resp.text();
      sendResponse({ success: true, text });
    } catch (err) {
      sendResponse({ success: false, error: String(err) });
    }
  })();
  // Keep the message channel open for async response
  return true;
});