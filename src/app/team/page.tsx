import Footer from '@/components/Footer'
import HomeHeader from '@/components/HomeHeader'
import TeamBuilder from '@/components/team/TeamBuilder'
import React from 'react'

const page = () => {
  return (
    <div className='relative bg-hero'>
        <HomeHeader/>
        <TeamBuilder/>
        <Footer/>
    </div>
  )
}

export default page