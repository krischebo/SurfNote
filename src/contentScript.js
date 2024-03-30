document.addEventListener('mouseup', function(event) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText !== '') {
      chrome.runtime.sendMessage({ type: 'saveNote', text: selectedText });
    }
  });
  