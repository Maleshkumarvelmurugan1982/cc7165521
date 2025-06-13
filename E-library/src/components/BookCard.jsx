function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow duration-300">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
        <p className="text-gray-600 mb-1"><strong>Genre:</strong> {book.genre || "N/A"}</p>
        <p className="text-gray-600"><strong>Year:</strong> {book.year || "N/A"}</p>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => onEdit(book)}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-purple-700 transition"
          aria-label={`Edit ${book.title}`}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(book.id)}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-md hover:from-red-600 hover:to-pink-700 transition"
          aria-label={`Delete ${book.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookCard;
