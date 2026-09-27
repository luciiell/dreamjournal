const books = {
  about: {
    title: "About the Dreamlands",
    subtitle: "A field guide to the place between places.",
    pages: [
      { title: "Contents", type: "contents" },
      { title: "The Threshold", text: "Every journey into the Dreamlands begins at a threshold. It may be a familiar door, a staircase that was not there yesterday, or the moment just before a dream settles into focus." },
      { title: "A Brief History", text: "The Dreamlands have no single history. Their stories overlap, contradict one another, and sometimes remember things that never happened while forgetting things that did." },
      { title: "The Geography of Sleep", text: "Distance in the Dreamlands is measured less by miles than by feeling. A remembered song may be closer than the street outside your window, while a place you know well can take years to reach." },
      { title: "Rules of the Dreamlands", text: "Some rules are reliable: doors tend to lead somewhere, names carry weight, and the landscape notices when it is being observed. Other rules are still being written." },
      { title: "A Note for New Visitors", text: "Do not be afraid of getting lost. Getting lost is one of the oldest methods of finding somewhere new. Take note of landmarks, be courteous to residents, and always leave a little room for wonder." }
    ]
  },

  // WAYPOINTS: one page only. Add/remove links in this array.
  waypoints: {
    title: "Dreamland Waypoints",
    subtitle: "A collection of doors, paths, and places beyond the waking world.",
    links: [
      { title: "The Lantern Stair", description: "A narrow staircase lit by warm lanterns.", url: "https://example.com" },
      { title: "The Sleeping Station", description: "A railway station where every clock shows a different hour.", url: "https://example.com" },
      { title: "The Rosewater Bridge", description: "A bridge spanning a river that reflects memories rather than faces.", url: "https://example.com" },
      { title: "The House at the End of the Path", description: "There is always a path to this house, though it is rarely the same path twice.", url: "https://example.com" }
    ]
  },

  // WORLDS: add another object to worlds to create another world page.
  worlds: {
    title: "Dreamland Worlds",
    subtitle: "A catalogue of places that should not exist.",
    worlds: [
      {
        title: "The Pale Coast",
        text: "An endless shoreline beneath a pearl-colored sky. The tide arrives with whispers, and footprints sometimes continue long after the person who made them has gone.",
        image: "images/worlds/pale-coast.jpg",
        mapUrl: "https://example.com"
      },
      {
        title: "The Glass Forest",
        text: "Trees of translucent bark grow beneath a silver moon. Nothing rustles here. Instead, the forest rings softly whenever the wind changes direction.",
        image: "images/worlds/glass-forest.jpg",
        mapUrl: "https://example.com"
      }
    ]
  },

  residents: {
    title: "Dreamland Residents",
    subtitle: "A directory of those who dwell there.",
    pages: [
      { title: "Contents", type: "contents" },
      { title: "The Ferrymen", text: "Quiet figures who operate boats along dream-rivers. They rarely speak, but they always seem to know which shore a traveler is trying to reach." },
      { title: "The Librarians", text: "Keepers of books that contain memories, possible futures, and stories that have not yet been told. They prefer questions to answers." },
      { title: "The Night Gardeners", text: "They tend flowers that bloom only while someone is dreaming. Their tools are made from old keys, silver spoons, and pieces of forgotten weather." },
      { title: "The Housekeepers", text: "They maintain the rooms between dreams. A Housekeeper may appear ordinary until you notice they have been carrying the same key for several hundred years." }
    ]
  },

  // ARCHIVES: cover + index, followed by image-only photo spreads.
  archives: {
    title: "Dreamland Archives",
    subtitle: "A visual record of things worth remembering.",
    photoSpreads: [
      { left: "images/archives/photo-01.jpg", right: "images/archives/photo-02.jpg" },
      { left: "images/archives/photo-03.jpg", right: "images/archives/photo-04.jpg" },
      { left: "images/archives/photo-05.jpg", right: "images/archives/photo-06.jpg" }
    ]
  }
};

const reader = document.getElementById("reader");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const putAway = document.getElementById("put-away");
const pageStatus = document.getElementById("page-status");
const bookButtons = document.querySelectorAll(".book");

let activeBook = null;
let currentPage = 0;
let lastFocusedBook = null;

