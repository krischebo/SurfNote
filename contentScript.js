document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== '') {
    console.log('Selected text:', selectedText);
    chrome.runtime.sendMessage({ type: 'saveNote', text: selectedText }, function(response) {
      console.log('Response from background:', response);
    });
  }
});
