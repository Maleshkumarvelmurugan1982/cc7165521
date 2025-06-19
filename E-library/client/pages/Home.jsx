import BookCard from '../components/BookCard';
import { useState, useEffect } from 'react';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 p-8">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10 tracking-wide">
        Welcome to E-Library
      </h1>

      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-20">
          <span className="text-5xl mb-4"></span>
          <p className="text-xl">No books added yet. Start building your library!</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-fade-in">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

