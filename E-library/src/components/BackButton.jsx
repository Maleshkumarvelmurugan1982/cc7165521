import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 inline-flex items-center gap-2 px-5 py-3 rounded-3xl 
                 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                 text-white font-semibold shadow-lg
                 hover:from-pink-500 hover:via-red-500 hover:to-yellow-500
                 transition-all duration-300 transform hover:scale-105"
      aria-label="Go Back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Back
    </button>
  );
}
