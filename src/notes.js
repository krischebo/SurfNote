document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('notes', function(data) {
      const notes = data.notes || [];
      const notesList = document.getElementById('notesList');
      notesList.innerHTML = '';
      notes.forEach(function(note) {
        const noteElement = document.createElement('div');
        noteElement.textContent = note.text + ' (Saved on ' + note.timestamp + ')';
        notesList.appendChild(noteElement);
      });
    });
  });
  