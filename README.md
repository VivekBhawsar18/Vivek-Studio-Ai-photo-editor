# AI Photo Editor by Vivek Bhawsar

An intuitive web application for powerful, prompt-based image editing. Created by Vivek Bhawsar, this tool allows users to upload a photo, describe the desired changes in plain English, and receive a beautifully edited version of their image in seconds.

![Photo Editor Screenshot](https://storage.googleapis.com/aistudio-hosting/generative-ai-studio/gallery/6684814917639/1722304856008.png)

## ✨ Features

-   **Seamless Image Upload**: Easily upload images via a file picker or a drag-and-drop interface.
-   **Powerful Prompt-Based Editing**: Describe complex edits with simple text prompts (e.g., "add a superhero cape," "change the background to a futuristic city").
-   **Side-by-Side Comparison**: Instantly compare the original and edited images in a clear, responsive viewer.
-   **Real-time Feedback**: A sleek UI provides loading indicators during image processing and clear error messages when something goes wrong.
-   **Responsive Design**: A beautiful and functional experience across desktops, tablets, and mobile devices.
-   **Modern Tech Stack**: Built with React and TypeScript, styled with Tailwind CSS for a fast and maintainable codebase.

## 🚀 Tech Stack

-   **Frontend**: [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Bundler/Dev Server**: Vite

## 🔧 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
-   A package manager like `npm` or `yarn`
-   An API Key from the required image generation service.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-photo-editor.git
    cd ai-photo-editor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up your environment variables:**
    -   Create a file named `.env` in the root of your project.
    -   Add your API key to this file. This file is ignored by git and should not be committed.

    ```env
    # .env
    API_KEY="YOUR_API_KEY_HERE"
    ```

    > **Note**: This project uses Vite. A `vite.config.js` file is included to safely load your `API_KEY` from the `.env` file and make it available to the application as `process.env.API_KEY`. This is necessary because environment variables are not directly accessible in the browser.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:5173](http://localhost:5173) (or the address shown in your terminal) to view the application in your browser.

## 📁 Project Structure

The project is organized into logical directories to keep the codebase clean and maintainable.

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components (Header, ImageViewer, etc.)
│   ├── services/        # Modules for external API calls (geminiService.ts, rateLimiter.ts)
│   ├── types/           # Shared TypeScript type definitions (types.ts)
│   ├── App.tsx          # Main application component
│   └── index.tsx        # Application entry point
├── .env                 # Environment variables (contains API_KEY) - GitIgnored
├── index.html           # Main HTML file
├── vite.config.js       # Vite configuration
└── README.md            # You are here!
```

## 📄 License

This project is licensed under the MIT License.