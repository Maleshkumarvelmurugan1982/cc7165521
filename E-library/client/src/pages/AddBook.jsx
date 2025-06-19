import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { toast } from 'react-toastify';

function AddBook() {
  const navigate = useNavigate();

  const handleAdd = () => {
    toast.success('📚 Book added successfully!');
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: "url('/4868953.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
        color: '#fff',
        textShadow: '0 0 8px rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button
        onClick={() => navigate('/')}
        className="self-start mb-6 px-5 py-2 rounded-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-transform duration-300"
      >
        ← Back
      </button>

      <div className="w-full max-w-lg">
        <BookForm onSuccess={handleAdd} />
      </div>
    </div>
  );
}

export default AddBook;
