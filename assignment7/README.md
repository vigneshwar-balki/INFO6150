# Melodiq — Your Music, Your Mood

A mood-based music playlist SaaS — two-page website built with SCSS and vanilla JS.

## Pages

| File | Description |
|---|---|
| `index.html` | Landing page — hero, features, how-it-works, mood showcase, testimonials, CTA, footer |
| `playlists.html` | Playlist explorer — search, filter, sort, drag-reorder, modal, create form, live preview |

## Setup

```bash
# Compile SCSS
sass scss/main.scss css/main.css --style=compressed

# Watch mode
sass scss/main.scss css/main.css --watch
```

Open `index.html` in a browser. No build step required beyond SCSS compilation.

## SCSS Architecture

```
scss/
├── main.scss                   # @use entry point + :root custom properties
├── abstracts/
│   ├── _variables.scss         # Maps: $colors, $fonts, $spacing, $breakpoints, $radii, $transitions, $moods
│   ├── _functions.scss         # rem(), z(), mood-opacity()
│   ├── _mixins.scss            # respond-to, flex-layout, card-glow, gradient-text, glass-effect
│   └── _placeholders.scss      # %flex-center, %card-base, %section-padding, %gradient-border, %glass-card
├── base/
│   ├── _reset.scss             # Box-sizing, body, element resets
│   └── _typography.scss        # Display headings, section titles, gradient text utilities
├── layout/
│   ├── _navbar.scss            # Sticky glass navbar with gradient brand name
│   ├── _grid.scss              # Container, grid utilities, section wrapper
│   └── _footer.scss            # 4-col CSS Grid footer
├── components/
│   ├── _buttons.scss           # .btn variants (primary, secondary, ghost, blue, sm, lg, icon)
│   ├── _cards.scss             # Feature cards, mood cards (@each), playlist cards, testimonial cards
│   ├── _forms.scss             # .input, .textarea, .select, search bar, CTA form, toggle, cover options
│   ├── _hero.scss              # Hero section + CSS music player mockup + playlists-hero
│   └── _modal.scss             # Full-screen overlay modal with animation
└── pages/
    ├── _home.scss              # Features, how-it-works, mood showcase, testimonials, CTA sections
    └── _playlists.scss         # Filter bar, sort bar, featured playlist, grid, live preview, create form
```

## SASS Features Used

### 1. Variables — Maps
```scss
$colors: ('pink': #ff006e, 'purple': #8338ec, ...);
$fonts: ('heading': "'Syne', sans-serif", 'body': "'Inter', sans-serif");
$spacing: ('xs': 0.25rem, 'sm': 0.5rem, 'md': 1rem, ...);
$breakpoints: ('sm': 480px, 'md': 768px, 'lg': 1024px, 'xl': 1280px);
$radii: ('sm': 4px, 'md': 8px, 'full': 9999px, ...);
$transitions: ('fast': 0.15s ease, 'normal': 0.25s ease, 'spring': 0.3s cubic-bezier(...));
$moods: ('happy': (#ff006e, #ff8c00), 'chill': (#3a86ff, #00d4aa), ...);  // 8 moods
```

### 2. Custom Properties — `#{}` Interpolation (31 uses)
```scss
:root {
  --color-pink:    #{map.get(vars.$colors, 'pink')};
  --font-heading:  #{map.get(vars.$fonts, 'heading')};
  --spacing-xl:    #{map.get(vars.$spacing, 'xl')};
  ...
}
```

### 3. Nesting — 3+ levels throughout
```scss
.navbar {
  &__links {
    a {
      &::after { ... }
      &:hover { &::after { width: 100%; } }
    }
  }
}
```

### 4. Placeholders — `@extend` (37 total uses across 8+ components)
```scss
%flex-center      → 18 uses
%card-base        →  9 uses
%section-padding  →  6 uses
%gradient-border  →  2 uses
%glass-card       →  2 uses
```

### 5. Mixins — each used 3+ times
```scss
@include mix.respond-to('md')      // 33 uses — breakpoint media queries
@include mix.flex-layout(...)      // 34 uses — flex shorthand
@include mix.gradient-text(...)    // 11 uses — background-clip text gradient
@include mix.glass-effect(...)     //  4 uses — backdrop-filter glass
@include mix.card-glow(...)        //  1 use  — hover box-shadow glow
```

### 6. Functions
```scss
fn.rem(16)            → converts px → rem (71 uses)
fn.z('nav')           → map-based z-index lookup
fn.mood-opacity(...)  → rgba helper
```

### 7. `@each` — 8 mood classes with unique gradients
```scss
@each $mood, $colors in $mood-list {
  .mood-#{$mood} { background: linear-gradient(135deg, #{$from}, #{$to}); }
}
// Generates: .mood-happy .mood-chill .mood-focus .mood-sad
//            .mood-energy .mood-romantic .mood-party .mood-sleep
```

### 8. `@for` — animation delays
```scss
@for $i from 1 through 12 {
  .delay-#{$i} { animation-delay: #{$i * 0.08}s; }
}
// Generates: .delay-1 through .delay-12
```

### 9. `map.get()` — 84 uses throughout all partials
```scss
map.get(vars.$colors, 'pink')
map.get(vars.$spacing, 'xl')
map.get(vars.$transitions, 'normal')
```

### 10. `@use` / Module System — 17 imports in main.scss
```scss
@use 'abstracts/variables' as vars;
@use 'abstracts/functions' as fn;
@use 'abstracts/mixins' as mix;
@use 'abstracts/placeholders';
// + base, layout, components, pages partials
```

## JavaScript (js/playlists.js)

All behaviour is in an external file — zero inline JS on either page.

| Function | Description |
|---|---|
| `initMoodFilter()` | Filters `#playlist-grid` cards by `data-mood` on filter button click with fade animation |
| `initSearch()` | Filters cards by `data-name` on `keyup` with fade-out / fade-in transition |
| `initSort()` | Reorders cards by Most Popular / A–Z / Duration using `Array.sort` + `appendChild` |
| `initDragReorder()` | HTML5 drag-and-drop — `dragstart` / `dragover` / `drop` — opacity + dashed border on drag target |
| `initModal()` | Opens on card click, populates data from `data-*` attributes, closes on X / overlay / ESC |
| `initLivePreview()` | Updates mini-card name and gradient in real time as form inputs change |
| `initViewToggle()` | Switches `#playlist-grid` between CSS Grid and list layout |

## Design System

- **Colors:** `#0a0a0f` deep black · `#1a1a2e` card surface · `#ff006e` electric pink · `#8338ec` deep purple · `#3a86ff` electric blue · `#ff8c00` orange · `#00d4aa` teal
- **Fonts:** [Syne](https://fonts.google.com/specimen/Syne) (headings) · [Inter](https://fonts.google.com/specimen/Inter) (body)
- **Icons:** Inline SVG only — no emoji, no icon fonts

## Output

- `css/main.css` — 42KB compressed, zero compiler warnings
- Compiled with: `sass 1.99.0`
