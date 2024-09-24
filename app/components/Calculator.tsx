"use client";

import { useState, useRef } from "react";
import KeyboardPad from "./KeyboardPad";

const DEBUG = false;

export default function Calculator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: "Answer only:" + prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.text_content);
      } else {
        setResult(`Error: ${data.error || "Failed to get response"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Error: Failed to get a response from the server.");
    } finally {
      setLoading(false);
    }
  };

  // If single click, add decimal point. If double click, add degree symbol
  const handleDotAndDegreeClick = () => {
    if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickTimeout.current = null;
        setPrompt((prev) => prev + "°"); // Add degree symbol on double click
      } else {
        // If first click, set timeout for second click detection
        clickTimeout.current = setTimeout(() => {
          setPrompt((prev) => prev + ".");
          clickTimeout.current = null;
        }, 300); // 300ms timeout for double click detection
      }
  };

  return (
    <div className="flex flex-col justify-center items-center m-auto w-5/6 p-5 text-center bg-neutral-700 rounded-md md:w-3/4 lg:h-[35.5rem] lg:w-[40rem]">
      <div className="rounded border text-right h-[12vh] w-[95%] bg-gray-100">
        {DEBUG ? (
        <input
          type="text"
          className="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        ) : (
        <div className="prompt">{prompt}</div>
        )}

        {loading && <div>Loading...</div>}
        <h2>{result}</h2>
      </div>

      <KeyboardPad
        onButtonClick={(value) => {
          switch (value) {
            case "CALC":
              handleSubmit();
              setDone(true);
              break;
            case "DEL":
              if (prompt) {
                setPrompt((prev) => prev.slice(0, -1));
              }
              break;
            case "AC":
              setPrompt("");
              break;
            case "pow":
              setPrompt((prev) => prev + "^");
              break;
            case ". | °":
                handleDotAndDegreeClick();
                break;
            case "sin":
                setPrompt((prev) => prev + "sin(");
                break;
            case "cos":
                setPrompt((prev) => prev + "cos(");
                break;
            case "tan":
                setPrompt((prev) => prev + "tan(");
                break;
            case "sqrt":
                setPrompt((prev) => prev + "sqrt(");
                break;
            case "log":
                setPrompt((prev) => prev + "log(");
                break;
            case "exp":
                setPrompt((prev) => prev + "exp(");
                break;
            default:
              if (done) {
                setPrompt(value);
                setDone(false);
              }
              setPrompt((prev) => prev + value);
              break;
          }
        }}
      />
    </div>
  );
}
