class NoteItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title');
        const body = this.getAttribute('body');
        this.innerHTML = `
            <div class="note-item">
                <h3>${title}</h3>
                <p>${body}</p>
            </div>
        `;
    }
}
customElements.define('note-item', NoteItem);
