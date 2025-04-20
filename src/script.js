let notesData = [];
let isShowingArchived = false;

function renderNotes() {
  const container = document.getElementById('notes-container');
  container.innerHTML = '';

  // Urutkan berdasarkan pinned dan tanggal
  notesData
    .sort(
      (a, b) =>
        b.pinned - a.pinned || new Date(b.createdAt) - new Date(a.createdAt)
    )
    .forEach((note) => {
      const noteElement = document.createElement('note-item');
      noteElement.note = note;
      container.appendChild(noteElement);
    });
}

async function getNotes() {
  showLoading();
  try {
    const endpoint = isShowingArchived
      ? 'https://notes-api.dicoding.dev/v2/notes/archived'
      : 'https://notes-api.dicoding.dev/v2/notes';

    const response = await fetch(endpoint);
    const result = await response.json();
    if (result.status === 'success') {
      notesData = result.data;
      renderNotes();
    } else {
      alert(`Gagal memuat catatan: ${result.message}`);
    }
  } catch (error) {
    alert('Terjadi kesalahan saat mengambil data.');
    console.error(error);
  } finally {
    hideLoading();
  }
}

async function addNote(note) {
  showLoading();
  try {
    const response = await fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: note.title, body: note.body }),
    });

    const result = await response.json();
    if (result.status === 'success') {
      alert('Catatan berhasil ditambahkan!');
      await getNotes();
    } else {
      alert(`Gagal menambahkan catatan: ${result.message}`);
    }
  } catch (error) {
    alert('Error saat menambahkan catatan.');
  } finally {
    hideLoading();
  }
}

async function deleteNote(id) {
  showLoading();
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}`,
      {
        method: 'DELETE',
      }
    );
    const result = await response.json();
    if (result.status === 'success') {
      alert('Catatan berhasil dihapus.');
      await getNotes();
    } else {
      alert(`Gagal menghapus catatan: ${result.message}`);
    }
  } catch (error) {
    alert('Error saat menghapus catatan.');
  } finally {
    hideLoading();
  }
}

async function archiveNote(id) {
  showLoading();
  try {
    const response = await fetch(
      `https://notes-api.dicoding.dev/v2/notes/${id}/archive`,
      {
        method: 'POST',
      }
    );
    const result = await response.json();
    if (result.status === 'success') {
      alert('Catatan berhasil diarsipkan.');
      await getNotes();
    } else {
      alert(`Gagal mengarsipkan catatan: ${result.message}`);
    }
  } catch (error) {
    alert('Terjadi kesalahan saat mengarsipkan catatan.');
  } finally {
    hideLoading();
  }
}

// Animasi sederhana saat loading
function showLoading() {
  const loading = document.createElement('p');
  loading.textContent = 'Loading...';
  loading.id = 'loading-indicator';
  loading.style.textAlign = 'center';
  loading.style.animation = 'fadeIn 0.5s ease-in-out';
  document.getElementById('notes-container').appendChild(loading);
}

function hideLoading() {
  const loading = document.getElementById('loading-indicator');
  if (loading) loading.remove();
}

function toggleArchiveView() {
  isShowingArchived = !isShowingArchived;
  getNotes();
  const button = document.getElementById('toggle-archive');
  button.textContent = isShowingArchived
    ? 'Lihat Catatan Aktif'
    : 'Lihat Catatan Arsip';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-archive';
  toggleButton.textContent = 'Lihat Catatan Arsip';
  toggleButton.style.margin = '10px auto';
  toggleButton.style.display = 'block';
  toggleButton.style.padding = '10px 20px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.backgroundColor = '#006A71';
  toggleButton.style.color = '#fff';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';

  toggleButton.addEventListener('click', toggleArchiveView);
  document.querySelector('main').prepend(toggleButton);

  getNotes();
});

export { addNote, deleteNote, archiveNote };
