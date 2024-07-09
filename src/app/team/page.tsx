import Footer from '@/components/Footer'
import HomeHeader from '@/components/HomeHeader'
import TeamBuilder from '@/components/team/TeamBuilder'
import React from 'react'

const page = () => {
  return (
    <div className='relative bg-hero'>
       <div className='absolute inset-0 bg-bg6 bg-repeat bg-cover bg-center opacity-20 pointer-events-none '></div>
        <HomeHeader/>
        <TeamBuilder/>
        <Footer/>
    </div>
  )
}

export default page