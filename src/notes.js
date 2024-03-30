document.addEventListener('DOMContentLoaded', function() {
  const notesList = document.getElementById('notesList');

  // Fetch and display notes from local storage
  chrome.storage.local.get('notes', function(data) {
    const notes = data.notes || [];
    notesList.innerHTML = '';

    notes.forEach(function(note, index) {
      // Create a container for the note item
      const noteItemContainer = document.createElement('div');
      noteItemContainer.classList.add('note-item-container'); // Add a CSS class for styling if needed

      // Display the note text
      const noteText = document.createElement('div');
      // Create an anchor tag for the website link
      noteText.innerHTML = `${note.text}<br><br>Saved on ${note.timestamp}<br><a href="${note.url}" class="website-link" target="_blank" onclick="scrollToHighlight(note)">Access source website here</a>`;
      noteItemContainer.appendChild(noteText);

      // Create a delete button
      const deleteButton = document.createElement('img');
      deleteButton.src = 'assets/delete-icon.png'; // Replace with your PNG image path
      deleteButton.alt = 'Delete';
      deleteButton.classList.add('custom-button'); // Add custom class to the button
      deleteButton.style.backgroundColor = '#E07A5F';
      deleteButton.addEventListener('click', function() {
        deleteNote(index); // Call deleteNote function when the button is clicked
      });

      // Create a copy button
      const copyButton = document.createElement('img');
      copyButton.src = 'assets/copy-icon.png'; // Replace with your PNG image path
      copyButton.alt = 'Copy';
      copyButton.classList.add('custom-button'); // Add custom class to the button
      copyButton.style.backgroundColor = '#B7B7A4';
      copyButton.addEventListener('click', function() {
        copyToClipboard(note.text); // Call copyToClipboard function when the button is clicked
      });

      // Create a div to hold both buttons
      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('note-buttons');

      // Append the delete button to the buttons container
      buttonsContainer.appendChild(deleteButton);

      // Append the copy button to the buttons container
      buttonsContainer.appendChild(copyButton);

      // Append the buttons container to the note item container
      noteItemContainer.appendChild(buttonsContainer);

      // Append the note item container to the notes list
      notesList.appendChild(noteItemContainer);
    });
  });
});

// Function to delete a note from storage and update UI
function deleteNote(index) {
  chrome.storage.local.get('notes', function(data) {
    const notes = data.notes || [];
    notes.splice(index, 1); // Remove the note at the specified index
    chrome.storage.local.set({ notes: notes }, function() {
      // Update the UI after deleting the note
      location.reload(); // Reload the page to reflect the changes
    });
  });
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  const tempInput = document.createElement('input');
  document.body.appendChild(tempInput);
  tempInput.value = text;
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('Note copied to clipboard!');
}

function scrollToHighlight(note) {
  // Get the highlighted text or element's identifier from the note object (assuming it's available)
  const highlight = note.text;
  if (highlight) {
    // Check if the highlighted element exists on the page
    const element = document.getElementById(highlight);
    if (element) {
      // Scroll to the highlighted element
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
