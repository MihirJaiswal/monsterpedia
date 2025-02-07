import Footer from '@/components/Footer'
import PokemonCreator from '@/components/Generate/PokemonCreator'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-hero relative'>
        <HomeHeader/>
        <PokemonCreator/>
        <Footer/>
    </div>
  )
}

export default page