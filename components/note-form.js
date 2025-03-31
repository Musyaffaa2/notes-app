class NoteForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <form id="noteForm">
                <input type="text" id="title" placeholder="Judul Catatan" required>
                <textarea id="body" placeholder="Isi Catatan" required></textarea>
                <button type="submit">Tambah Catatan</button>
            </form>
        `;
    }
}
customElements.define('note-form', NoteForm);
