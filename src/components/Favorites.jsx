import React, { useState } from "react";
import './Favorites.css';

export default function Favorites({ favorites, setFavorites }) {
  const [listName, setListName] = useState('');

  const handleRemove = (imdbID) => {
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
  };

  const handleSaveList = () => {
    const uniqueId = Date.now().toString();
    const listData = {
      title: listName,
      movies: favorites.map(movie => movie.imdbID)
    };

    const savedLists = JSON.parse(localStorage.getItem('movieLists')) || {};
    savedLists[uniqueId] = listData;
    localStorage.setItem('movieLists', JSON.stringify(savedLists));    
    setListName('');
    setFavorites([]);
  };

  const isButtonDisabled = !listName.trim() || favorites.length === 0;

  return (
    <div className="favorites-box">
      <input
        type="text"
        className="list-name-input"
        placeholder="Name the list..."
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />

      <ul className="favorites-list">
        {favorites.map((movie) => (
          <li key={movie.imdbID} className="favorites-item">
            <span>{movie.Title} ({movie.Year})</span>
            <button className="remove-btn" onClick={() => handleRemove(movie.imdbID)}>✕</button>
          </li>
        ))}
      </ul>

      <div className="favorites-action">
        <button
          className="save-list-btn"
          onClick={handleSaveList}
          disabled={isButtonDisabled} 
        >
          Save the list
        </button>
      </div>
    </div>
  );
}