import { handleSendCards } from "./cards";
import { log } from "./logger";

// // Reloads extensions on page reload
// // TODO: Disable in production
// chrome.webRequest.onBeforeRedirect.addListener(
//   () => {
//     log("onBeforeRedirect");
//     chrome.runtime.reload();
//   },
//   { urls: ["*://*/*"] }
// );

// Listens for a request from a chrome tab
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const senderType = sender.tab
    ? `content script (${sender.tab.url})`
    : "extension";
  log(`Request from ${senderType}`, request);

  if (request === "request-cards") {
    handleSendCards(sendResponse);
  }

  return true;
});

log("Loaded service worker");