function standardMarkup() {
  document.querySelector(".left-page .page-inner").innerHTML = `
    <span class="page-label" id="left-label">Dreamlands Respiratory</span>
    <div class="page-ornament">✦</div>
    <h2 id="book-title">Book title</h2>
    <p id="book-subtitle" class="page-subtitle"></p>
    <div class="page-divider"></div>
    <p id="book-description"></p>
    <div class="page-footer-number" id="left-page-number"></div>`;
  document.querySelector(".right-page .page-inner").innerHTML = `
    <span class="page-label" id="right-label">Contents</span>
    <h3 id="right-heading">Contents</h3>
    <div id="page-content" class="page-content"></div>
    <div class="page-footer-number" id="right-page-number"></div>`;
}

function archiveMarkup() {
  document.querySelector(".left-page .page-inner").innerHTML = `
    <div class="archive-cover-page">
      <span class="archive-small-title">THE</span>
      <h2 id="archive-cover-title">Dreamland Archives</h2>
      <span class="archive-small-title">A VISUAL RECORD</span>
      <div class="archive-cover-mark">✦</div>
    </div>`;
  document.querySelector(".right-page .page-inner").innerHTML = `
    <div class="archive-index-page">
      <span class="page-label">Dreamland Archives</span>
      <h3>Contents</h3>
      <div id="archive-index" class="page-content"></div>
    </div>`;
}

function archivePhotoMarkup(spread) {
  document.querySelector(".left-page .page-inner").innerHTML = `<div class="archive-photo-page"><img class="archive-photo" src="${spread.left}" alt=""></div>`;
  document.querySelector(".right-page .page-inner").innerHTML = `<div class="archive-photo-page"><img class="archive-photo" src="${spread.right}" alt=""></div>`;
}

function renderArchive() {
  const book = books.archives;
  if (currentPage === 0) {
    archiveMarkup();
    const index = document.getElementById("archive-index");
    book.photoSpreads.forEach((_, i) => {
      const button = document.createElement("button");
      button.className = "contents-link archive-index-link";
      button.type = "button";
      button.textContent = `Photograph spread ${i + 1}`;
      button.addEventListener("click", () => goToPage(i + 1));
      index.appendChild(button);
    });
    pageStatus.textContent = "Cover & contents";
    prevPage.disabled = true;
    nextPage.disabled = book.photoSpreads.length === 0;
    return;
  }
  archivePhotoMarkup(book.photoSpreads[currentPage - 1]);
  pageStatus.textContent = `Photo spread ${currentPage} of ${book.photoSpreads.length}`;
  prevPage.disabled = currentPage === 0;
  nextPage.disabled = currentPage === book.photoSpreads.length;
}

function renderWaypoints() {
  standardMarkup();
  const book = books.waypoints;
  document.getElementById("left-label").textContent = "Dreamland Waypoints";
  document.getElementById("book-title").textContent = book.title;
  document.getElementById("book-subtitle").textContent = book.subtitle;
  document.getElementById("book-description").textContent = "Each entry below is an external link. There are no internal waypoint pages.";
  document.getElementById("right-label").textContent = "Links";
  document.getElementById("right-heading").textContent = "Waypoints";
  const list = document.getElementById("page-content");
  book.links.forEach(link => {
    const item = document.createElement("div");
    item.className = "waypoint-link-item";
    item.innerHTML = `<a class="waypoint-link" href="${link.url}" target="_blank" rel="noopener noreferrer"><span>${link.title}</span><small>${link.description}</small><b>↗</b></a>`;
    list.appendChild(item);
  });
  pageStatus.textContent = "One page";
  prevPage.disabled = true;
  nextPage.disabled = true;
}

function renderWorlds() {
  standardMarkup();
  const book = books.worlds;
  const titleEl = document.getElementById("book-title");
  const subtitleEl = document.getElementById("book-subtitle");
  const descriptionEl = document.getElementById("book-description");
  const headingEl = document.getElementById("right-heading");
  const contentEl = document.getElementById("page-content");
  document.getElementById("left-label").textContent = book.title;
  document.getElementById("right-label").textContent = "Index";
  titleEl.textContent = book.title;
  subtitleEl.textContent = book.subtitle;
  descriptionEl.textContent = "Choose a world to open its entry.";
  headingEl.textContent = "Worlds";
  book.worlds.forEach((world, i) => {
    const button = document.createElement("button");
    button.className = "contents-link";
    button.type = "button";
    button.textContent = world.title;
    button.addEventListener("click", () => goToPage(i + 1));
    contentEl.appendChild(button);
  });
  pageStatus.textContent = `Index · ${book.worlds.length} worlds`;
  prevPage.disabled = true;
  nextPage.disabled = book.worlds.length === 0;
}

