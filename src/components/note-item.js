import { deleteNote, archiveNote } from "../script.js";

class NoteItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set note(note) {
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        .note {
          background: rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          backdrop-filter: blur(6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-family: 'Poppins', sans-serif;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .note:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
        }

        .note h3 {
          font-size: 20px;
          font-weight: 600;
          color: #2E2E2E;
          margin-bottom: 5px;
        }

        .note p {
          font-size: 14px;
          color: #555;
          margin: 5px 0 12px;
        }

        small {
          font-size: 12px;
          color: #888;
        }

        .note-footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 10px;
        }

        button {
          padding: 8px 14px;
          font-size: 13px;
          border-radius: 12px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.2s, transform 0.2s;
        }

        .delete-btn {
          background-color: #FF4B5C;
          color: white;
        }

        .archive-btn {
          background-color: #333;
          color: white;
        }

        button:hover {
          transform: scale(1.05);
        }
      </style>

      <div class="note">
        <div class="note-content">
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <small>${new Date(note.createdAt).toLocaleDateString()}</small>
        </div>
        <div class="note-footer">
          <button class="delete-btn">🗑 Hapus</button>
          ${
            note.archived
              ? ""
              : `<button class="archive-btn">📦 Arsip</button>`
          }
        </div>
      </div>
    `;

    // Event tombol hapus
    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        deleteNote(note.id);
      });

    // Event tombol arsip jika belum diarsip
    const archiveBtn = this.shadowRoot.querySelector(".archive-btn");
    if (archiveBtn) {
      archiveBtn.addEventListener("click", () => {
        archiveNote(note.id);
      });
    }
  }
}

customElements.define("note-item", NoteItem);