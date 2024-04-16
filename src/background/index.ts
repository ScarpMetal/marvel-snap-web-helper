// Reloads extensions on page reload
// TODO: Disable in production
chrome.webRequest.onBeforeRedirect.addListener(
  () => {
    console.log("onBeforeRedirect");
    chrome.runtime.reload();
  },
  { urls: ["https://*/*"] }
);
