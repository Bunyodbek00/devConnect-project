// Persistence layer: real, persistent storage (localStorage) wrapped in an
// async API with a simulated network delay, so the app can genuinely be in
// a loading state — not just a fake spinner timeout in the UI layer.
//
// A forced-failure flag lets the reviewer panel (app.js) trigger the error
// state on demand, and starting with an empty key naturally produces the
// empty state for any new user — no code change needed to see any of the
// three states.

const STORAGE_KEY = "reading-list:books";
const DELAY_MS = 700;

let forcedFailure = false;

function setForcedFailure(value) {
  forcedFailure = value;
}

function readRaw() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeRaw(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const Store = {
  async getBooks() {
    await delay(DELAY_MS);
    if (forcedFailure) {
      throw new Error("Could not reach the reading list storage.");
    }
    return readRaw();
  },

  async addBook({ title, author }) {
    await delay(DELAY_MS);
    if (forcedFailure) {
      throw new Error("Could not save this book. The list was not updated.");
    }
    const books = readRaw();
    const newBook = {
      id: crypto.randomUUID(),
      title,
      author,
      addedAt: Date.now()
    };
    books.unshift(newBook);
    writeRaw(books);
    return newBook;
  },

  async removeBook(id) {
    await delay(DELAY_MS);
    if (forcedFailure) {
      throw new Error("Could not remove this book. It's still on your list.");
    }
    const books = readRaw().filter(b => b.id !== id);
    writeRaw(books);
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
