// Initialize flag to false
var flag = false;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "setFlag") {
    // Set the flag to the requested value
    flag = request.value;
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Check if the flag is set to true and the tab is complete
  if (flag && changeInfo.status === "complete") {
    // Inject the content script into the current tab
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['myscript.js']
    }, function () {
      console.log("Content script injected");
    });

    // Reset the flag to false
    flag = false;
  }
});

