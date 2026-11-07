function isWorkHourOnorOff() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 10 && hour < 17;
}

async function shouldBlock() {
  const data = await chrome.storage.local.get(["manualBlock"]);
  return isWorkHourOnorOff() || Boolean(data.manualBlock);
}

async function checkAndBlockTab(tabId, url) {
  if (!url) return;
  if (url.includes("youtube.com") || url.includes("music.youtube.com") || url.includes("youtu.be")) {
    if (await shouldBlock()) {
      const { blockCount = 0 } = await chrome.storage.local.get(["blockCount"]);
      await chrome.storage.local.set({ blockCount: blockCount + 1 });
      chrome.tabs.update(tabId, { url: chrome.runtime.getURL("blocked.html") });
    }
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status === "loading") {
    checkAndBlockTab(tabId, changeInfo.url || tab.url);
  }
});

chrome.alarms.create("checkTime", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "checkTime" && (await shouldBlock())) {
    const tabs = await chrome.tabs.query({});

    for (const tab of tabs) {
      checkAndBlockTab(tab.id, tab.url);
    }
  }
});
