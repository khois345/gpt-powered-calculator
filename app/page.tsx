"use client";

import { useState } from 'react';
import KeyboardPad from './components/keyboardpad';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
    <div className=''>
      <h1 className='text-center'>Generative AI-powered calculator</h1>
      <input
        type="text"
        className="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {loading && <div>Loading...</div>}
      <div>{result}</div>
      <KeyboardPad
        onButtonClick={(value) => {
          if (done) {
            setPrompt(value);
            setDone(false);
          }
          else if (value === 'CALC') {
            handleSubmit();
            setDone(true);
          } else if (value === 'DEL' && prompt) {
            setPrompt((prev) => prev.slice(0, -1));
          } else if (value === 'pow') {
            setPrompt((prev) => prev + '^');
          } else {
            setPrompt((prev) => prev + value);
          }
        }}
      />
    </div>
  );
}
