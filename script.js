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
  waypoints: {
    title: "Dreamland Waypoints",
    subtitle: "Landmarks for those who have lost the road.",
    pages: [
      { title: "Contents", type: "contents" },
      { title: "The Lantern Stair", text: "A narrow staircase lit by warm lanterns. It has been found beneath theatres, behind kitchens, and once in the middle of a field. Count the steps only if you want to arrive somewhere different." },
      { title: "The Sleeping Station", text: "A railway station where every clock shows a different hour. Trains arrive quietly and leave even more quietly. The destination boards are often more helpful than the tickets." },
      { title: "The Rosewater Bridge", text: "An arched bridge spanning a river that reflects memories rather than faces. Travelers often cross it carrying something they did not realize they had brought with them." },
      { title: "The House at the End of the Path", text: "There is always a path to this house, though it is rarely the same path twice. Someone inside is usually waiting. Whether they are waiting for you is another question." },
      { title: "Unmarked Crossings", text: "Some waypoints have no name at all. A change in weather, a sudden silence, or a familiar object in an unfamiliar place can be enough to mark the crossing." }
    ]
  },
  worlds: {
    title: "Dreamland Worlds",
    subtitle: "A catalogue of places that should not exist.",
    pages: [
      { title: "Contents", type: "contents" },
      { title: "The Pale Coast", text: "An endless shoreline beneath a pearl-colored sky. The tide arrives with whispers, and footprints sometimes continue long after the person who made them has gone." },
      { title: "The Glass Forest", text: "Trees of translucent bark grow beneath a silver moon. Nothing rustles here. Instead, the forest rings softly whenever the wind changes direction." },
      { title: "The City Beneath the Moon", text: "A city of narrow streets and tall windows, built beneath a moon so large it seems close enough to touch. Its residents leave their doors open after midnight." },
      { title: "The Endless Garden", text: "A garden whose paths rearrange themselves according to the visitor's memories. Every flower has a name, though very few can be translated into waking languages." },
      { title: "Worlds Yet Unnamed", text: "Beyond the known worlds are places still waiting to be noticed. Their first visitors may be the ones who give them their names." }
    ]
  },
  residents: {
    title: "Dreamland Residents",
    subtitle: "A modest directory of those who dwell there.",
    pages: [
      { title: "Contents", type: "contents" },
      { title: "The Ferrymen", text: "Quiet figures who operate boats along dream-rivers. They rarely speak, but they always seem to know which shore a traveler is trying to reach." },
      { title: "The Librarians", text: "Keepers of books that contain memories, possible futures, and stories that have not yet been told. They prefer questions to answers." },
      { title: "The Night Gardeners", text: "They tend flowers that bloom only while someone is dreaming. Their tools are made from old keys, silver spoons, and pieces of forgotten weather." },
      { title: "The Housekeepers", text: "They maintain the rooms between dreams. A Housekeeper may appear ordinary until you notice they have been carrying the same key for several hundred years." },
      { title: "Those Who Have Forgotten", text: "Some residents once arrived as dreamers and simply never found the way back. They have built lives here, and not all of them wish to be remembered." }
    ]
  },
  archives: {
    title: "Dreamland Archives",
    subtitle: "A visual record of things worth remembering.",
    // Add more photo spreads here. Each spread can contain one or two images.
    // Replace the example paths with your own files, e.g. images/archives/dream-01.jpg
    photoSpreads: [
      {
        left: "images/archives/photo-01.jpg",
        right: "images/archives/photo-02.jpg"
      },
      {
        left: "images/archives/photo-03.jpg",
        right: "images/archives/photo-04.jpg"
      },
      {
        left: "images/archives/photo-05.jpg",
        right: "images/archives/photo-06.jpg"
      }
    ]
  }
};

const reader = document.getElementById("reader");
const bookTitle = document.getElementById("book-title");
const bookSubtitle = document.getElementById("book-subtitle");
const bookDescription = document.getElementById("book-description");
const bookIndex = document.getElementById("page-content");
const rightHeading = document.getElementById("right-heading");
const leftLabel = document.getElementById("left-label");
const rightLabel = document.getElementById("right-label");
const leftPageNumber = document.getElementById("left-page-number");
const rightPageNumber = document.getElementById("right-page-number");
const pageStatus = document.getElementById("page-status");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");
const putAway = document.getElementById("put-away");
const bookButtons = document.querySelectorAll(".book");

let activeBook = null;
let currentPage = 0;
let lastFocusedBook = null;

function renderContents(book) {
  bookIndex.innerHTML = "";

  if (book.archiveIndex) {
    book.archiveIndex.forEach((entry, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = entry;
      button.addEventListener("click", () => goToPage(index + 1));
      li.appendChild(button);
      bookIndex.appendChild(li);
    });
    return;
  }

  book.pages.slice(1).forEach((page, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = page.title;
    button.addEventListener("click", () => goToPage(index + 1));
    li.appendChild(button);
    bookIndex.appendChild(li);
  });
}

