"use client";

import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    } 

    setLoading(true);
    setResult('');

    try {
      // Send a POST request to the API route with the prompt
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: "Answer only:" + prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.text_content);
      } else {
        setResult(`Error: ${data.error || 'Failed to get response'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error: Failed to get a response from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>This is testing Gemini API prompt and returned result</div>
      <input
        type="text"
        className="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {loading && <div>Loading...</div>}
      <div>{result}</div>
    </div>
  );
}
