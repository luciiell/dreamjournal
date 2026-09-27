/*
  DREAMLANDS CONTENT
  ============================================================
  This file is intentionally data-first. You can add/edit content
  without changing the navigation code below it.

  BOOK BEHAVIOR
  - About: one normal opening spread.
  - Waypoints: ONE page only. Every item is an external hyperlink.
  - Worlds: index spread -> one spread per world.
  - Residents: index spread -> one spread per character.
  - Archives: cover + index spread -> image-only photo spreads.
*/

const siteData = {
  about: {
    title: "About the Dreamlands",
    subtitle: "A small guide to the place beyond waking.",
    body: "Write the introduction, history, mythology, rules, or anything else you want visitors to know about the Dreamlands here.",
  },

  // ==========================================================
  // DREAMLAND WAYPOINTS — ONE PAGE, EXTERNAL LINKS ONLY
  // Add another object to this array for another link.
  // ==========================================================
  waypoints: {
    title: "Dreamland Waypoints",
    subtitle: "Choose a waypoint and leave this book through the link.",
    links: [
      { name: "Waypoint One", description: "Replace this with your waypoint.", url: "https://example.com/" },
      { name: "Waypoint Two", description: "Replace this with your waypoint.", url: "https://example.com/" },
      { name: "Waypoint Three", description: "Replace this with your waypoint.", url: "https://example.com/" },
    ],
  },

  // ==========================================================
  // DREAMLAND WORLDS
  // Add another world object to create another world page.
  // image = image path. mapUrl = external link for the button.
  // ==========================================================
  worlds: [
    {
      id: "pale-coast",
      name: "The Pale Coast",
      description: "A quiet shore where the sea seems to remember every dream that has ever touched it. Replace this with your world's information.",
      image: "",
      mapUrl: "https://example.com/",
    },
    {
      id: "glass-forest",
      name: "The Glass Forest",
      description: "A forest of translucent trees, distant lights, and paths that do not always lead back the way they came. Replace this with your world's information.",
      image: "",
      mapUrl: "https://example.com/",
    },
  ],

  // ==========================================================
  // DREAMLAND RESIDENTS
  // Add categories, then add characters inside each category.
  // Every character automatically gets their own page.
  // image is optional and can be an image path.
  // ==========================================================
  residents: [
    {
      id: "dreamers",
      name: "Dreamers",
      description: "Those who wander the Dreamlands while still carrying traces of waking life.",
      characters: [
        {
          id: "dreamer-one",
          name: "Dreamer One",
          description: "Character information goes here. Add as much or as little as you like.",
          image: "",
        },
        {
          id: "dreamer-two",
          name: "Dreamer Two",
          description: "Another character entry. Duplicate this object to add another resident.",
          image: "",
        },
      ],
    },
    {
      id: "guides",
      name: "Guides",
      description: "Residents who know the paths, crossings, and hidden rules of the Dreamlands.",
      characters: [
        {
          id: "guide-one",
          name: "Guide One",
          description: "Character information goes here.",
          image: "",
        },
      ],
    },
    {
      id: "strangers",
      name: "Strangers",
      description: "Unfamiliar residents whose stories have not yet been fully recorded.",
      characters: [
        {
          id: "stranger-one",
          name: "Stranger One",
          description: "Character information goes here.",
          image: "",
        },
      ],
    },
  ],

  // ==========================================================
  // DREAMLAND ARCHIVES
  // The first spread is ALWAYS cover + contents.
  // Everything after that is photography only.
  // ==========================================================
  archives: {
    title: "Dreamland Archives",
    subtitle: "A visual record of things worth remembering.",
    photoSpreads: [
      { id: "spread-1", left: "images/archives/dream-01.jpg", right: "images/archives/dream-02.jpg", label: "Photo spread 1" },
      { id: "spread-2", left: "images/archives/dream-03.jpg", right: "images/archives/dream-04.jpg", label: "Photo spread 2" },
      { id: "spread-3", left: "images/archives/dream-05.jpg", right: "images/archives/dream-06.jpg", label: "Photo spread 3" },
    ],
  },
};

const reader = document.getElementById("reader");
const bookElement = document.querySelector(".open-book");
const leftInner = document.getElementById("left-inner");
const rightInner = document.getElementById("right-inner");
const leftPage = document.getElementById("left-page");
const rightPage = document.getElementById("right-page");
const prevButton = document.getElementById("prev-page");
const nextButton = document.getElementById("next-page");
const putAwayButton = document.getElementById("put-away");
const pageStatus = document.getElementById("page-status");

let currentBook = null;
let spreads = [];
let currentSpread = 0;
let singlePage = false;

const esc = (value = "") => String(value).replace(/[&<>\'"]/g, ch => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
}[ch]));

function spread(left, right, kind = "standard") {
  return { left, right, kind };
}

