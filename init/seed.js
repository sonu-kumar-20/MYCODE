const mongoose = require("mongoose");
const connectDB = require('./db');  // 🔥 Make sure to connect to DB
const Problem = require('../models/Problem');

const seedProblems = async () => {
  await connectDB();  // Connect to the database
  await Problem.deleteMany();  // Clear existing data

  const problems = [
    {
      title: "Add Two Numbers",
      description: "Write a function to return the sum of two numbers.",
      difficulty: "Easy",
      category: "Math",
      language: "javascript",
      functionSignature: "function add(a, b)",
      constraints: ["-10^4 <= a, b <= 10^4"],
      testCases: [
        { input: "1, 2", expectedOutput: "3", isSample: true },
        { input: "123, 456", expectedOutput: "579", isSample: false },
        { input: "-5, 10", expectedOutput: "5", isSample: false },
      ],
      hiddenTestCases: [
        { input: "-10000, 10000", expectedOutput: "0" },
        { input: "0, 0", expectedOutput: "0" },
        { input: "9999, 1", expectedOutput: "10000" },
      ],
      templates: {
        javascript: `function add(a, b) {\n  // Your code here\n}`,
        cpp: `class Solution {\npublic:\n    int add(int a, int b) {\n        // Your code here\n    }\n};`,
        java: `class Solution {\n    public int add(int a, int b) {\n        // Your code here\n    }\n}`,
        python: `def add(a, b):\n    # Your code here\n`,
      }
    },
    {
      title: "Check Palindrome",
      description: "Return true if the input string is a palindrome.",
      difficulty: "Easy",
      category: "String",
      language: "javascript",
      functionSignature: "function isPalindrome(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"madam"`, expectedOutput: "true", isSample: true },
        { input: `"hello"`, expectedOutput: "false", isSample: false },
        { input: `"racecar"`, expectedOutput: "true", isSample: false },
      ],
      hiddenTestCases: [
        { input: `"a"`, expectedOutput: "true" },
        { input: `"abcdcba"`, expectedOutput: "true" },
        { input: `"openai"`, expectedOutput: "false" },
      ],
      templates: {
        javascript: `function isPalindrome(str) {\n  // Your code here\n}`,
        cpp: `class Solution {\npublic:\n    bool isPalindrome(string str) {\n        // Your code here\n    }\n};`,
        java: `class Solution {\n    public boolean isPalindrome(String str) {\n        // Your code here\n    }\n}`,
        python: `def isPalindrome(str):\n    # Your code here\n`,
      }
    },
    {
      title: "Find Maximum Number",
      description: "Write a function to find the largest number in an array.",
      difficulty: "Easy",
      category: "Array",
      language: "javascript",
      functionSignature: "function findMax(arr)",
      constraints: ["1 <= arr.length <= 100"],
      testCases: [
        { input: "[1, 3, 5, 7]", expectedOutput: "7", isSample: true },
        { input: "[1, 2, 3]", expectedOutput: "3", isSample: false },
      ],
      hiddenTestCases: [
        { input: "[-5, -1, -3]", expectedOutput: "-1" },
        { input: "[100, 200, 50]", expectedOutput: "200" },
      ],
      templates: {
        javascript: `function findMax(arr) {\n  // Your code here\n}`,
        cpp: `class Solution {\npublic:\n    int findMax(vector<int>& arr) {\n        // Your code here\n    }\n};`,
        java: `class Solution {\n    public int findMax(int[] arr) {\n        // Your code here\n    }\n}`,
        python: `def findMax(arr):\n    # Your code here\n`,
      }
    },
    {
      title: "Reverse a String",
      description: "Write a function to reverse a given string.",
      difficulty: "Easy",
      category: "String",
      language: "javascript",
      functionSignature: "function reverseString(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"hello"`, expectedOutput: `"olleh"`, isSample: true },
        { input: `"world"`, expectedOutput: `"dlrow"`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"racecar"`, expectedOutput: `"racecar"` },
        { input: `"openai"`, expectedOutput: `"ianepo"` },
      ],
      templates: {
        javascript: `function reverseString(str) {\n  // Your code here\n}`,
        cpp: `class Solution {\npublic:\n    string reverseString(string str) {\n        // Your code here\n    }\n};`,
        java: `class Solution {\n    public String reverseString(String str) {\n        // Your code here\n    }\n}`,
        python: `def reverseString(str):\n    # Your code here\n`,
      }
    },
    {
      title: "Count Vowels",
      description: "Write a function to count the number of vowels in a string.",
      difficulty: "Easy",
      category: "String",
      language: "javascript",
      functionSignature: "function countVowels(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"hello"`, expectedOutput: "2", isSample: true },
        { input: `"programming"`, expectedOutput: "3", isSample: false },
      ],
      hiddenTestCases: [
        { input: `"aeiou"`, expectedOutput: "5" },
        { input: `"xyz"`, expectedOutput: "0" },
      ],
      templates: {
        javascript: `function countVowels(str) {\n  // Your code here\n}`,
        cpp: `class Solution {\npublic:\n    int countVowels(string str) {\n        // Your code here\n    }\n};`,
        java: `class Solution {\n    public int countVowels(String str) {\n        // Your code here\n        int count = 0;\n        for (char c : str.toLowerCase().toCharArray()) {\n            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {\n                count++;\n            }\n        }\n        return count;\n    }\n}`,
        python: `def countVowels(str):\n    # Your code here\n`,
      }
      
    },
  ];

  try {
    await Problem.insertMany(problems);  // Insert all problems at once
    console.log("✅ Problems seeded successfully");
  } catch (error) {
    console.error("Error seeding problems:", error);
  } finally {
    process.exit();
  }
};

seedProblems();
