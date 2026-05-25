import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ListPage.css';

export default function ListPage() {
  const { id } = useParams();
  const [listTitle, setListTitle] = useState('');
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_KEY = "9374cc3b"
  useEffect(() => {
    setLoading(true);
    setError('');

    try {
      const savedLists = JSON.parse(localStorage.getItem('movieLists')) || {};
      const currentList = savedLists[id];

      if (!currentList) {
        throw new Error('List not found!');
      }

      setListTitle(currentList.title);

      if (currentList.movies.length === 0) {
        setMoviesDetails([]);
        setLoading(false);
        return;
      }

      const moviePromises = currentList.movies.map((imdbID) =>
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`).then((res) => res.json())
      );

      Promise.all(moviePromises)
        .then((moviesData) => {
          setMoviesDetails(moviesData);
          setLoading(false);
        })
        .catch(() => {
          setError('An OMDb error occurred while fetching the data');
          setLoading(false);
        });

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [id, API_KEY]);

  const handleDeleteMovie = (imdbID) => {
    const updatedDetails = moviesDetails.filter(movie => movie.imdbID !== imdbID);
    setMoviesDetails(updatedDetails);

    const savedLists = JSON.parse(localStorage.getItem('movieLists')) || {};

    if (savedLists[id]) {
      savedLists[id].movies = savedLists[id].movies.filter(id => id !== imdbID);
      localStorage.setItem('movieLists', JSON.stringify(savedLists));
    }
  };

  if (loading) return <div className="list-page-message">List loading...</div>;
  if (error) return <div className="list-page-message error">{error}</div>;

  return (
    <div className="list-page-container">
      <h2 className="list-title">{listTitle}</h2>

      {moviesDetails.length === 0 ? (
        <p className="no-movies-in-list">There are no movies in this list..</p>
      ) : (
        <div className="list-page-movies">
          {moviesDetails.map((movie) => (
            <div key={movie.imdbID} className="list-movie-card">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="list-movie-poster"
              />
              <div className="list-movie-info">
                <h3>{movie.Title}</h3>
                <p>Year: {movie.Year}</p>
                <p>Genre: {movie.Genre}</p>

                <div className="list-movie-actions">
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    className="imdb-link"
                  >
                    IMDb link
                  </a>

                  <button
                    onClick={() => handleDeleteMovie(movie.imdbID)}
                    className="delete-movie-from-list-btn"
                  >
                    Remove from list
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}