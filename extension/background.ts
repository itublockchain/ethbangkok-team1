chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && changeInfo.status === "complete") {
      const domain = new URL(tab.url).hostname;
  
      // İçerik betiğine domain bilgisini gönder
      chrome.tabs.sendMessage(tabId, { domain });
    }
  });