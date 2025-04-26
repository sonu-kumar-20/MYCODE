const mongoose = require("mongoose");
const connectDB = require('./db');
const Problem = require('../models/Problem');

const seedProblems = async () => {
  await connectDB();
  await Problem.deleteMany();

  const problems = [
    {
      title: "Check Palindrome",
      description: "Return true if the input string is a palindrome.",
      difficulty: "Easy",
      category: "String",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      language: "java",
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
        java: `class Solution {\n    public boolean isPalindrome(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Reverse a String",
      description: "Write a function to reverse a given string.",
      difficulty: "Easy",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
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
        java: `class Solution {\n    public String reverseString(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Count Vowels",
      description: "Write a function to count the number of vowels in a string.",
      difficulty: "Easy",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
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
        java: `class Solution {\n    public int countVowels(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Remove Vowels",
      description: "Write a function to remove all vowels from the string.",
      difficulty: "Easy",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function removeVowels(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"hello"`, expectedOutput: `"hll"`, isSample: true },
        { input: `"aeiou"`, expectedOutput: `""`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"programming"`, expectedOutput: `"prgrmmng"` },
        { input: `"beautiful"`, expectedOutput: `"btfl"` },
      ],
      templates: {
        java: `class Solution {\n    public String removeVowels(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Capitalize First Letter",
      description: "Capitalize the first letter of each word in the string.",
      difficulty: "Easy",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function capitalizeWords(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"hello world"`, expectedOutput: `"Hello World"`, isSample: true },
        { input: `"java is fun"`, expectedOutput: `"Java Is Fun"`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"make this awesome"`, expectedOutput: `"Make This Awesome"` },
        { input: `"a quick brown fox"`, expectedOutput: `"A Quick Brown Fox"` },
      ],
      templates: {
        java: `class Solution {\n    public String capitalizeWords(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Check Palindrome",
      description: "Return true if the input string is a palindrome.",
      difficulty: "Easy",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
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
        java: `class Solution {\n    public boolean isPalindrome(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Reverse a String",
      description: "Write a function to reverse a given string.",
      difficulty: "Easy",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
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
        java: `class Solution {\n    public String reverseString(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    // ... existing questions
    // Adding 15 frequently asked String DSA interview questions
    {
      title: "Find the First Non-Repeated Character",
      description: "Given a string, find the first non-repeating character.",
      difficulty: "Medium",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function firstNonRepeatingCharacter(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"swiss"`, expectedOutput: `"w"`, isSample: true },
        { input: `"aabbcc"`, expectedOutput: `" "` , isSample: false },
      ],
      hiddenTestCases: [
        { input: `"abcd"`, expectedOutput: `"a"` },
        { input: `"aabcc"` , expectedOutput: `"b"` },
      ],
      templates: {
        java: `class Solution {\n    public char firstNonRepeatingCharacter(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Anagram Check",
      description: "Check if two strings are anagrams of each other.",
      difficulty: "Medium",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function areAnagrams(str1, str2)",
      constraints: ["1 <= str1.length, str2.length <= 1000"],
      testCases: [
        { input: `"listen", "silent"`, expectedOutput: `"true"`, isSample: true },
        { input: `"hello", "world"`, expectedOutput: `"false"`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"evil", "vile"`, expectedOutput: `"true"` },
        { input: `"test", "best"`, expectedOutput: `"false"` },
      ],
      templates: {
        java: `class Solution {\n    public boolean areAnagrams(String str1, String str2) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string, find the length of the longest substring without repeating characters.",
      difficulty: "Medium",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function lengthOfLongestSubstring(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"abcabcbb"`, expectedOutput: `"3"`, isSample: true },
        { input: `"bbbbb"`, expectedOutput: `"1"`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"pwwkew"`, expectedOutput: `"3"` },
        { input: `"abcdefg"`, expectedOutput: `"7"` },
      ],
      templates: {
        java: `class Solution {\n    public int lengthOfLongestSubstring(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "Longest Palindromic Substring",
      description: "Given a string, find the longest palindromic substring.",
      difficulty: "Hard",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function longestPalindrome(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"babad"`, expectedOutput: `"bab"`, isSample: true },
        { input: `"cbbd"`, expectedOutput: `"bb"`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"acbdca"`, expectedOutput: `"cdc"` },
        { input: `"xyzzyx"`, expectedOutput: `"xyzzyx"` },
      ],
      templates: {
        java: `class Solution {\n    public String longestPalindrome(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "String Compression",
      description: "Given a string, compress it using counts of repeated characters.",
      difficulty: "Medium",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function compressString(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"aabcccccaaa"`, expectedOutput: `"a2b1c5a3"`, isSample: true },
        { input: `"abcd"`, expectedOutput: `"abcd"`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"aaabbbccc"`, expectedOutput: `"a3b3c3"` },
        { input: `"xyz"`, expectedOutput: `"xyz"` },
      ],
      templates: {
        java: `class Solution {\n    public String compressString(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },
    {
      title: "String to Integer (atoi)",
      description: "Implement the function to convert a string to an integer.",
      difficulty: "Medium",
      category: "String",
      language: "java",
      videoUrl:"https://www.youtube.com/embed/_DPQtj2rkXs?si=2_8E4h3HvWFyO1A6",
      functionSignature: "function myAtoi(str)",
      constraints: ["1 <= str.length <= 1000"],
      testCases: [
        { input: `"42"`, expectedOutput: `"42"`, isSample: true },
        { input: `"   -42"`, expectedOutput: `"-42"`, isSample: false },
      ],
      hiddenTestCases: [
        { input: `"4193 with words"`, expectedOutput: `"4193"` },
        { input: `"words and 987"`, expectedOutput: `"0"` },
      ],
      templates: {
        java: `class Solution {\n    public int myAtoi(String str) {\n        // Your code here\n    }\n}`
      },
      important: false,
      solved: false,
    },


  ];

  try {
    await Problem.insertMany(problems);
    console.log("✅ String problems seeded successfully");
  } catch (error) {
    console.error("Error seeding problems:", error);
  } finally {
    process.exit();
  }

};

seedProblems();
