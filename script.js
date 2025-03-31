document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.querySelector('note-form');
    const notesContainer = document.querySelector('.notes-container');

    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.querySelector('#title').value;
        const body = document.querySelector('#body').value;

        if (title && body) {
            const noteItem = document.createElement('note-item');
            noteItem.setAttribute('title', title);
            noteItem.setAttribute('body', body);
            notesContainer.appendChild(noteItem);

            document.querySelector('#noteForm').reset();
        }
    });
});
