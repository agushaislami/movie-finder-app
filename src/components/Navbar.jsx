import { useMovieStore } from '../stores/useMovieStore';

function Navbar({ searchTerm, onSearchChange }) {
    const activeTab = useMovieStore((state) => state.activeTab);
    const setActiveTab = useMovieStore((state) => state.setActiveTab);
    const favorites = useMovieStore((state) => state.favorites);

    return (
        <nav className='bg-slate-900 border-b border-slate-800 sticky top-0 sticky z-10 p-4'>
            <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4'>
                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                    <h1
                        onClick={() => setActiveTab('home')}
                        className='text-xl font-bold text-white tracking-wide flex items-center gap-2 cursor-pointer'
                    >
                        <span className='text-indigo-500'>Movie</span>Finder
                    </h1>
                    <div
                        className='flex gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700'
                    >
                        <button
                            onClick={() => setActiveTab('home')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                                activeTab === 'home'
                                    ? 'bg-indigo-600 text-white shadow'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Beranda
                        </button>
                        <button
                            onClick={() => setActiveTab('favorites')}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                                activeTab === 'favorites'
                                    ? 'bg-indigo-600 text-white shadow'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <span>Favorit</span>
                            {favorites.length > 0 && (
                                <span className='bg-pink-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold'>
                                    {favorites.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                <div className='w-full sm:w-auto'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder='Cari film...'
                        className='w-full sm:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all'
                    />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;