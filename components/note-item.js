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
                display: grid; 
                grid-template-columns: 1fr; 
                grid-template-rows: 10px 1fr 10px; 
                height: 200px; 
            }
            .delete-btn {
                grid-column: 1; 
                grid-row: 1; 
                position: absolute;
                top: 10px;
                right: 8px;
                background: red;
                color: white;
                border: 1px solid black;
                padding: 5px;
                cursor: pointer;
                border-radius: 8px;
                transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
            }
            .delete-btn:hover {
                background-color: #ff3737;
                transform: scale(1.1);
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); 
            }
            .delete-btn:active {
                background-color: #ff0000;
                transform: scale(0.9);
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5); 
            }
            .note-content {
                grid-column: 1; 
                grid-row: 2; 
                padding-top: 10px; 
            }
                
        </style>
        <div class="note">
            <button class="delete-btn">Delete</button>
            <div class="note-content">
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <small>${new Date(note.createdAt).toLocaleDateString()}</small>
            </div>
        </div>
      `;

    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => {
        deleteNote(note.id);
      });
  }
}

customElements.define("note-item", NoteItem);