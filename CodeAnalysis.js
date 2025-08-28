import React, { useState, useEffect } from 'react';

const CodeAnalysis = ({ response }) => {
  const [formattedContent, setFormattedContent] = useState('');

  // Function to format the raw content dynamically on the frontend
  const formatContent = (content) => {
    const sections = {
      bugsErrors: '',
      optimizations: '',
      formattedCode: ''
    };

    // Split content into sections by keywords (Bugs/Errors, Optimizations, Corrected code)
    if (content.includes('Bugs/Errors:')) {
      const bugsStart = content.indexOf('Bugs/Errors:');
      const optimizationsStart = content.indexOf('Optimizations:');
      const formattedCodeStart = content.indexOf('Corrected code:');

      sections.bugsErrors = content.substring(bugsStart, optimizationsStart).trim();
      sections.optimizations = content.substring(optimizationsStart, formattedCodeStart).trim();
      sections.formattedCode = content.substring(formattedCodeStart).trim();
    }

    // Format each section
    const formattedBugs = sections.bugsErrors ? (
      <div className="error-message">
        <h3>Bugs/Errors:</h3>
        <p>{sections.bugsErrors}</p>
      </div>
    ) : (
      <div className="error-message">
        <h3>No Bugs or Errors Found</h3>
        <p>Your code is bug-free!</p>
      </div>
    );

    const formattedOptimizations = sections.optimizations ? (
      <div className="analysis-result">
        <h3>Optimizations:</h3>
        <p>{sections.optimizations}</p>
      </div>
    ) : (
      <div className="analysis-result">
        <h3>No Optimizations Needed</h3>
        <p>Your code is efficient as it is.</p>
      </div>
    );

    const formattedCode = sections.formattedCode ? (
      <div className="formatted-code">
        <h3>Corrected Code:</h3>
        <pre className="code-block">{sections.formattedCode}</pre>
      </div>
    ) : null;

    return (
      <>
        {formattedBugs}
        {formattedOptimizations}
        {formattedCode}
      </>
    );
  };

  useEffect(() => {
    if (response) {
      const formatted = formatContent(response); // Format the content when the response changes
      setFormattedContent(formatted);
    }
  }, [response]);

  return (
    <div className="container">
      <h2>Analysis Result</h2>
      <div>{formattedContent}</div>  {/* Render the formatted content */}
    </div>
  );
};

export default CodeAnalysis;
