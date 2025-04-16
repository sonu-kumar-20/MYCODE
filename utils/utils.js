
// module.exports = { formatInput };

function formatInput(input) {
  if (typeof input === "string") {
    // Check if it's a stringified array like "[1, 2, 3]"
    if (/^\s*\[\s*-?\d+(\s*,\s*-?\d+)*\s*\]\s*$/.test(input)) {
      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed) && parsed.every(num => typeof num === "number")) {
          return `new int[]{${parsed.join(", ")}}`;
        }
      } catch (e) {
        // If parsing fails, treat it as a regular string
        return `"${input}"`;
      }
    }

    // Check if it's a comma-separated list of numbers like "1, 2"
    if (/^\s*-?\d+(\s*,\s*-?\d+)*\s*$/.test(input)) {
      return input.split(",").map(num => Number(num.trim())).join(", ");
    }

    // Treat it as a regular string
    return `"${input}"`;
  }

  if (typeof input === "number") {
    return input;
  }

  if (Array.isArray(input)) {
    if (input.every(num => typeof num === "number")) {
      return `new int[]{${input.join(", ")}}`;
    } else {
      return input.map(item => formatInput(item)).join(", ");
    }
  }

  if (typeof input === "boolean") {
    return input;
  }

  if (input instanceof Date) {
    return `"${input.toISOString()}"`;
  }

  if (typeof input === "object") {
    return JSON.stringify(input);
  }

  if (typeof input === "symbol") {
    return input.description || "";
  }

  return input;
}

module.exports = { formatInput };

//  // Utility function to format inputs for Java and other languages
// function formatInput(input) {
//   if (typeof input === "string") {
//     // Check if it's a comma-separated list of numbers (e.g., "1, 2")
//     if (/^\s*-?\d+(\s*,\s*-?\d+)*\s*$/.test(input)) {
//       return input.split(",").map(num => Number(num.trim())).join(", ");
//     }
//     // Otherwise, treat it as a normal string
//     return `"${input}"`;
//   } else if (typeof input === "number") {
//     return input;
//   } else if (Array.isArray(input)) {
//     return input.map(item => formatInput(item)).join(", ");
//   } else if (typeof input === "boolean") {
//     return input;
//   } else if (input instanceof Date) {
//     return `"${input.toISOString()}"`;
//   } else if (typeof input === "object") {
//     return JSON.stringify(input);
//   } else if (typeof input === "symbol") {
//     return input.description || "";
//   } else if (typeof input === "string" && input.length === 1) {
//     return `'${input}'`;
//   }

//   return input;
// }

// module.exports = { formatInput };
