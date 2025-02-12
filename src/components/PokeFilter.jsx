import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const PokeFilter = ({ subPokemon, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State for toggling menu

  const pokemonTypes = [...new Set(subPokemon.flatMap(poke => poke.type.split(', ')))];

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    onFilterChange({ type: newType, search: searchTerm, order: selectedOrder });
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange({ type: selectedType, search: newSearchTerm, order: selectedOrder });
  };

  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSelectedOrder(newOrder);
    onFilterChange({ type: selectedType, search: searchTerm, order: newOrder });
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button 
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IoClose size={24} /> : <FaFilter size={24} />}
      </button>

      {/* Collapsible Filter Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-5 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h4 className="text-xl font-bold text-center mb-4">Poke Filter</h4>

        {/* Search Bar */}
        <input 
          className="w-full rounded-lg bg-white border border-gray-300 shadow-sm py-2 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-50 transition duration-200"
          placeholder="Search Pokemon"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Type Dropdown */}
        <select 
          className="mt-3 w-full rounded-lg bg-white border border-gray-300 shadow-sm py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-50 transition duration-200"
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option value="">All Types: Default</option>
          {pokemonTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>

        {/* Order Dropdown */}
        <select
          className="mt-3 w-full rounded-lg bg-white border border-gray-300 shadow-sm py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-50 transition duration-200"
          onChange={handleOrderChange}
          value={selectedOrder}
        >
          <option value="">Sort By: Default</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
          <option value="type">Type</option>
        </select>
      </div>
    </>
  );
};

export default PokeFilter;
