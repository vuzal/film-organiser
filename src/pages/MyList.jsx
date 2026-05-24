import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyList.css';

export default function MyLists() {
  const [lists, setLists] = useState({});

  useEffect(() => {
    const savedLists = JSON.parse(localStorage.getItem('movieLists')) || {};
    setLists(savedLists);
  }, []);

  const handleDeleteList = (id) => {
    const updatedLists = { ...lists };
    delete updatedLists[id];
    localStorage.setItem('movieLists', JSON.stringify(updatedLists));
    setLists(updatedLists); 
  };

  const listKeys = Object.keys(lists);

  return (
    <div className="my-lists-container">
      <h2>My Favorite Lists</h2>
      
      {listKeys.length === 0 ? (
        <p className="no-lists">You haven’t created any lists yet. You can go back to the home page and create one..</p>
      ) : (
        <div className="lists-grid">
          {listKeys.map((id) => (
            <div key={id} className="list-folder-card">
              <div className="folder-info">
                <h3>{lists[id].title}</h3>
                <p>{lists[id].movies.length} Includes movies</p>
              </div>
              <div className="folder-actions">
                <Link to={`/list/${id}`} className="view-list-link">
                  Bax
                </Link>
                <button onClick={() => handleDeleteList(id)} className="delete-list-btn">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}