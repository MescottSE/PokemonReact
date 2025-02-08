import React from 'react'

const PokeMenu = ({pokemonList}) => {

    var pokemon = pokemonList;

  return (
    <>
      <div class="bg-white">
            <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Pokedex - 1 to 151</h2>

                <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {
                    pokemon.map((poke, index) => (
                        <div class="group relative">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`} alt={poke.name} class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
                            <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-sm text-gray-700">
                                <a href="#">
                                    <span aria-hidden="true" class="absolute inset-0"></span>
                                    {poke.name}
                                </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-500">Type: {poke.type}</p>
                            </div>
                            <p class="text-sm font-medium text-gray-900">#{poke.id}</p>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    </>
  )
}

export default PokeMenu
