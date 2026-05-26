import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
          <h1>Movie</h1>
      </header>
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-lists" element={<MyList />} />
        </Routes>
      </main>
    </div>
  );
}