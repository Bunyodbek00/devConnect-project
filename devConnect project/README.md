# Signal Conference — Schedule

A single-page schedule for a two-day, three-track conference.

## How parallel tracks are handled on a narrow screen

At 320px there is not enough width to show three columns without either
shrinking text past legibility or introducing horizontal scroll — both are
ruled out by the brief.

**Decision: tracks collapse from side-by-side columns into a vertically
stacked list within each time slot**, rather than any of the alternatives
below.

Each time slot (e.g. "9:00 – 9:45") is rendered once, and the three sessions
that occur in that slot are stacked underneath it as full-width cards, in a
fixed order (Track A, then B, then C). Track identity is preserved without
needing horizontal space, using two redundant, non-color cues on every card:

- a **left border color** matching the track, and
- a **text label** ("Track A · Systems") at the top of the card

The color is never the only signal — the label carries the same information,
so the track is still identifiable for a low-vision or colorblind user, and
is announced by a screen reader before the session title.

At 700px and above, where three columns comfortably fit without shrinking
text, the same slot markup switches to a row layout via one media query
(`flex-direction: row`) — no separate narrow/wide template, no JS-driven
layout logic. The DOM order (and therefore keyboard tab order) is identical
at every width: A, then B, then C, then the next time slot.

### Alternatives considered and rejected

- **Horizontal scroll per track** — explicitly disallowed by the brief at
  320px, and it hides two-thirds of "what's on now" off-screen, which
  defeats the point of a schedule.
- **A track filter/switcher** (show one track at a time via tabs) — was
  considered, since it avoids stacking entirely. Rejected because it hides
  simultaneous options: a visitor asking "what's on at 10am" would need to
  check three separate tab states instead of scanning one list, which is a
  worse fit for the core task.
- **Condensed/abbreviated cards** to fit three across — rejected because
  session titles vary in length and abbreviation would make titles the least
  reliable content on the page.

Stacking within a time-anchored slot was the only option that kept "what's
on at a given time" answerable by scrolling in a single direction, at any
width, without hiding a track's existence.

## Keyboard and accessibility notes

- Every session is a real `<button>`, so it is reachable via Tab in visual
  (DOM) order and activates with Enter/Space with no extra JS needed.
- Day switching uses real `<button>` elements with `role="tab"` /
  `aria-selected`, reachable and operable the same way.
- Session details open in a native `<dialog>` via `showModal()`. This:
  - traps focus inside the dialog while open,
  - closes on **Escape** for free (native browser behavior),
  - and the visible `×` button is a `type="submit"` inside a
    `method="dialog"` form, so it also closes the dialog without JS.
- Focus is never suppressed: `:focus-visible` outlines are defined
  explicitly for links, buttons, and session cards, rather than relying on
  (and risking an accidental override of) the browser default.
- No fixed pixel widths are used anywhere; the layout is fluid from 320px
  up, and `overflow-x: hidden` on `html`/`body` combined with the fluid
  layout ensures no horizontal scrollbar appears at 320px.

## Files

- `index.html` — page structure, day tabs, dialog markup
- `sessions.js` — schedule data (two days × three tracks × four slots)
- `app.js` — renders sessions, handles tab switching and dialog open/close
- `style.css` — visual design and the responsive track-collapse behavior
