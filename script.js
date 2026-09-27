/*
  DREAMLANDS CONTENT
  ===================
  Most of the site can be edited from this file.

  - About: one page of information.
  - Waypoints: add/remove link buttons in `links`.
  - Worlds: add worlds to `entries`; each world can have its own map link.
  - Residents: add categories, then characters inside each category.
  - Archives: add photo entries. Replace image paths with your own images later.
*/

const books = {
  about: {
    title: "About the Dreamlands",
    subtitle: "An introduction to the place between places.",
    mode: "single",
    page: {
      title: "About the Dreamlands",
      text: "This is the place for your general introduction to the Dreamlands. Replace this text with whatever lore, history, rules, or welcome message you would like visitors to read."
    }
  },

  waypoints: {
    title: "Dreamland Waypoints",
    subtitle: "Your collection of links to places in the Dreamlands.",
    mode: "links",
    links: [
      { title: "Example Waypoint", description: "Replace this with the name of a destination.", url: "https://example.com" },
      { title: "Another Waypoint", description: "Add as many waypoint buttons as you need.", url: "https://example.com" }
    ]
  },

  worlds: {
    title: "Dreamland Worlds",
    subtitle: "A catalogue of worlds waiting to be explored.",
    mode: "worlds",
    entries: [
      {
        title: "The Pale Coast",
        description: "An endless shoreline beneath a pearl-colored sky.",
        text: "Write everything you want visitors to know about this world here. This can become as long as you need it to be.",
        mapUrl: "https://example.com"
      },
      {
        title: "The Glass Forest",
        description: "A silent forest of translucent trees beneath a silver moon.",
        text: "Write the lore, locations, residents, rules, history, or anything else associated with this world here.",
        mapUrl: "https://example.com"
      }
    ]
  },

  residents: {
    title: "Dreamland Residents",
    subtitle: "A directory of the characters who inhabit the Dreamlands.",
    mode: "residents",
    categories: [
      {
        title: "Dreamers",
        description: "Visitors who enter the Dreamlands from elsewhere.",
        characters: [
          {
            title: "First Dreamer",
            description: "A placeholder character entry.",
            text: "Add this character's biography, appearance, personality, history, relationships, quotes, or any other details here."
          }
        ]
      },
      {
        title: "The Ferrymen",
        description: "Those who guide travelers across the rivers and crossings.",
        characters: [
          {
            title: "The Ferryman",
            description: "A placeholder resident entry.",
            text: "Add the character information here."
          }
        ]
      },
      {
        title: "The Librarians",
        description: "Keepers of the books and records of the Dreamlands.",
        characters: [
          {
            title: "The Archivist",
            description: "A placeholder resident entry.",
            text: "Add the character information here."
          }
        ]
      }
    ]
  },

  archives: {
    title: "Dreamland Archives",
    subtitle: "A photo book of fragments, memories, and things worth keeping.",
    mode: "archives",
    photos: [
      {
        title: "Archive Fragment I",
        caption: "Replace this placeholder with a photograph from the Dreamlands.",
        image: "images/archive-01.jpg"
      },
      {
        title: "Archive Fragment II",
        caption: "Add another photograph, illustration, screenshot, or other image here.",
        image: "images/archive-02.jpg"
      },
      {
        title: "Archive Fragment III",
        caption: "Keep adding entries to the photos array whenever you want another archive page.",
        image: "images/archive-03.jpg"
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

function setPageMeta(totalPages, page = 0) {
  pageStatus.textContent = totalPages > 1
    ? `Page ${page + 1} of ${totalPages}`
    : "Single page";

  prevPage.disabled = totalPages <= 1 || page === 0;
  nextPage.disabled = totalPages <= 1 || page === totalPages - 1;
  prevPage.hidden = totalPages <= 1;
  nextPage.hidden = totalPages <= 1;
}

function createActionButton(text, onClick, className = "index-action") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function renderSingleBook(book) {
  leftLabel.textContent = book.title;
  rightLabel.textContent = "Dreamlands Respiratory";
  leftPageNumber.textContent = "";
  rightPageNumber.textContent = "";
  bookTitle.textContent = book.page.title;
  bookSubtitle.textContent = book.subtitle;
  bookDescription.textContent = book.page.text;
  rightHeading.textContent = "A quiet beginning";
  bookIndex.innerHTML = `<p class="page-continuation">This volume is currently a single page. You can expand it later if you decide it needs more sections.</p>`;
  setPageMeta(1, 0);
}

function renderLinksBook(book) {
  leftLabel.textContent = book.title;
  rightLabel.textContent = "Waypoints";
  leftPageNumber.textContent = "";
  rightPageNumber.textContent = "";
  bookTitle.textContent = book.title;
  bookSubtitle.textContent = book.subtitle;
  bookDescription.textContent = "Choose a waypoint below. Each button can point to any URL you enter in the links list in script.js.";
  rightHeading.textContent = "Waypoints";
  bookIndex.innerHTML = "";

  book.links.forEach((link) => {
    const item = document.createElement("div");
    item.className = "link-entry";
    const button = document.createElement("a");
    button.className = "index-action link-button";
    button.href = link.url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.textContent = link.title;
    const description = document.createElement("p");
    description.textContent = link.description;
    item.append(button, description);
    bookIndex.appendChild(item);
  });

  setPageMeta(1, 0);
}

function renderWorldContents(book) {
  leftLabel.textContent = book.title;
  rightLabel.textContent = "Contents";
  leftPageNumber.textContent = "";
  rightPageNumber.textContent = "";
  bookTitle.textContent = book.title;
  bookSubtitle.textContent = book.subtitle;
  bookDescription.textContent = "Choose a world to open its dedicated page. Add more worlds to the entries array whenever you are ready.";
  rightHeading.textContent = "Worlds";
  bookIndex.innerHTML = "";

  book.entries.forEach((world, index) => {
    const item = document.createElement("div");
    item.className = "link-entry";
    const button = createActionButton(world.title, () => goToPage(index + 1));
    button.classList.add("link-button");
    const description = document.createElement("p");
    description.textContent = world.description;
    item.append(button, description);
    bookIndex.appendChild(item);
  });

  setPageMeta(book.entries.length + 1, 0);
}

function renderWorldPage(book, worldIndex) {
  const world = book.entries[worldIndex];
  leftLabel.textContent = book.title;
  rightLabel.textContent = world.title;
  leftPageNumber.textContent = worldIndex + 1;
  rightPageNumber.textContent = worldIndex + 1;
  bookTitle.textContent = world.title;
  bookSubtitle.textContent = world.description;
  bookDescription.textContent = world.text;
  rightHeading.textContent = "Explore this world";
  bookIndex.innerHTML = "";

  const mapNote = document.createElement("p");
  mapNote.className = "page-note";
  mapNote.textContent = "When you add your interactive map URL, visitors can enter this dream from the button below.";

  const mapLink = document.createElement("a");
  mapLink.className = "map-button";
  mapLink.href = world.mapUrl;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
  mapLink.textContent = "Enter this dream and explore";

  const backButton = createActionButton("← Back to worlds", () => goToPage(0), "secondary-action");
  bookIndex.append(mapNote, mapLink, backButton);
  setPageMeta(book.entries.length + 1, worldIndex + 1);
}

function renderResidentContents(book) {
  leftLabel.textContent = book.title;
  rightLabel.textContent = "Contents";
  leftPageNumber.textContent = "";
  rightPageNumber.textContent = "";
  bookTitle.textContent = book.title;
  bookSubtitle.textContent = book.subtitle;
  bookDescription.textContent = "Choose a category to browse its residents. Categories and characters can be added directly in script.js.";
  rightHeading.textContent = "Categories";
  bookIndex.innerHTML = "";

  book.categories.forEach((category, categoryIndex) => {
    const item = document.createElement("div");
    item.className = "link-entry";
    const button = createActionButton(category.title, () => goToPage(categoryPageNumber(book, categoryIndex)), "link-button");
    const description = document.createElement("p");
    description.textContent = `${category.description} · ${category.characters.length} character${category.characters.length === 1 ? "" : "s"}`;
    item.append(button, description);
    bookIndex.appendChild(item);
  });

  setPageMeta(getResidentTotalPages(book), 0);
}

function categoryPageNumber(book, categoryIndex) {
  let page = 1;
  for (let i = 0; i < categoryIndex; i++) {
    page += 1 + book.categories[i].characters.length;
  }
  return page;
}

function getResidentTotalPages(book) {
  return 1 + book.categories.reduce((total, category) => total + 1 + category.characters.length, 0);
}

function renderResidentCategory(book, categoryIndex) {
  const category = book.categories[categoryIndex];
  const pageNumber = categoryPageNumber(book, categoryIndex);

  leftLabel.textContent = book.title;
  rightLabel.textContent = category.title;
  leftPageNumber.textContent = pageNumber;
  rightPageNumber.textContent = pageNumber;
  bookTitle.textContent = category.title;
  bookSubtitle.textContent = category.description;
  bookDescription.textContent = "Choose a resident to open their individual entry.";
  rightHeading.textContent = "Residents";
  bookIndex.innerHTML = "";

  category.characters.forEach((character, characterIndex) => {
    const item = document.createElement("div");
    item.className = "link-entry";
    const button = createActionButton(character.title, () => goToPage(pageNumber + characterIndex + 1), "link-button");
    const description = document.createElement("p");
    description.textContent = character.description;
    item.append(button, description);
    bookIndex.appendChild(item);
  });

  const backButton = createActionButton("← Back to categories", () => goToPage(0), "secondary-action");
  bookIndex.appendChild(backButton);
  setPageMeta(getResidentTotalPages(book), pageNumber);
}

function getResidentCharacter(book, targetPage) {
  let page = 1;
  for (let categoryIndex = 0; categoryIndex < book.categories.length; categoryIndex++) {
    const category = book.categories[categoryIndex];
    const categoryPage = page;
    if (targetPage === categoryPage) {
      return null;
    }
    page += 1;
    for (let characterIndex = 0; characterIndex < category.characters.length; characterIndex++) {
      if (targetPage === page) {
        return { category, categoryIndex, character: category.characters[characterIndex], characterIndex, page };
      }
      page += 1;
    }
  }
  return undefined;
}

function renderResidentCharacter(book, targetPage) {
  const result = getResidentCharacter(book, targetPage);
  if (!result) return;

  const { category, character, categoryIndex, page } = result;
  leftLabel.textContent = category.title;
  rightLabel.textContent = character.title;
  leftPageNumber.textContent = page;
  rightPageNumber.textContent = page;
  bookTitle.textContent = character.title;
  bookSubtitle.textContent = character.description;
  bookDescription.textContent = character.text;
  rightHeading.textContent = "Character entry";
  bookIndex.innerHTML = "";

  const categoryButton = createActionButton(`← Back to ${category.title}`, () => goToPage(categoryPageNumber(book, categoryIndex)), "secondary-action");
  bookIndex.appendChild(categoryButton);
  setPageMeta(getResidentTotalPages(book), page);
}

function renderArchiveContents(book) {
  leftLabel.textContent = book.title;
  rightLabel.textContent = "Contents";
  leftPageNumber.textContent = "";
  rightPageNumber.textContent = "";
  bookTitle.textContent = book.title;
  bookSubtitle.textContent = book.subtitle;
  bookDescription.textContent = "A visual collection. Add another object to the photos array whenever you want another archive page.";
  rightHeading.textContent = "Archive";
  bookIndex.innerHTML = "";

  book.photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "link-entry";
    const button = createActionButton(photo.title, () => goToPage(index + 1), "link-button");
    const description = document.createElement("p");
    description.textContent = photo.caption;
    item.append(button, description);
    bookIndex.appendChild(item);
  });

  setPageMeta(book.photos.length + 1, 0);
}

function renderArchivePage(book, photoIndex) {
  const photo = book.photos[photoIndex];
  const page = photoIndex + 1;

  leftLabel.textContent = book.title;
  rightLabel.textContent = photo.title;
  leftPageNumber.textContent = page;
  rightPageNumber.textContent = page;
  bookTitle.textContent = photo.title;
  bookSubtitle.textContent = "Dreamland Archives";
  bookDescription.textContent = photo.caption;
  rightHeading.textContent = "Archive photograph";
  bookIndex.innerHTML = "";

  const image = document.createElement("img");
  image.className = "archive-image";
  image.src = photo.image;
  image.alt = photo.caption;
  image.onerror = () => {
    image.classList.add("image-missing");
    image.alt = "Placeholder for an archive photograph";
    image.replaceWith(createArchivePlaceholder(photo.title));
  };

  const backButton = createActionButton("← Back to archive", () => goToPage(0), "secondary-action");
  bookIndex.append(image, backButton);
  setPageMeta(book.photos.length + 1, page);
}

function createArchivePlaceholder(title) {
  const placeholder = document.createElement("div");
  placeholder.className = "archive-placeholder";
  placeholder.innerHTML = `<span>✦</span><strong>${title}</strong><small>Add your image at the path specified in script.js.</small>`;
  return placeholder;
}

function renderPage() {
  const book = books[activeBook];
  if (!book) return;

  if (book.mode === "single") {
    renderSingleBook(book);
    return;
  }

  if (book.mode === "links") {
    renderLinksBook(book);
    return;
  }

  if (book.mode === "worlds") {
    if (currentPage === 0) renderWorldContents(book);
    else renderWorldPage(book, currentPage - 1);
    return;
  }

  if (book.mode === "residents") {
    if (currentPage === 0) {
      renderResidentContents(book);
      return;
    }

    let pageCursor = 1;
    for (let categoryIndex = 0; categoryIndex < book.categories.length; categoryIndex++) {
      if (currentPage === pageCursor) {
        renderResidentCategory(book, categoryIndex);
        return;
      }
      pageCursor += 1;
      const characterCount = book.categories[categoryIndex].characters.length;
      if (currentPage < pageCursor + characterCount) {
        renderResidentCharacter(book, currentPage);
        return;
      }
      pageCursor += characterCount;
    }
    return;
  }

  if (book.mode === "archives") {
    if (currentPage === 0) renderArchiveContents(book);
    else renderArchivePage(book, currentPage - 1);
  }
}

function getTotalPages(book) {
  if (book.mode === "single" || book.mode === "links") return 1;
  if (book.mode === "worlds") return book.entries.length + 1;
  if (book.mode === "residents") return getResidentTotalPages(book);
  if (book.mode === "archives") return book.photos.length + 1;
  return 1;
}

function goToPage(pageNumber) {
  if (!activeBook) return;
  const totalPages = getTotalPages(books[activeBook]);
  currentPage = Math.max(0, Math.min(pageNumber, totalPages - 1));
  renderPage();
}

function next() {
  goToPage(currentPage + 1);
}

function previous() {
  goToPage(currentPage - 1);
}

function openBook(bookKey) {
  if (!books[bookKey]) return;

  activeBook = bookKey;
  currentPage = 0;
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
