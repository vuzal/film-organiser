import React from "react";
import './MovieCard.css';

export default function MovieCard({movie, onAddToFavorites, isFavorite}){

    const {Title, Year, Poster, imdbID}=movie;

    return(
        <div className="movie-card">
            <img src={Poster} alt={Title} className="movie-poster" />
            <div className="movie-info">
                <h3 className="movie-title">{Title}</h3>
                <p className="movie-year">{Year}</p>
                <button className="add-to-fav-btn"
                disabled={isFavorite}
                onClick={()=>onAddToFavorites(movie)}>
                    {isFavorite? 'Listed': 'add to Favorite'}
                </button>
            </div>
        </div>
    )

}