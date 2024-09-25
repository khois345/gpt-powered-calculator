# Gemini-Powered Calculator

This project is a **Next.js** calculator application that integrates with the **Gemini API** for performing advanced mathematical calculations. It supports basic arithmetic, power, trigonometric functions, logarithms, and exponents. The app utilizes prompt engineering to evaluate user expressions using the Gemini API.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Requirements

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- Gemini API Key (from [Google's Gemini API](https://developers.generativeai.google))
- NextJS and Tailwind

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/khois345/gpt-powered-calculator
    cd gemini-calculator
    ```

2. **Install dependencies:**

    Using `npm`:
    ```bash
    npm install
    ```

    or using `yarn`:
    ```bash
    yarn install
    ```

## Environment Variables

This project requires a `.env.local` file to store sensitive API information like the Gemini API key. Follow the steps below to create this file.

1. In the root directory of your project, create a `.env.local` file:

    ```bash
    touch .env.local
    ```

2. Add the following environment variable to `.env.local`:

    ```bash
    NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
    ```

    Replace `your-gemini-api-key` with the actual API key obtained from the Gemini API dashboard.

3. Ensure `.env.local` is added to `.gitignore` to prevent it from being committed to version control:

    ```bash
    # .gitignore
    .env.local
    ```

## Running the Project

1. To run the development server, use the following command:

    Using `npm`:
    ```bash
    npm run dev
    ```

    or using `yarn`:
    ```bash
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:3000`. You should now see the calculator interface.

## Usage

The calculator allows users to input various types of mathematical expressions. The Gemini API processes these inputs and returns the evaluated result.

### Example Expressions:
- **Addition**: `2 + 2`
- **Power**: `3^2`
- **Trigonometric functions**: `sin(30)`
- **Logarithms**: `log(100)`
- **Exponentiation**: `e^2`

## Troubleshooting

- **API Errors**: Ensure your Gemini API key is correctly placed in the `.env.local` file. If you're receiving errors like `500 Internal Server Error`, check the [Gemini API troubleshooting guide](https://developers.generativeai.google/guide/troubleshooting).
  
- **Environment Variables Not Loaded**: Make sure the `.env.local` file is properly created in the root directory of your project. If the environment variables are not loading, try restarting the server.

## Note
- This program is made for educational purposes only.