function renderWorldPage(world) {
  standardMarkup();
  document.querySelector(".open-book").classList.add("world-page-mode");
  document.getElementById("left-label").textContent = "Dreamland Worlds";
  document.getElementById("book-title").textContent = world.title;
  document.getElementById("book-subtitle").textContent = "World entry";
  document.getElementById("book-description").textContent = world.text;
  document.getElementById("right-label").textContent = world.title;
  document.getElementById("right-heading").textContent = "";
  document.getElementById("right-page-number").textContent = currentPage + 1;
  document.getElementById("page-content").innerHTML = `
    <div class="world-visual">
      <div class="world-image-frame">
        <img src="${world.image}" alt="" onerror="this.style.display='none'; this.nextElementSibling.hidden=false;">
        <div class="world-image-placeholder" hidden>Image placeholder</div>
      </div>
      <a class="enter-dream-button" href="${world.mapUrl}" target="_blank" rel="noopener noreferrer">Enter the dreamland</a>
    </div>`;
  pageStatus.textContent = `World ${currentPage} of ${books.worlds.worlds.length}`;
  prevPage.disabled = currentPage === 0;
  nextPage.disabled = currentPage === books.worlds.worlds.length;
}

function renderStandardBook(book) {
  standardMarkup();
  const page = book.pages[currentPage];
  const contents = currentPage === 0;
  document.getElementById("left-label").textContent = book.title;
  document.getElementById("right-label").textContent = contents ? "Contents" : book.title;
  document.getElementById("book-title").textContent = book.title;
  document.getElementById("book-subtitle").textContent = book.subtitle;
  document.getElementById("book-description").textContent = contents ? "Choose an entry from the contents, or use the arrows to turn the pages." : page.text;
  document.getElementById("right-heading").textContent = contents ? "Contents" : page.title;
  document.getElementById("left-page-number").textContent = contents ? "" : currentPage;
  document.getElementById("right-page-number").textContent = contents ? "" : currentPage + 1;
  const content = document.getElementById("page-content");
  if (contents) {
    book.pages.slice(1).forEach((entry, i) => {
      const button = document.createElement("button");
      button.className = "contents-link";
      button.type = "button";
      button.textContent = entry.title;
      button.addEventListener("click", () => goToPage(i + 1));
      content.appendChild(button);
    });
  } else {
    content.innerHTML = `<p class="page-continuation">${page.text}</p>`;
  }
  pageStatus.textContent = `Page ${currentPage + 1} of ${book.pages.length}`;
  prevPage.disabled = currentPage === 0;
  nextPage.disabled = currentPage === book.pages.length - 1;
}

function renderPage() {
  if (!activeBook) return;
  document.querySelector(".open-book").classList.remove("world-page-mode");
  if (activeBook === "archives") return renderArchive();
  if (activeBook === "waypoints") return renderWaypoints();
  if (activeBook === "worlds") {
    if (currentPage === 0) return renderWorlds();
    return renderWorldPage(books.worlds.worlds[currentPage - 1]);
  }
  return renderStandardBook(books[activeBook]);
}

function goToPage(pageNumber) {
  if (!activeBook) return;
  let max;
  if (activeBook === "archives") max = books.archives.photoSpreads.length;
  else if (activeBook === "waypoints") max = 0;
  else if (activeBook === "worlds") max = books.worlds.worlds.length;
  else max = books[activeBook].pages.length - 1;
  currentPage = Math.max(0, Math.min(pageNumber, max));
  renderPage();
}

function next() { goToPage(currentPage + 1); }
function previous() { goToPage(currentPage - 1); }

function openBook(bookKey) {
  if (!books[bookKey]) return;
  activeBook = bookKey;
  currentPage = 0;
  lastFocusedBook = document.querySelector(`[data-book="${bookKey}"]`);
  document.querySelector(".open-book").classList.toggle("archive-mode", bookKey === "archives");
  renderPage();
  reader.classList.add("is-open");
  reader.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => putAway.focus());
}

function closeBook() {
  reader.classList.remove("is-open");
  reader.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeBook = null;
  currentPage = 0;
  document.querySelector(".open-book").classList.remove("archive-mode", "world-page-mode");
  if (lastFocusedBook) lastFocusedBook.focus();
}

bookButtons.forEach(button => button.addEventListener("click", () => openBook(button.dataset.book)));
prevPage.addEventListener("click", previous);
nextPage.addEventListener("click", next);
putAway.addEventListener("click", closeBook);
reader.querySelector(".reader-backdrop").addEventListener("click", closeBook);

document.addEventListener("keydown", event => {
  if (!reader.classList.contains("is-open")) return;
  if (event.key === "Escape") return closeBook();
  if (event.key === "ArrowRight") { event.preventDefault(); next(); }
  if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
});
