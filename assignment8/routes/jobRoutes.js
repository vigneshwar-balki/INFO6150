const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Job = require("../models/Job");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const ensureDbConnected = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      error: "Database unavailable. Verify Atlas network access/IP whitelist and try again.",
    });
  }
  next();
};

/**
 * @swagger
 * /create/job:
 *   post:
 *     summary: Create a new job listing
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName: { type: string }
 *               jobTitle:    { type: string }
 *               description: { type: string }
 *               salary:      { type: string }
 *     responses:
 *       201: { description: Job created successfully }
 *       400: { description: Validation failed }
 */
router.post("/create/job", ensureDbConnected, asyncHandler(async (req, res) => {
  const { companyName, jobTitle, description, salary } = req.body || {};

  if (!companyName || !String(companyName).trim())
    return res.status(400).json({ error: "Validation failed. companyName is required." });
  if (!jobTitle || !String(jobTitle).trim())
    return res.status(400).json({ error: "Validation failed. jobTitle is required." });
  if (!description || !String(description).trim())
    return res.status(400).json({ error: "Validation failed. description is required." });
  if (!salary || !String(salary).trim())
    return res.status(400).json({ error: "Validation failed. salary is required." });

  const savedJob = await Job.create({
    companyName: String(companyName).trim(),
    jobTitle:    String(jobTitle).trim(),
    description: String(description).trim(),
    salary:      String(salary).trim(),
  });

  return res.status(201).json({ message: "Job created successfully.", job: savedJob });
}));

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all job listings
 *     responses:
 *       200:
 *         description: List of jobs
 */
router.get("/jobs", ensureDbConnected, asyncHandler(async (req, res) => {
  const jobs = await Job.find({}).lean();
  return res.status(200).json({ jobs });
}));

module.exports = router;
