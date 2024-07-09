import Footer from '@/components/Footer'
import PokemonCreator from '@/components/Generate/PokemonCreator'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-hero relative'>
        <div className="absolute inset-0 bg-bg3 bg-repeat bg-contain bg-center opacity-10 hidden md:block"></div>
        <HomeHeader/>
        <PokemonCreator/>
        <Footer/>
    </div>
  )
}

export default page