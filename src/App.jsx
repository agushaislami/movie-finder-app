import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import { useDebounce } from './hooks/useDebounce';
import { useMovieStore } from './stores/useMovieStore';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('Avengers')

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const selectedMovieId = useMovieStore((state) => state.selectedMovieId);
  const activeTab = useMovieStore((state) => state.activeTab);
  const favorites = useMovieStore((state) => state.favorites);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const fetchMovies = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
      );

      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || 'Film tidak ditemukan');
      }
    } catch {
      setError('Gagal mengambil data dari server.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={(value) => setSearchTerm(value)}
      />

      <main className='flex-1 max-w-6xl w-full mx-auto p-4 md:p-6'>
        {/* Halaman Beranda */}
        {activeTab === 'home' && (
          <>
            <h2 className="text-lg font-medium text-slate-400 mb-4">
              Hasil pencarian untuk: <span className='text-white font-bold'>"{debouncedSearchTerm}"</span>
            </h2>
            {/* Kondisi loading */}
            {loading && (
              <div className='text-center py-20'>
                <div className='inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent'></div>
                <p className='mt-3 text-slate-400 text-sm'>Mencari film...</p>
              </div>
            )}

            {/* Kondisi error */}
            {!loading && error && (
              <div className='bg-rose-950/50 border border-rose-800 text-rose-300 p-4 rounded-xl text-center my-8'>
                <p className='font-semibold'>{error}</p>
              </div>
            )}

            {/* Kondisi berhasil menampilkan data */}
            {!loading && !error && movies.length > 0 && (
              <MovieList
                movies={movies}
              />
            )}
          </>
        )}

        {/* Halaman Favorit */}
        {activeTab === 'favorites' && (
          <>
            <h2 className='text-lg font-medium text-slate-400 mb-4'>
              Daftar film favorit saya (<span className='text-pink-400 font-bold'>{favorites.length}</span>)
            </h2>
            {favorites.length === 0 ? (
              <div className='text-center py-20 bg-slate-900/50 border border-slate-800 rounded-2xl p-8'>
                <p className='text-4xl mb-3'>💔</p>
                <h3 className="text-lg font-bold text-white mb-1">Belum ada film favorit</h3>
                <p className='text-sm text-slate-400'>
                  Klik ikon hati (♡) pada film yang kamu sukai di Beranda untuk menyimpannya di sini.
                </p>
              </div>
            ) : (
              <MovieList movies={favorites} />
            )}
          </>
        )}
      </main>
      
      {selectedMovieId && (
        <MovieModal
          movieId={selectedMovieId}
        />
      )}
    </div>
  );
}

export default App;