function indexButton(item, action) {
  return `
    <button class="index-button" type="button" data-action="${esc(action)}" data-id="${esc(item.id || "")}">
      <span>${esc(item.name)}</span>
      <span class="index-meta">open →</span>
    </button>
  `;
}

function worldsIndex() {
  return siteData.worlds.map(world => indexButton(world, "world")).join("");
}

function residentsIndex() {
  return siteData.residents.map(category => `
    <section class="index-group">
      <h4 class="index-group-title">${esc(category.name)}</h4>
      <p class="index-group-description">${esc(category.description)}</p>
      <div class="index-list">
        ${category.characters.map(character => indexButton(character, "resident-character")).join("")}
      </div>
    </section>
  `).join("");
}

function archivesIndex() {
  return siteData.archives.photoSpreads.map(photo => `
    <button class="index-button" type="button" data-action="archive" data-id="${esc(photo.id)}">
      <span>${esc(photo.label || "Photo spread")}</span>
      <span class="index-meta">view →</span>
    </button>
  `).join("");
}

function buildBook(bookKey) {
  singlePage = bookKey === "waypoints";

  if (bookKey === "about") {
    return [spread(`
      <span class="page-label">ABOUT THE DREAMLANDS</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(siteData.about.title)}</h2>
      <p class="page-subtitle">${esc(siteData.about.subtitle)}</p>
      <div class="page-divider"></div>
      <p>${esc(siteData.about.body)}</p>
    `, `
      <span class="page-label">ABOUT</span>
      <h3>This volume</h3>
      <p>Use this book for the foundational information you want visitors to read before wandering deeper into the Dreamlands.</p>
    `)];
  }

  if (bookKey === "waypoints") {
    // Deliberately ONE page. No internal waypoint pages exist.
    return [spread(`
      <span class="page-label">DREAMLAND WAYPOINTS</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(siteData.waypoints.title)}</h2>
      <p class="page-subtitle">${esc(siteData.waypoints.subtitle)}</p>
      <div class="page-divider"></div>
      <div class="contents-grid">
        ${siteData.waypoints.links.map(link => `
          <a class="external-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">
            <span>
              <strong>${esc(link.name)}</strong>
              <small class="index-meta">${esc(link.description)}</small>
            </span>
            <span>↗</span>
          </a>
        `).join("")}
      </div>
    `, "", "single")];
  }

  if (bookKey === "worlds") {
    const result = [spread(`
      <span class="page-label">DREAMLAND WORLDS</span>
      <div class="page-ornament">✦</div>
      <h2>Dreamland Worlds</h2>
      <p class="page-subtitle">Choose a world from the index.</p>
    `, `
      <span class="page-label">INDEX</span>
      <h3>Worlds</h3>
      <div class="contents-grid">${worldsIndex()}</div>
    `)];

    siteData.worlds.forEach(world => result.push(worldSpread(world)));
    return result;
  }

  if (bookKey === "residents") {
    const result = [spread(`
      <span class="page-label">DREAMLAND RESIDENTS</span>
      <div class="page-ornament">✦</div>
      <h2>Dreamland Residents</h2>
      <p class="page-subtitle">A directory of those who inhabit the Dreamlands.</p>
      <div class="page-divider"></div>
      <p>Choose a character from the categories on the facing page.</p>
    `, `
      <span class="page-label">INDEX</span>
      <h3>Residents</h3>
      <div class="resident-index">${residentsIndex()}</div>
    `)];

    siteData.residents.forEach(category => {
      category.characters.forEach(character => {
        result.push(residentSpread(category, character));
      });
    });
    return result;
  }

  if (bookKey === "archives") {
    // Spread 1 is permanently the cover + contents.
    const result = [spread(`
      <span class="page-label">DREAMLAND ARCHIVES</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(siteData.archives.title)}</h2>
      <p class="page-subtitle">${esc(siteData.archives.subtitle)}</p>
      <div class="page-divider"></div>
    `, `
      <span class="page-label">CONTENTS</span>
      <h3>Contents</h3>
      <div class="contents-grid">${archivesIndex()}</div>
    `)];

    // Every following spread is photos only. No text/captions.
    siteData.archives.photoSpreads.forEach(photo => {
      result.push(spread(
        photoFigure(photo.left),
        photoFigure(photo.right),
        "photo"
      ));
    });
    return result;
  }

  return [];
}

function photoFigure(src) {
  if (!src) {
    return `<figure class="photo-figure"><div class="photo-placeholder">Add an image path in <code>script.js</code></div></figure>`;
  }

  return `
    <figure class="photo-figure">
      <img src="${esc(src)}" alt="" onerror="this.hidden=true; this.nextElementSibling.hidden=false;">
      <div class="photo-placeholder" hidden>Image not found:<br>${esc(src)}</div>
    </figure>
  `;
}

