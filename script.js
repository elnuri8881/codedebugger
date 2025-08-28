function analyzeCode() {
    const code = document.getElementById("codeInput").value;
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");

    // Clear previous results
    resultDiv.style.display = "none";
    errorDiv.textContent = "";

    if (!code.trim()) {
        errorDiv.textContent = "Please paste some code!";
        return;
    }

    // Show loading state
    resultDiv.textContent = "Analyzing your code...";
    resultDiv.style.display = "block";

    // Make the POST request to the backend API
    fetch("http://localhost:9131/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
    })
    .then(response => response.text()) // Expecting plain text response
    .then(data => {
        // Format and sanitize the backend response
        resultDiv.innerHTML = formatBackendResponse(data);
        resultDiv.style.display = "block";
    })
    .catch(error => {
        errorDiv.textContent = "Error analyzing the code: " + error.message;
    });
}

// Sanitize the HTML content by removing potentially dangerous elements
function sanitizeHTML(input) {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || ""; // Return sanitized text, safe to insert into DOM
}

// Format the backend response into the required structure (for plain text)
function formatBackendResponse(data) {
    // Split the plain text response into parts (we assume a simple format like 'Bugs/Errors' and 'Optimizations')
    const bugsPattern = /Bugs\/Errors:(.*?)(?=Optimizations:|$)/s;
    const optimizationsPattern = /Optimizations:(.*?)(?=Code with optimizations:|$)/s;
    const formattedCodePattern = /Code with optimizations:(.*)/s;

    const bugsMatch = data.match(bugsPattern);
    const optimizationsMatch = data.match(optimizationsPattern);
    const formattedCodeMatch = data.match(formattedCodePattern);

    let formattedResponse = `<div class="analysis-section">`;

    // Handle Bugs/Errors section
    if (bugsMatch) {
        formattedResponse += `
            <h3 style="color: red; font-weight: bold;">Bugs/Errors:</h3>
            <p>${sanitizeHTML(bugsMatch[1].trim())}</p>
        `;
    } else {
        formattedResponse += `
            <h3 style="color: red; font-weight: bold;">Bugs/Errors:</h3>
            <p>No bugs or errors found in the code provided.</p>
        `;
    }

    // Handle Optimizations section
    if (optimizationsMatch) {
        formattedResponse += `
            <h3 style="color: green; font-weight: bold;">Optimizations:</h3>
            <p>${sanitizeHTML(optimizationsMatch[1].trim())}</p>
        `;
    } else {
        formattedResponse += `
            <h3 style="color: green; font-weight: bold;">Optimizations:</h3>
            <p>No optimizations needed for the code provided.</p>
        `;
    }

    // Handle Corrected and Optimized Code section
    if (formattedCodeMatch) {
        formattedResponse += `
            <h3 style="color: blue; font-weight: bold;">Corrected and Optimized Code:</h3>
            <pre style="background-color: #f4f4f4; padding: 10px; font-family: monospace;">
            ${sanitizeHTML(formattedCodeMatch[1].trim())}
            </pre>
        `;
    }

    formattedResponse += `</div>`;
    
    return formattedResponse; // Return the formatted and sanitized response
}
