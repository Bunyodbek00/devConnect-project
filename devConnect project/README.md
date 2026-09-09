# Reading List

A personal reading list: add books, remove them, and pick up where you left
off. Books persist in the browser's `localStorage`, wrapped behind an async
API layer with a simulated ~700ms delay — so loading is a real state the
app passes through, not a UI trick.

## How each state is reached

A dashed-line **reviewer panel** at the bottom of the page has four buttons
that force each state directly — no code changes, no dev tools required.

| State   | How to see it |
|---------|----------------|
| **Loading** | Click "Show loading state" in the reviewer panel. It also appears naturally for ~700ms on first page load, and after any add/remove. |
| **Error** | Click "Show error state." This flips a forced-failure flag for one request, so the next fetch fails with a message and a "Try again" button. Also triggers naturally if you click "Try again" while the flag is still set. |
| **Empty** | Click "Show empty state" (clears storage), or just open the app for the first time — a new user always starts here. |
| **Populated list** | Click "Reset to normal," or add a book from the form at the top. |

Click "Reset to normal" at any point to return to ordinary behavior.

## How the three states are kept visually and textually distinct

- **Loading** — neutral panel, no accent color, a spinning ring, copy:
  "Loading your list… Fetching your books from storage."
- **Error** — red-tinted panel with a warning icon, copy that names what
  failed ("Could not reach the reading list storage.") and offers a next
  step via a "Try again" button.
- **Empty** — green-tinted panel with a book icon, copy that explains the
  feature ("Keep track of books you mean to read...") and offers the first
  action via an "Add your first book" button that focuses the title field.

Each state also announces itself to screen readers: the list region is
`aria-live="polite"`, and the error panel additionally uses `role="alert"`.

## What "failure" and "not found" mean here

- **Error** = the storage read/write itself failed (simulated via the
  reviewer panel's forced-failure flag). The error message is specific to
  the action that failed (loading vs. saving vs. removing), and never
  silently loses data — a failed remove leaves the book in the list.
- **Empty** = the read succeeded and returned zero books. This is a
  distinct case from error, both in the code path and in what's shown.

## Files

- `index.html` — page structure, add form, reviewer panel
- `store.js` — persistence layer (localStorage) behind an async, delayed,
  optionally-failing API
- `app.js` — renders loading/error/empty/list states, wires up add/remove
  and the reviewer panel
- `style.css` — visual design, including the distinct styling per state
