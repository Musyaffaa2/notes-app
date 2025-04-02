const notesData = [
  {
    id: "notes-1",
    title: "Meeting Agenda",
    body: "Diskusi proyek minggu depan.",
    createdAt: "2025-03-30T15:30:00.000Z",
    archived: false,
    color: "#ffeb3b",
    pinned: true,
  },
  {
    id: "notes-2",
    title: "Shopping List",
    body: "Susu, telur, roti, sayur.",
    createdAt: "2025-03-29T08:45:23.120Z",
    archived: false,
    color: "#ffccbc",
    pinned: false,
  },
  {
    id: "notes-3",
    title: "Daily Reflections",
    body: "Tulis tiga hal positif hari ini.",
    createdAt: "2025-03-28T20:40:30.150Z",
    archived: false,
    color: "#c8e6c9",
    pinned: false,
  },
];

console.log(notesData);

function renderNotes() {
  const container = document.getElementById("notes-container");
  container.innerHTML = "";

  // Urutkan berdasarkan tanggal terbaru & pinned
  notesData.sort(
    (a, b) =>
      b.pinned - a.pinned || new Date(b.createdAt) - new Date(a.createdAt)
  );

  notesData.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.note = note;
    container.appendChild(noteElement);
  });
}

function addNote(note) {
  notesData.push(note);
  localStorage.setItem("notesData", JSON.stringify(notesData)); // Simpan ke localStorage
  renderNotes();
}

// Saat load halaman, ambil dari localStorage
document.addEventListener("DOMContentLoaded", () => {
  const storedNotes = localStorage.getItem("notesData");
  if (storedNotes) {
    notesData.length = 0;
    notesData.push(...JSON.parse(storedNotes));
  }
  renderNotes();
});
