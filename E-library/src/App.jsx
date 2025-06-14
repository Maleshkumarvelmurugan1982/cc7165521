import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-5">
            <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide">
              E-Library
            </h1>
            <div className="space-x-8">
              <Link
                to="/"
                className="text-gray-700 font-semibold hover:text-purple-600 transition"
              >
                Home
              </Link>
              <Link
                to="/add"
                className="text-gray-700 font-semibold hover:text-purple-600 transition"
              >
                Add Book
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 flex justify-center items-start py-12 px-4">
          <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddBook />} />
              <Route path="/edit/:id" element={<AddBook />} />
            </Routes>
          </div>
        </main>
        <footer className="text-center py-6 text-gray-400 text-sm select-none">
          © 2025 E-Library. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
