class NoteForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
            form {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 20px;
            }
            input, textarea, button {
                padding: 10px;
                font-size: 16px;
            }
        </style>
        <form id="note-form">
            <input type="text" id="title" placeholder="Judul" required>
            <textarea id="body" placeholder="Isi catatan" required></textarea>
            <button type="submit">Tambah Catatan</button>
        </form>
      `;
    }
  
    connectedCallback() {
      this.shadowRoot
        .querySelector("#note-form")
        .addEventListener("submit", (event) => {
          event.preventDefault();
          const title = this.shadowRoot.querySelector("#title").value;
          const body = this.shadowRoot.querySelector("#body").value;
          const newNote = {
            id: Date.now().toString(),
            title,
            body,
            createdAt: new Date().toISOString(),
            archived: false,
          };
          addNote(newNote);
          this.shadowRoot.querySelector("#note-form").reset();
        });
    }
  }
  
  customElements.define("note-form", NoteForm);
  