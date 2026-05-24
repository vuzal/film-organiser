import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import MyList from "./pages/MyList";
import './App.css';

export default function App() {
  return (
      <div className="app-container">
        <header className="app-header">
          <Link to="/" className="logo-link">
            <h1>Film Organiser</h1>
          </Link>
          <Link to="/my-lists" className="my-lists-btn">
            My Lists 📂
          </Link>
        </header>

        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-lists" element={<MyList />} />
            <Route path="/list/:id" element={<ListPage />} />
          </Routes>
        </main>
      </div>
  );
}