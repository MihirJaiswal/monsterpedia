import Calculate from '@/components/calculator/Calculate'
import Footer from '@/components/Footer'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-hero relative'>
      <HomeHeader/>
      <Calculate/>
      <Footer/>
    </div>
  )
}

export default page