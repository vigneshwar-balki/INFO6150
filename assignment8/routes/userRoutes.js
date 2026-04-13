const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/User");
const upload = require("../middleware/upload");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Letters in any script, spaces, and common name punctuation (hyphen, apostrophe, period)
const nameRegex = /^[\p{L}\s'.-]+$/u;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

function pickFullName(body) {
  if (!body || typeof body !== "object") return "";
  const raw = body.fullName;
  return typeof raw === "string" ? raw.trim() : "";
}

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const ensureDbConnected = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error:
        "Database unavailable. Verify Atlas network access/IP whitelist and try again.",
    });
  }
  next();
};

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName: { type: string }
 *               email:    { type: string }
 *               password: { type: string }
 *     responses:
 *       201: { description: User created successfully }
 *       400: { description: Validation failed }
 */
router.post("/create", ensureDbConnected, asyncHandler(async (req, res) => {
  const body = req.body || {};
  const name = pickFullName(body);
  const { email, password, type } = body;

  if (!name) {
    return res.status(400).json({
      error: "Validation failed. Full name is required.",
    });
  }
  if (!nameRegex.test(name)) {
    return res.status(400).json({
      error:
        "Validation failed. Full name may only include letters, spaces, hyphens, apostrophes, and periods.",
    });
  }
  const emailStr = email != null ? String(email).trim() : "";
  if (!emailStr || !emailRegex.test(emailStr))
    return res.status(400).json({ error: "Validation failed. Invalid email format." });
  const passwordStr = password != null ? String(password) : "";
  if (!passwordStr || !passwordRegex.test(passwordStr))
    return res.status(400).json({ error: "Validation failed. Password must be at least 8 characters with uppercase, lowercase, digit, and special character." });
  if (!type) return res.status(400).json({ error: "Validation failed. Type is required." });
  if (type !== 'admin' && type !== 'employee')
    return res.status(400).json({ error: "Type must be admin or employee." });

  const existing = await User.findOne({ email: emailStr });
  if (existing) return res.status(400).json({ error: "Validation failed. Email already in use." });

  const hashed = await bcrypt.hash(passwordStr, 10);
  await User.create({ fullName: name, email: emailStr, password: hashed, type });
  return res.status(201).json({ message: "User created successfully." });
}));

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Update user full name or password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:    { type: string }
 *               fullName: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: User updated successfully }
 *       400: { description: Validation failed }
 *       404: { description: User not found }
 */
router.put("/edit", ensureDbConnected, asyncHandler(async (req, res) => {
  const body = req.body || {};
  const { email, password } = body;

  if (!email) return res.status(400).json({ error: "Validation failed. Email is required." });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found." });

  const wantsNameUpdate = Object.prototype.hasOwnProperty.call(body, "fullName");
  if (wantsNameUpdate) {
    const name = pickFullName(body);
    if (!name) {
      return res.status(400).json({ error: "Validation failed. Full name cannot be empty." });
    }
    if (!nameRegex.test(name)) {
      return res.status(400).json({
        error:
          "Validation failed. Full name may only include letters, spaces, hyphens, apostrophes, and periods.",
      });
    }
    user.fullName = name;
  }

  if (password) {
    if (!passwordRegex.test(password))
      return res.status(400).json({ error: "Validation failed. Password must be at least 8 characters with uppercase, lowercase, digit, and special character." });
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  return res.status(200).json({ message: "User updated successfully." });
}));

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete a user by email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200: { description: User deleted successfully }
 *       404: { description: User not found }
 */
router.delete("/delete", ensureDbConnected, asyncHandler(async (req, res) => {
  const { email } = req.body || {};
  const user = await User.findOneAndDelete({ email });
  if (!user) return res.status(404).json({ error: "User not found." });
  return res.status(200).json({ message: "User deleted successfully." });
}));

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/getAll", ensureDbConnected, asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').lean();
  const sanitizedUsers = users.map((user) => ({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    type: user.type ?? null,
    imagePath: user.imagePath ?? null,
  }));
  return res.status(200).json({ users: sanitizedUsers });
}));

/**
 * @swagger
 * /user/uploadImage:
 *   post:
 *     summary: Upload an image for a user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               image: { type: string, format: binary }
 *     responses:
 *       201: { description: Image uploaded successfully }
 *       400: { description: Invalid file or image already exists }
 *       404: { description: User not found }
 */
router.post("/uploadImage", ensureDbConnected, (req, res, next) => {
  upload.single("image")(req, res, async (err) => {
    try {
      if (err) return res.status(400).json({ error: err.message });

      const { email } = req.body || {};
      if (!email) return res.status(400).json({ error: "Validation failed. Email is required." });

      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ error: "User not found." });
      if (user.imagePath) return res.status(400).json({ error: "Image already exists for this user." });
      if (!req.file) return res.status(400).json({ error: "No image file provided." });

      user.imagePath = `/images/${req.file.filename}`;
      await user.save();
      return res.status(201).json({ message: "Image uploaded successfully.", filePath: user.imagePath });
    } catch (uploadErr) {
      return next(uploadErr);
    }
  });
});

module.exports = router;
