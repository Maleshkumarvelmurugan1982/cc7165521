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
    <div
      style={{
        backgroundImage: "url('/4868953.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
        textShadow: "0 0 8px rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="w-full max-w-lg">
        {/* Pass onAdd so adding book works */}
        <BookForm onAdd={handleAdd} transparentBg />
      </div>
    </div>
  );
}

export default AddBook;
