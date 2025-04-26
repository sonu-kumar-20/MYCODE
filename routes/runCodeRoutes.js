// const express = require("express");
// const axios = require("axios");
// const { formatInput } = require("../utils/utils");
// const router = express.Router();

// // Function to get the correct language ID for Judge0 API
// function getLanguageId(language) {
//   const map = {
//     cpp: 54,
//     java: 62,
//     javascript: 63,
//     python: 71,
//   };
//   return map[language];
// }

// function formatJavaInput(input) {
//   try {
//     const parsed = JSON.parse(input);
//     return convertToJava(parsed);
//   } catch (err) {
//     if (!isNaN(input)) return input;
//     if (input === "true" || input === "false") return input;
//     return `"${input}"`;
//   }
// }

// function convertToJava(value) {
//   if (typeof value === "string") {
//     return `"${value}"`;
//   } else if (typeof value === "number" || typeof value === "boolean") {
//     return `${value}`;
//   } else if (Array.isArray(value)) {
//     const inner = value.map((v) => convertToJava(v));
//     if (Array.isArray(value[0])) {
//       return `new int[][]{${inner.join(",")}}`;
//     }
//     return `new int[]{${inner.join(",")}}`;
//   } else {
//     return value;
//   }
// }

// // Wrap Java code with the function call and input
// function wrapJavaCode(userCode, input, functionSignature) {
//   if (!functionSignature) {
//     console.error("Function signature is missing.");
//     return "Error: Function signature is required.";
//   }

//   const functionNameMatch = functionSignature.match(/\b(\w+)\s*\(/);
//   const functionName = functionNameMatch ? functionNameMatch[1] : "add";

//   let inputParts = input.split(",").map(item => item.trim());
//   let formattedInput = inputParts.map(part => formatJavaInput(part));

//   if (!userCode.includes("class Solution")) {
//     userCode = `class Solution {\n${userCode}\n}`;
//   }

//   return `
// ${userCode}

// public class Main {
//     public static void main(String[] args) {
//         Solution sol = new Solution();
//         System.out.println(sol.${functionName}(${formattedInput.join(", ")}));
//     }
// }`;
// }

// // POST route to handle code execution
// router.post("/", async (req, res) => {
//   console.log("Run is clicked");

//   let { code, language, testCases, functionSignature } = req.body;
//   if (!code || !language || !testCases || testCases.length === 0) {
//     return res.status(400).json({ error: "Code, language, and test cases are required" });
//   }

//   const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
//   const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

//   const results = [];

//   for (const test of testCases) {
//     let input = formatInput(test.input);
//     let wrappedCode = code;

//     if (language === "java") {
//       wrappedCode = wrapJavaCode(code, test.input, functionSignature);
//     }

//     const body = {
//       source_code: wrappedCode,
//       language_id: getLanguageId(language),
//       stdin: language === "java" ? "" : input,
//     };

//     try {
//       const submissionResponse = await axios.post(JUDGE0_API_URL, body, {
//         params: { base64_encoded: "false", fields: "*" },
//         headers: {
//           "Content-Type": "application/json",
//           "X-RapidAPI-Key": JUDGE0_API_KEY,
//           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//         },
//       });

//       const token = submissionResponse.data.token;

//       let result;
//       while (true) {
//         result = await axios.get(`${JUDGE0_API_URL}/${token}`, {
//           params: { base64_encoded: "false", fields: "*" },
//           headers: {
//             "X-RapidAPI-Key": JUDGE0_API_KEY,
//             "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//           },
//         });

//         if (result.data.status.id > 2) break;
//         await new Promise((r) => setTimeout(r, 1000));
//       }

//       console.log("✅ Input:", test.input);
//       console.log("🎯 Expected:", test.expectedOutput);
//       console.log("📤 Output:", result.data.stdout?.trim());
//       console.log("📌 Status:", result.data.status.description);

//       results.push({
//         input: test.input,
//         expectedOutput: test.expectedOutput,
//         actualOutput: result.data.stdout?.trim() || "",
//         status: result.data.status.description,
//       });
//     } catch (err) {
//       console.error("Judge0 error:", err.message);
//       results.push({
//         input: test.input,
//         expectedOutput: test.expectedOutput,
//         actualOutput: "Error while executing",
//         status: "Error",
//       });
//     }
//   }

