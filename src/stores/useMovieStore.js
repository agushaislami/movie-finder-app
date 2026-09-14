import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useMovieStore = create(
    persist(
        (set) => ({
            // State global
            selectedMovieId: null,

            // State array untuk menyimpan film favorit
            favorites: [],

            // State untuk melacak tab yang aktif (home and favorites)
            activeTab: 'home',

            // Action (fungsi untuk mengubah state)
            setSelectedMovieId: (id) => set({ selectedMovieId: id }),
            clearSelectedMovie: () => set({ selectedMovieId: null }),

            // Action untuk mengubah tab aktif
            setActiveTab: (tab) => set({ activeTab: tab }),

            toggleFavorite: (movie) =>
                set((state) => {
                    const isFav = state.favorites.some((fav) => fav.imdbID === movie.imdbID);
                    if (isFav) {
                        return {
                            favorites: state.favorites.filter((fav) => fav.imdbID !== movie.imdbID),
                        };
                    } else {
                        return {
                            favorites: [...state.favorites, movie],
                        };
                    }
                }),
        }),
        {
            name: 'movie-finder-storage',
            partialize: (state) => ({ favorites: state.favorites }),
        }
    )
);