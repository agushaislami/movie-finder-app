# 🎬 MovieFinder

A modern, fast, and responsive web application for searching movies, viewing detailed information, and managing your personal favorite collection. Built with React, Vite, Tailwind CSS, and Zustand.

![MovieFinder Demo](https://placehold.co/1200x600/0f172a/6366f1?text=MovieFinder+App+Screenshot)

## 🌐 Live Demo

- **Vercel:** [https://movie-finder-app.vercel.app](https://movie-finder-app.vercel.app) *(Ganti dengan link Vercel milikmu)*
- **Netlify:** [https://movie-finder-app.netlify.app](https://movie-finder-app.netlify.app) *(Ganti dengan link Netlify milikmu)*

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
- **API:** [OMDb API](https://www.omdbapi.com/)
- **Deployment:** Vercel & Netlify

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have Node.js installed and get a free API Key from [OMDb API](https://www.omdbapi.com/apikey.aspx).

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/agushaislami/movie-finder-app.git](https://github.com/agushaislami/movie-finder-app.git)
   cd movie-finder-app