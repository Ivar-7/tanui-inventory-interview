import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';

const Navbar2 = () => {
  return (
    <Router>
      <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled" to="#">Login</Link>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success btn-sm" type="submit">Search</button>
      </form>
      </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
{/*         <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default Navbar2;
