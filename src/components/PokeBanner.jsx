import React from 'react'

const PokeBanner = ({bannerTitle}) => {

  return (
    <>
        <div className="relative w-full bg-gradient-to-r from-red-500 to-yellow-400 py-16 px-4 text-center">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/3/39/Pokeball.PNG')] bg-center bg-cover opacity-10"></div>

        <div className="relative z-10 mx-auto max-w-4xl">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
            {bannerTitle}
            </h1>
        </div>
        </div>
    </>
  )
}

export default PokeBanner
