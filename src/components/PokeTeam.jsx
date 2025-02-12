import React, { useState, useEffect } from 'react';

const PokeTeam = ({ pokemonList }) => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    // Check if there's a saved team in localStorage
    const savedTeam = JSON.parse(localStorage.getItem('pokeTeam'));
    if (savedTeam) {
      setTeam(savedTeam);
    }
  }, []);

  // Add a Pokémon to the team (allow duplicates, max 6)
  const addPokemon = (pokemon) => {
    if (team.length < 6) {
      const newTeam = [...team, { ...pokemon, uniqueId: Date.now() }]; // Assign a unique ID to each added Pokémon
      setTeam(newTeam);
      localStorage.setItem('pokeTeam', JSON.stringify(newTeam)); // Save updated team to localStorage
    }
  };

  // Remove a Pokémon from the team by unique ID
  const removePokemon = (uniqueId) => {
    const updatedTeam = team.filter(poke => poke.uniqueId !== uniqueId);
    setTeam(updatedTeam);
    localStorage.setItem('pokeTeam', JSON.stringify(updatedTeam)); // Update localStorage after removal
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Pokémon Team Builder</h1>
        <p className="text-gray-600 text-center mb-6">Select up to 6 Pokémon for your ultimate team!</p>

        {/* Dropdown to select Pokémon */}
        <div className="flex justify-center mb-4">
          <select
            className="w-64 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => {
              const selectedPokemon = pokemonList.find(poke => poke.id === Number(e.target.value));
              if (selectedPokemon) addPokemon(selectedPokemon);
            }}
          >
            <option value="">Select a Pokémon</option>
            {pokemonList.map((poke) => (
              <option key={poke.id} value={poke.id}>
                {poke.name}
              </option>
            ))}
          </select>
        </div>

        {/* Display the selected Pokémon team */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {team.map((poke) => (
            <div
              key={poke.uniqueId}
              className="relative bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img src={poke.sprite} alt={poke.name} className="w-24 h-24" />
              <h3 className="text-lg font-bold text-gray-700 capitalize">{poke.name}</h3>
              <p className="text-sm text-gray-500">Type: {poke.type}</p>
              <button
                onClick={() => removePokemon(poke.uniqueId)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Team Limit Message */}
        {team.length === 6 && (
          <p className="text-center text-sm text-red-600 mt-4">
            Your team is full! Remove a Pokémon to add a new one.
          </p>
        )}
      </div>
    </div>
  );
};

export default PokeTeam;
