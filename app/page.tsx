"use client";

import { useState } from 'react';

// Take apiKey from environment variables
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setResult(data.text);
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error fetching response.');
    }
  };

  return (
    <div>
      <div>This is testing chatgpt prompt and returned result</div>
      <input type="text" className="prompt" />
      <button onClick={handleSubmit}>Submit</button>
      {loading && <div>Loading...</div>}
      <div>{result}</div>
    </div>
  );
}
