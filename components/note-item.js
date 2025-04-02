class NoteItem extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    set note(note) {
      this.shadowRoot.innerHTML = `
        <style>
            .note {
                background: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0px 0px 5px rgb(0, 0, 0);
                position: relative;
            }
            .delete-btn {
                position: absolute;
                top: 5px;
                right: 5px;
                background: red;
                color: white;
                border: none;
                padding: 5px;
                cursor: pointer;
                border-radius: 3px;
            }
        </style>
        <div class="note">
            <button class="delete-btn">Hapus</button>
            <h3>${note.title}</h3>
            <p>${note.body}</p>
            <small>${new Date(note.createdAt).toLocaleDateString()}</small>
        </div>
      `;
  
      this.shadowRoot
        .querySelector(".delete-btn")
        .addEventListener("click", () => {
          this.remove();
        });
    }
  }
  
  customElements.define("note-item", NoteItem);
  