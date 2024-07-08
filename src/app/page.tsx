import React from 'react'
import Hero from '@/components/Hero'
import HomeHeader from '@/components/HomeHeader'

const page = () => {
  return (
    <div className='bg-hero h-screen'>
      <div className='absolute inset-0 bg-black bg-contain bg-repeat-x bg-center opacity-60 pointer-events-none'></div>
      <div className='absolute inset-0 bg-bg5 bg-cover bg-center opacity-5 pointer-events-none'></div>
      <div className='absolute inset-0 opacity-30 pointer-events-none flex items-center justify-center'>
        <h1 className='text-5xl md:text-7xl font-bold mb-6 md:mb-8 leading-tight drop-shadow-lg'>MonsterPedia</h1>
      </div>
      <HomeHeader/>
      <Hero/>
    </div>
  )
}

export default page