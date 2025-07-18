import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-28 py-6 bg-slate-900 shadow-md text-white fixed top-0 z-50 w-full">
            <h1 className="text-2xl font-bold text-orange-400">CryptoPulse</h1>

            <div className="hidden md:flex space-x-6">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-orange-400 font-semibold" : "hover:text-orange-300"
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "text-orange-400 font-semibold" : "hover:text-orange-300"
                    }
                >
                    Dashboard
                </NavLink>
            </div>

            <div className="md:hidden">
                {menuOpen ? (
                    <FiX onClick={() => setMenuOpen(false)} className="w-6 h-6 cursor-pointer" />
                ) : (
                    <FiMenu onClick={() => setMenuOpen(true)} className="w-6 h-6 cursor-pointer" />
                )}
            </div>

            {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
        </nav>
    );
}
