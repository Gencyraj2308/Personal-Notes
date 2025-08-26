// ----- DATA HANDLING -----
let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let currentId = null;

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes(filter = "") {
  const list = document.getElementById("noteList");
  list.innerHTML = "";
  notes
    .filter(n => n.title.toLowerCase().includes(filter.toLowerCase()) || n.body.toLowerCase().includes(filter.toLowerCase()))
    .forEach(note => {
      const div = document.createElement("div");
      div.className = "noteItem";
      div.textContent = note.title || "(Untitled)";
      div.onclick = () => openNote(note.id);
      list.appendChild(div);
    });
}

function openNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;
  currentId = id;
  document.getElementById("title").value = note.title;
  document.getElementById("body").innerHTML = note.body;
  renderTags(note.tags || []);
}

function newNote() {
  const id = Date.now();
  const note = { id, title: "", body: "", tags: [] };
  notes.unshift(note);
  saveNotes();
  renderNotes();
  openNote(id);
}

function deleteNote() {
  if (!currentId) return;
  notes = notes.filter(n => n.id !== currentId);
  currentId = null;
  saveNotes();
  renderNotes();
  document.getElementById("title").value = "";
  document.getElementById("body").innerHTML = "";
  renderTags([]);
}

// ----- TAGGING -----
function renderTags(tags) {
  const wrap = document.getElementById("tags");
  wrap.innerHTML = "";
  tags.forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    wrap.appendChild(span);
  });
}

// ----- AI ASSIST (simple client helpers) -----
function aiAssist() {
  if (!currentId) return;
  const note = notes.find(n => n.id === currentId);
  if (!note) return;

  // Title suggestion
  if (!note.title && note.body) {
    note.title = note.body.split(" ").slice(0, 4).join(" ") + "...";
  }

  // Summary (first 20 words)
  const summary = note.body.split(" ").slice(0, 20).join(" ") + "...";

  // Tags (words starting with #)
  note.tags = Array.from(new Set(note.body.match(/#\w+/g))) || [];

  saveNotes();
  openNote(note.id);

  const hints = document.getElementById("smartHints");
  hints.textContent = "✨ Suggested: " + summary;
}

// ----- EVENT BINDINGS -----
document.getElementById("btnNew").onclick = newNote;
document.getElementById("btnDelete").onclick = deleteNote;
document.getElementById("btnAI").onclick = aiAssist;
document.getElementById("searchInput").oninput = e => renderNotes(e.target.value);

document.getElementById("title").oninput = e => {
  if (!currentId) return;
  const note = notes.find(n => n.id === currentId);
  note.title = e.target.value;
  saveNotes();
  renderNotes(document.getElementById("searchInput").value);
};

document.getElementById("body").oninput = e => {
  if (!currentId) return;
  const note = notes.find(n => n.id === currentId);
  note.body = e.target.innerHTML;
  saveNotes();
};

// ----- INIT -----
renderNotes();

// ----- PWA Service Worker -----
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
