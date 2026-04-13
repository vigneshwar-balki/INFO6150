# Assignment 8 - User Management REST API

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-UI-85EA2D?style=flat&logo=swagger&logoColor=black)

## Overview

A RESTful API built with **Node.js** and **Express.js**, backed by **MongoDB Atlas** via **Mongoose**. Supports full CRUD operations for users, per-user image uploads via **Multer**, and job listing management (create/list). Passwords are securely hashed with **bcrypt**. Input validation is enforced at the route level on every write operation. Interactive API documentation is available through **Swagger UI**, and a ready-to-import **Postman collection** is included for manual testing.

> **Assignment 10 update:** The User schema now requires a `type` field (`admin` or `employee`). Two new job endpoints (`POST /create/job`, `GET /jobs`) support the React frontend's role-based job portal.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22.x | JavaScript runtime |
| Express.js | ^4.22.1 | HTTP server and routing |
| MongoDB Atlas | Cloud | NoSQL database |
| Mongoose | ^9.4.1 | ODM / schema modeling |
| bcrypt | ^6.0.0 | Password hashing |
| Multer | ^2.1.1 | Multipart file upload handling |
| Swagger UI Express | ^5.0.1 | Interactive API documentation |
| swagger-jsdoc | ^6.2.8 | OpenAPI spec generation |
| dotenv | ^17.4.0 | Environment variable management |

---

## Project Structure

```
assignment8/
├── images/                    # Uploaded user images (served statically)
├── middleware/
│   └── upload.js              # Multer config: storage, filename, file-type filter
├── models/
│   ├── User.js                # Mongoose User schema (fullName, email, password, type, imagePath)
│   └── Job.js                 # Mongoose Job schema (companyName, jobTitle, description, salary)
├── routes/
│   ├── userRoutes.js          # All /user/* route handlers with validation
│   └── jobRoutes.js           # POST /create/job and GET /jobs
├── .env                       # Environment variables (not committed)
├── .gitignore
├── package.json
├── postman_collection.json    # Importable Postman collection
├── server.js                  # App entry point: Express setup, DB connection
└── swagger.js                 # OpenAPI 3.0 spec definition
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=3000
```

| Variable | Required | Description |
|---|---|---|
| `MONGO_URI` | Yes | MongoDB Atlas connection string |
| `PORT` | No | Server port (defaults to `3000`) |

> **Note:** Ensure your MongoDB Atlas cluster has your current IP address whitelisted under **Network Access**.

### 3. Start the server

```bash
node server.js
```

Expected output:
```
Server running on port 3000
MongoDB connected
```

---

## API Endpoints

Base URL: `http://localhost:3000`

All request and response bodies use `application/json` unless otherwise noted.

---

### POST `/user/create`

Create a new user account.

**Content-Type:** `application/json`

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `fullName` | `string` | Yes | User's full name |
| `email` | `string` | Yes | Unique email address |
| `password` | `string` | Yes | Plain-text password (hashed before storage) |
| `type` | `string` | Yes | Role — must be `admin` or `employee` |

**Example Request:**
```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "Secure@123",
  "type": "employee"
}
```

**Responses:**

| Status | Body |
|---|---|
| `201 Created` | `{ "message": "User created successfully." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Full name is required." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Full name may only include letters, spaces, hyphens, apostrophes, and periods." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Invalid email format." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Password must be at least 8 characters with uppercase, lowercase, digit, and special character." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Email already in use." }` |
| `400 Bad Request` | `{ "error": "Type must be admin or employee." }` |
| `503 Service Unavailable` | `{ "error": "Database unavailable. Verify Atlas network access/IP whitelist and try again." }` |

---

### PUT `/user/edit`

Update an existing user's full name and/or password. Email is used as the lookup key and cannot be changed. At least one of `fullName` or `password` should be provided alongside `email`.

**Content-Type:** `application/json`

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | Yes | Email of the user to update |
| `fullName` | `string` | No | New full name |
| `password` | `string` | No | New plain-text password (hashed before storage) |

**Example Request:**
```json
{
  "email": "jane.doe@example.com",
  "fullName": "Jane Smith",
  "password": "NewPass@456"
}
```

**Responses:**

| Status | Body |
|---|---|
| `200 OK` | `{ "message": "User updated successfully." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Email is required." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Full name cannot be empty." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Full name may only include letters, spaces, hyphens, apostrophes, and periods." }` |
| `400 Bad Request` | `{ "error": "Validation failed. Password must be at least 8 characters with uppercase, lowercase, digit, and special character." }` |
| `404 Not Found` | `{ "error": "User not found." }` |
| `503 Service Unavailable` | `{ "error": "Database unavailable. Verify Atlas network access/IP whitelist and try again." }` |

---

### DELETE `/user/delete`

Permanently delete a user by email address.

**Content-Type:** `application/json`

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | Yes | Email of the user to delete |

**Example Request:**
```json
{
  "email": "jane.doe@example.com"
}
```

**Responses:**

| Status | Body |
|---|---|
| `200 OK` | `{ "message": "User deleted successfully." }` |
| `404 Not Found` | `{ "error": "User not found." }` |
| `503 Service Unavailable` | `{ "error": "Database unavailable. Verify Atlas network access/IP whitelist and try again." }` |

---

### GET `/user/getAll`

Retrieve all registered users. Passwords are excluded from the response.

**Request Body:** None

**Example Response:**
```json
{
  "users": [
    {
      "_id": "664a1b2c3d4e5f6a7b8c9d0e",
      "fullName": "Jane Doe",
      "email": "jane.doe@example.com",
      "type": "employee",
      "imagePath": "/images/1716095894537-655282983.png"
    },
    {
      "_id": "664a1b2c3d4e5f6a7b8c9d0f",
      "fullName": "Admin User",
      "email": "admin@jobrabbit.com",
      "type": "admin",
      "imagePath": null
    }
  ]
}
```

