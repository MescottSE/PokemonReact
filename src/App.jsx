import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import FooterBar from './components/FooterBar'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PokeMenu from './components/PokeMenu'
import PokeTeam from './components/PokeTeam'
import PokemonCompare from './components/PokemonCompare'

const App = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const pokeApiLink = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150";

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
                type: details.types.map((t) => t.type.name).join(', '), // Extracting types
                sprite: details.sprites.front_default, // Getting Pokémon image
              }))
          )
        ).then((pokemon) => setPokemon(pokemon));
      })
      .catch((error) => console.error("Error fetching Pokémon:", error));
  }, []);


  return (
    <Router>
      <div id="app">
        <NavBar></NavBar>
        <div className="main-body grow-1 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:my-3">
          <Routes>
            <Route path="/" element={<PokeMenu pokemonList={pokemon}/>} />
            <Route path="/team" element={<PokeTeam pokemonList={pokemon}/>} />
            <Route path="/compare" element={<PokemonCompare pokemonList={pokemon}/>} />
          </Routes>
        </div>
        <FooterBar></FooterBar>
      </div>
    </Router>
  )
}

export default App
