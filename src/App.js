import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import DishOfTheDay from "./components/DishOfTheDay";
import BookingForm from "./components/BookingForm";
import Search from "./components/Search";
import "./App.css"; // Import styles

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <h2 className="logo">Restaurant Booking System</h2>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dish-of-the-day">Dish of the Day</Link>
            </li>
            <li>
              <Link to="/booking">Booking</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dish-of-the-day" element={<DishOfTheDay />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
