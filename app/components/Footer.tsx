import React from "react";

export default function Footer() {
  return (
    <footer className="mt-6 px-4 text-center text-gray-400">


      <p className="text-xs">
        <span className="font-semibold">About this website:</span> built with
        Next.js, TypeScript, Tailwind CSS and Gemini API.
        <br/>
        This website is for educational purposes only.
        <small className="mt-2 block text-xs">
        &copy; 2024 Tran.
      </small>
      </p>
    </footer>
  );
}
