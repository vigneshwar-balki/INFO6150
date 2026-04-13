# Assignment 8 - User Management API

## Description
This project is a Node.js + Express REST API for user management with MongoDB (Mongoose), Swagger UI documentation, and image upload support using Multer.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` inside `assignment8/`:
   ```env
   MONGO_URI=<your_mongodb_connection_string>
   PORT=3000
   ```

## Run
Start the server:
```bash
node server.js
```

## Swagger UI
Open:
`http://localhost:3000/api-docs`

## Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/user/create` | Create a new user with `fullName`, `email`, and `password`. |
| PUT | `/user/edit` | Update an existing user's `fullName` and/or `password` using `email`. |
| DELETE | `/user/delete` | Delete a user by `email`. |
| GET | `/user/getAll` | Get all users with `fullName`, `email`, `password`, and `imagePath`. |
| POST | `/user/uploadImage` | Upload a profile image for a user using multipart form data (`email`, `image`). |
