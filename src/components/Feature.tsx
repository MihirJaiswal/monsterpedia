import React from 'react'
import PokemonGameFeature from './other'

const Feature = () => {
  return (
    <div>
         <section id="support-me" className="container relative md:w-[90%] mx-auto my-12 p-8 flex flex-col items-center justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2 border-white text-center">
         <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center">
          <img src="/favicon.jpg" alt="Monster Pedia Logo" className="w-20" />
          <h2 className="block w-full bg-gradient-to-b text-white bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Simillar Projects
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-center md:text-center font-medium leading-relaxed tracking-wide text-gray-300">
            Monster Pedia provides  comprehensive and customizable Pokédex experience. Dive into detailed Pokémon
            information, create and manage your own Pokédex, and enjoy intuitive design tools that make it easy for
            everyone, from casual fans to dedicated trainers.
          </p>
        </div>
           <div className='z-50'>
           <PokemonGameFeature/>
           </div>
            <div className=''>
            <div className="absolute bottom-0 left-0 md:block opacity-90">
          <img src="/mist4.png" alt="" className='w- opacity-15 blur-md' />
        </div>
        <div className="absolute bottom-0 left-0 md:block opacity-90">
          <img src="/mist4.png" alt="" className='w-2/3 opacity-15 blur-md' />
        </div>
        <div className="absolute bottom-0 left-0 md:block opacity-90">
          <img src="/mist.png" alt="" className='w-96 opacity-10 blur-md' />
        </div>
     
            </div>
        
         </section>
       
    </div>
  )
}

export default Feature