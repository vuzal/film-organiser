import React from "react";
import MovieCard from "./MovieCard";
import './MoviesList.css';

export default function MoviesList({ movies, onAddToFavorites, favorites }) {
    if (!movies || movies.length === 0) {
        return <p className="no-movies">Film not found. Search...</p>

    }

    return (
        <div className="movies-list">
            {movies.map((movie) => {
                const isFavorite = favorites.find(fav => fav.imdbID === movie.imdbID) !== undefined;
                return (
                    <MovieCard key={movie.imdbID}
                        movie={movie}
                        onAddToFavorites={onAddToFavorites}
                        isFavorite={isFavorite} />
                )
            })}
        </div>
    )

}