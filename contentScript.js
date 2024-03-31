// Listen for keydown event to check for Alt + S key combination
document.addEventListener('keydown', function(event) {
  if (event.altKey && event.key === 's') {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText !== '') {
      chrome.runtime.sendMessage({ type: 'saveNote', text: selectedText }, function(response) {
        if (response.success) {
          alert('Note saved successfully!');
        } else {
          alert('Failed to save note. You can try again, but this website might not be compatible.');
        }
      });
    }
  }
});
