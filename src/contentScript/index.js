/* global chrome */

console.log("This is etherscan phonebook !!!");

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if ("patterns" === key) {
      performReplace(newValue);
    }
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  chrome.storage.local.get("patterns", ({ patterns }) => {
    performReplace(patterns);
  });

  sendResponse({ farewell: "goodbye" });
});

function performReplace(patternObj) {
  console.log("patterns: ", patternObj);
  Object.entries(patternObj).forEach(([k, v]) => {
    console.log("Inside object entries....");
    replaceText(k, v);
  });
}

function replaceText(from, to) {
  console.log("from: ", from, " - to: ", to);

  const links = document.getElementsByTagName("a");
  for (const link of links) {
    // if (link.href.includes("/address")) {
    console.log("a: ", link);
    console.log("<------ link: ", link.href, " - from: ", from);
    // }

    if (link.href.toLocaleLowerCase().includes(from.toLowerCase())) {
      console.log("<................................................>");
      console.log("<................... MATCHED ....................>");
      console.log("<................................................>");

      // link.innerHTML = link.innerHTML.replace(new RegExp(from, "gi"), to);
      link.innerHTML = to;
    }
  }

  let html = document.querySelector("html");
  let walker = document.createTreeWalker(html, NodeFilter.SHOW_TEXT);
  let node;

  let count = 0;

  while ((node = walker.nextNode())) {
    count++;

    console.log("node: ", node);

    if (node.nodeValue.toLowerCase().includes(from.toLowerCase())) {
      console.log("<................................................>");
      console.log("<................... MATCHED ....................>");
      console.log("<................................................>");

      console.log("NODE: ", node);

      node.nodeValue = node.nodeValue.replace(new RegExp(from, "gi"), to);
    }
  }

  // while ((node = walker.nextNode())) {
  //   count++;

  //   console.log("--------> node: ", node);
  //   console.log("node.nodeValue: ", node.nodeValue);
  //   // console.log("from: ", from);

  //   if (
  //     node.parentNode.localName.toLowerCase() === "a" &&
  //     node.parentNode.href.toLowerCase().includes(from.toLowerCase())
  //   ) {
  //     node.parentNode.innerHTML = to;
  //   } else if (node.nodeValue.toLowerCase().includes(from.toLowerCase())) {
  //     console.log("<................................................>");
  //     console.log("<................... MATCHED ....................>");
  //     console.log("<................................................>");

  //     console.log("NODE: ", node);

  //     node.nodeValue = node.nodeValue.replace(new RegExp(from, "gi"), to);
  //   }
  // }

  // console.log("COUNT: ", count);
}
