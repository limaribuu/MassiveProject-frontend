export default function SignUpPopup({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  return (
    <div className="signup-popup-overlay" onClick={onClose}>
      <div className="signup-popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="signup-popup-icon">
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="signup-popup-title">Berhasil!</h2>
        <p className="signup-popup-desc">Akun anda berhasil dibuat</p>

        <button className="signup-popup-btn" onClick={onLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
