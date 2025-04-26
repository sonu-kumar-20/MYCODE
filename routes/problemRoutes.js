const express = require("express");
const Problem = require("../models/Problem");
const router = express.Router();

// All problems route
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.render("allpr", { problems });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// Single problem route
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).send("Problem not found");
    }

    problem.templates = problem.templates || {
      cpp: `class Solution {\npublic:\n    long long goodTriplets(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
      java: `class Solution {\n    public long goodTriplets(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      javascript: `function goodTriplets(nums1, nums2) {\n    \n}`
    };

    res.render("problemDetail", { problem });
  } catch (error) {
    console.error("Error fetching problem by ID:", error.message);
    res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