**Responses:**

| Status | Body |
|---|---|
| `200 OK` | `{ "users": [ ...userObjects ] }` |
| `503 Service Unavailable` | `{ "error": "Database unavailable. Verify Atlas network access/IP whitelist and try again." }` |

---

### POST `/create/job`

Create a new job listing.

**Content-Type:** `application/json`

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `companyName` | `string` | Yes | Hiring company name |
| `jobTitle` | `string` | Yes | Job title / position |
| `description` | `string` | Yes | Role description |
| `salary` | `string` | Yes | Salary range (e.g. `$90k – $120k / yr`) |

**Example Request:**
```json
{
  "companyName": "Acme Corp",
  "jobTitle": "Frontend Engineer",
  "description": "Build and maintain the React frontend.",
  "salary": "$100k – $130k / yr"
}
```

**Responses:**

| Status | Body |
|---|---|
| `201 Created` | `{ "message": "Job created successfully.", "job": { ...jobObject } }` |
| `400 Bad Request` | `{ "error": "All fields are required." }` |
| `503 Service Unavailable` | `{ "error": "Database unavailable. Verify Atlas network access/IP whitelist and try again." }` |

---

### GET `/jobs`

Retrieve all job listings, sorted by creation date (newest first).

**Request Body:** None

**Example Response:**
```json
{
  "jobs": [
    {
      "_id": "664a1b2c3d4e5f6a7b8c9d10",
      "companyName": "Acme Corp",
      "jobTitle": "Frontend Engineer",
      "description": "Build and maintain the React frontend.",
      "salary": "$100k – $130k / yr",
      "createdAt": "2025-04-10T12:00:00.000Z"
    }
  ]
}
```

**Responses:**

| Status | Body |
|---|---|
| `200 OK` | `{ "jobs": [ ...jobObjects ] }` |
| `503 Service Unavailable` | `{ "error": "Database unavailable. Verify Atlas network access/IP whitelist and try again." }` |

---

### POST `/user/uploadImage`

Upload a profile image for an existing user. Each user may only have one image; uploading again will be rejected until the existing image is removed. Uploaded images are stored in the `images/` directory and served statically at `/images/<filename>`.

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | `string` | Yes | Email of the target user |
| `image` | `file` | Yes | Image file (JPEG, PNG, or GIF only) |

**Example Response (success):**
```json
{
  "message": "Image uploaded successfully.",
  "filePath": "/images/1716095894537-655282983.png"
}
```

**Responses:**

| Status | Body |
|---|---|
| `201 Created` | `{ "message": "Image uploaded successfully.", "filePath": "/images/<filename>" }` |
| `400 Bad Request` | `{ "error": "Validation failed. Email is required." }` |
| `400 Bad Request` | `{ "error": "No image file provided." }` |
| `400 Bad Request` | `{ "error": "Invalid file format. Only JPEG, PNG, and GIF are allowed." }` |
| `400 Bad Request` | `{ "error": "Image already exists for this user." }` |
| `404 Not Found` | `{ "error": "User not found." }` |
| `503 Service Unavailable` | `{ "error": "Database unavailable. Verify Atlas network access/IP whitelist and try again." }` |

---

## Validation Rules

### Full Name (`fullName`)

- **Required** on create; optional on edit (omitting the field skips the update)
- Must not be empty or whitespace-only
- Allowed characters: Unicode letters (any script), spaces, hyphens (`-`), apostrophes (`'`), and periods (`.`)
- Regex: `/^[\p{L}\s'.-]+$/u`

### Email (`email`)

- **Required** on create, edit, delete, and uploadImage
- Must match standard email format: `local@domain.tld`
- Must be unique across all users (enforced at DB level on create)
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Password (`password`)

- **Required** on create; optional on edit
- Minimum **8 characters**
- Must contain at least:
  - One **uppercase** letter (`A–Z`)
  - One **lowercase** letter (`a–z`)
  - One **digit** (`0–9`)
  - One **special character** (any non-alphanumeric character)
- Regex: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/`

### Image (`image`)

- Accepted MIME types: `image/jpeg`, `image/png`, `image/gif`
- **One image per user** — a second upload is rejected until the first is removed
- Stored with a unique timestamped filename under `images/`
- Served statically at `http://localhost:3000/images/<filename>`

---

## Security

Passwords are **never stored in plain text**. Before a user record is written to MongoDB, the plain-text password is hashed using **bcrypt** with a salt round factor of `10`:

```js
const hashed = await bcrypt.hash(passwordStr, 10);
```

The resulting hash is stored in the `password` field. On subsequent operations (e.g., edit), any new password is re-hashed before being saved. Plain-text passwords are not logged or returned in any API response.

---

## Swagger UI

Interactive API documentation is auto-generated from the OpenAPI 3.0 spec defined in `swagger.js` and served via Swagger UI Express.

**URL:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

All five endpoints are documented with request schemas, required fields, and example responses. You can execute requests directly from the browser using the **"Try it out"** button on each endpoint.

---

## Postman Collection

A complete Postman collection (`postman_collection.json`) is included in the project root. It contains pre-configured requests for all five endpoints with sample request bodies.

**To import:**

1. Open **Postman**
2. Click **Import** (top-left)
3. Select **File** and choose `postman_collection.json`
4. The collection **"Assignment 8 - User Management API"** will appear in your sidebar
5. Ensure the server is running on `http://localhost:3000` before sending requests
