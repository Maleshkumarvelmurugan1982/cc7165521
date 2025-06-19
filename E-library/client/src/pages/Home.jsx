import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import BookCard from '../components/BookCard';

//const API_URL = 'http://localhost:5000'; // change if your backend port/host differs

function Home() {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  /* ── fetch all books ─────────────────────────────────────────── */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books`)
      .then((res) => res.json())
      .then(setBooks)
      .catch(() => toast.error('Failed to fetch books.'));
  }, []);

  /* ── live search filter ──────────────────────────────────────── */
  const filteredBooks = books.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      b.title?.toLowerCase().includes(term) ||
      b.author?.toLowerCase().includes(term) ||
      b.genre?.toLowerCase().includes(term) ||
      String(b.year).includes(term)
    );
  });

  /* ── delete book ─────────────────────────────────────────────── */
  const handleDelete = async (id) => {
    const password = prompt('Enter password to delete:');
    if (password !== 'admin') return toast.error('Wrong password!');
    if (!window.confirm('Are you sure?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setBooks((prev) => prev.filter((b) => b._id !== id));
        toast.success('Book deleted!');
      } else {
        const errorData = await res.json();
        console.error('Delete failed:', errorData);
        toast.error('Failed to delete.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete.');
    }
  };

  /* ── enter edit mode ─────────────────────────────────────────── */
  const handleEdit = (book) => {
    const password = prompt('Enter password to edit:');
    if (password !== 'admin') return toast.error('Wrong password!');
    setEditingBookId(book._id);
  };

  const cancelEdit = () => setEditingBookId(null);

  /* ── save edited book (text fields + optional PDF) ───────────── */
  const saveEdit = async (updatedBook, pdfFile) => {
    try {
      const formData = new FormData();

      // Append all fields except the pdf file
      Object.entries(updatedBook).forEach(([key, value]) => {
        if (key !== 'pdfFile') {
          formData.append(key, value);
        }
      });

      // Append pdf file if provided
      if (pdfFile) {
        formData.append('pdf', pdfFile);
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books/${updatedBook._id}`, {
        method: 'PUT',
        body: formData,
        // DO NOT set Content-Type manually!
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update book');
      }

      const { book: saved } = await res.json();

      setBooks((prev) => prev.map((b) => (b._id === saved._id ? saved : b)));
      toast.success('Book updated!');
      setEditingBookId(null);
    } catch (err) {
      toast.error(`Failed to update: ${err.message}`);
    }
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover text-white"
      style={{ backgroundImage: "url('/aPvuVpY.jpg')" }}
    >
      <div className="min-h-screen px-4 sm:px-8 pt-10 pb-16 backdrop-brightness-100 bg-black/40">

        {/* heading */}
        <h1
          className="text-5xl font-extrabold text-violet-500 mb-8 text-center"
          style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}
        >
          OUR BOOKS
        </h1>

        {/* search */}
        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search by title, author, genre or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3 text-lg rounded-full shadow-xl bg-white/70 text-black placeholder-gray-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
          />
        </div>

        {/* list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.length === 0 ? (
            <p className="text-center col-span-full text-lg font-medium">
              No books found.
            </p>
          ) : (
            filteredBooks.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                isEditing={editingBookId === book._id}
                onEdit={() => handleEdit(book)}
                onCancelEdit={cancelEdit}
                onSaveEdit={saveEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
