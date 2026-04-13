# JobRabbit — Admin & Employee Portal (Assignment 10)

A full-stack job portal with role-based access control. Admins manage employees and post job listings; employees browse open positions. Built with a React/Redux frontend and a Node/Express/MongoDB backend.

## Overview

JobRabbit is a full-stack web application that connects a React frontend (Redux Toolkit, MUI dark theme, React Router) with a Node.js/Express REST API backed by MongoDB Atlas. Authentication is handled via email/password login with roles stored in localStorage and enforced through route guards — admins see the management dashboard, employees see the job board.

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, Vite, Material UI v9, Redux Toolkit, React Router DOM v6, Axios |
| Backend | Node.js, Express, MongoDB Atlas, Mongoose, bcrypt, Multer, Swagger UI |

## Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Backend from `assignment8/` must be running on port 3000

## Setup & Run

### Backend

```bash
cd assignment8
npm install
cp .env.example .env   # add MONGO_URI and PORT=3000
node server.js
```

Expected output:
```
Server running on port 3000
MongoDB connected
```

### Frontend

```bash
cd assignment9
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Test Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@jobrabbit.com | Admin@1234 |
| Employee | john@jobrabbit.com | Test@1234 |

## Role-Based Access

| Page | Admin | Employee |
|---|---|---|
| `/admin/employees` | ✅ | ❌ |
| `/add-job` | ✅ | ❌ |
| `/jobs` | ❌ | ✅ |
| `/companies` | ✅ | ✅ |
| `/about` | ✅ | ✅ |
| `/contact` | ✅ | ✅ |

Route guards (`AdminRoute`, `EmployeeRoute`, `ProtectedRoute`) redirect unauthorized users to `/login`.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/user/create` | Create user (requires `type`: `admin` or `employee`) |
| PUT | `/user/edit` | Update `fullName` or `password` |
| DELETE | `/user/delete` | Delete user by email |
| GET | `/user/getAll` | Get all users (passwords excluded) |
| POST | `/user/uploadImage` | Upload profile image for a user |
| POST | `/create/job` | Admin creates a job listing |
| GET | `/jobs` | Get all job listings |

Full interactive documentation: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Redux State

```
store
├── authSlice
│   ├── user        — logged-in email
│   ├── type        — 'admin' | 'employee'
│   └── isLoggedIn  — boolean
└── jobsSlice
    ├── jobs        — array of job objects from /jobs
    └── loading     — boolean, true while fetching
```

`loginSuccess` and `logout` actions manage `authSlice`. `setJobs` and `setLoading` manage `jobsSlice`.

## Folder Structure

```
assignment8/
├── models/         User.js, Job.js
├── routes/         userRoutes.js, jobRoutes.js
├── middleware/     upload.js
├── server.js
└── swagger.js

assignment9/src/
├── store/          store.js  (Redux slices)
├── components/
│   ├── Navbar/             Role-aware nav, mobile drawer, logout
│   ├── ProtectedRoute/     Requires any logged-in user
│   ├── AdminRoute/         Requires type === 'admin'
│   └── EmployeeRoute/      Requires type === 'employee'
├── pages/
│   ├── admin/
│   │   ├── EmployeesPage/  Table of all registered users
│   │   └── AddJobPage/     Form to POST a new job listing
│   ├── Login/              Email + password, routes by role on success
│   ├── Home/               Hero, stats, CTA
│   ├── About/              Mission, values, team
│   ├── JobListings/        Job cards fetched from Redux store
│   ├── CompanyShowcase/    User cards with images + profile modal
│   └── Contact/            Validated contact form
├── App.jsx
├── main.jsx        (BrowserRouter + Provider + ThemeProvider)
└── theme.js
```

## Design System

Modern dark UI — deep navy backgrounds (`#0a0a0f`), electric purple accents (`#6c63ff`), cyber teal highlights (`#00d4aa`). Glass-morphism cards with subtle border glow. Inter font for UI copy, Space Mono for labels and badges. All interactive elements have 200 ms ease hover transitions.
