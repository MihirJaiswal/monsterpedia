import React from 'react'
import Hero from '@/components/Hero'
import HomeHeader from '@/components/HomeHeader'
import About from '@/components/About'
import Footer from '@/components/Footer'
import Note from '@/components/Note'
import SupportMe from '@/components/Support'
import PokemonGameFeature from '@/components/other'


const page = () => {
  return (
    <div className='bg-hero h-screen'>
      <div className='fixed inset-0 bg-black bg-contain bg-repeat-x bg-center opacity-60 pointer-events-none'></div>
      <div className='fixed inset-0 bg-bg5 bg-cover bg-center opacity-5 pointer-events-none'></div>
      <div className='absolute inset-0 opacity-80 md:opacity-40  pointer-events-none flex items-center justify-center'>
      <div className="">
              <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-blue-950 via-cyan-800 to-blue-950 bg-clip-text text-5xl md:text-9xl box-content font-extrabold text-transparent text-center select-none">
                MonsterPédia
              </span>
              <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-black via-gray-900 to-black bg-clip-text text-5xl md:text-9xl font-extrabold text-transparent text-center select-auto">
              MonsterPédia
              </h1>
            </div>
      </div>
      <HomeHeader/>
      <Hero/>
      <About/>
      <SupportMe/>
      <PokemonGameFeature/>
      <Note/>
      <Footer/>
    </div>
  )
}

export default page