function worldSpread(world) {
  return spread(`
    <div class="world-info">
      <button class="back-link" type="button" data-action="back-worlds">← Back to world index</button>
      <span class="page-label">WORLD</span>
      <h2>${esc(world.name)}</h2>
      <p>${esc(world.description)}</p>
    </div>
  `, `
    <div class="world-image">
      ${world.image
        ? `<img class="world-image-placeholder" src="${esc(world.image)}" alt="${esc(world.name)}">`
        : `<div class="world-image-placeholder">World image placeholder<br><small>Add an image path in <code>script.js</code></small></div>`}
      <a class="enter-dream" href="${esc(world.mapUrl)}" target="_blank" rel="noopener noreferrer">Enter the dreamland</a>
    </div>
  `, "world");
}

function residentSpread(category, character) {
  return spread(`
    <div class="resident-info">
      <button class="back-link" type="button" data-action="back-residents">← Back to residents index</button>
      <span class="page-label">${esc(category.name)}</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(character.name)}</h2>
      <p>${esc(character.description)}</p>
    </div>
  `, `
    <div class="resident-image-wrap">
      ${character.image
        ? `<img class="resident-image" src="${esc(character.image)}" alt="${esc(character.name)}">`
        : `<div class="resident-image-placeholder">Character image placeholder<br><small>Add an image path in <code>script.js</code></small></div>`}
    </div>
  `, "resident");
}

function render() {
  const current = spreads[currentSpread] || { left: "", right: "", kind: "standard" };
  const isPhoto = current.kind === "photo";

  reader.classList.toggle("single-page-reader", singlePage);
  bookElement.classList.toggle("single-page-book", singlePage);
  leftPage.classList.toggle("hidden-page", singlePage);
  rightPage.classList.toggle("photo-page", isPhoto);
  leftPage.classList.toggle("photo-page", isPhoto);

  leftInner.innerHTML = current.left;
  rightInner.innerHTML = current.right;

  pageStatus.textContent = `Page ${currentSpread + 1} of ${spreads.length}`;
  prevButton.disabled = currentSpread <= 0;
  nextButton.disabled = currentSpread >= spreads.length - 1;

  bindPageActions();
}

function bindPageActions() {
  document.querySelectorAll("[data-action]").forEach(element => {
    element.addEventListener("click", () => {
      const action = element.dataset.action;
      const id = element.dataset.id;

      if (action === "world") jumpToWorld(id);
      if (action === "resident-character") jumpToResident(id);
      if (action === "archive") jumpToArchive(id);
      if (action === "back-worlds") jumpToIndex("worlds");
      if (action === "back-residents") jumpToIndex("residents");
    });
  });
}

function openBook(bookKey, startSpread = 0) {
  currentBook = bookKey;
  spreads = buildBook(bookKey);
  currentSpread = Math.max(0, Math.min(startSpread, spreads.length - 1));

  reader.classList.add("is-open");
  reader.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  render();
}

function jumpToIndex(bookKey) {
  currentBook = bookKey;
  spreads = buildBook(bookKey);
  currentSpread = 0;
  render();
}

function jumpToWorld(id) {
  const index = siteData.worlds.findIndex(world => world.id === id);
  if (index < 0) return;

  spreads = buildBook("worlds");
  currentBook = "worlds";
  currentSpread = 1 + index;
  render();
}

function jumpToResident(id) {
  let characterIndex = 1;

  for (const category of siteData.residents) {
    for (const character of category.characters) {
      if (character.id === id) {
        spreads = buildBook("residents");
        currentBook = "residents";
        currentSpread = characterIndex;
        render();
        return;
      }
      characterIndex++;
    }
  }
}

function jumpToArchive(id) {
  const index = siteData.archives.photoSpreads.findIndex(photo => photo.id === id);
  if (index < 0) return;

  spreads = buildBook("archives");
  currentBook = "archives";
  currentSpread = 1 + index;
  render();
}

function closeBook() {
  reader.classList.remove("is-open", "single-page-reader");
  bookElement.classList.remove("single-page-book");
  leftPage.classList.remove("hidden-page", "photo-page");
  rightPage.classList.remove("photo-page");
  reader.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".book").forEach(book => {
  book.addEventListener("click", () => openBook(book.dataset.book));
});

prevButton.addEventListener("click", () => {
  if (currentSpread > 0) {
    currentSpread--;
    render();
  }
});

nextButton.addEventListener("click", () => {
  if (currentSpread < spreads.length - 1) {
    currentSpread++;
    render();
  }
});

putAwayButton.addEventListener("click", closeBook);
reader.addEventListener("click", event => {
  if (event.target.classList.contains("reader-backdrop")) closeBook();
});

document.addEventListener("keydown", event => {
  if (!reader.classList.contains("is-open")) return;

  if (event.key === "Escape") closeBook();
  if (event.key === "ArrowLeft" && currentSpread > 0) {
    currentSpread--;
    render();
  }
  if (event.key === "ArrowRight" && currentSpread < spreads.length - 1) {
    currentSpread++;
    render();
  }
});
