const books = {
  about: {
    title: "About the Dreamlands",
    subtitle: "A field guide to the place between places.",
    description: "An introduction to the Dreamlands: its strange geography, its rhythms, and the quiet rules that seem to govern a world that refuses to stay still.",
    index: ["The Threshold", "A Brief History", "The Geography of Sleep", "Rules of the Dreamlands", "A Note for New Visitors"]
  },
  waypoints: {
    title: "Dreamland Waypoints",
    subtitle: "Landmarks for those who have lost the road.",
    description: "A collection of recurring landmarks, crossings, doors, stations, and other places that can help a wandering dreamer find their bearings.",
    index: ["The Lantern Stair", "The Sleeping Station", "The Rosewater Bridge", "The House at the End of the Path", "Unmarked Crossings"]
  },
  worlds: {
    title: "Dreamland Worlds",
    subtitle: "A catalogue of places that should not exist.",
    description: "Descriptions of the many worlds nested within the Dreamlands, from familiar landscapes rendered strangely to impossible realms with their own skies and seasons.",
    index: ["The Pale Coast", "The Glass Forest", "The City Beneath the Moon", "The Endless Garden", "Worlds Yet Unnamed"]
  },
  residents: {
    title: "Dreamland Residents",
    subtitle: "A modest directory of those who dwell there.",
    description: "Notes on the people, creatures, wanderers, guides, and mysterious inhabitants encountered throughout the Dreamlands.",
    index: ["The Ferrymen", "The Librarians", "The Night Gardeners", "The Housekeepers", "Those Who Have Forgotten"]
  },
  archives: {
    title: "Dreamland Archives",
    subtitle: "Fragments recovered from older dreams.",
    description: "A living archive of old accounts, fragments, curiosities, and records that do not quite belong to any single corner of the Dreamlands.",
    index: ["Recovered Accounts", "Lost Maps", "Uncatalogued Objects", "Dreamer Records", "The Locked Cabinet"]
  }
};

const reader = document.getElementById("reader");
const bookTitle = document.getElementById("book-title");
const bookSubtitle = document.getElementById("book-subtitle");
const bookDescription = document.getElementById("book-description");
const bookIndex = document.getElementById("book-index");
const putAway = document.getElementById("put-away");
const bookButtons = document.querySelectorAll(".book");
let lastFocusedBook = null;

function openBook(bookKey) {
  const book = books[bookKey];
  if (!book) return;

  bookTitle.textContent = book.title;
  bookSubtitle.textContent = book.subtitle;
  bookDescription.textContent = book.description;
  bookIndex.innerHTML = "";

  book.index.forEach((entry) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = entry;
    button.addEventListener("click", () => {
      bookDescription.textContent = `${entry} — this chapter is ready for your own Dreamlands notes and stories.`;
    });
    li.appendChild(button);
    bookIndex.appendChild(li);
  });

  reader.classList.add("is-open");
  reader.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => putAway.focus());
}

function closeBook() {
  reader.classList.remove("is-open");
  reader.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedBook) lastFocusedBook.focus();
}

bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lastFocusedBook = button;
    openBook(button.dataset.book);
  });
});

putAway.addEventListener("click", closeBook);

reader.querySelector(".reader-backdrop").addEventListener("click", closeBook);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && reader.classList.contains("is-open")) {
    closeBook();
  }
});
