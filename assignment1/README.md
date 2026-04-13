# Dasara Festival Archives — The Royal Chronicle

An independent heritage archive site documenting the royal Mysore Dasara festival, crafted with a vintage, regal aesthetic. This is a passionate historian's digital archive — not an official government site.

---

## Setup Instructions

1. Clone or download this repository.
2. Open `assignment1/index.html` directly in any modern web browser (Chrome, Firefox, Safari, Edge).
3. No build tools, no server, no dependencies — it works straight from the file system.
4. Internet connection required to load Google Fonts and placeholder images from picsum.photos.

---

## Design Choices

### Aesthetic
**Vintage heritage / aged parchment** — the site is designed to evoke the feeling of a leather-bound archival ledger or a heritage newspaper. Background texture is simulated via CSS `repeating-linear-gradient` noise patterns rather than external image assets, keeping the site self-contained.

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Royal Purple | `#1a0a2e` | Header, nav hover, footer background |
| Mysore Gold | `#c9920a` | All accent borders, headings, ornaments |
| Parchment | `#f5e6c8` | Page background, card backgrounds |
| Crimson | `#8b1a1a` | Article left-border accent, CTAs |
| Dark Brown | `#2d1b00` | Body text, nav foreground |

### Typography
- **Playfair Display** (Google Fonts) — all headings, labels, nav items. A high-contrast serif that evokes 19th-century newspaper mastheads.
- **Lora** (Google Fonts) — body text, captions, form fields. A contemporary serif optimised for on-screen reading with a classical feel.

### Layout
CSS Grid is used for the main two-column layout (70% content + 30% sidebar). The aside is `position: sticky` on desktop, floating alongside the main content. On screens ≤ 900px it collapses to a single column.

### Ornamental System
- Section dividers: `::before` pseudo-elements with `content: '— ✦ ✦ ✦ —'`
- Section headings: `::before` with a fleuron (`❧`) and `::after` with a gradient underline bar
- Header and footer: gradient bars via `::before`/`::after`
- Chronicle card tops: tri-color gradient stripe via `::before`

---

## HTML Tags Used

| Tag | Description |
|-----|-------------|
| `<!DOCTYPE html>` | Declares the document as HTML5 |
| `<html>` | Root element of the HTML document |
| `<head>` | Container for metadata, links, and title |
| `<meta>` | Document metadata (charset, viewport) |
| `<title>` | Browser tab/window title |
| `<link>` | Links external resources — stylesheet and Google Fonts |
| `<body>` | All visible page content |
| `<header>` | Site-level header with logo and tagline |
| `<nav>` | Primary navigation and footer social navigation |
| `<ul>` | Unordered list — navigation items, contact list, social links |
| `<li>` | List item inside `<ul>` |
| `<a>` | Hyperlink — navigation, tel:, mailto:, social, event links |
| `<main>` | Primary content area of the page |
| `<section>` | Thematic content groupings (history, chronicles, gallery, etc.) |
| `<aside>` | Complementary Quick Facts sidebar |
| `<article>` | Self-contained chronicle entries and event cards |
| `<h1>` | Site title in the header |
| `<h2>` | Section headings and aside heading |
| `<h3>` | Article titles, media subtitles, event titles, archive note title |
| `<p>` | Body paragraphs throughout |
| `<figure>` | Image + caption containers in history, chronicles, gallery |
| `<figcaption>` | Descriptive captions for all figures |
| `<img>` | Placeholder images from picsum.photos |
| `<time>` | Machine-readable dates on chronicle articles and events |
| `<em>` | Italic emphasis on festival terminology and Latin phrases |
| `<strong>` | Strong importance on key facts in the sidebar and did-you-know |
| `<abbr>` | Abbreviation — `AD` in Quick Facts |
| `<table>` | Historical timeline data table |
| `<caption>` | Accessible caption describing the table's content |
| `<thead>` | Table header row group |
| `<tbody>` | Table body row group |
| `<tr>` | Table row |
| `<th>` | Table header cell (with `scope` attribute) |
| `<td>` | Table data cell |
| `<dl>` | Definition list for Quick Facts key-value pairs |
| `<dt>` | Definition term (fact label) |
| `<dd>` | Definition description (fact value) |
| `<details>` | Collapsible "Did you know?" disclosure widget |
| `<summary>` | Visible toggle label for the `<details>` element |
| `<audio>` | Embedded audio player for Nagaswara music |
| `<video>` | Embedded video player for Jamboo Savari footage |
| `<source>` | Media source files for `<audio>` and `<video>` with MIME types |
| `<form>` | Contact / memory submission form |
| `<label>` | Accessible labels linked to each form control |
| `<input>` | Form inputs — text, email, password, and datalist-linked text |
| `<datalist>` | City suggestions list linked to the city input |
| `<option>` | Individual datalist options (Mysore, Bangalore, Chennai, etc.) |
| `<textarea>` | Multi-line memory text input |
| `<button>` | Form submit button |
| `<div>` | Generic layout containers (header-inner, content-wrapper, grids, etc.) |
| `<span>` | Inline containers — header elephant emblems, footer separator |
| `<footer>` | Site-level footer with copyright, contacts, and social links |

---

## File Structure

```
assignment1/
├── index.html   — Single-page HTML document (all content)
├── styles.css   — External stylesheet (NO inline styles used)
└── README.md    — This file
```

---

## Notes

- All styles are in `styles.css` only. Zero inline styles are used in `index.html`.
- `<audio>` and `<video>` reference local paths (`audio/` and `video/` subdirectories) which are not included. The browser will show the fallback text if the files are absent.
- Images use `https://picsum.photos` with unique seeds for deterministic placeholder images.
- The site is fully responsive: 3-column gallery collapses to 2 on tablet and 1 on mobile; the 2-column grid collapses to 1 column on screens ≤ 900 px.
