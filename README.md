# Dreamlands Respiratory

A static HTML/CSS/JavaScript starter for GitHub Pages.

## Current features

- Dusty rose visual theme
- Responsive bookshelf landing page
- Hover-to-pull book interaction
- Five Dreamlands books
- Interactive open-book reader
- Multiple pages in every book
- Previous/next arrow buttons
- Left/right keyboard navigation
- Clickable table of contents that jumps to chapters
- Escape key and "Put this book away" close the reader
- No framework or build step

## GitHub Pages

1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, and `script.js`.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select the branch containing the files and the `/ (root)` folder.
5. Save and wait for GitHub Pages to publish the site.

The chapter text in `script.js` is placeholder content and can be replaced with the actual Dreamlands material later.


## Dreamland Archives

The Archives book is a photo album. The opening spread is the cover and index; every following turn is a text-free two-photo spread.

Put your images in `images/archives/` and update the `photoSpreads` array in `script.js`:

```js
photoSpreads: [
  { left: "images/archives/my-photo-01.jpg", right: "images/archives/my-photo-02.jpg" },
  { left: "images/archives/my-photo-03.jpg", right: "images/archives/my-photo-04.jpg" }
]
```

Add as many spreads as you want. Use JPG, PNG, or WebP files.
