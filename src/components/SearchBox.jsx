import React, { useState } from "react";
import './SearchBox.css';

export default function SearchBox({ searchQuery }) {

    const [inputValue, setInputValue] = useState('');

   function handleSubmit(e) {
        e.preventDefault();
        if (inputValue.trim().length < 3) return;
        searchQuery(inputValue);
    }

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input type="text"
                className="search-input"
                placeholder="Enter Film name ... (ex: Matrix)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
            <button 
                type="submit" 
                className="search-button"
                disabled={inputValue.trim().length < 3}
            >
                Search
            </button>
        </form>
    )

}