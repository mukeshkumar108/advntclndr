// DOM refs
const todayLabelEl = document.getElementById("todayLabel");
const calendarMetaEl = document.getElementById("calendarMeta");
const calendarGridEl = document.getElementById("calendarGrid");

const modalBackdropEl = document.getElementById("modalBackdrop");
const modalDayLabelEl = document.getElementById("modalDayLabel");
const modalTitleEl = document.getElementById("modalTitle");
const modalBodyEl = document.getElementById("modalBody");
const modalCloseBtnEl = document.getElementById("modalCloseBtn");

const confettiLayerEl = document.getElementById("confettiLayer");

let lastFocusedDoor = null;

// ====== localStorage for opened days ======

const STORAGE_KEY = "us-two-advent-opened-v1";

function loadOpenedDays() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (e) {
    console.warn("Could not load opened days from storage", e);
    return new Set();
  }
}

function saveOpenedDays() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...openedDays]));
  } catch (e) {
    console.warn("Could not save opened days to storage", e);
  }
}

let openedDays = loadOpenedDays();

// ====== Date helpers ======

function formatDateForLabel(date) {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function isDoorUnlocked(day) {
  const now = new Date();

  if (now.getFullYear() < ADVENT_YEAR) return false;
  if (now.getFullYear() > ADVENT_YEAR) return true;

  if (now.getMonth() < ADVENT_MONTH) return false;
  if (now.getMonth() > ADVENT_MONTH) return true;

  return day <= now.getDate();
}

function isDoorToday(day) {
  const now = new Date();
  return (
    now.getFullYear() === ADVENT_YEAR &&
    now.getMonth() === ADVENT_MONTH &&
    now.getDate() === day
  );
}

function findDoorData(day) {
  return DOORS.find((d) => d.day === day) || null;
}

// ====== Confetti ======

function triggerConfetti() {
  // Respect reduced motion
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }
  if (!confettiLayerEl) return;

  const pieceCount = 70;
  const durationMin = 2.2;
  const durationMax = 3.6;

  for (let i = 0; i < pieceCount; i++) {
    const piece = document.createElement("div");
    piece.classList.add("confetti-piece");

    const colorVariant = (i % 4) + 1;
    piece.classList.add(`color-${colorVariant}`);

    const left = Math.random() * 100;
    piece.style.left = `${left}vw`;

    const duration =
      durationMin + Math.random() * (durationMax - durationMin);
    const delay = Math.random() * 0.4;

    piece.style.animationDuration = `${duration}s, ${duration}s`;
    piece.style.animationDelay = `${delay}s, ${delay}s`;

    confettiLayerEl.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    });
  }
}

// ====== Door rendering ======

function createDoorElement(day) {
  const doorData = findDoorData(day);
  const button = document.createElement("button");
  button.className = "door";
  button.type = "button";
  button.setAttribute("data-day", day);
  button.setAttribute("aria-label", `Day ${day}`);

  const unlocked = isDoorUnlocked(day);
  const isTodayFlag = isDoorToday(day);
  const previouslyOpened = openedDays.has(day);

  if (!unlocked) {
    button.classList.add("door--locked");
    button.disabled = true;
    button.setAttribute(
      "aria-label",
      `Day ${day}, locked until ${day} December`
    );
  } else if (isTodayFlag && !previouslyOpened) {
    button.classList.add("door--today");
    button.setAttribute("aria-label", `Day ${day}, open today`);
  } else {
    button.classList.add("door--open");
    button.setAttribute("aria-label", `Day ${day}, already opened`);
  }

  // Structure: frame > panel > back + front
  const frame = document.createElement("div");
  frame.className = "door-frame";

  const panel = document.createElement("div");
  panel.className = "door-panel";

  const back = document.createElement("div");
  back.className = "door-back";
  back.textContent = doorData?.title ? "★" : "☆";

  const front = document.createElement("div");
  front.className = "door-front";

  const number = document.createElement("span");
  number.className = "door-number";
  number.textContent = day.toString().padStart(2, "0");

  front.appendChild(number);
  panel.appendChild(back);
  panel.appendChild(front);
  frame.appendChild(panel);
  button.appendChild(frame);

  if (unlocked) {
    button.addEventListener("click", () => openDoor(day, button));
  }

  return button;
}

function renderCalendar() {
  const now = new Date();
  todayLabelEl.textContent = `TODAY: ${formatDateForLabel(now)}`;
  calendarMetaEl.textContent = `DEC ${ADVENT_YEAR} // LOCAL TIME: ${now
    .toTimeString()
    .slice(0, 5)}`;

  calendarGridEl.innerHTML = "";
  for (let day = 1; day <= 24; day++) {
    const doorEl = createDoorElement(day);
    calendarGridEl.appendChild(doorEl);
  }
}

// ====== Content rendering ======

