# 🎬 MovieFinder

A modern, fast, and responsive web application for searching movies, viewing detailed information, and managing your personal favorite collection. Built with React, Vite, Tailwind CSS, and Zustand.

## 🌐 Live Demo

- **Vercel:** [https://movie-finder-app.vercel.app](https://movie-finder-app.vercel.app)
- **Netlify:** [https://movie-finder-app.netlify.app](https://movie-finder-app.netlify.app)

---

## ✨ Features

- 🔍 **Real-time Live Search:** Instant movie search powered by OMDb API.
- ⚡ **Debounced API Requests:** Integrated custom `useDebounce` hook to reduce unnecessary network traffic while typing.
- 💖 **Favorites System:** Save or remove favorite movies easily with a single click.
- 💾 **Persistent Storage:** Favorite list automatically syncs with browser `localStorage` using Zustand Persist middleware.
- 📱 **Fully Responsive UI:** Dark-themed, modern interface built with Tailwind CSS.
- 🖼️ **Fallback Handling:** Smart error handling for broken image links and missing poster assets.
- 🍿 **Detailed Movie Modal:** View full plot summary, ratings, genre, actors, and release details.

---

## 🛠️ Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (with Persist Middleware)
- **API:** OMDb API
- **Deployment:** Vercel & Netlify

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have Node.js installed and get a free API Key from OMDb API.

### Installation

1. **Clone the repository:**
   git clone [https://github.com/agushaislami/movie-finder-app.git](https://github.com/agushaislami/movie-finder-app.git)
   cd movie-finder-app

2. **Install dependencies:**
   npm install

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your OMDb API Key:
   VITE_OMDB_API_KEY=your_omdb_api_key_here

4. **Run the development server:**
   npm run dev

5. Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure

- `src/components/MovieCard.jsx` - Individual movie card component with favorite toggle
- `src/components/MovieList.jsx` - Grid layout for rendering lists of movies
- `src/components/MovieModal.jsx` - Modal popup for displaying full movie details
- `src/components/Navbar.jsx` - Top navigation bar with search input and tab switching
- `src/hooks/useDebounce.js` - Custom hook to debounce rapid inputs
- `src/stores/useMovieStore.js` - Zustand global state store (favorites, modal, navigation)
- `src/App.jsx` - Main application page logic

---

## 📄 License

Distributed under the MIT License.