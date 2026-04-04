const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const upload = require("../middleware/upload");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

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
router.post("/create", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !nameRegex.test(fullName))
    return res.status(400).json({ error: "Validation failed. Full name must contain only alphabetic characters." });
  if (!email || !emailRegex.test(email))
    return res.status(400).json({ error: "Validation failed. Invalid email format." });
  if (!password || !passwordRegex.test(password))
    return res.status(400).json({ error: "Validation failed. Password must be at least 8 characters with uppercase, lowercase, digit, and special character." });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Validation failed. Email already in use." });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ fullName, email, password: hashed });
  return res.status(201).json({ message: "User created successfully." });
});

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
router.put("/edit", async (req, res) => {
  const { email, fullName, password } = req.body;

  if (!email) return res.status(400).json({ error: "Validation failed. Email is required." });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found." });

  if (fullName) {
    if (!nameRegex.test(fullName))
      return res.status(400).json({ error: "Validation failed. Full name must contain only alphabetic characters." });
    user.fullName = fullName;
  }

  if (password) {
    if (!passwordRegex.test(password))
      return res.status(400).json({ error: "Validation failed. Password must be at least 8 characters with uppercase, lowercase, digit, and special character." });
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  return res.status(200).json({ message: "User updated successfully." });
});

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
router.delete("/delete", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndDelete({ email });
  if (!user) return res.status(404).json({ error: "User not found." });
  return res.status(200).json({ message: "User deleted successfully." });
});

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/getAll", async (req, res) => {
  const users = await User.find({}, { fullName: 1, email: 1, password: 1, _id: 0 });
  return res.status(200).json({ users });
});

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
router.post("/uploadImage", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err.message });

    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Validation failed. Email is required." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });
    if (user.imagePath) return res.status(400).json({ error: "Image already exists for this user." });
    if (!req.file) return res.status(400).json({ error: "No image file provided." });

    user.imagePath = `/images/${req.file.filename}`;
    await user.save();
    return res.status(201).json({ message: "Image uploaded successfully.", filePath: user.imagePath });
  });
});

module.exports = router;
