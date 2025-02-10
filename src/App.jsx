import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";
import PokeMenu from "./components/PokeMenu";
import PokeTeam from "./components/PokeTeam";
import PokemonCompare from "./components/PokemonCompare";
import PokeBanner from "./components/PokeBanner";

const AppContent = ({ pokemon }) => {
  const location = useLocation(); // ✅ Get the current route

  const bannerTitles = {
    "/": "Welcome to the Poké Dex!",
    "/pokedex": "Welcome to the Poké Dex!",
    "/team": "Your Pokémon Team",
    "/battle": "Battle Arena - Test Your Strength!",
    "/compare": "Compare Pokemon",
  };

  const bannerText = bannerTitles[location.pathname] || "Pokémon Adventure";

  return (
    <div id="app">
      <NavBar />
      <PokeBanner bannerTitle={bannerText} />
      <div className="main-body grow-1 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:my-3">
        <Routes>
          <Route path="/" element={<PokeMenu pokemonList={pokemon} />} />
          <Route path="/team" element={<PokeTeam pokemonList={pokemon} />} />
          <Route path="/compare" element={<PokemonCompare pokemonList={pokemon} />} />
        </Routes>
      </div>
      <FooterBar />
    </div>
  );
};

const App = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const pokeApiLink = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151";

    fetch(pokeApiLink)
      .then((resp) => resp.json())
      .then((data) => {
        // Fetch additional details for each Pokémon (like type)
        Promise.all(
          data.results.map((poke, index) =>
            fetch(poke.url)
              .then((res) => res.json())
              .then((details) => ({
                id: index + 1,
                name: poke.name,
                type: details.types.map((t) => t.type.name).join(", "), // Extracting types
                sprite: details.sprites.front_default, // Getting Pokémon image
              }))
          )
        ).then((pokemon) => setPokemon(pokemon));
      })
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }, []);

  return (
    <Router>
      <AppContent pokemon={pokemon} />
    </Router>
  );
};

export default App;
