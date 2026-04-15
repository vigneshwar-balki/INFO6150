# Vigneshwar Balakrishnan — Portfolio

Single-page portfolio website. Two files: `index.html` + `styles.css`.

## Setup

Open `index.html` directly in any modern browser. No server, no build step required.

---

## HTML Tags Used

| Tag | Purpose |
|---|---|
| `<!DOCTYPE html>` | Declares the document as HTML5 |
| `<html lang="en">` | Root element; `lang` attribute aids screen readers |
| `<head>` | Container for metadata, links, and title |
| `<meta charset="UTF-8">` | Sets character encoding to UTF-8 |
| `<meta name="viewport">` | Enables responsive scaling on mobile devices |
| `<title>` | Sets the browser tab / bookmark title |
| `<link rel="icon">` | Inline SVG favicon via data URI |
| `<link rel="preconnect">` | Pre-connects to Google Fonts origin for faster load |
| `<link rel="stylesheet">` | Links external `styles.css` file |
| `<body>` | All visible page content |
| `<header>` | Sticky site header containing logo + nav |
| `<nav>` | Semantic navigation landmark (primary nav, footer nav) |
| `<a>` | Hyperlinks — anchor jump links, mailto, tel, external URLs |
| `<button>` | Hamburger menu toggle (accessible, keyboard-operable) |
| `<main>` | Primary content landmark wrapper |
| `<section>` | Thematic page sections (hero, about, experience, skills…) |
| `<article>` | Self-contained experience entries (Purplegrids, Auxo Labs) |
| `<aside>` | Supplementary quick-facts panel inside About section |
| `<h1>` | Top-level page heading — hero title |
| `<h2>` | Section headings (About, Experience, Skills, etc.) |
| `<h3>` | Company names and education school names |
| `<h4>` | Sub-project names inside Auxo Labs article |
| `<p>` | Body paragraphs, descriptions, metadata text |
| `<ul>` | Unordered lists — experience bullet points |
| `<li>` | Individual list items inside `<ul>` |
| `<div>` | Generic layout containers, stat pills, contact items |
| `<span>` | Inline elements — role badges, tech tags, logo text |
| `<strong>` | Bold emphasis inside stat pills (numbers) |
| `<address>` | Semantic wrapper for contact information |
| `<form>` | Contact form |
| `<label>` | Accessible label associated with each form input |
| `<input type="text">` | Full Name and Subject fields |
| `<input type="email">` | Email field with built-in format validation |
| `<textarea>` | Multi-line Message field |
| `<table>` | Skills table and Quick Facts table |
| `<thead>` | Skills table header group |
| `<tbody>` | Skills table body group |
| `<tr>` | Table row |
| `<th scope="col">` | Column header cell — Category and Technologies |
| `<td>` | Table data cell |
| `<figure>` | Gallery image + caption semantic wrapper |
| `<figcaption>` | Overlay caption that slides up on hover |
| `<img>` | Gallery project images (picsum.photos) + QR code |
| `<blockquote>` | Testimonial quote text |
| `<footer>` | Site footer with logo, nav, socials, copyright |
| `<svg>` | All icons — email, phone, location, GitHub, LinkedIn, arrows |
| `<path>` | SVG path shapes inside icon SVGs |
| `<rect>` | SVG rectangle (email envelope body) |
| `<circle>` | SVG circle (location pin) |
| `<script>` | Inline JS for mobile nav hamburger toggle only |

---

## CSS Selectors

