import React, { useState, useEffect } from 'react';

const PokeFilter = ({ subPokemon, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState(""); // For search query
  const [selectedType, setSelectedType] = useState(""); // For selected type
  const [selectedOrder, setSelectedOrder] = useState(""); // For selected order

  const pokemonTypes = [...new Set(subPokemon.flatMap(poke => poke.type.split(', ')))];

  const filterBody = { 
    position: 'fixed',
    zIndex: '999',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    right: '0',
    top: '40%',
    padding: '10px 10px',
    background: 'white',
    maxWidth: '250px',
  };

  const filtersContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const filterTitle = {
    marginBottom: '15px',
  };

  const searchBar = {
    border: '1px solid grey',
    paddingLeft: '5px',
  };

  // Handle type filter change
  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    onFilterChange({ type: newType, search: searchTerm, order: selectedOrder });
  };

  // Handle search filter change
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange({ type: selectedType, search: newSearchTerm, order: selectedOrder });
  };

  // Handle order filter change
  const handleOrderChange = (e) => {
    const newOrder = e.target.value;
    setSelectedOrder(newOrder);
    onFilterChange({ type: selectedType, search: searchTerm, order: newOrder });
  };

  useEffect(() => {
    // If pokemonList changes, reset the filters (optional)
    // or you can keep it as is to allow persistent filters across updates.
  }, [subPokemon]);

  return (
    <div className="filter-menu" style={filterBody}>
      <h4 style={filterTitle} className="text-center font-bold">Poke Filter</h4>

      <div className="filters" style={filtersContainer}>
        {/* Search Bar */}
        <input 
          style={searchBar} 
          id="search-pokemon"
          className="w-full appearance-none rounded-lg bg-white border border-gray-300 shadow-sm py-2 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-50 transition-all ease-in-out duration-200"
          name="search-pokemon" 
          placeholder="Search Pokemon" 
          type="text" 
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Type Dropdown */}
        <select 
          id="pokemon-type" 
          name="pokemon-type" 
          className="dropdown-select w-full appearance-none rounded-lg bg-white border border-gray-300 shadow-sm py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-50 transition-all ease-in-out duration-200"
          onChange={handleTypeChange}
          value={selectedType}
        >
          <option key={""} value="">
            All Types: Default
          </option>
          {pokemonTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Order Dropdown */}
        <select
          id="pokemon-order" 
          name="pokemon-order" 
          className="dropdown-select w-full appearance-none rounded-lg bg-white border border-gray-300 shadow-sm py-2 px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:bg-gray-50 transition-all ease-in-out duration-200"
          onChange={handleOrderChange}
          value={selectedOrder}
        >
          <option key={0} value="">
            Sort By: Default
          </option>
          <option key={1} value="a-z">
            A - Z
          </option>
          <option key={2} value="z-a">
            Z - A
          </option>
          <option key={3} value="type">
            Type
          </option>
        </select>
      </div>
    </div>
  );
};

export default PokeFilter;
