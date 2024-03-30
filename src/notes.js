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
      noteText.textContent = note.text + ' (Saved on ' + note.timestamp + ')';
      noteItemContainer.appendChild(noteText);
      
      // Create a delete button
      const deleteButton = document.createElement('img');
      deleteButton.src = 'assets/delete-icon.png'; // Replace with your PNG image path
      deleteButton.alt = 'Delete';
      deleteButton.classList.add('custom-button'); // Add custom class to the button
      deleteButton.addEventListener('click', function() {
        deleteNote(index); // Call deleteNote function when the button is clicked
      });
      noteItemContainer.appendChild(deleteButton);

      // Create a copy button
      const copyButton = document.createElement('img');
      copyButton.src = 'assets/copy-icon.png'; // Replace with your PNG image path
      copyButton.alt = 'Copy';
      copyButton.classList.add('custom-button'); // Add custom class to the button
      copyButton.addEventListener('click', function() {
        copyToClipboard(note.text); // Call copyToClipboard function when the button is clicked
      });
      noteItemContainer.appendChild(copyButton);
      /*
      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('custom-button'); // Add custom class to the button
      deleteButton.addEventListener('click', function() {
        deleteNote(index); // Call deleteNote function when the button is clicked
      });
      noteItemContainer.appendChild(deleteButton);

      // Create a copy button
      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.classList.add('custom-button'); // Add custom class to the button
      copyButton.addEventListener('click', function() {
        copyToClipboard(note.text); // Call copyToClipboard function when the button is clicked
      });
      noteItemContainer.appendChild(copyButton);
      */
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
