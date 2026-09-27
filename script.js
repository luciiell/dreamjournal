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
    subtitle: "About the place beyond consciousness.",
    body: "Welcome to the dreamlands. The dreamlands are a place that is within the dreamer's, Luc's, subconscious. Here there are many doors that open and lead to each dream. I, Dius the robot whom resides here and represents the dreamer and the dreamlands themselves, am the one who is responsible for maintaining it. It is my duty to monitor and release the dreams from the subconscious when the time is right, if I do not it can lead to dream corruption where the dreams may take darker turns. This is so you don't get lost in the dreams, please proceed normally.",
  },

  waypoints: {
    title: "Dreamland Waypoints",
    subtitle: "Where you will find the different main points of the dreamland.",
    links: [
      { name: "Janitor AI Profile", description: "Teleport over to the dreamor's profile.", url: "https://janitorai.com/profiles/bea7dc0d-b04f-4ad0-b5d0-f71f07f4d6b4_profile-of-amuradius" },
      { name: "Request Form", description: "Describe your dream for it to be fulfilled.", url: "https://example.com/" },
      { name: "Discord", description: "Come along and dream with others.", url: "https://example.com/" },
    ],
  },

  worlds: [
    {
      id: "crimmshaw-heights",
      name: "Crimmshaw Heights",
      description: "A small town near mountain bases in Tennessee, home to nightlife, diverse groups of people, Westvale University, and plenty to see and do.",
      image: "https://ella.janitorai.com/media-approved/-G-rNxWUbC7DsJou7kSI2.webp",
      mapUrl: "https://example.com/",
    },
    {
      id: "veravinyth",
      name: "Veravinyth",
      description: "A world whose origins are unknown, where all species exist, some in peace others not. Land where you may...",
      image: "https://ella.janitorai.com/media-approved/AdGeDzgFThY9_LZRUXLhL.webp",
      mapUrl: "https://example.com/",
    },
  ],

  residents: [
    {
      id: "crimmshaw-residents",
      name: "Crimmshaw Residents",
      description: "Those whom reside in Crimmshaw Heights.",
      characters: [
        { id: "cade-beaumont", name: "Cade Beaumont", image: "https://ella.janitorai.com/bot-avatars/hlLHmvS-leRpIE7HbeJhd.webp", description: "Character information goes here. Add as much or as little as you like." },
        { id: "dreamer-two", name: "Dreamer Two", description: "Another character entry. Duplicate this object to add another resident." },
      ],
    },
    {
      id: "westvale-students",
      name: "Westvale Students",
      description: "The residents whom attend Westvale Univeristy in Crimmshaw Heights, TN.",
      characters: [
        { id: "lalalaa", name: "Lalalaa", description: "Character information goes here." },
      ],
    },
    {
      id: "veravinythians",
      name: "Veravinythians",
      description: "Those whom are from Veravinyth with unknown origins...",
      characters: [
        { id: "veravinythian", name: "Veravinythian", description: "Character information goes here." },
      ],
    },
    {
      id: "faeries",
      name: "Faeries",
      description: "will figure out the name soon lol",
      characters: [
        { id: "kit", name: "Kit", description: "Character information goes here." },
      ],
    },
  ],

  archives: {
    title: "Dreamland Archives",
    subtitle: "A visual record of things worth remembering.",
    photoSpreads: [
      { id: "spread-1", left: "#", right: "#", label: "Photo spread 1" },
      { id: "spread-2", left: "#", right: "#", label: "Photo spread 2" },
      { id: "spread-3", left: "#", right: "#", label: "Photo spread 3" },
      { id: "spread-4", left: "#", right: "#", label: "Photo spread 4" },
      { id: "spread-5", left: "#", right: "#", label: "Photo spread 5" },
      { id: "spread-6", left: "#", right: "#", label: "Photo spread 6" },
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
let mobilePageIndex = 0;
let mobileTurnDirection = 1;

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
    return `<details class="resident-category">
      <summary class="resident-category-toggle">
        <span class="resident-category-name">${esc(category.name)}</span>
        <span class="resident-category-chevron" aria-hidden="true">⌄</span>
      </summary>
      <div class="resident-category-body">
        <p class="index-meta">${esc(category.description)}</p>
        <div class="index-list">${characters}</div>
      </div>
    </details>`;
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
      <a class="index-button external-index-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">
        <span>${esc(link.name)}</span><span class="index-meta">↗</span>
      </a>
    `).join("");
    return [spread(`
      <span class="page-label">DREAMLAND WAYPOINTS</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(siteData.waypoints.title)}</h2>
      <p class="page-subtitle">${esc(siteData.waypoints.subtitle)}</p>
      <div class="page-divider"></div>
      <p>Use this volume as a directory of places and paths that lead beyond the library. Each entry on the facing page is a direct link to an external destination.</p>
      <p>There are no interior pages in this book.</p>
    `, `
      <span class="page-label">INDEX</span>
      <h3>Waypoints</h3>
      <div class="contents-grid">${links}</div>
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

function isMobileBookView() {
  return window.matchMedia("(max-width: 620px)").matches;
}

function render() {
  const mobile = isMobileBookView();
  const current = spreads[currentSpread];

  if (mobile) {
    // On phones, each half of a desktop spread becomes its own page.
    // This keeps the book readable and makes every arrow press advance one page.
    const totalMobilePages = spreads.length * 2;
    mobilePageIndex = Math.max(0, Math.min(mobilePageIndex, totalMobilePages - 1));
    const spreadIndex = Math.floor(mobilePageIndex / 2);
    const side = mobilePageIndex % 2;
    currentSpread = spreadIndex;
    const mobileCurrent = spreads[spreadIndex];

    leftPage.classList.toggle("photo-page", mobileCurrent?.kind === "photo");
    rightPage.classList.toggle("photo-page", mobileCurrent?.kind === "photo");
    leftInner.innerHTML = mobileCurrent?.left || "";
    rightInner.innerHTML = mobileCurrent?.right || "";
    leftPage.classList.toggle("mobile-active-page", side === 0);
    rightPage.classList.toggle("mobile-active-page", side === 1);
    leftPage.classList.toggle("mobile-hidden-page", side !== 0);
    rightPage.classList.toggle("mobile-hidden-page", side !== 1);

    // Restart the slide animation each time the active mobile page changes.
    const activePage = side === 0 ? leftPage : rightPage;
    activePage.classList.remove("mobile-turn-forward", "mobile-turn-back");
    void activePage.offsetWidth;
    activePage.classList.add(mobileTurnDirection > 0 ? "mobile-turn-forward" : "mobile-turn-back");

    pageStatus.textContent = `Page ${mobilePageIndex + 1} of ${totalMobilePages}`;
    prevButton.disabled = mobilePageIndex <= 0;
    nextButton.disabled = mobilePageIndex >= totalMobilePages - 1;
  } else {
    leftPage.classList.toggle("photo-page", current?.kind === "photo");
    rightPage.classList.toggle("photo-page", current?.kind === "photo");
    leftInner.innerHTML = current?.left || "";
    rightInner.innerHTML = current?.right || "";
    leftPage.classList.remove("mobile-active-page", "mobile-hidden-page", "mobile-turn-forward", "mobile-turn-back");
    rightPage.classList.remove("mobile-active-page", "mobile-hidden-page", "mobile-turn-forward", "mobile-turn-back");
    pageStatus.textContent = `Page ${currentSpread + 1} of ${spreads.length}`;
    prevButton.disabled = currentSpread <= 0;
    nextButton.disabled = currentSpread >= spreads.length - 1;
  }

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

  // Waypoints is deliberately a single, self-contained spread.
  // Keep it separate from the multi-page book logic so it cannot inherit
  // the navigation behavior used by Worlds, Residents, or Archives.
  if (bookKey === "waypoints") {
    const links = siteData.waypoints.links.map(link => `
      <a class="index-button external-index-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">
        <span>${esc(link.name)}</span><span class="index-meta">↗</span>
      </a>
    `).join("");

    spreads = [spread(`
      <span class="page-label">DREAMLAND WAYPOINTS</span>
      <div class="page-ornament">✦</div>
      <h2>${esc(siteData.waypoints.title)}</h2>
      <p class="page-subtitle">${esc(siteData.waypoints.subtitle)}</p>
      <div class="page-divider"></div>
      <p>Use this book as a directory of places and paths that lead beyond the library. Choose an entry on the facing page to visit that destination.</p>
      <p class="waypoint-note">This book has one spread only. The entries are external links.</p>
    `, `
      <span class="page-label">INDEX</span>
      <h3>Waypoints</h3>
      <div class="contents-grid">${links}</div>
    `)];
    currentSpread = 0;
  } else {
    spreads = buildBook(bookKey);
    currentSpread = Math.max(0, Math.min(startSpread, spreads.length - 1));
  }

  mobilePageIndex = currentSpread * 2;
  mobileTurnDirection = 1;

  reader.classList.add("is-open");
  reader.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // Render on the next frame after the reader is marked open. This prevents
  // the opening transition from briefly showing an empty book.
  requestAnimationFrame(render);
}

function openWorld(id) {
  const world = siteData.worlds.find(item => item.id === id);
  if (!world) return;
  spreads = [...buildBook("worlds"), worldSpread(world)];
  currentBook = "worlds";
  currentSpread = 1;
  mobilePageIndex = 2;
  mobileTurnDirection = 1;
  render();
}

function openResidentCharacter(id) {
  for (const category of siteData.residents) {
    const character = category.characters.find(item => item.id === id);
    if (character) {
      spreads = [...buildBook("residents"), residentSpread(category, character)];
      currentBook = "residents";
      currentSpread = 1;
      mobilePageIndex = 2;
      mobileTurnDirection = 1;
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
  mobilePageIndex = currentSpread * 2;
  mobileTurnDirection = 1;
  render();
}

function closeBook() {
  reader.classList.remove("is-open");
  reader.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".book").forEach(book => {
  book.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
    openBook(book.dataset.book);
  });
});
prevButton.addEventListener("click", () => {
  if (isMobileBookView()) {
    if (mobilePageIndex > 0) { mobilePageIndex--; mobileTurnDirection = -1; render(); }
  } else if (currentSpread > 0) {
    currentSpread--; mobileTurnDirection = -1; render();
  }
});
nextButton.addEventListener("click", () => {
  if (isMobileBookView()) {
    if (mobilePageIndex < spreads.length * 2 - 1) { mobilePageIndex++; mobileTurnDirection = 1; render(); }
  } else if (currentSpread < spreads.length - 1) {
    currentSpread++; mobileTurnDirection = 1; render();
  }
});
putAwayButton.addEventListener("click", closeBook);
reader.addEventListener("click", event => { if (event.target.classList.contains("reader-backdrop")) closeBook(); });
document.addEventListener("keydown", event => {
  if (!reader.classList.contains("is-open")) return;
  if (event.key === "Escape") closeBook();
  if (event.key === "ArrowLeft") {
    if (isMobileBookView()) {
      if (mobilePageIndex > 0) { mobilePageIndex--; mobileTurnDirection = -1; render(); }
    } else if (currentSpread > 0) {
      currentSpread--; mobileTurnDirection = -1; render();
    }
  }
  if (event.key === "ArrowRight") {
    if (isMobileBookView()) {
      if (mobilePageIndex < spreads.length * 2 - 1) { mobilePageIndex++; mobileTurnDirection = 1; render(); }
    } else if (currentSpread < spreads.length - 1) {
      currentSpread++; mobileTurnDirection = 1; render();
    }
  }
});

if (location.hash === "#waypoints") openBook("waypoints");

let lastMobileMode = isMobileBookView();
window.addEventListener("resize", () => {
  const nowMobile = isMobileBookView();
  if (nowMobile === lastMobileMode || !reader.classList.contains("is-open")) return;
  if (nowMobile) mobilePageIndex = currentSpread * 2;
  lastMobileMode = nowMobile;
  render();
});
