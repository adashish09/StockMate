// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Import Components
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import RegisterForm from './components/RegisterForm';
import InventoryForm from './components/InventoryForm';
import Account from './components/Account'; // Import the Account component
import AboutUs from './components/AboutUs'; // Import AboutUs component
import ContactUs from './components/ContactUs'; // Import ContactUs component
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-5 d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/add-inventory" element={<InventoryForm />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
