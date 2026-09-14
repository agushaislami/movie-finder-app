import { useState, useEffect } from "react";
import { useMovieStore } from '../stores/useMovieStore';

function MovieModal({ movieId }) {
    const clearSelectedMovie = useMovieStore((state) => state.clearSelectedMovie);

    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [error, setError] = useState(null);
    const [imgError, setImgError] = useState(false);

    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    useEffect(() => {
        const fetchMovieDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`
                );
                const data = await response.json();

                if (data.Response === 'True') {
                    setDetail(data);
                } else {
                    setError(data.Error || 'Gagal memuat detail film');
                }
            } catch (err) {
                setError('Terjadi kesalahan koneksi');
            } finally {
                setLoading(false);
            }
        };
        if (movieId) {
            fetchMovieDetail();
        }
    }, [movieId, API_KEY]);

    const hasValidPoster = detail?.Poster && detail.Poster !== 'N/A' && !imgError;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn"
            onClick={clearSelectedMovie}
        >
            <div
                className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl my-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Tombol tutup */}
                <button
                    onClick={clearSelectedMovie}
                    className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                >
                    X
                </button>

                {loading && (
                    <div className="p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                        <p className="mt-3 text-slate-400 text-sm">Memuat detail film</p>
                    </div>
                )}

                {!loading && !error && detail && (
                    <div className="flex flex-col md:flex-row">
                        {/** Poster film */}
                        <div className="md:w-1/3 bg-slate-950 flex-shrink-0">
                            {hasValidPoster ? (
                                <img
                                    src={detail.Poster}
                                    alt={detail.Title}
                                    onError={() => setImgError(true)}
                                    className="w-full h-full object-cover max-h-80 md:max-h-full"
                                />
                            ) : (
                                <div className="w-full h-64 md:h-full bg-slate-900 flex flex-col items-center justify-center p-4 text-center border-r border-slate-800">
                                    <span className="text-5xl mb-2">🎬</span>
                                    <span className="text-xs font-semibold text-slate-400">Poster Tidak Tersedia</span>
                                </div>
                            )}
                        </div>

                        {/** Informasi detail */}
                        <div className="p-6 md:w-2/3 flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-bold px-2.5 py-1 bg-indigo-900/80 text-indigo-300 rounded-md">
                                        {detail.Genre}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        🕛️ {detail.Runtime}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        📅 {detail.Released}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mt-3">
                                    {detail.Title}
                                </h2>

                                {/** Rating badge */}
                                <div className="flex items-center gap-3 mt-2 text-sm text-slate-300">
                                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                                        ⭐️ {detail.imdbRating} <span className="text-slate-500 font-normal">/ 10</span>
                                    </span>
                                    <span>*</span>
                                    <span>{detail.Rated}</span>
                                </div>
                                <p className="text-slate-300 text-sm mt-4 leading-relaxed italic">
                                    "{detail.Plot}"
                                </p>
                            </div>

                            {/** Sutradara & Aktor */}
                            <div className="border-t border-slate-800 pt-4 space-y-1 text-xs text-slate-400">
                                <p>
                                    <strong className="text-slate-200">Sutradara:</strong> {detail.Director}
                                </p>
                                <p>
                                    <strong className="text-slate-200">Pameran:</strong> {detail.Actors}
                                </p>
                                <p>
                                    <strong className="text-slate-200">Penulis:</strong> {detail.Writer}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieModal;