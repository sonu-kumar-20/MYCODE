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
    enum: ["cpp", "java"],
    required: true,
  },
  videoUrl:{
   type:String,
  },
  functionSignature: { type: String, required: true },
  constraints: [{ type: String }],
  testCases: [testCaseSchema], // Shown to user for hints
  hiddenTestCases: [hiddenTestCaseSchema], // Used during submission for evaluation
  templates: {
    cpp: { type: String },
    java: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  important: { type: Boolean, default: false }, // Field to mark VVI (Very Very Important)
  solved: { type: Boolean, default: false },   // Field to track if the problem is solved
});

module.exports = mongoose.model("Problem", problemSchema);
