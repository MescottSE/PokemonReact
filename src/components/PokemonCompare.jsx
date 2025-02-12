import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PokemonCompare = ({ pokemonList }) => {
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);

  // Function to handle Pokémon selection
  const handleSelection = (e, setPokemon) => {
    e.preventDefault(); // Prevent default behavior to avoid page refresh
    const selected = pokemonList.find(poke => poke.id === Number(e.target.value));
    setPokemon(selected);
  };

  // Function to handle removal of selected Pokémon
  const handleRemovePokemon = (setPokemon) => {
    setPokemon(null); // Reset the selected Pokémon to null
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    if (!selectedPokemon1 || !selectedPokemon2) return {};

    const labels = ['HP', 'Attack', 'Defense', 'Speed'];
    const stats1 = [
      selectedPokemon1.stats.hp,
      selectedPokemon1.stats.attack,
      selectedPokemon1.stats.defense,
      selectedPokemon1.stats.speed,
    ];
    const stats2 = [
      selectedPokemon2.stats.hp,
      selectedPokemon2.stats.attack,
      selectedPokemon2.stats.defense,
      selectedPokemon2.stats.speed,
    ];

    return {
      labels,
      datasets: [
        {
          label: selectedPokemon1.name,
          data: stats1,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: selectedPokemon2.name,
          data: stats2,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">Pokémon Compare</h1>
        <p className="text-gray-600 text-center mb-6">Select two Pokémon to compare their stats!</p>

        {/* Pokémon selection dropdowns */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <select
            className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => handleSelection(e, setSelectedPokemon1)}
          >
            <option value="">Select Pokémon 1</option>
            {pokemonList.map((poke) => (
              <option key={poke.id} value={poke.id}>{poke.name}</option>
            ))}
          </select>

          <select
            className="w-full sm:w-1/3 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => handleSelection(e, setSelectedPokemon2)}
          >
            <option value="">Select Pokémon 2</option>
            {pokemonList.map((poke) => (
              <option key={poke.id} value={poke.id}>{poke.name}</option>
            ))}
          </select>
        </div>

        {/* Comparison Display */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[selectedPokemon1, selectedPokemon2].map((poke, index) =>
            poke ? (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
                <img src={poke.sprite} alt={poke.name} className="w-24 h-24" />
                <h2 className="text-xl font-bold text-gray-800 capitalize">{poke.name}</h2>
                <p className="text-sm text-gray-500">Type: {poke.type}</p>

                {/* Pokémon Stats */}
                <div className="mt-4 w-full">
                  <div className="flex justify-between text-gray-700">
                    <span>HP:</span> <span>{poke.stats.hp}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Attack:</span> <span>{poke.stats.attack}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Defense:</span> <span>{poke.stats.defense}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Speed:</span> <span>{poke.stats.speed}</span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemovePokemon(index === 0 ? setSelectedPokemon1 : setSelectedPokemon2)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                <p className="text-gray-500">Select a Pokémon</p>
              </div>
            )
          )}
        </div>

        {/* Display the Chart */}
        {selectedPokemon1 && selectedPokemon2 && chartData && (
          <div className="mt-8">
            <Bar data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCompare;