function renderArchiveSpread(book, spreadIndex) {
  const spread = book.photoSpreads[spreadIndex];
  if (!spread) return;

  document.querySelector(".left-page .page-inner").innerHTML = `
    <div class="photo-page-frame">
      <img class="archive-photo" src="${spread.left}" alt="" onerror="this.classList.add('image-missing')">
      <div class="archive-photo-placeholder" aria-hidden="true"></div>
    </div>
  `;

  document.querySelector(".right-page .page-inner").innerHTML = `
    <div class="photo-page-frame">
      <img class="archive-photo" src="${spread.right}" alt="" onerror="this.classList.add('image-missing')">
      <div class="archive-photo-placeholder" aria-hidden="true"></div>
    </div>
  `;
}

function restoreStandardPages() {
  document.querySelector(".left-page .page-inner").innerHTML = `
    <span class="page-label" id="left-label">Dreamlands Respiratory</span>
    <div class="page-ornament">✦</div>
    <h2 id="book-title">Book title</h2>
    <p id="book-subtitle" class="page-subtitle">A volume from the quiet shelves.</p>
    <div class="page-divider"></div>
    <p id="book-description">Select an entry from the index to begin exploring this volume.</p>
    <div class="page-footer-number" id="left-page-number"></div>
  `;
  document.querySelector(".right-page .page-inner").innerHTML = `
    <span class="page-label" id="right-label">Contents</span>
    <h3 id="right-heading">Contents</h3>
    <div id="page-content" class="page-content"></div>
    <div class="page-footer-number" id="right-page-number"></div>
  `;
}

function renderPage() {
  const book = books[activeBook];
  if (!book) return;

  const isArchive = activeBook === "archives";

  if (isArchive && currentPage > 0) {
    renderArchiveSpread(book, currentPage - 1);
    pageStatus.textContent = `Photo spread ${currentPage} of ${book.photoSpreads.length}`;
    prevPage.disabled = currentPage === 0;
    nextPage.disabled = currentPage === book.photoSpreads.length;
    return;
  }

  if (isArchive) {
    restoreStandardPages();
  }

  // Rebind references after restoring the standard page markup.
  const titleEl = document.getElementById("book-title");
  const subtitleEl = document.getElementById("book-subtitle");
  const descriptionEl = document.getElementById("book-description");
  const indexEl = document.getElementById("page-content");
  const headingEl = document.getElementById("right-heading");
  const leftLabelEl = document.getElementById("left-label");
  const rightLabelEl = document.getElementById("right-label");
  const leftNumberEl = document.getElementById("left-page-number");
  const rightNumberEl = document.getElementById("right-page-number");

  const pageList = isArchive ? [{ title: "Contents", type: "contents" }] : book.pages;
  const page = pageList[currentPage];
  const isContents = currentPage === 0;

  leftLabelEl.textContent = book.title;
  rightLabelEl.textContent = isContents ? "Contents" : "Dreamlands Respiratory";
  leftNumberEl.textContent = currentPage === 0 ? "" : currentPage;
  rightNumberEl.textContent = isContents ? "" : currentPage + 1;

  if (isArchive) {
    pageStatus.textContent = "Front cover & contents";
    titleEl.textContent = book.title;
    subtitleEl.textContent = book.subtitle;
    descriptionEl.textContent = "";
    headingEl.textContent = "Contents";
    indexEl.innerHTML = "";
    book.photoSpreads.forEach((_, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = `Photo spread ${index + 1}`;
      button.addEventListener("click", () => goToPage(index + 1));
      li.appendChild(button);
      indexEl.appendChild(li);
    });
    prevPage.disabled = true;
    nextPage.disabled = book.photoSpreads.length === 0;
    return;
  }

  pageStatus.textContent = `Page ${currentPage + 1} of ${book.pages.length}`;

  if (isContents) {
    titleEl.textContent = book.title;
    subtitleEl.textContent = book.subtitle;
    descriptionEl.textContent = "Choose a chapter from the contents, or use the arrows to turn the pages.";
    headingEl.textContent = "Contents";
    indexEl.innerHTML = "";
    renderContents(book);
  } else {
    titleEl.textContent = page.title;
    subtitleEl.textContent = book.subtitle;
    descriptionEl.textContent = page.text;
    headingEl.textContent = page.title;
    indexEl.innerHTML = `<p class="page-continuation">${page.text}</p>`;
  }

  prevPage.disabled = currentPage === 0;
  nextPage.disabled = currentPage === book.pages.length - 1;
}
function goToPage(pageNumber) {
  if (!activeBook) return;
  const totalPages = books[activeBook].pages.length;
  currentPage = Math.max(0, Math.min(pageNumber, totalPages - 1));
  renderPage();
}

function next() {
  if (!activeBook) return;
  goToPage(currentPage + 1);
}

function previous() {
  if (!activeBook) return;
  goToPage(currentPage - 1);
}

function openBook(bookKey) {
  if (!books[bookKey]) return;

  activeBook = bookKey;
  currentPage = 0;
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
  document.querySelector(".open-book").classList.remove("archive-mode");
  if (lastFocusedBook) lastFocusedBook.focus();
}

bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lastFocusedBook = button;
    openBook(button.dataset.book);
  });
});

prevPage.addEventListener("click", previous);
nextPage.addEventListener("click", next);
putAway.addEventListener("click", closeBook);
reader.querySelector(".reader-backdrop").addEventListener("click", closeBook);

document.addEventListener("keydown", (event) => {
  if (!reader.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    closeBook();
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    next();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    previous();
  }
});
