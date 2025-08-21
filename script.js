// Register service worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// Add note with animation
function addNote() {
  const input = document.getElementById('noteInput');
  const notesList = document.getElementById('notesList');
  if (input.value.trim() !== "") {
    const li = document.createElement('li');
    li.className = 'note-item';

    // Note text
    const span = document.createElement('span');
    span.textContent = input.value;

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'note-delete-btn';
    delBtn.onclick = function() {
      li.classList.add('removing');
      setTimeout(() => {
        li.remove();
      }, 350); // Match CSS animation duration
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    notesList.appendChild(li);
    input.value = "";
    input.focus();
  }
}

// Optional: Enter key adds note
document.getElementById('noteInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addNote();
});