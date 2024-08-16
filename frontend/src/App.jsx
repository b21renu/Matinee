import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import About from './Components/About';
import Footer from './Components/Footer';
import './index.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Outlet />
      </main>
      <About />
      <Footer />
    </div>
  );
}

export default App;
