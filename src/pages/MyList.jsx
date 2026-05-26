import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyList.css';

export default function MyLists() {
  const [lists, setLists] = useState({});
  const [loadedMovies, setLoadedMovies] = useState({});
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem('movieLists')) || {};
    setLists(savedLists);
    const allLoadedMovies = {};
    const listIds = Object.keys(savedLists);

    for (let i = 0; i < listIds.length; i++) {
      const id = listIds[i];
      const currentList = savedLists[id];

      allLoadedMovies[id] = [];

      for (let j = 0; j < currentList.movies.length; j++) {
        const imdbID = currentList.movies[j];
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
          .then(res => res.json())
          .then(movieData => {
            allLoadedMovies[id].push(movieData);
            setLoadedMovies({ ...allLoadedMovies });
          });
      }
    }
  }, []);

const handleDeleteList = (id) => {
  const { [id]: removedList, ...remainingLists } = lists;
  localStorage.setItem('movieLists', JSON.stringify(remainingLists));
  setLists(remainingLists);
  const { [id]: removedMovies, ...remainingMovies } = loadedMovies;
  setLoadedMovies(remainingMovies);
};

const handleDeleteMovie = (listId, imdbID) => {
    const currentMovies = { ...loadedMovies };
  const targetListMovies = currentMovies[listId]; 

  for (let i = 0; i < targetListMovies.length; i++) {
    if (targetListMovies[i].imdbID === imdbID) {
      targetListMovies.splice(i, 1); 
      break;
    }
  }
  setLoadedMovies(currentMovies); 

  const savedLists = JSON.parse(localStorage.getItem('movieLists')) || {};
  const targetIds = savedLists[listId].movies; 

  for (let j = 0; j < targetIds.length; j++) {
    if (targetIds[j] === imdbID) {
      targetIds.splice(j, 1);
      break;
    }
  }
    localStorage.setItem('movieLists', JSON.stringify(savedLists));
};

  const listKeys = Object.keys(lists);

  return (
    <div className="my-lists-container">
      {listKeys.length === 0 ? (
        <p className="no-lists">You haven't created any lists yet.</p>
      ) : (
        <div className="lists-grid">
          {listKeys.map((id) => (
            <div key={id} className="list-folder-card">
              <button className="delete-list-btn" onClick={() => handleDeleteList(id)}>✕</button>
              <h3 className="list-folder-title">{lists[id].title}</h3>
              <div className="movies-in-list">
                {(loadedMovies[id] || []).map(movie => (
                  <div key={movie.imdbID} className="movie-row">
                    <span className="movie-row-title">{movie.Title}</span>
                    <div className="movie-row-actions">
                      <a
                        href={`https://www.imdb.com/title/${movie.imdbID}`}
                        target="_blank"
                        className="imdb-link"
                      >
                        IMDB
                      </a>
                      <button
                        className="remove-movie-btn"
                        onClick={() => handleDeleteMovie(id, movie.imdbID)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="bottom-action">
        <button className="movies-btn" onClick={() => navigate('/')}>Movies</button>
      </div>
    </div>
  );
}