import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function MobileMenu({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 text-white flex flex-col items-center justify-center">
            <div className="absolute top-4 right-4">
                <FiX
                    onClick={onClose}
                    className="w-6 h-6 cursor-pointer hover:text-orange-400 transition"
                />
            </div>

            <Link
                to="/"
                onClick={onClose}
                className="text-2xl mb-6 hover:text-orange-400 transition"
            >
                Home
            </Link>
            <Link
                to="/dashboard"
                onClick={onClose}
                className="text-2xl hover:text-orange-400 transition"
            >
                Dashboard
            </Link>
        </div>
    );
}
