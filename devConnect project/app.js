const listRegion = document.getElementById("list-region");
const addForm = document.getElementById("add-form");

function renderLoading() {
  listRegion.innerHTML = `
    <div class="state state-loading">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state-title">Loading your list…</p>
      <p class="state-body">Fetching your books from storage.</p>
    </div>
  `;
}

function renderError(message) {
  listRegion.innerHTML = `
    <div class="state state-error" role="alert">
      <p class="state-icon" aria-hidden="true">⚠</p>
      <p class="state-title">Something went wrong</p>
      <p class="state-body">${message}</p>
      <button type="button" class="btn-primary" id="retry-btn">Try again</button>
    </div>
  `;
  document.getElementById("retry-btn").addEventListener("click", loadAndRender);
}

function renderEmpty() {
  listRegion.innerHTML = `
    <div class="state state-empty">
      <p class="state-icon" aria-hidden="true">📖</p>
      <p class="state-title">Your reading list is empty</p>
      <p class="state-body">
        Keep track of books you mean to read. Add one below and it'll show up here —
        nothing leaves this list until you remove it yourself.
      </p>
      <button type="button" class="btn-primary" id="empty-focus-btn">Add your first book</button>
    </div>
  `;
  document.getElementById("empty-focus-btn").addEventListener("click", () => {
    document.getElementById("book-title").focus();
  });
}

function renderList(books) {
  const items = books.map(book => `
    <li class="book-card">
      <div class="book-info">
        <p class="book-title">${escapeHtml(book.title)}</p>
        <p class="book-author">${escapeHtml(book.author)}</p>
      </div>
      <button type="button" class="btn-remove" data-id="${book.id}" aria-label="Remove ${escapeHtml(book.title)} from list">
        Remove
      </button>
    </li>
  `).join("");

  listRegion.innerHTML = `<ul class="book-list">${items}</ul>`;

  listRegion.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => handleRemove(btn.dataset.id));
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function loadAndRender() {
  renderLoading();
  try {
    const books = await Store.getBooks();
    if (books.length === 0) {
      renderEmpty();
    } else {
      renderList(books);
    }
  } catch (err) {
    renderError(err.message);
  }
}

async function handleRemove(id) {
  renderLoading();
  try {
    await Store.removeBook(id);
    await loadAndRender();
  } catch (err) {
    renderError(err.message);
  }
}

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  if (!title || !author) return;

  renderLoading();
  try {
    await Store.addBook({ title, author });
    addForm.reset();
    await loadAndRender();
  } catch (err) {
    renderError(err.message);
  }
});

// Reviewer panel — lets a reviewer force each of the three states directly,
// with no code changes and no need to clear browser storage manually.
document.getElementById("force-loading").addEventListener("click", () => {
  renderLoading();
});

document.getElementById("force-error").addEventListener("click", () => {
  setForcedFailure(true);
  loadAndRender().finally(() => setForcedFailure(false));
});

document.getElementById("force-empty").addEventListener("click", () => {
  Store.clearAll();
  loadAndRender();
});

document.getElementById("force-reset").addEventListener("click", () => {
  setForcedFailure(false);
  loadAndRender();
});

loadAndRender();
