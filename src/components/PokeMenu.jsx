import React, { useState, useEffect } from 'react';
import PokeFilter from '../components/PokeFilter';

const PokeMenu = ({ pokemonList }) => {
  const [filteredPokemon, setFilteredPokemon] = useState(pokemonList);

  // Handle filter change (both by type, search, and sort)
  const handleFilterChange = ({ type, search, order }) => {
    let filtered = [...pokemonList]; // Make a copy of pokemonList for filtering

    // Step 1: Filter by type (if a type is selected)
    if (type) {
      filtered = filtered.filter(poke => poke.type.includes(type));
    }

    // Step 2: Filter by search term (if provided)
    if (search) {
      filtered = filtered.filter(poke => poke.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Step 3: Apply sorting after filtering
    if (order) {
      switch (order) {
        case 'a-z':
          filtered = filtered.sort((a, z) => a.name.localeCompare(z.name)); // Sort by name alphabetically
          break;
        case 'z-a':
          filtered = filtered.sort((a, z) => z.name.localeCompare(a.name)); // Sort by name in reverse
          break;
        case 'type':
          filtered = filtered.sort((a, b) => {
            const aTypes = a.type.split(", ");
            const bTypes = b.type.split(", ");
            
            // Compare primary type (first type in the list)
            if (aTypes[0] === bTypes[0]) {
              return a.name.localeCompare(b.name); // If primary types are the same, sort by name
            }
            return aTypes[0].localeCompare(bTypes[0]); // Sort by primary type
          });
          break;
        default:
          break;
      }
    }

    // Update the filtered Pokémon list
    setFilteredPokemon(filtered);
  };

  // Optionally, you can use useEffect to update the filtered list when pokemonList changes
  useEffect(() => {
    setFilteredPokemon(pokemonList);
  }, [pokemonList]); // Re-run when pokemonList changes

  return (
    <div className="bg-white">
      <PokeFilter subPokemon={pokemonList} onFilterChange={handleFilterChange} />
      
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Pokedex - 1 to 151</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredPokemon.map((poke, index) => (
            <div key={index} className="group relative">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`} 
                alt={poke.name} 
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" 
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {poke.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Type: {poke.type}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">#{poke.id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokeMenu;
