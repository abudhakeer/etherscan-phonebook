/* global chrome */

chrome.runtime.onInstalled.addListener(function(details) {
  if ("install" === details.reason) {
    chrome.storage.local.set({ patterns: {} });
  }
});

chrome.webRequest.onCompleted.addListener(
  function(details) {
    console.log("details: ", details);

    if (
      isSolscanPattern(details) ||
      isSUIPattern(details) ||
      isGeneralPattern(details)
    ) {
      console.log("<--- LOADED --->");

      waitTillLoaded();
    }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders"]
);

// function handleWebRequest(details) {
//   console.log("detail: ", details);

//   if (
//     (details.type.includes("xmlhttprequest") &&
//       details.url.includes("https://api.solscan.io/account/transaction")) ||
//     details.url.split("/").at(-2) === "address"
//   ) {
//     console.log("<--- LOADED --->");

//     waitTillLoaded();
//   }
// }

function isGeneralPattern(details) {
  return details.url.split("/").at(-2) === "address";
}

function isSolscanPattern(details) {
  return (
    details.type.includes("xmlhttprequest") &&
    (details.url.includes("https://api.solscan.io/account/transaction") ||
      details.url.includes("https://api.solscan.io/transaction"))
  );
}

function isSUIPattern(details) {
  return (
    details.type.includes("xmlhttprequest") &&
    (details.url === "https://fullnode.devnet.sui.io/" ||
      details.url === "https://fullnode.testnet.sui.io/")
  );
}

function waitTillLoaded() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log("Query tabs: ", tabs[0].url, " - status: ", tabs[0].status);

    if (tabs[0].status === "complete") {
      chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(
        response
      ) {});
    } else waitTillLoaded();
  });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.sendMessage(activeInfo.tabId, { greeting: "hello" }, function(
    response
  ) {});
});
