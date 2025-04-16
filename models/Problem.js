const mongoose = require("mongoose");

const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
  isSample: Boolean, // true: shown to user; false: hidden
});

const hiddenTestCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
});

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  category: { type: String, required: true },
  language: {
    type: String,
    enum: ["javascript", "python", "cpp", "java"],
    required: true,
  },
  functionSignature: { type: String, required: true },
  constraints: [{ type: String }],
  testCases: [testCaseSchema], // Shown to user for hints
  hiddenTestCases: [hiddenTestCaseSchema], // Used during submission for evaluation
  templates: {
    cpp: { type: String },
    java: { type: String },
    javascript: { type: String },
    python: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Problem", problemSchema);
