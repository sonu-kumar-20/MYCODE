const templates = window.templates || {};

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  const languageSelector = document.getElementById('language-selector');
  let selectedLang = languageSelector?.value || 'javascript';

  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: templates[selectedLang] || "",
    language: selectedLang,
    theme: 'vs-dark',
    automaticLayout: true
  });

  languageSelector.addEventListener('change', () => {
    selectedLang = languageSelector.value;
    monaco.editor.setModelLanguage(editor.getModel(), selectedLang);
    editor.setValue(templates[selectedLang] || "");
  });

  window.runCode = function () {
    const code = editor.getValue();
    const language = languageSelector.value;
    const outputDiv = document.getElementById("run-output");
  
    const functionSignature = window.functionSignature || "";
    const functionNameMatch = functionSignature.match(/\b(\w+)\s*\(/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "";
  
    const testCases = (window.testCases || []).map(tc => ({
      input: tc.input?.trim().replace(/^"|"$/g, "") || "",  // Remove leading and trailing quotes
      expectedOutput: tc.expectedOutput?.trim().replace(/^"|"$/g, "") || ""  // Remove leading and trailing quotes
    }));
  
    // Validation: Ensure input/output are not empty
    const invalidTest = testCases.some(tc => !tc.input || !tc.expectedOutput);
    if (invalidTest) {
      outputDiv.className = "output-box fail";
      outputDiv.innerHTML = "<span style='color: red;'>Error: Each test case must have both input and expected output.</span>";
      return;
    }
  
    axios.post('/run', {
      code,
      language,
      functionSignature,
      functionName,
      testCases
    })
    .then(response => {
      const { results } = response.data;
      if (!Array.isArray(results)) {
        outputDiv.className = "output-box fail";
        outputDiv.innerHTML = "<span style='color: red;'>Invalid response format from server.</span>";
        return;
      }
  
      const finalHTML = results.map(({ input, expectedOutput, actualOutput, status }, index) => {
        const passed = (expectedOutput || "").trim() === (actualOutput || "").trim();
        return `
          <div class="${passed ? 'output-box pass' : 'output-box fail'}">
            <b>Test Case ${index + 1}:</b> ${passed ? "✅ Passed" : "❌ Failed"}<br><br>
            <b>Status:</b> ${status}<br>
            <b>Input:</b><br>${input}<br><br>
            <b>Expected Output:</b><br>${expectedOutput}<br><br>
            <b>Your Output:</b><br>${actualOutput || "undefined"}
          </div>
        `;
      }).join("");
  
      outputDiv.innerHTML = finalHTML;
    })
    .catch(error => {
      console.error("Error running code:", error);
      outputDiv.className = "output-box fail";
      outputDiv.innerHTML = `<span style="color: red;">An error occurred while running your code.</span>`;
    });
  };
  
});

















// const templates = window.templates;

// require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs' } });

// require(['vs/editor/editor.main'], function () {
//   const languageSelector = document.getElementById('language-selector');
//   let selectedLang = languageSelector.value || 'javascript';

//   const editor = monaco.editor.create(document.getElementById('editor'), {
//     value: templates[selectedLang],
//     language: selectedLang,
//     theme: 'vs-dark',
//     automaticLayout: true
//   });

//   languageSelector.addEventListener('change', function () {
//     selectedLang = languageSelector.value;
//     monaco.editor.setModelLanguage(editor.getModel(), selectedLang);
//     editor.setValue(templates[selectedLang]);
//   });

//   window.runCode = function () {
//     const code = editor.getValue();
//     const language = languageSelector.value;
//     const testCases = window.testCases || [{
//       input: window.testInput,
//       expectedOutput: window.expectedOutput
//     }];
    
//     const outputDiv = document.getElementById("run-output");

//     const functionSignature = window.functionSignature || "";
//     const functionNameMatch = functionSignature.match(/\b(\w+)\s*\(/);
//     const functionName = functionNameMatch ? functionNameMatch[1] : "";
//     const invalidTest = testCases.some(tc => !tc.input || !tc.expectedOutput);
// if (invalidTest) {
//   outputDiv.className = "output-box fail";
//   outputDiv.innerHTML = "<span style='color: red;'>Error: Each test case must have both input and expected output.</span>";
//   return;
// }

    

//     axios.post('/run', {
//       code,
//       language,
//       functionSignature,
//       testCases
//     })
    
//     .then(response => {
//       const { results } = response.data;
//       const outputDiv = document.getElementById("run-output");
//       let finalHTML = "";
    
//       results.forEach(({ input, expectedOutput, actualOutput, status }, index) => {
//         const passed = (expectedOutput || "").trim() === (actualOutput || "").trim();
//         finalHTML += `
//           <div class="${passed ? 'output-box pass' : 'output-box fail'}">
//             <b>Test Case ${index + 1}</b>: ${passed ? "✅ Passed" : "❌ Failed"}<br>
//             <b>Status:</b> ${status}<br>
//             <b>Input:</b> ${input}<br>
//             <b>Expected:</b> ${expectedOutput}<br>
//             <b>Your Output:</b> ${actualOutput}<br><br>
//           </div>
//         `;
//       });
      
    
//       outputDiv.innerHTML = finalHTML;
//     })
    
//     .catch(error => {
//       console.error("Error running code:", error);
//       outputDiv.className = "output-box fail";
//       outputDiv.innerHTML = `<span style="color: red;">An error occurred while running your code.</span>`;

//     });
//   };
// });

