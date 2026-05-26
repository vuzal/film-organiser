import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import Favorites from "../components/Favorites";
import "./Home.css";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState('');
    const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

    function handleSearch(searchedMovie) {
        setError(''); 

        fetch(`https://www.omdbapi.com/?s=${searchedMovie}&apikey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                if (data.Response === 'True') {
                    setMovies(data.Search);
                } else {
                    setMovies([]);
                    setError(data.Error || 'Film not found');
                }
            })
    }

    useEffect(() => {
        handleSearch('car');
    }, []);

    function handleAddToFavorites(movie) {
        if (!favorites.find(fav => fav.imdbID === movie.imdbID)) {
            setFavorites([...favorites, movie]);
        }
    }

    return (
        <div className="home-page">
            <SearchBox onSearch={handleSearch} />
            
            <div className="home-content">
                <div className="main-content">
                    {error && <p className="error-message">{error}</p>}
                    
                    {!error && (
                        <div className="movies-list">
                            {
                                movies.map((movie) => {
                                    const isFavorite = favorites.find(fav => fav.imdbID === movie.imdbID) !== undefined;
                                    return (
                                        <div key={movie.imdbID} className="movie-card">
                                            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                                            <div className="movie-info">
                                                <h3>{movie.Title}</h3>
                                                <p>Year: {movie.Year}</p>
                                                <button
                                                    className="add-to-fav-btn"
                                                    disabled={isFavorite}
                                                    onClick={() => handleAddToFavorites(movie)}
                                                >
                                                    {isFavorite ? 'Added' : '+ Favorite'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )}
                </div>

                <aside className="sidebar-content">
                    <Favorites favorites={favorites} setFavorites={setFavorites} />
                </aside>
            </div>
        </div>
    );
}