/*
  DREAMLANDS CONTENT
  ------------------------------------------------------------
  Edit the arrays below to add your own material.

  Waypoints: one spread only; every item is an external link.
  Worlds: index -> individual world spread.
  Residents: index -> individual character spread.
  Archives: cover + contents spread -> image-only photo spreads.
*/

const siteData = {
  about: {
    title: "About the Dreamlands",
    subtitle: "A small guide to the place beyond waking.",
    body: "This is where you can write the introduction, history, rules, mythology, or anything else that explains what the Dreamlands are.",
  },

  waypoints: {
    title: "Dreamland Waypoints",
    subtitle: "A directory of places worth finding.",
    links: [
      { name: "Waypoint One", description: "Replace this with your waypoint.", url: "https://example.com/" },
      { name: "Waypoint Two", description: "Replace this with your waypoint.", url: "https://example.com/" },
      { name: "Waypoint Three", description: "Replace this with your waypoint.", url: "https://example.com/" },
    ],
  },

  worlds: [
    {
      id: "pale-coast",
      name: "The Pale Coast",
      description: "A quiet shore where the sea seems to remember every dream that has ever touched it. Replace this text with the information for your world.",
      image: "",
      mapUrl: "https://example.com/",
    },
    {
      id: "glass-forest",
      name: "The Glass Forest",
      description: "A forest of translucent trees, distant lights, and paths that do not always lead back the way they came. Replace this text with the information for your world.",
      image: "",
      mapUrl: "https://example.com/",
    },
  ],

  residents: [
    {
      id: "dreamers",
      name: "Dreamers",
      description: "Those who wander the Dreamlands while still carrying traces of waking life.",
      characters: [
        { id: "dreamer-one", name: "Dreamer One", description: "Character information goes here. Add as much or as little as you like." },
        { id: "dreamer-two", name: "Dreamer Two", description: "Another character entry. Duplicate this object to add another resident." },
      ],
    },
    {
      id: "guides",
      name: "Guides",
      description: "Residents who know the paths, crossings, and hidden rules of the Dreamlands.",
      characters: [
        { id: "guide-one", name: "Guide One", description: "Character information goes here." },
      ],
    },
    {
      id: "strangers",
      name: "Strangers",
      description: "Unfamiliar residents whose stories have not yet been fully recorded.",
      characters: [
        { id: "stranger-one", name: "Stranger One", description: "Character information goes here." },
      ],
    },
  ],

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

const esc = (value = "") => String(value).replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));

function spread(left, right, kind = "standard") {
  return { left, right, kind };
}

function renderIndexButton(item, action) {
  return `<button class="index-button" type="button" data-action="${action}" data-id="${esc(item.id || "")}"><span>${esc(item.name)}</span><span class="index-meta">open →</span></button>`;
}

function residentsIndex() {
  return siteData.residents.map(category => {
    const characters = category.characters.map(character => renderIndexButton(character, "resident-character")).join("");
    return `<section class="index-group">
      <h4 class="index-group-title">${esc(category.name)}</h4>
      <p class="index-meta">${esc(category.description)}</p>
      <div class="index-list">${characters}</div>
    </section>`;
  }).join("");
}

function worldsIndex() {
  return siteData.worlds.map(world => renderIndexButton(world, "world")).join("");
}

function archivesIndex() {
  return siteData.archives.photoSpreads.map(spreadItem => `
    <button class="index-button" type="button" data-action="archive" data-id="${esc(spreadItem.id)}">
      <span>${esc(spreadItem.label || "Photo spread")}</span><span class="index-meta">view →</span>
    </button>
  `).join("");
}

