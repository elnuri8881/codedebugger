import React, { useState } from 'react';
import CodeAnalysis from './components/CodeAnalysis';

function App() {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');

  // Function to send the code to the backend for analysis
  const analyzeCode = async () => {
    try {
      const res = await fetch('http://localhost:9131/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.text();  // Assuming the response is plain text
      setResponse(data);  // Store the result to display it in CodeAnalysis component
    } catch (error) {
      console.error("Error analyzing code:", error);
    }
  };

  return (
    <div className="App">
      <h1>Code Analyzer</h1>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here"
        rows="10"
        cols="50"
      />
      <button onClick={analyzeCode}>Analyze Code</button>

      {response && <CodeAnalysis response={response} />} {/* Display the response */}
    </div>
  );
}

export default App;
