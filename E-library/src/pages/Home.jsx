import BookCard from '../components/BookCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(stored);
  }, []);

  const handleDelete = (id) => {
    const password = prompt("Enter password to delete:");
    if (password !== "admin") {
      alert("Incorrect password!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    const filtered = books.filter(book => book.id !== id);
    setBooks(filtered);
    localStorage.setItem('books', JSON.stringify(filtered));
  };

  const handleEdit = (book) => {
    const password = prompt("Enter password to edit:");
    if (password !== "admin") {
      alert("Incorrect password!");
      return;
    }
    setEditingId(book.id);
  };

  const handleSaveEdit = (updatedBook) => {
    const updated = books.map(book => book.id === updatedBook.id ? updatedBook : book);
    setBooks(updated);
    localStorage.setItem('books', JSON.stringify(updated));
    setEditingId(null);
  };

  const handleLike = (id) => {
    const updated = books.map(book => {
      if (book.id === id) {
        return { ...book, likes: (book.likes || 0) + 1 };
      }
      return book;
    });
    setBooks(updated);
    localStorage.setItem('books', JSON.stringify(updated));
  };

  const handleDislike = (id) => {
    const updated = books.map(book => {
      if (book.id === id) {
        return { ...book, dislikes: (book.dislikes || 0) + 1 };
      }
      return book;
    });
    setBooks(updated);
    localStorage.setItem('books', JSON.stringify(updated));
  };

  // Filter & sort books by search term (title, author, genre, year)
  const filteredBooks = books
    .filter(book =>
      [book.title, book.author, book.genre, book.year?.toString()]
        .some(field => field?.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div
      style={{
        backgroundImage: "url('/aPvuVpY.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
        textShadow: "0 0 8px rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Search by Title, Author, Genre or Year..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-xl p-3 rounded-lg mb-8 font-semibold text-purple-900 placeholder-purple-700"
        style={{
          backgroundColor: '#f3e8ff',
          border: '2px solid #b77aff',
          outline: 'none',
        }}
      />

      {filteredBooks.length === 0 ? (
        <p className="text-center text-purple-200 text-lg italic mt-20">
          No books found. Try adding some amazing books!
        </p>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold text-purple-300 mb-8 text-center">
            Your Books
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onLike={handleLike}
                onDislike={handleDislike}
                isEditing={editingId === book.id}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={() => setEditingId(null)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
