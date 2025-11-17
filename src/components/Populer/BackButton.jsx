import { Link } from "react-router-dom";

const BackButton = () => {
    return (
        <Link
            to="/home"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 shadow-md hover:bg-orange-600 transition"
        >
            <img src="/icon/back.png" alt="Kembali" className="w-8 h-8" />
        </Link>
    );
};

export default BackButton;
