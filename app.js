const express = require("express");
const connectDB = require("./init/db");
const path = require("path");
const axios = require("axios");
const Problem = require("./models/Problem");
const { formatInput } = require("./utils/utils");  // Import formatInput from utils.js

require("dotenv").config(); // Load .env variables

const app = express();

// Connect to database
connectDB();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('public'));

// Home route
app.get("/", (req, res) => {
  res.render("main");
});

// All problems route
app.get("/allproblem", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.render("allpr", { problems });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// Single problem route
app.get("/problems/:id", async (req, res) => {
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

// Code run route using Judge0 API
function getLanguageId(language) {
  const map = {
    cpp: 54,
    java: 62,
    javascript: 63,
    python: 71,
  };
  return map[language];
}

// Main function to wrap Java code with dynamic input handling
function wrapJavaCode(userCode, input, functionSignature) {
  // Validate functionSignature and extract function name
  if (!functionSignature) {
    console.error("Function signature is missing.");
    return "Error: Function signature is required.";
  }

  // Extract function name from function signature (e.g., 'public int addTwoNumbers(int num1, int num2)')
  const functionNameMatch = functionSignature.match(/\b(\w+)\s*\(/);
  const functionName = functionNameMatch ? functionNameMatch[1] : "add";  // Default to 'add' if no match

  // Ensure that the input is properly formatted for Java (comma-separated for arrays, quoted for strings)
  let formattedInput = input;

  // Handle NaN values specifically for Java
  if (formattedInput === 'NaN') {
    formattedInput = 'Double.NaN';  // Java representation of NaN
  }

  // If the input is a string representing numbers like "1, 2", split it into individual arguments
  if (typeof input === "string") {
    formattedInput = input.split(",").map(num => num.trim());  // Split by commas and trim spaces
  }

  // If input is an array, format it as a comma-separated string
  if (Array.isArray(input)) {
    formattedInput = input.map(item => formatInput(item)).join(", ");  // Use formatInput to handle array items
  }

  // Check if user provided the Solution class, if not, wrap the class inside
  if (!userCode.includes("class Solution")) {
    // Wrap the user's code with the Solution class if it's not already included
    userCode = `class Solution {\n${userCode}\n}`;
  }

  // Ensure that the user code and the function signature are properly formatted for Java
  return `
${userCode}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Dynamically call the function with the provided input
        System.out.println(sol.${functionName}(${formattedInput.join(", ")})); // Ensure correct function call
    }
}
  `;
}

app.post("/run", async (req, res) => {
  console.log("Run is clicked");

  let { code, language, input, functionSignature } = req.body;

  try {
    // Ensure that the required fields are present
    if (!code || !language || !input) {
      return res.status(400).json({ error: "Code, language, and input are required" });
    }

    // Format the input according to its type (e.g., string, array, number, etc.)
    input = formatInput(input);  // Use formatInput to handle different data types

    // Check if the language is Java and wrap code accordingly
    if (language === "java") {
      // Wrap the user's code with the correct Java class structure
      code = wrapJavaCode(code, input, functionSignature);
    }

    const body = {
      source_code: code,
      language_id: getLanguageId(language),
      stdin: language === "java" ? "" : input,  // Java doesn't need stdin
    };

    const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
    const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

    const submissionResponse = await axios.post(JUDGE0_API_URL, body, {
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    });

    const token = submissionResponse.data.token;

    const getResult = async () => {
      try {
        const result = await axios.get(`${JUDGE0_API_URL}/${token}`, {
          params: { base64_encoded: "false", fields: "*" },
          headers: {
            "X-RapidAPI-Key": JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        });

        if (result.data.status.id <= 2) {
          setTimeout(getResult, 1000); // Still processing
        } else {
          res.json({
            output: result.data.stdout || result.data.stderr || result.data.compile_output || "No output",
            status: result.data.status.description,
          });
        }
      } catch (err) {
        console.error("Error fetching execution result:", err.message);
        res.status(500).json({ error: "Error fetching result" });
      }
    };

    getResult();

  } catch (err) {
    console.error("Error during code submission:", err.message);
    res.status(500).json({ error: "Code execution failed" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


// const express = require("express");
// const connectDB = require("./init/db");
// const path = require("path");
// const axios = require("axios");
// const Problem = require("./models/Problem");
// const { formatInput } = require("./utils/utils");  // Import formatInput from utils.js

// require("dotenv").config(); // Load .env variables

// const app = express();

// // Connect to database
// connectDB();

// // Set EJS as the view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Middleware
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'));

// // Home route
// app.get("/", (req, res) => {
//   res.render("main");
// });

// // All problems route
// app.get("/allproblem", async (req, res) => {
//   try {
//     const problems = await Problem.find();
//     res.render("allpr", { problems });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Something went wrong!");
//   }
// });

// // Single problem route
// app.get("/problems/:id", async (req, res) => {
//   try {
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).send("Problem not found");
//     }

//     problem.templates = problem.templates || {
//       cpp: `class Solution {\npublic:\n    long long goodTriplets(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
//       java: `class Solution {\n    public long goodTriplets(int[] nums1, int[] nums2) {\n        \n    }\n}`,
//       javascript: `function goodTriplets(nums1, nums2) {\n    \n}`
//     };

//     res.render("problemDetail", { problem });
//   } catch (error) {
//     console.error("Error fetching problem by ID:", error.message);
//     res.status(500).send("Something went wrong!");
//   }
// });

// // Code run route using Judge0 API
// function getLanguageId(language) {
//   const map = {
//     cpp: 54,
//     java: 62,
//     javascript: 63,
//     python: 71,
//   };
//   return map[language];
// }
// // Main function to wrap Java code with dynamic input handling
// //const { formatInput } = require('./utils');

// function wrapJavaCode(userCode, input, functionSignature) {
//   // Validate functionSignature and extract function name
//   if (!functionSignature) {
//     console.error("Function signature is missing.");
//     return "Error: Function signature is required.";
//   }

//   // Extract function name from function signature (e.g., 'public int addTwoNumbers(int num1, int num2)')
//   const functionNameMatch = functionSignature.match(/\b(\w+)\s*\(/);
//   const functionName = functionNameMatch ? functionNameMatch[1] : "add";  // Default to 'add' if no match

//   // Ensure that the input is properly formatted for Java (comma-separated for arrays, quoted for strings)
//   let formattedInput = input;

//   // Handle NaN values specifically for Java
//   if (formattedInput === 'NaN') {
//     formattedInput = 'Double.NaN';  // Java representation of NaN
//   }

//   // If the input is a string representing numbers like "1, 2", split it into individual arguments
//   if (typeof input === "string") {
//     formattedInput = input.split(",").map(num => num.trim());  // Split by commas and trim spaces
//   }

//   // If input is an array, format it as a comma-separated string
//   if (Array.isArray(input)) {
//     formattedInput = input.map(item => formatInput(item)).join(", ");  // Use formatInput to handle array items
//   }

//   // Check if user provided the Solution class, if not, wrap the class inside
//   if (!userCode.includes("class Solution")) {
//     // Wrap the user's code with the Solution class if it's not already included
//     userCode = class Solution {
//     ${userCode}
//     };
//   }

//   // Ensure that the user code and the function signature are properly formatted for Java
//   return 
// ${userCode}

// public class Main {
//     public static void main(String[] args) {
//         Solution sol = new Solution();
//         // Dynamically call the function with the provided input
//         System.out.println(sol.${functionName}(${formattedInput.join(", ")})); // Ensure correct function call
//     }
// }
//   ;
// }

// app.post("/run", async (req, res) => {
//   console.log("Run is clicked");

//   let { code, language, input, functionSignature } = req.body;

//   try {
//     // Ensure that the required fields are present
//     if (!code || !language || !input) {
//       return res.status(400).json({ error: "Code, language, and input are required" });
//     }

//     // Format the input according to its type (e.g., string, array, number, etc.)
//     input = formatInput(input);  // Use formatInput to handle different data types

//     // Check if the language is Java and wrap code accordingly
//     if (language === "java") {
//       // Wrap the user's code with the correct Java class structure
//       code = wrapJavaCode(code, input, functionSignature);
//     }

//     const body = {
//       source_code: code,
//       language_id: getLanguageId(language),
//       stdin: language === "java" ? "" : input,  // Java doesn't need stdin
//     };

//     const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
//     const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

//     const submissionResponse = await axios.post(JUDGE0_API_URL, body, {
//       params: { base64_encoded: "false", fields: "*" },
//       headers: {
//         "Content-Type": "application/json",
//         "X-RapidAPI-Key": JUDGE0_API_KEY,
//         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//       },
//     });

//     const token = submissionResponse.data.token;

//     const getResult = async () => {
//       try {
//         const result = await axios.get(`${JUDGE0_API_URL}/${token}`, {
//           params: { base64_encoded: "false", fields: "*" },
//           headers: {
//             "X-RapidAPI-Key": JUDGE0_API_KEY,
//             "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//           },
//         });

//         if (result.data.status.id <= 2) {
//           setTimeout(getResult, 1000); // Still processing
//         } else {
//           res.json({
//             output: result.data.stdout || result.data.stderr || result.data.compile_output || "No output",
//             status: result.data.status.description,
//           });
//         }
//       } catch (err) {
//         console.error("Error fetching execution result:", err.message);
//         res.status(500).json({ error: "Error fetching result" });
//       }
//     };

//     getResult();

//   } catch (err) {
//     console.error("Error during code submission:", err.message);
//     res.status(500).json({ error: "Code execution failed" });
//   }
// });


// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
