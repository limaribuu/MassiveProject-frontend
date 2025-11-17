// src/components/detail/BackButton.jsx
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Kembali"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 shadow-sm mb-4"
    >
      <img src="/icon/back.png" alt="Kembali" className="w-5 h-5" />
    </button>
  );
};

export default BackButton;
