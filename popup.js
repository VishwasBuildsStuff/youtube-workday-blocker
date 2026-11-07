const btn = document.getElementById("toggleBtn");
const statusText = document.getElementById("status");

async function updateUI() {
  const { manualBlock, blockCount = 0 } = await chrome.storage.local.get(["manualBlock", "blockCount"]);
  const isBlocked = Boolean(manualBlock);

  statusText.textContent = isBlocked ? "Manual Block: ON" : "Manual Block: OFF (10-5 Schedule Active)";
  btn.textContent = isBlocked ? "Turn OFF Manual Block" : "Block YouTube Now";
  btn.className = isBlocked ? "on" : "off";
  const minutesSaved = blockCount * 15;
  statsText.textContent = `Blocked ${blockCount} times (~${minutesSaved} mins saved)`;
}

btn.addEventListener("click", async () => {
  const { manualBlock } = await chrome.storage.local.get(["manualBlock"]);
  const newState = !Boolean(manualBlock);
  await chrome.storage.local.set({ manualBlock: newState });
  updateUI();
  if (newState) {
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
      if (tab.url && (tab.url.includes("youtube.com") || tab.url.includes("youtu.be") ||tab.url.includes("music.youtube.com"))) {
        chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("blocked.html") });
      }
    }
  }
});

updateUI();
