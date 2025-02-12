import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaRegListAlt, FaBalanceScale } from 'react-icons/fa';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          
          {/* Logo */}
          <a className="flex items-center gap-x-4 text-white" href="/">
            <img className="h-12 w-auto" src="images/pokeball.png" alt="Pokemon Dextools Logo" />
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide">Pokemon Dextools</h4>
          </a>

          {/* Mobile Menu Button (moved to right) */}
          <div className="sm:hidden">
            <button
              type="button"
              className="p-2 text-white hover:bg-indigo-800 focus:ring-2 focus:ring-white rounded-md"
              onClick={toggleMobileMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 text-lg font-medium text-white bg-indigo-700 rounded-lg shadow-md transition-all duration-300'
                  : 'flex items-center text-gray-300 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-lg transition-all duration-300'
              }
            >
              <FaHome className="mr-2" />
              Pokedex
            </NavLink>
            <NavLink
              to="/team"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 text-lg font-medium text-white bg-indigo-700 rounded-lg shadow-md transition-all duration-300'
                  : 'flex items-center text-gray-300 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-lg transition-all duration-300'
              }
            >
              <FaRegListAlt className="mr-2" />
              Team
            </NavLink>
            <NavLink
              to="/compare"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center px-4 py-2 text-lg font-medium text-white bg-indigo-700 rounded-lg shadow-md transition-all duration-300'
                  : 'flex items-center text-gray-300 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-lg transition-all duration-300'
              }
            >
              <FaBalanceScale className="mr-2" />
              Compare
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 p-4">
          <div className="space-y-2">
            <NavLink
              to="/"
              className="block text-white text-xl font-medium py-2 rounded-lg hover:bg-indigo-700"
              onClick={toggleMobileMenu}
            >
              <FaHome className="inline-block mr-2" />
              Pokedex
            </NavLink>
            <NavLink
              to="/team"
              className="block text-white text-xl font-medium py-2 rounded-lg hover:bg-indigo-700"
              onClick={toggleMobileMenu}
            >
              <FaRegListAlt className="inline-block mr-2" />
              Team
            </NavLink>
            <NavLink
              to="/compare"
              className="block text-white text-xl font-medium py-2 rounded-lg hover:bg-indigo-700"
              onClick={toggleMobileMenu}
            >
              <FaBalanceScale className="inline-block mr-2" />
              Compare
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
