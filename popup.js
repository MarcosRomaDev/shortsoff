const toggle = document.getElementById("toggle");

const broadcastEnabled = (enabled) => {
  chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { type: "enabled", value: enabled });
    }
  });
};

chrome.storage.local.get({ enabled: true }, (result) => {
  toggle.checked = result.enabled;
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });
  broadcastEnabled(enabled);
});
