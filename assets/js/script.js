import axios from 'axios';
import _ from 'lodash';
import '../css/style.css';
import logo from '../img/logo.png';

document.addEventListener('DOMContentLoaded', () => {
  const logoImg = document.getElementById('logo');
  if (logoImg) {
    logoImg.src = logo;
  }
});

const searchBtn = document.getElementById('searchBtn');
const categoryInput = document.getElementById('categoryInput');
const results = document.getElementById('results');

const overlay = document.getElementById('overlay');
const closeOverlay = document.getElementById('closeOverlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayDescription = document.getElementById('overlayDescription');

const API_BASE_URL = process.env.API_BASE_URL || 'https://openlibrary.org';

async function searchBooks() {
  const category = categoryInput.value.trim();
  if (!category) {
    alert('Inserisci una categoria!');
    return;
  }

  results.innerHTML = '<p>🔍 Ricerca in corso...</p>';

  const url = `${API_BASE_URL}/subjects/${category}.json`;

  try {
    const response = await axios.get(url);
    const books = _.get(response, 'data.works', []);

    results.innerHTML = '';

    if (books.length === 0) {
      results.innerHTML = '<p>Nessun libro trovato 📚</p>';
      return;
    }

    books.forEach(book => {
      const div = document.createElement('div');
      div.classList.add('book-item');

      const authors = book.authors
        ? book.authors.map(a => a.name).join(', ')
        : 'Autore sconosciuto';

      div.innerHTML = `
        <strong>${book.title}</strong>
        <span>Autori: ${authors}</span>
      `;

      div.addEventListener('click', () => {
        openBookOverlay(book.key);
      });

      results.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    results.innerHTML = '<p>Errore durante la ricerca ❌</p>';
  }
}

async function openBookOverlay(bookKey) {
  const url = `${API_BASE_URL}${bookKey}.json`;

  try {
    const response = await axios.get(url);
    const description = _.get(
      response.data,
      'description',
      'Nessuna descrizione disponibile'
    );

    overlayTitle.textContent = response.data.title;
    overlayDescription.textContent =
      typeof description === 'string'
        ? description
        : description.value;

    overlay.classList.remove('hidden');

  } catch (error) {
    console.error(error);
  }
}

searchBtn.addEventListener('click', searchBooks);

categoryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchBooks();
  }
});

closeOverlay.addEventListener('click', () => {
  overlay.classList.add('hidden');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.add('hidden');
  }
});
