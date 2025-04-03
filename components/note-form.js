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
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              background-color: #f7f7f7;
              font-family: Arial, sans-serif;
          }
          .center {
              text-align: center;
          }
          input, textarea, button {
              padding: 10px;
              font-size: 16px;
              border: 1px solid #ccc;
              border-radius: 5px;
          }
          button[type="submit"] {
              background-color: #48A6A7; 
              color: #fff; 
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s ease-in-out;
          }
          button[type="submit"]:hover {
              background-color: #006A71; 
          }
          label {
              font-weight: bold;
              margin-bottom: 5px;
          }
          h2 {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 10px;
          }
          @media (max-width: 768px) {
              form {
                  padding: 10px;
              }
              input, textarea, button {
                  padding: 5px;
              }
          }
      </style>
      <form id="note-form">
          <h2 class="center">Tambah Catatan</h2>
          <label for="title">Judul:</label>
          <input type="text" id="title" name="title" placeholder="Judul" required>
          <label for="body">Isi catatan:</label>
          <textarea id="body" name="body" placeholder="Isi catatan" required></textarea>
          <div class="center">
              <button type="submit" aria-label="Tambah Catatan" style="width: 100%; margin-top: 10px;">Tambah Catatan</button>
          </div>
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
          pinned: false,
        };
        addNote(newNote);
        this.shadowRoot.querySelector("#note-form").reset();
      });

    this.shadowRoot
      .querySelector("#title")
      .addEventListener("input", (event) => {
        const title = event.target.value;
        if (title.length < 5) {
          event.target.setCustomValidity("Judul harus minimal 5 karakter");
        } else {
          event.target.setCustomValidity("");
        }
      });
  }

  static get observedAttributes() {
    return ["title-placeholder"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "title-placeholder") {
      this.shadowRoot.querySelector("#title").placeholder = newValue;
    }
  }
}

customElements.define("note-form", NoteForm);