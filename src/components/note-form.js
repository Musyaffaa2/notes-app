// src/components/NoteForm.js
import { addNote } from '../script.js';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 24px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-family: 'Poppins', sans-serif;
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h2 {
          text-align: center;
          margin-bottom: 12px;
          font-size: 22px;
          font-weight: 600;
          color: #222;
        }

        label {
          font-weight: 600;
          color: #333;
        }

        input,
        textarea {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          font-size: 15px;
          transition: border-color 0.3s ease;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #4dc0b5;
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        button[type="submit"] {
          background-color: #48a6a7;
          color: white;
          font-weight: 600;
          font-size: 16px;
          padding: 12px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #006a71;
        }

        @media (max-width: 768px) {
          form {
            padding: 16px;
          }
        }
      </style>

      <form id="note-form">
        <h2>Tambah Catatan</h2>
        <label for="title">Judul:</label>
        <input type="text" id="title" name="title" placeholder="Judul" required />
        <label for="body">Isi catatan:</label>
        <textarea id="body" name="body" placeholder="Isi catatan" required></textarea>
        <button type="submit" aria-label="Tambah Catatan">📝 Tambah Catatan</button>
      </form>
    `;
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('#note-form')
      .addEventListener('submit', (event) => {
        event.preventDefault();
        const title = this.shadowRoot.querySelector('#title').value;
        const body = this.shadowRoot.querySelector('#body').value;
        const newNote = {
          id: Date.now().toString(),
          title,
          body,
          createdAt: new Date().toISOString(),
          archived: false,
          pinned: false,
        };
        addNote(newNote);
        this.shadowRoot.querySelector('#note-form').reset();
      });

    this.shadowRoot
      .querySelector('#title')
      .addEventListener('input', (event) => {
        const title = event.target.value;
        if (title.length < 5) {
          event.target.setCustomValidity('Judul harus minimal 5 karakter');
        } else {
          event.target.setCustomValidity('');
        }
      });
  }

  static get observedAttributes() {
    return ['title-placeholder'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title-placeholder') {
      this.shadowRoot.querySelector('#title').placeholder = newValue;
    }
  }
}

customElements.define('note-form', NoteForm);
