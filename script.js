// Load notes from localStorage when the app starts
window.onload = function() {
    const notesList = document.getElementById('notesList');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = note;
        notesList.appendChild(li);
    });
};

function addNote() {
    const input = document.getElementById('noteInput');
    const noteText = input.value.trim();
    if (noteText === "") {
        alert("Please enter something!");
        return;
    }

    const notesList = document.getElementById('notesList');
    const li = document.createElement('li');
    li.textContent = noteText;
    notesList.appendChild(li);

    // Save to localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));

    input.value = ""; // Clear input box
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}