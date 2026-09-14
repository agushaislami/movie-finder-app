import MovieCard from './MovieCard';

function MovieList({ movies, onSelectMovie }) {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie} 
                />
            ))}
        </div>
    );
}

export default MovieList;
