import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const FooterBar = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          {/* Brand / Logo */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">PokéDex Hub</h2>
            <p className="text-gray-400 mt-2">
              Catch 'em all and build your dream team!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-300">Home</a></li>
              <li><a href="/team" className="text-gray-300 hover:text-yellow-300">My Team</a></li>
              <li><a href="/compare" className="text-gray-300 hover:text-yellow-300">Compare Pokémon</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400">Follow Us</h3>
            <div className="flex justify-center md:justify-start mt-3 space-x-4">
              <a target="blank" href="https://www.facebook.com/Pokemon/" className="text-gray-300 hover:text-yellow-300 text-xl"><FaFacebook /></a>
              <a target="blank" href="https://x.com/pokemon" className="text-gray-300 hover:text-yellow-300 text-xl"><FaTwitter /></a>
              <a target="blank" href="https://www.instagram.com/pokemon" className="text-gray-300 hover:text-yellow-300 text-xl"><FaInstagram /></a>
              <a target="blank" href="https://github.com/MescottSE/PokemonReact" className="text-gray-300 hover:text-yellow-300 text-xl"><FaGithub /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} PokéDex Hub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default FooterBar;
