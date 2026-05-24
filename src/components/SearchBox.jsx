import React, { useState } from "react";
import './SearchBox.css';

export default function SearchBox({ onSearch }) {

    const [inputValue, setInputValue] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!inputValue.trim()) return;
        onSearch(inputValue)
    }

    return (
        <form className="search-box" onSubmit={handleSubmit}>
            <input type="text"
                className="search-input"
                placeholder="Enter Film name ... (ex:GodFather)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="search-button">Search</button>
        </form>
    )

}