function createContentElement(data) {
  const wrapper = document.createElement("div");
  wrapper.className = "embed-wrapper";

  switch (data.type) {
    case "youtube": {
      if (!data.embedUrl) return null;
      const iframe = document.createElement("iframe");
      iframe.src = data.embedUrl;
      iframe.title = data.title || "YouTube video";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.height = "260";
      wrapper.appendChild(iframe);
      return wrapper;
    }
    case "spotify": {
      if (!data.embedUrl) return null;
      const iframe = document.createElement("iframe");
      iframe.src = data.embedUrl;
      iframe.title = data.title || "Spotify embed";
      iframe.allow =
        "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      iframe.height = "380";
      wrapper.appendChild(iframe);
      return wrapper;
    }
    case "image": {
      if (!data.src) return null;
      const img = document.createElement("img");
      img.src = data.src;
      img.alt = data.alt || data.title || "Image";
      wrapper.appendChild(img);
      return wrapper;
    }
    case "image-link": {
      if (!data.src) return null;

      // Make wrapper clickable
      const link = document.createElement("a");
      link.href = data.href || "#";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "image-link-wrapper";

      // The image
      const img = document.createElement("img");
      img.src = data.src;
      img.alt = data.alt || data.title || "Image";

      link.appendChild(img);
      wrapper.appendChild(link);

      // Optional button under the image
      if (data.label && data.href) {
        const linkBtn = document.createElement("a");
        linkBtn.href = data.href;
        linkBtn.target = "_blank";
        linkBtn.rel = "noopener noreferrer";
        linkBtn.textContent = data.label;
        linkBtn.className = "link-button";
        wrapper.appendChild(linkBtn);
      }

      return wrapper;
    }

    case "audio": {
      if (!data.src) return null;
      const audio = document.createElement("audio");
      audio.controls = true;
      const source = document.createElement("source");
      source.src = data.src;
      audio.appendChild(source);
      wrapper.appendChild(audio);
      return wrapper;
    }
    case "link": {
      if (!data.href) return null;
      const link = document.createElement("a");
      link.href = data.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "modal-link";
      const iconSpan = document.createElement("span");
      iconSpan.textContent = "↗";
      link.textContent = data.label || "Open link";
      link.prepend(iconSpan);
      wrapper.appendChild(link);
      return wrapper;
    }
    case "text": {
      if (!data.text) return null;
      const pre = document.createElement("pre");
      pre.style.whiteSpace = "pre-wrap";
      pre.style.margin = 0;
      pre.textContent = data.text;
      wrapper.appendChild(pre);
      return wrapper;
    }
    case "video": {
      if (!data.src) return null;
      const video = document.createElement("video");
      video.controls = true;
      video.style.width = "100%";
      video.src = data.src;
      wrapper.appendChild(video);
      return wrapper;
    }
    default:
      return null;
  }
}

// ====== Door open flow ======

function openDoor(day, buttonEl) {
  const wasAlreadyOpened = openedDays.has(day);
  lastFocusedDoor = buttonEl || null;

  const data = findDoorData(day);

  // Mark opened + save (only first time)
  if (!wasAlreadyOpened) {
    openedDays.add(day);
    saveOpenedDays();
  }

  // Trigger visual open state (slide panel)
  if (buttonEl) {
    buttonEl.classList.remove("door--today");
    buttonEl.classList.remove("door--locked");
    buttonEl.classList.add("door--open");
  }

  // Build modal content
  modalDayLabelEl.textContent = `DAY ${day.toString().padStart(2, "0")}`;
  modalTitleEl.textContent = data?.title || "Mystery surprise";
  modalBodyEl.innerHTML = "";

  if (data?.note) {
    const noteEl = document.createElement("div");
    noteEl.className = "modal-note";
    noteEl.textContent = data.note;
    modalBodyEl.appendChild(noteEl);
  }

  if (!data) {
    const emptyEl = document.createElement("p");
    emptyEl.className = "modal-empty";
    emptyEl.textContent =
      "You haven't added anything for this day yet. (Future you: put something adorable here.)";
    modalBodyEl.appendChild(emptyEl);
  } else {
    const content = createContentElement(data);
    if (content) {
      modalBodyEl.appendChild(content);
    } else {
      const fallback = document.createElement("p");
      fallback.className = "modal-empty";
      fallback.textContent =
        "Content type not recognised. Check your config for this day.";
      modalBodyEl.appendChild(fallback);
    }
  }

  // Only throw confetti the very first time
  if (!wasAlreadyOpened) {
    triggerConfetti();
  }

  // Delay so you see the door slide before the modal pops
  const delay = wasAlreadyOpened ? 0 : 350;

  setTimeout(() => {
    modalBackdropEl.classList.add("is-open");
    modalBackdropEl.setAttribute("aria-hidden", "false");
    modalCloseBtnEl.focus();
  }, delay);
}

// ====== Modal close ======

function closeModal() {
  modalBackdropEl.classList.remove("is-open");
  modalBackdropEl.setAttribute("aria-hidden", "true");
  modalBodyEl.innerHTML = "";

  if (lastFocusedDoor && typeof lastFocusedDoor.focus === "function") {
    lastFocusedDoor.focus();
  }
}

modalCloseBtnEl.addEventListener("click", closeModal);

modalBackdropEl.addEventListener("click", (e) => {
  if (e.target === modalBackdropEl) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdropEl.classList.contains("is-open")) {
    closeModal();
  }
});

// ====== Init ======
renderCalendar();
