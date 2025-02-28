import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ selectedProfile }) => {
  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo WatchAnywhere"
            className="h-auto max-w-full mx-auto my-4"
            style={{ maxHeight: "50px" }}
          />
          <span className="ml-3 text-2xl font-bold">WatchAnywhere</span>
        </Link>

        {/* Profil Sélectionné */}
        <div>
          {selectedProfile ? (
            <p className="text-green-500 font-semibold">
              Profil sélectionné : {selectedProfile.username}
            </p>
          ) : (
            <p className="text-gray-400 italic">Aucun profil sélectionné</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
