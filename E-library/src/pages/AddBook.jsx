import { useNavigate, useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { useEffect, useState } from 'react';

function AddBook() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    if (id) {
      const stored = JSON.parse(localStorage.getItem('books')) || [];
      const bookToEdit = stored.find(b => b.id === Number(id));
      if (bookToEdit) {
        setEditBook(bookToEdit);
      } else {
        alert('Book not found');
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleAdd = (book) => {
    const existing = JSON.parse(localStorage.getItem('books')) || [];
    const updated = [...existing, book];
    localStorage.setItem('books', JSON.stringify(updated));
    navigate('/');
  };

  const handleUpdate = (updatedBook) => {
    const existing = JSON.parse(localStorage.getItem('books')) || [];
    const updated = existing.map(book => (book.id === updatedBook.id ? updatedBook : book));
    localStorage.setItem('books', JSON.stringify(updated));
    navigate('/');
  };

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <BookForm onAdd={handleAdd} onUpdate={handleUpdate} editBook={editBook} />
    </div>
  );
}

export default AddBook;
