// Elements
const notesContainer = document.getElementById("notesContainer");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const deleteNoteBtn = document.getElementById("deleteNoteBtn");

const settingsBtn = document.getElementById("settingsBtn");
const settingsModal = document.getElementById("settingsModal");
const closeSettings = document.getElementById("closeSettings");
const themeToggle = document.getElementById("themeToggle");

// Notes State
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let activeNote = null;

// Render notes list
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, i) => {
    const li = document.createElement("li");
    li.textContent = note.title || "Untitled";
    li.className = "floating glass";
    li.onclick = () => openNote(i);
    notesContainer.appendChild(li);
  });
  saveNotes();
}

// Open a note
function openNote(i) {
  activeNote = i;
  noteTitle.value = notes[i].title;
  noteContent.value = notes[i].content;
}

// Save notes to storage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// New Note
document.getElementById("newNoteBtn").onclick = () => {
  notes.push({ title: "New Note", content: "" });
  renderNotes();
};

// Delete Note
deleteNoteBtn.onclick = () => {
  if (activeNote !== null) {
    notes.splice(activeNote, 1);
    activeNote = null;
    noteTitle.value = "";
    noteContent.value = "";
    renderNotes();
  }
};

// Update Note
[noteTitle, noteContent].forEach(el => {
  el.addEventListener("input", () => {
    if (activeNote !== null) {
      notes[activeNote].title = noteTitle.value;
      notes[activeNote].content = noteContent.value;
      renderNotes();
    }
  });
});

// Settings modal
settingsBtn.onclick = () => settingsModal.classList.remove("hidden");
closeSettings.onclick = () => settingsModal.classList.add("hidden");

// Theme toggle
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}
themeToggle.onchange = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

// Init
renderNotes();

// PWA Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
