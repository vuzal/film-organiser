import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import MovieList from "../components/MoviesList";
import Favorites from "../components/Favorites";
import "./Home.css";

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY ="9374cc3b"
    function handleSearch(searchedMovie) {
        setLoading(true);
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
                setLoading(false);
            })
            .catch(() => {
                setError('Network error');
                setLoading(false);
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
            <div className="main-content">
                <SearchBox onSearch={handleSearch} />
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && (
                    <MovieList
                        movies={movies}
                        onAddToFavorites={handleAddToFavorites}
                        favorites={favorites}
                    />
                )}
            </div>

            <aside className="sidebar-content">
                <Favorites favorites={favorites} setFavorites={setFavorites} />
            </aside>
        </div>
    );
}