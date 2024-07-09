import Calculate from '@/components/calculator/Calculate'
import Footer from '@/components/Footer'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-hero relative'>
        <div className='absolute inset-0 bg-bg7 bg-repeat bg-contain bg-center opacity-20 pointer-events-none '></div>
      <HomeHeader/>
      <Calculate/>
      <Footer/>
    </div>
  )
}

export default page