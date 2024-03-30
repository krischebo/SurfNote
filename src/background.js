chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'saveNote') {
      const note = {
        text: message.text,
        url: sender.tab.url,
        timestamp: new Date().toLocaleString()
      };
      chrome.storage.local.get('notes', function(data) {
        const notes = data.notes || [];
        notes.push(note);
        chrome.storage.local.set({ notes: notes });
      });
    }
  });
  