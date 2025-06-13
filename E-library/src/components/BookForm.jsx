import { useState, useEffect } from 'react';

function BookForm({ onAdd, onUpdate, editBook }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  useEffect(() => {
    if (editBook) {
      setForm(editBook);
    }
  }, [editBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      return alert('Title and Author are required');
    }

    if (editBook) {
      onUpdate(form);
    } else {
      onAdd({ ...form, id: Date.now() });
    }

    setForm({
      title: '',
      author: '',
      genre: '',
      year: '',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl max-w-xl mx-auto p-10"
    >
      <h2 className="text-3xl font-extrabold text-purple-700 mb-8 text-center">
        {editBook ? 'Edit Book' : 'Add New Book'}
      </h2>

      {[
        { label: 'Title *', name: 'title', type: 'text', placeholder: 'Book title', required: true },
        { label: 'Author *', name: 'author', type: 'text', placeholder: 'Author name', required: true },
        { label: 'Genre', name: 'genre', type: 'text', placeholder: 'Genre (e.g. Fiction, Self-help)' },
        { label: 'Published Year', name: 'year', type: 'number', placeholder: 'Year of publication', min: 1500, max: new Date().getFullYear() }
      ].map(({ label, name, type, placeholder, required, min, max }) => (
        <label key={name} className="block mb-6">
          <span className="block mb-2 text-gray-700 font-semibold">{label}</span>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={form[name]}
            onChange={handleChange}
            required={required}
            min={min}
            max={max}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl shadow-sm
              focus:outline-none focus:ring-4 focus:ring-purple-400
              transition duration-300 text-gray-900"
          />
        </label>
      ))}

      <button
        type="submit"
        className="w-full py-4 mt-4 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600
          text-white text-lg font-bold shadow-lg hover:from-purple-700 hover:to-indigo-700
          transition duration-300"
      >
        {editBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
}

export default BookForm;
