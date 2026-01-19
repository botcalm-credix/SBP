# BetLive Pro 🏆

A premium, mobile-first progressive web application (PWA) for sports betting enthusiasts. Features real-time odds, live match tracking, and AI-powered insights using Google Gemini.

## Features ✨

- **Live Match Tracking**: Real-time scores, minutes, and status updates.
- **AI Assistant (BetBot)**: Powered by Gemini 3 Flash for instant answers to betting queries.
- **AI Insights**: One-click analysis of live matches using Gemini.
- **Dynamic Banners**: AI-generated match banners using Gemini 2.5 Flash Image.
- **Mobile-First Design**: Smooth, app-like experience with bottom navigation and slide-up bet slip.
- **PWA Support**: Installable on iOS and Android.

## Tech Stack 🛠️

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google GenAI SDK (`@google/genai`)

## Getting Started 🚀

### Prerequisites

- Node.js (v18+)
- A Google AI Studio API Key

### Installation

1.  **Clone the repository** (if you haven't already initialized it):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_gemini_api_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## Project Structure 📂

- `/components` - UI components (MatchCard, BetSlip, Sidebar, etc.)
- `/services` - API integration logic (Gemini AI)
- `App.tsx` - Main application layout and state management
- `types.ts` - TypeScript definitions

## AI Features 🤖

This project uses the `@google/genai` SDK.
- **Chat**: `gemini-3-flash-preview`
- **Insights**: `gemini-3-flash-preview`
- **Image Generation**: `gemini-2.5-flash-image`

---
*Note: This is a demo application. No real money betting is involved.*
