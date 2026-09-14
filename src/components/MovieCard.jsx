import { useState } from 'react';
import { useMovieStore } from '../stores/useMovieStore';

function MovieCard({ movie }) {
    // Panggil action langsung dari Zustand store
    const setSelectedMovieId = useMovieStore((state) => state.setSelectedMovieId);

    // Ambil state favorites dan fungsi toggleFavorite dari zustand
    const favorites = useMovieStore((state) => state.favorites);
    const toggleFavorite = useMovieStore((state) => state.toggleFavorite);
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

    const [imgError, setImgError] = useState(false);
    const hasValidPoster = movie.Poster && movie.Poster !== 'N/A' && !imgError;

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        toggleFavorite(movie);
    }
    
    return (
        <div
            onClick={() => setSelectedMovieId(movie.imdbID)}
            className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:scale-103 transition-transform duration-300 shadow-lg flex flex-col cursor-pointer group"
        >  
            <div className="h-72 overflow-hidden bg-slate-900 relative">
                {hasValidPoster ? (
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center p-4 text-center border-b border-slate-700 select-none">
                        <span className="text-4xl mb-2">🎬️</span>
                        <span className="text-xs font-semibold text-slate-400">Poster Tidak Tersedia</span>
                    </div>
                )}
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <span className="text-xs font-semibold px-2 py-1 bg-indigo-900/60 text-indigo-300 rounded uppercase tracking-wider">
                        {movie.Type}
                    </span>
                    <h3
                        className="text-base font-bold text-white mt-2 line-clamp-2 group-hover:text-indigo-400 transition-colors" 
                        title={movie.Title}
                    >
                        {movie.Title}
                    </h3>
                </div>
                <div className="text-xs text-slate-400 mt-3 flex justify-between">
                    <div>
                        Tahun: <span className="text-slate-200">{movie.Year}</span>
                    </div>
                    <button
                        onClick={handleFavoriteClick}
                        className={`text-base transition-all hover:scale-125 cursor-pointer ${
                            isFavorite ? 'text-pink-500' : 'text-slate-400 hover:text-pink-400'
                        }`}
                        title={isFavorite ? 'Hapus dari Favorit' : 'Tambah ke favorit'}
                    >
                        {isFavorite ? '❤️' : '♡'}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default MovieCard