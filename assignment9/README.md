# Assignment 9 — React Job Portal

A modern dark-themed job portal built with React, Vite, and Material UI.

## Tech Stack

- **React 18** + **Vite** — Fast dev server with HMR
- **React Router DOM v6** — Client-side routing
- **Material UI (MUI v5)** — Component library with custom dark theme
- **Axios** — HTTP client for backend API calls
- **@emotion/react + @emotion/styled** — CSS-in-JS for MUI

## Setup Instructions

### Prerequisites

- Node.js 18+
- Assignment 8 backend running at `http://localhost:3000`

### Install & Run

```bash
cd assignment9
npm install
npm run dev
```

App will be available at `http://localhost:5173`.

### Backend (Assignment 8)

```bash
cd assignment8
npm install
node server.js
```

Make sure your `.env` has `MONGO_URI` set.

## Folder Structure

```
assignment9/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar/          # MUI AppBar, mobile drawer, logout
│   │   └── ProtectedRoute/  # Redirects to /login if no userEmail in localStorage
│   ├── pages/
│   │   ├── Login/           # Email + password form, verifies against backend
│   │   ├── Home/            # Hero section, stats cards, CTA
│   │   ├── About/           # Mission, vision, values, story
│   │   ├── JobListings/     # 6 job cards rendered with .map()
│   │   ├── CompanyShowcase/ # Users with images fetched via axios
│   │   └── Contact/         # Validated contact form with success state
│   ├── App.jsx              # Route definitions
│   ├── main.jsx             # Entry point with BrowserRouter + ThemeProvider
│   ├── theme.js             # MUI createTheme with design system tokens
│   └── index.css            # Global reset + Google Fonts import
├── package.json
└── README.md
```

## Routes

| Path         | Page             | Protected |
|--------------|------------------|-----------|
| `/login`     | Login            | No        |
| `/`          | Home             | Yes       |
| `/jobs`      | Job Listings     | Yes       |
| `/companies` | Company Showcase | Yes       |
| `/about`     | About            | Yes       |
| `/contact`   | Contact          | Yes       |

## Authentication

Login calls `GET /user/getAll`, checks if the entered email exists among returned users, then stores `userEmail` in `localStorage`. `ProtectedRoute` redirects to `/login` when this key is absent. Logout clears the key and redirects back to `/login`.

## Design Note

Modern dark UI with electric purple (`#6c63ff`) and cyber teal (`#00d4aa`) accents on deep navy backgrounds (`#0a0a0f`). Glass-morphism cards with subtle border glow. Inter font for UI, Space Mono for labels.
