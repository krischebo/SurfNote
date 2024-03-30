// Function to create a floating button element
function createFloatingButton(text) {
  const button = document.createElement('button');
  button.textContent = 'Save Note';
  button.style.position = 'absolute';
  button.style.top = '50px'; // Adjust the top position as needed
  button.style.right = '50px'; // Adjust the right position as needed
  button.addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'saveNote', text: text });
    button.style.display = 'none'; // Hide the button after clicking
  });
  document.body.appendChild(button);
  return button; // Return the button element
}

// Initialize button variable to keep track of the button
let floatingButton = null;

// Listen for mouseup event to check for selected text
document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== '') {
    // If there is selected text and no button exists, create a new button
    if (!floatingButton) {
      floatingButton = createFloatingButton(selectedText);
    }
  } else {
    // If there is no selected text and a button exists, remove the button
    if (floatingButton) {
      floatingButton.remove();
      floatingButton = null;
    }
  }
});
