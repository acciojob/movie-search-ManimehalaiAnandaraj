import React, { useState } from 'react';
import './../styles/MovieSearch.css';

const API_KEY = '99eb9fd1';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    if (!query.trim()) return;

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
        setError('');
      } else {
        setMovies([]);
        setError('Invalid movie name. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setMovies([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') searchMovies();
  };

  return (
    <div className="movie-search">
        <form>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
       </form>
      <button onClick={searchMovies}>Search</button>
      {error && <div className="error">{error}</div>}
      <ul className="movie-list">
  {movies.map((movie) => (
    <li key={movie.imdbID} className="movie-card">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
      />
      <div>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </li>
  ))}
</ul>
           </div>
  );
}

export default MovieSearch;
