# Dreamlands Respiratory — GitHub Pages starter

A static HTML/CSS/JavaScript Dreamlands library.

## Books

- **About the Dreamlands** — one informational page.
- **Dreamland Waypoints** — one page of external links only.
- **Dreamland Worlds** — index → world pages. Each world has info on the left, an image placeholder on the right, and an **Enter the dreamland** external link.
- **Dreamland Residents** — index with editable categories and character entries. Each character gets its own page.
- **Dreamland Archives** — cover/index opening spread followed by image-only photo spreads.

## Editing content

Open `script.js`. The `siteData` object at the top contains the editable content.

### Archives

Put photos in `images/archives/`, then update `siteData.archives.photoSpreads` with matching paths, e.g.:

```js
{ id: "spread-1", left: "images/archives/my-photo-01.jpg", right: "images/archives/my-photo-02.jpg", label: "Photo spread 1" }
```

The archive pages after the opening spread contain no captions or body text.

## GitHub Pages

Upload `index.html`, `style.css`, `script.js`, and the `images` folder to your repository. Then enable **Settings → Pages → Deploy from a branch**.
