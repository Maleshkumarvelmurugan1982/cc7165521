import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

//const API_URL = 'http://localhost:5000'; // Change if backend runs elsewhere

function BookCard({
  book,
  onEdit,
  onDelete,
  isEditing,
  onSaveEdit,
  onCancelEdit,
}) {
  const [form, setForm] = useState(book);
  const [fieldsToEdit, setFieldsToEdit] = useState([
    'title',
    'author',
    'genre',
    'year',
  ]);
  const [pdfFile, setPdfFile] = useState(null);

  const [likes, setLikes] = useState(book.likes ?? 0);
  const [dislikes, setDislikes] = useState(book.dislikes ?? 0);

  useEffect(() => {
    setForm(book);
    setFieldsToEdit(['title', 'author', 'genre', 'year']);
    setPdfFile(null);
    setLikes(book.likes ?? 0);
    setDislikes(book.dislikes ?? 0);
  }, [book]);

  const toggleField = (field) => {
    if (field === 'pdf') {
      if (fieldsToEdit.includes('pdf')) {
        // Uncheck PDF: remove from fieldsToEdit and clear file
        setFieldsToEdit((f) => f.filter((x) => x !== 'pdf'));
        setPdfFile(null);
      } else {
        // Check PDF: add to fieldsToEdit
        setFieldsToEdit((f) => [...f, 'pdf']);
      }
    } else {
      setFieldsToEdit((f) =>
        f.includes(field) ? f.filter((x) => x !== field) : [...f, field],
      );
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (fieldsToEdit.includes('title') && !form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (fieldsToEdit.includes('author') && !form.author.trim()) {
      toast.error('Author is required');
      return;
    }

    // Prepare updated object
    const updated = { ...book };
    fieldsToEdit.forEach((field) => {
      if (field !== 'pdf') {
        updated[field] = form[field];
      }
    });

    // If PDF is to be updated, pass pdfFile along
    if (fieldsToEdit.includes('pdf') && !pdfFile) {
      toast.error('Please select a PDF file to upload.');
      return;
    }

    if (fieldsToEdit.includes('pdf')) {
      updated.pdfFile = pdfFile;
    }

    onSaveEdit(updated, pdfFile);
  };

  const handleLikeDislike = async (type) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books/${book._id}/${type}`, {
        method: 'PUT',
      });
      if (!res.ok) throw new Error();

      const updated = await res.json();
      setLikes(updated.likes);
      setDislikes(updated.dislikes);
    } catch {
      toast.error('Error updating likes/dislikes');
    }
  };

  if (!isEditing) {
    return (
      <div className="bg-purple-50 shadow-md rounded-xl p-5 text-purple-900">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p>
          <span className="font-medium">Author:</span> {book.author}
        </p>
        <p>
          <span className="font-medium">Genre:</span> {book.genre}
        </p>
        <p>
          <span className="font-medium">Year:</span> {book.year}
        </p>

        <div className="mt-2 flex items-center gap-4">
          <button
            onClick={() => handleLikeDislike('like')}
            className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500 transition flex items-center gap-1"
          >
            👍 {likes}
          </button>
          <button
            onClick={() => handleLikeDislike('dislike')}
            className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition flex items-center gap-1"
          >
            👎 {dislikes}
          </button>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onEdit}
            className="bg-yellow-300 text-yellow-900 font-medium px-4 py-1 rounded hover:bg-yellow-400 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="bg-rose-300 text-rose-900 font-medium px-4 py-1 rounded hover:bg-rose-400 transition"
          >
            Delete
          </button>
        </div>

        <div className="mt-4 flex gap-6 justify-center">
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/api/books/${book._id}/pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group flex-1 text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg
              hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out
              overflow-hidden"
          >
            <span className="relative z-10">📖 Read Online</span>
            <span className="absolute right-0 top-0 w-12 h-full bg-white bg-opacity-20 rounded-r-full
              transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </a>
          <a
            href={`${import.meta.env.VITE_BACKEND_URL}/api/books/${book._id}/download`}
            className="relative group flex-1 text-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg
              hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 ease-in-out
              overflow-hidden"
          >
            <span className="relative z-10">⬇️ Download PDF</span>
            <span className="absolute right-0 top-0 w-12 h-full bg-white bg-opacity-20 rounded-r-full
              transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </a>
        </div>
      </div>
    );
  }

  const fields = [
    { label: 'Title *', name: 'title', type: 'text' },
    { label: 'Author *', name: 'author', type: 'text' },
    { label: 'Genre', name: 'genre', type: 'text' },
    { label: 'Year', name: 'year', type: 'number' },
  ];

  return (
    <div className="bg-purple-50 shadow-md rounded-xl p-5 text-purple-900">
      <h2 className="text-xl font-bold mb-4">Editing: {book.title}</h2>

      <div className="mb-4">
        <p className="font-semibold mb-2">Select fields to edit:</p>
        {fields.map(({ name, label }) => (
          <label
            key={name}
            className="inline-flex items-center mr-4 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={fieldsToEdit.includes(name)}
              onChange={() => toggleField(name)}
              className="mr-1"
            />
            {label.replace(' *', '')}
          </label>
        ))}
        <label className="inline-flex items-center mr-4 cursor-pointer">
          <input
            type="checkbox"
            checked={fieldsToEdit.includes('pdf')}
            onChange={() => toggleField('pdf')}
            className="mr-1"
          />
          PDF
        </label>
      </div>

      {fields.map(({ label, name, type }) => (
        <label key={name} className="block mb-4">
          <span className="block font-medium mb-1">{label}</span>
          <input
            type={type}
            name={name}
            value={form[name]}
            disabled={!fieldsToEdit.includes(name)}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </label>
      ))}

      {fieldsToEdit.includes('pdf') && (
        <label className="block mb-4">
          <span className="block font-medium mb-1">Upload new PDF</span>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setPdfFile(e.target.files[0]);
              } else {
                setPdfFile(null);
              }
            }}
            className="w-full"
          />
          {pdfFile && (
            <p className="mt-1 text-sm text-green-700">{pdfFile.name}</p>
          )}
        </label>
      )}

      <div className="flex justify-end gap-3">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Save
        </button>
        <button
          onClick={onCancelEdit}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookCard;
