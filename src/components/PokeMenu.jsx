import React, { useState, useEffect } from 'react';
import PokeFilter from '../components/PokeFilter';

const PokeMenu = ({ pokemonList }) => {
  const [filteredPokemon, setFilteredPokemon] = useState(pokemonList);

  // Handle filter change (type, search, sorting)
  const handleFilterChange = ({ type, search, order }) => {
    let filtered = [...pokemonList];

    // Filter by Type
    if (type) {
      filtered = filtered.filter((poke) => poke.type.includes(type));
    }

    // Filter by Search Term
    if (search) {
      filtered = filtered.filter((poke) => poke.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Apply Sorting
    if (order) {
      switch (order) {
        case 'a-z':
          filtered = filtered.sort((a, z) => a.name.localeCompare(z.name));
          break;
        case 'z-a':
          filtered = filtered.sort((a, z) => z.name.localeCompare(a.name));
          break;
        case 'type':
          filtered = filtered.sort((a, b) => {
            const aTypes = a.type.split(', ');
            const bTypes = b.type.split(', ');

            if (aTypes[0] === bTypes[0]) {
              return a.name.localeCompare(b.name);
            }
            return aTypes[0].localeCompare(bTypes[0]);
          });
          break;
        default:
          break;
      }
    }

    setFilteredPokemon(filtered);
  };

  useEffect(() => {
    setFilteredPokemon(pokemonList);
  }, [pokemonList]);

  return (
    <div className="bg-gradient-to-b from-blue-500 to-indigo-600 min-h-screen py-8 px-4">
      <PokeFilter subPokemon={pokemonList} onFilterChange={handleFilterChange} />

      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-extrabold text-white text-center mb-6">Pokédex - 1 to 151</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredPokemon.map((poke) => (
            <div
              key={poke.id}
              className="relative group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-3">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`}
                  alt={poke.name}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 capitalize">{poke.name}</h3>
              <p className="text-sm text-gray-600">Type: {poke.type}</p>
              <p className="text-lg font-semibold text-indigo-700">#{poke.id}</p>

              <div className="absolute inset-0 bg-indigo-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokeMenu;
