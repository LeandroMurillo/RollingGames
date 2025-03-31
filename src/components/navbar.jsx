import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <button className="bg-white text-blue-600 px-4 py-2 rounded">Home</button>
        <button className="bg-white text-blue-600 px-4 py-2 rounded">Carrito</button>
      </div>
      
      <button className="bg-white text-blue-600 px-4 py-2 rounded">Login</button>
    </nav>
  );
};

export default Navbar;
