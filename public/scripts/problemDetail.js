const templates = <%- JSON.stringify(problem.templates) %>;  // This should pass the templates from your backend

require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  const languageSelector = document.getElementById('language-selector');
  let selectedLang = languageSelector.value || 'javascript';

  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: templates[selectedLang],  // Initial template based on language
    language: selectedLang,
    theme: 'vs-dark',
    automaticLayout: true
  });

  languageSelector.addEventListener('change', function () {
    selectedLang = languageSelector.value;
    monaco.editor.setModelLanguage(editor.getModel(), selectedLang);
    editor.setValue(templates[selectedLang]);
  });

  window.runCode = function () {
    const code = editor.getValue();
    const language = languageSelector.value;
    const input = "<%= problem.testCases && problem.testCases[0] ? problem.testCases[0].input : '' %>";  // Ensure there's at least one test case
    const expected = "<%= problem.testCases && problem.testCases[0] ? problem.testCases[0].expectedOutput : '' %>".trim();
    const outputDiv = document.getElementById("run-output");

    const functionSignature = "<%= problem.functionSignature || '' %>";
    const functionNameMatch = functionSignature.match(/\b(\w+)\s*\(/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "";

    // Check if inputs are valid before making the request
    if (!input || !expected) {
      outputDiv.className = "output-box fail";
      outputDiv.innerHTML = "<span style='color: red;'>Error: Test case input or expected output is missing.</span>";
      return;
    }

    axios.post('/run', {
      code: code,
      language: language,
      input: input,
      functionName: functionName,
      functionSignature: functionSignature
    })
    .then(response => {
      const { output, status } = response.data;
      const actual = output.trim();
      const passed = actual === expected;

      outputDiv.className = "output-box " + (passed ? "pass" : "fail");
      outputDiv.innerHTML = `
        ${passed ? "✅ <b>Test Case Passed</b>" : "❌ <b>Test Case Failed</b>"}<br><br>
        <b>Status:</b> ${status}<br><br>
        <b>Expected Output:</b><br>${expected}<br><br>
        <b>Your Output:</b><br>${actual}
      `;
    })
    .catch(error => {
      console.error("Error running code:", error);
      outputDiv.className = "output-box fail";
      outputDiv.innerHTML = `<span style="color: red;">An error occurred while running your code.</span>`;
    });
  };
});
