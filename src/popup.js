document.addEventListener('DOMContentLoaded', function() {
  const openNotesButton = document.getElementById('openNotes');
  openNotesButton.addEventListener('click', function() {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/notes.html') });
  });
});