//   return res.json({ results });
// });

// module.exports = router;



const express = require("express");
const axios = require("axios");
const { formatInput } = require("../utils/utils");
const router = express.Router();

// Function to get the correct language ID for Judge0 API
function getLanguageId(language) {
  const map = {
    cpp: 54,
    java: 62,
    javascript: 63,
    python: 71,
  };
  return map[language];
}

// Function to format Java input for various data types
function formatJavaInput(input) {
  try {
    const parsed = JSON.parse(input);
    return convertToJava(parsed);
  } catch (err) {
    if (!isNaN(input)) return input; // Return number as-is
    if (input === "true" || input === "false") return input; // Boolean as-is
    return `"${input}"`; // Wrap strings with quotes
  }
}

// Function to convert JavaScript data types into Java-compatible syntax
function convertToJava(value) {
  if (typeof value === "string") {
    return `"${value}"`; // For strings
  } else if (typeof value === "number" || typeof value === "boolean") {
    return `${value}`; // For numbers and booleans
  } else if (Array.isArray(value)) {
    // Handle arrays
    const inner = value.map((v) => convertToJava(v)); // Recursively convert array elements
    if (Array.isArray(value[0])) {
      // Handle 2D arrays
      return `new int[][]{${inner.join(", ")}}`;
    }
    // Handle 1D arrays
    return `new int[]{${inner.join(", ")}}`;
  } else {
    return value; // Return other types as-is (objects, etc.)
  }
}

// Function to wrap Java code with function call and input for testing
function wrapJavaCode(userCode, input, functionSignature) {
  if (!functionSignature) {
    console.error("Function signature is missing.");
    return "Error: Function signature is required.";
  }

  const functionNameMatch = functionSignature.match(/\b(\w+)\s*\(/);
  const functionName = functionNameMatch ? functionNameMatch[1] : "add";

  // Split the input and format it for Java
  let inputParts = input.split(",").map(item => item.trim());
  let formattedInput = inputParts.map(part => formatJavaInput(part)).join(", ");

  // Ensure that the user code is wrapped in a class if needed
  if (!userCode.includes("class Solution")) {
    userCode = `class Solution {\n${userCode}\n}`;
  }

  // Return the wrapped Java code with the function call
  return `
${userCode}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.${functionName}(${formattedInput}));
    }
}`;
}

// POST route to handle code execution
router.post("/", async (req, res) => {
  console.log("Run is clicked");

  let { code, language, testCases, functionSignature } = req.body;
  if (!code || !language || !testCases || testCases.length === 0) {
    return res.status(400).json({ error: "Code, language, and test cases are required" });
  }

  const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

  const results = [];

  for (const test of testCases) {
    let input = formatInput(test.input);
    let wrappedCode = code;

    if (language === "java") {
      wrappedCode = wrapJavaCode(code, test.input, functionSignature);
    }

    const body = {
      source_code: wrappedCode,
      language_id: getLanguageId(language),
      stdin: language === "java" ? "" : input,
    };

    try {
      const submissionResponse = await axios.post(JUDGE0_API_URL, body, {
        params: { base64_encoded: "false", fields: "*" },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      });

      const token = submissionResponse.data.token;

      let result;
      while (true) {
        result = await axios.get(`${JUDGE0_API_URL}/${token}`, {
          params: { base64_encoded: "false", fields: "*" },
          headers: {
            "X-RapidAPI-Key": JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        });

        if (result.data.status.id > 2) break;
        await new Promise((r) => setTimeout(r, 1000));
      }

      console.log("✅ Input:", test.input);
      console.log("🎯 Expected:", test.expectedOutput);
      console.log("📤 Output:", result.data.stdout?.trim());
      console.log("📌 Status:", result.data.status.description);

      results.push({
        input: test.input,
        expectedOutput: test.expectedOutput,
        actualOutput: result.data.stdout?.trim() || "",
        status: result.data.status.description,
      });
    } catch (err) {
      console.error("Judge0 error:", err.message);
      results.push({
        input: test.input,
        expectedOutput: test.expectedOutput,
        actualOutput: "Error while executing",
        status: "Error",
      });
    }
  }

  return res.json({ results });
});

module.exports = router;
