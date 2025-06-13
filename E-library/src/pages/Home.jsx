import BookCard from '../components/BookCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(stored);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    const filtered = books.filter(book => book.id !== id);
    setBooks(filtered);
    localStorage.setItem('books', JSON.stringify(filtered));
  };

  const handleEdit = (book) => {
    navigate('/edit/' + book.id);
  };

  return (
    <div className="min-h-[60vh] px-4 md:px-0 max-w-6xl mx-auto">
      {books.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic mt-20">
          No books added yet. Start by adding some beautiful reads!
        </p>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
            Your Books
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map(book => (
              <BookCard key={book.id} book={book} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
