import Calculate from '@/components/calculator/Calculate'
import HomeHeader from '@/components/HomeHeader'
import React from 'react'

const page = () => {
  return (
    <div className='bg-hero'>
      <HomeHeader/>
      <Calculate/>
    </div>
  )
}

export default page