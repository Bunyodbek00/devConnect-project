const dialog = document.getElementById("session-dialog");

function renderDay(dayKey, container) {
  container.innerHTML = "";

  SCHEDULE[dayKey].forEach(slot => {
    const slotEl = document.createElement("div");
    slotEl.className = "slot";

    const timeEl = document.createElement("p");
    timeEl.className = "slot-time";
    timeEl.textContent = slot.time;
    slotEl.appendChild(timeEl);

    const sessionsEl = document.createElement("div");
    sessionsEl.className = "slot-sessions";

    slot.sessions.forEach(session => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "session-card";
      btn.dataset.track = session.track;

      btn.innerHTML = `
        <span class="session-track-label">${session.label}</span>
        <span class="session-title">${session.title}</span>
        <span class="session-speaker">${session.speaker} · ${session.room}</span>
      `;

      btn.addEventListener("click", () => openSession(session, slot.time));
      sessionsEl.appendChild(btn);
    });

    slotEl.appendChild(sessionsEl);
    container.appendChild(slotEl);
  });
}

function openSession(session, time) {
  document.getElementById("dialog-track").textContent = session.label;
  document.getElementById("dialog-track").style.setProperty(
    "--track-color",
    getComputedStyle(document.documentElement).getPropertyValue(`--track-${session.track}`)
  );
  document.getElementById("dialog-title").textContent = session.title;
  document.getElementById("dialog-meta").textContent = `${time} · ${session.room}`;
  document.getElementById("dialog-speaker").textContent = session.speaker;
  document.getElementById("dialog-description").textContent = session.description;

  dialog.showModal(); // traps focus, supports Escape to close natively
}

// Day tabs
const tabs = document.querySelectorAll(".day-tab");
const panels = {
  "tab-day1": document.getElementById("day1"),
  "tab-day2": document.getElementById("day2"),
};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => {
      t.classList.remove("is-active");
      t.setAttribute("aria-selected", "false");
    });
    Object.values(panels).forEach(p => p.hidden = true);

    tab.classList.add("is-active");
    tab.setAttribute("aria-selected", "true");
    panels[tab.id].hidden = false;
  });
});

renderDay("day1", document.getElementById("day1"));
renderDay("day2", document.getElementById("day2"));
