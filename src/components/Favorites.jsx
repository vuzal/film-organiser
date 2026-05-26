import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Favorites.css';
export default function Favorites({ favorites, setFavorites }) {
  const [listName, setListName] = useState('');
  const navigate = useNavigate();
  const handleRemove = (imdbID) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== imdbID));
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
  const handleNavigate = () => {
    navigate('/my-lists');
  };
  const isSaveDisabled = !listName.trim() || favorites.length === 0;
  return (
    <div className="favorites-box">
      <ul className="favorites-list">
        {favorites.map((movie) => (
          <li key={movie.imdbID} className="favorites-item">
            <span>{movie.Title}</span>
            <button className="remove-btn" onClick={() => handleRemove(movie.imdbID)}>✕</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="list-name-input"
        placeholder="List name..."
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <div className="favorites-action">
        <button
          className="save-list-btn"
          onClick={handleSaveList}
          disabled={isSaveDisabled}
        >
          Add To Favorite List
        </button>
        <button
          className="view-list-btn"
          onClick={handleNavigate}
        >
          Look At Favorite List
        </button>
      </div>
    </div>
  );
}