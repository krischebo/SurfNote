document.addEventListener('DOMContentLoaded', function() {
  const openNotesButton = document.getElementById('openNotes');
  openNotesButton.classList.add('custom-button'); // Add custom class to the button
  openNotesButton.addEventListener('click', function() {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/notes.html') });
  });
});