| Selector | Where | What it does |
|---|---|---|
| `:root` | Global | Defines all CSS custom properties (design tokens) |
| `*`, `*::before`, `*::after` | Global | Universal reset — box-sizing, margin, padding |
| `body` | Global | Background, font-family, line-height, antialiasing |
| `::selection` | Global | Purple highlight when user selects text |
| `a` | Global | Removes default underline and inherits color |
| `header` | Navbar | Sticky positioning, glass backdrop-filter, border |
| `.navbar` | Navbar | Flexbox row — logo left, nav center, CTA right |
| `.logo-circle` | Navbar/Footer | Purple gradient avatar circle for VB initials |
| `nav a:hover` | Navbar | Purple-tinted background on nav link hover |
| `.btn-hire` | Navbar | Purple gradient Hire Me button |
| `.nav-toggle` | Navbar | Hamburger button — hidden on desktop |
| `nav.open` | Navbar | Shows mobile nav dropdown when toggled |
| `#hero::before` | Hero | Radial gradient purple orb background decoration |
| `.hero-eyebrow::before` | Hero | Pulsing green dot before "Available" pill |
| `.hero-heading .word-gradient` | Hero | `background-clip: text` gradient on "UI Developer" |
| `.btn-primary:hover` | Buttons | Lifts button + adds purple shadow on hover |
| `.btn-ghost:hover` | Buttons | Shows purple border + tinted background |
| `.exp-article` | Experience | `border-left: 3px solid purple` timeline bar |
| `.exp-article:hover` | Experience | Changes border to teal + `translateX(4px)` shift |
| `.exp-article::before` | Experience | Absolute-positioned purple dot on timeline |
| `.exp-article:hover::before` | Experience | Dot turns teal on article hover |
| `.tech-tag` | Experience | Teal pill badges for technology names |
| `.sub-project` | Experience | Nested project card inside Auxo article |
| **`tr:nth-child(even)`** | **Skills** | **SELECTOR 1 — alternating row background (purple tint)** |
| **`tr:hover`** | **Skills** | **SELECTOR 2 — highlights entire row on hover** |
| `.skills-table th` | Skills | Purple header with white bold text |
| `.skills-table td:first-child` | Skills | Teal color + medium weight for category column |
| `.edu-timeline::before` | Education | Vertical gradient line connecting timeline dots |
| `.edu-item::before` | Education | Purple dot positioned on the timeline line |
| `.gallery-grid figure:hover img` | Gallery | `scale(1.08)` zoom on hover |
| `.gallery-grid figure:hover figcaption` | Gallery | Slides figcaption up from `bottom: -100%` to `bottom: 0` |
| `.testimonial-card:hover` | Testimonials | `translateY(-8px)` lift + purple glow shadow |
| `.form-group input:focus` | Contact | Purple border + glow ring on input focus |
| `.qr-section` | Contact | Subtle purple-tinted box for QR code |
| `.footer-socials a:hover` | Footer | Purple tint background on social icon hover |
| `@media (max-width: 768px)` | Responsive | iPad breakpoint — stacks layout, hides nav |
| `@media (max-width: 375px)` | Responsive | iPhone breakpoint — single column, smaller type |

---

## Flexbox Properties Used

| Property | Value(s) | Where used |
|---|---|---|
| `display: flex` | — | Navbar, hero CTAs, stats, about columns, experience header, tech tags, contact items, testimonials grid, footer |
| `flex-direction` | `row`, `column` | Switches between horizontal and vertical layouts |
| `align-items` | `center`, `flex-start` | Vertical alignment within flex containers |
| `justify-content` | `space-between`, `center`, `flex-start` | Horizontal distribution |
| `flex-wrap` | `wrap` | Gallery, testimonials, hero stats, footer nav — reflow on small screens |
| `gap` | Various rem/px values | Spacing between flex children without margins |
| `flex` | `1 1 calc(33.33% - 16px)` | Gallery figures — 3 columns with flex basis |
| `flex` | `1 1 280px` | Testimonial cards — min 280px, grow/shrink freely |
| `flex` | `0 0 42%` | Contact info column — fixed 42% width |
| `flex: 1` | — | Contact form column — fills remaining space |
| `flex-shrink: 0` | — | Avatars and icons — prevent squishing |
| `flex: 0 0 60%` | — | About text column |

---

## Media Query Breakpoints

| Breakpoint | Target | Changes |
|---|---|---|
| `max-width: 768px` | iPad / tablet | Nav links hidden → hamburger toggle shown; `.btn-hire` hidden; hero `font-size: 48px`; about columns stack vertically; experience headers stack; gallery → 2 columns; testimonials stack; contact stacks; section padding reduced to `4rem` |
| `max-width: 375px` | iPhone / small mobile | Logo name hidden; hero `font-size: 36px`; CTA buttons stack full-width; hero stats stack; gallery → 1 column; testimonials 1 column; skills table `overflow-x: auto` + smaller font; QR code shrinks to 120px; all container padding reduced to `1rem`; section padding `3rem` |

---

## Design Choices

**Dark editorial aesthetic** — `#080810` deep black background creates a premium, editorial feel. Avoids flat-grey "dark mode" clichés by using a cool blue-black tone that photographs well.

**Syne + Inter pairing** — Syne (geometric display, 700/800) for headings brings personality without being trendy. Inter (400/500) for body text is the most readable screen font at small sizes. Together they read as "senior developer who cares about craft."

**Purple + Teal palette** — `#6c63ff` electric purple as primary accent (confident, technical) with `#00d4aa` teal as secondary (approachable, creative). Orange `#ff8c00` used only for one avatar to prevent it from competing.

**Purple orb on hero** — Large radial gradient orb replaces stock illustrations. Gives depth without imagery, loads instantly, and scales perfectly at any viewport.

**`border-left` experience timeline** — More legible than icon-based timelines. The 3px left border gives clear visual rhythm. Hover shift (`translateX(4px)`) rewards interaction without being distracting.

**`background-clip: text` gradient** — Used sparingly on the hero headline only. Overusing gradient text is a red flag on senior portfolios — here it's confined to one phrase so it reads as intentional.

**Figcaption slide-up** — `bottom: -100%` → `bottom: 0` on hover is a classic technique that works because the `overflow: hidden` on `<figure>` does the clipping — no JavaScript needed.

**QR code** — Points to `vigu.me`. Color-matched to the palette via the `qrserver.com` API parameters (`bgcolor=0f0f1a&color=6c63ff`). Adds a physical-digital bridge for printed resumes.
