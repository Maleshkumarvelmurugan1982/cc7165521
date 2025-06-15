import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import AddBook from './pages/AddBook';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [theme, setTheme] = useState('dark');

  // Initialize theme on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast.info(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  };

  return (
    <>
      <Router>
        <div
          className={`min-h-screen flex flex-col transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
          }`}
        >
          {/* ======== NAVBAR ======== */}
          <nav
            className={`w-full shadow-lg sticky top-0 z-50 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-5">
              {/* Brand */}
              <h1
                className={`text-3xl font-extrabold tracking-wide select-none ${
                  theme === 'dark' ? 'text-purple-300' : 'text-purple-700'
                }`}
              >
                E‑Library
              </h1>

              {/* Buttons */}
              <div className="flex gap-6 items-center">
                {/* Home button */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500
                             text-white text-lg font-semibold px-6 py-2 rounded-2xl shadow-md
                             hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  🏠 Home
                </Link>

                {/* Add Book button */}
                <Link
                  to="/add"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500
                             text-white text-lg font-semibold px-6 py-2 rounded-2xl shadow-md
                             hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  ➕ Add&nbsp;Book
                </Link>

                {/* Theme toggle button */}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className={`px-4 py-2 rounded-2xl font-semibold shadow-md transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-yellow-400 hover:bg-yellow-300'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  style={{ color: '#facc15' }} // yellow-400 text color always
                >
                  {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
              </div>
            </div>
          </nav>

          {/* ======== MAIN CONTENT ======== */}
          <main className="flex-1 flex justify-center items-start py-12 px-4">
            <div
              className={`w-full max-w-6xl rounded-3xl shadow-xl p-12 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<AddBook />} />
                <Route path="/edit/:id" element={<AddBook />} />
              </Routes>
            </div>
          </main>

          {/* ======== FOOTER ======== */}
          <footer
            className={`text-center py-6 text-sm select-none ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
            }`}
          >
            © 2025 E‑Library&nbsp;•&nbsp;Made&nbsp;by&nbsp;Maleshkumar&nbsp;•&nbsp;All&nbsp;rights&nbsp;reserved.
          </footer>
        </div>
      </Router>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
