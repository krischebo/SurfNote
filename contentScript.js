// Function to create a floating button element near the cursor
function createFloatingButton(text, clientX, clientY) {
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save Note';
  saveButton.style.position = 'fixed'; // Change to fixed position for floating effect
  saveButton.style.backgroundColor = '#333';
  saveButton.style.color = 'white';
  saveButton.style.border = 'none';
  saveButton.style.padding = '8px 16px';
  saveButton.style.borderRadius = '5px';

  // Set button position near the cursor
  saveButton.style.top = (clientY - saveButton.offsetHeight - 10) + 'px'; // Adjust the offset as needed
  saveButton.style.left = (clientX + 10) + 'px'; // Adjust the offset as needed

  saveButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({ type: 'saveNote', text: text });
    saveButton.style.display = 'none'; // Hide the button after clicking
  });
  document.body.appendChild(saveButton);
  return saveButton; // Return the button element
}

// Initialize button variable to keep track of the button
let floatingButton = null;

// Listen for mouseup event to check for selected text
document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText !== '') {
    // If there is selected text and no button exists, create a new button near the cursor
    if (!floatingButton) {
      floatingButton = createFloatingButton(selectedText, event.clientX, event.clientY);
    } else {
      // Update button position if it already exists
      floatingButton.style.top = (event.clientY - floatingButton.offsetHeight - 40) + 'px'; // Adjust the offset as needed
      floatingButton.style.left = (event.clientX + 10) + 'px'; // Adjust the offset as needed
    }
  } else {
    // If there is no selected text and a button exists, remove the button
    if (floatingButton) {
      floatingButton.remove();
      floatingButton = null;
    }
  }
});