function buildBook(bookKey) {
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
      <h3>About this volume</h3>
      <p>Use this book for the foundational information you want visitors to read before wandering deeper into the Dreamlands.</p>
    `)];
  }

  if (bookKey === "waypoints") {
    const links = siteData.waypoints.links.map(link => `
      <a class="external-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">
        <span><strong>${esc(link.name)}</strong><br><small class="index-meta">${esc(link.description)}</small></span><span>↗</span>
      </a>
    `).join("");
    return [spread(`
      <span class="page-label">DREAMLAND WAYPOINTS</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(siteData.waypoints.title)}</h2>
      <p class="page-subtitle">${esc(siteData.waypoints.subtitle)}</p>
      <div class="page-divider"></div>
      <div class="contents-grid">${links}</div>
    `, `
      <span class="page-label">WAYPOINTS</span>
      <h3>Follow a link</h3>
      <p>Every entry in this book is an external hyperlink. There are no internal waypoint pages.</p>
    `)];
  }

  if (bookKey === "worlds") {
    return [spread(`
      <span class="page-label">DREAMLAND WORLDS</span>
      <div class="page-ornament">✦</div>
      <h2>Dreamland Worlds</h2>
      <p class="page-subtitle">Choose a world to enter.</p>
    `, `
      <span class="page-label">INDEX</span>
      <h3>Worlds</h3>
      <div class="contents-grid">${worldsIndex()}</div>
    `)];
  }

  if (bookKey === "residents") {
    return [spread(`
      <span class="page-label">DREAMLAND RESIDENTS</span>
      <div class="page-ornament">✦</div>
      <h2>Dreamland Residents</h2>
      <p class="page-subtitle">A directory of those who inhabit the Dreamlands.</p>
    `, `
      <span class="page-label">INDEX</span>
      <h3>Residents</h3>
      <div class="contents-grid">${residentsIndex()}</div>
    `)];
  }

  if (bookKey === "archives") {
    const cover = `
      <span class="page-label">DREAMLAND ARCHIVES</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(siteData.archives.title)}</h2>
      <p class="page-subtitle">${esc(siteData.archives.subtitle)}</p>
      <div class="page-divider"></div>
    `;
    const contents = `
      <span class="page-label">CONTENTS</span>
      <h3>Contents</h3>
      <div class="contents-grid">${archivesIndex()}</div>
    `;
    const result = [spread(cover, contents)];
    siteData.archives.photoSpreads.forEach(photo => {
      result.push(spread(photoFigure(photo.left), photoFigure(photo.right), "photo"));
    });
    return result;
  }

  return [];
}

function photoFigure(src) {
  if (!src) return `<figure><div class="photo-placeholder">Add an image path in <code>script.js</code></div></figure>`;
  return `<figure><img src="${esc(src)}" alt="" onerror="this.style.display='none'; this.nextElementSibling.hidden=false;"><div class="photo-placeholder" hidden>Image not found:<br>${esc(src)}</div></figure>`;
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
      ${world.image ? `<img class="image-placeholder" src="${esc(world.image)}" alt="${esc(world.name)}">` : `<div class="image-placeholder">World image placeholder<br><small>Add an image path in <code>script.js</code></small></div>`}
      <a class="enter-dream" href="${esc(world.mapUrl)}" target="_blank" rel="noopener noreferrer">Enter the dreamland</a>
    </div>
  `, "world");
}

function residentSpread(category, character) {
  return spread(`
    <button class="back-link" type="button" data-action="back-residents">← Back to residents index</button>
    <span class="page-label">${esc(category.name)}</span>
    <div class="page-ornament">✦</div>
    <h2>${esc(character.name)}</h2>
    <p>${esc(character.description)}</p>
  `, `
    <span class="page-label">RESIDENT</span>
    <h3>${esc(category.name)}</h3>
    <p>Use this page for additional character information, artwork, notes, history, or anything else you want to add.</p>
  `);
}

function render() {
  const current = spreads[currentSpread];
  leftPage.classList.toggle("photo-page", current?.kind === "photo");
  rightPage.classList.toggle("photo-page", current?.kind === "photo");
  leftInner.innerHTML = current?.left || "";
  rightInner.innerHTML = current?.right || "";
  pageStatus.textContent = `Page ${currentSpread + 1} of ${spreads.length}`;
  prevButton.disabled = currentSpread <= 0;
  nextButton.disabled = currentSpread >= spreads.length - 1;
  bindPageActions();
}

function bindPageActions() {
  document.querySelectorAll("[data-action]").forEach(el => {
    el.addEventListener("click", () => {
      const action = el.dataset.action;
      const id = el.dataset.id;
      if (action === "world") openWorld(id);
      if (action === "resident-character") openResidentCharacter(id);
      if (action === "archive") openArchive(id);
      if (action === "back-worlds") openBook("worlds", 0);
      if (action === "back-residents") openBook("residents", 0);
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

function openWorld(id) {
  const world = siteData.worlds.find(item => item.id === id);
  if (!world) return;
  spreads = [...buildBook("worlds"), worldSpread(world)];
  currentBook = "worlds";
  currentSpread = 1;
  render();
}

function openResidentCharacter(id) {
  for (const category of siteData.residents) {
    const character = category.characters.find(item => item.id === id);
    if (character) {
      spreads = [...buildBook("residents"), residentSpread(category, character)];
      currentBook = "residents";
      currentSpread = 1;
      render();
      return;
    }
  }
}

function openArchive(id) {
  const index = siteData.archives.photoSpreads.findIndex(item => item.id === id);
  if (index < 0) return;
  spreads = buildBook("archives");
  currentBook = "archives";
  currentSpread = 1 + index;
  render();
}

function closeBook() {
  reader.classList.remove("is-open");
  reader.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".book").forEach(book => {
  book.addEventListener("click", () => openBook(book.dataset.book));
});
prevButton.addEventListener("click", () => { if (currentSpread > 0) { currentSpread--; render(); } });
nextButton.addEventListener("click", () => { if (currentSpread < spreads.length - 1) { currentSpread++; render(); } });
putAwayButton.addEventListener("click", closeBook);
reader.addEventListener("click", event => { if (event.target.classList.contains("reader-backdrop")) closeBook(); });
document.addEventListener("keydown", event => {
  if (!reader.classList.contains("is-open")) return;
  if (event.key === "Escape") closeBook();
  if (event.key === "ArrowLeft" && currentSpread > 0) { currentSpread--; render(); }
  if (event.key === "ArrowRight" && currentSpread < spreads.length - 1) { currentSpread++; render(); }
});
