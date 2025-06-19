import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";

function AddBook() {
  const navigate = useNavigate();

  const handleAdd = (book) => {
    const existing = JSON.parse(localStorage.getItem("books")) || [];
    const updated = [...existing, book];

    localStorage.setItem("books", JSON.stringify(updated));
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 p-6 flex items-center justify-center">
      <BookForm onAdd={handleAdd} />
    </div>
  );
}

export default AddBook;

