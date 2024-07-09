import Footer from '@/components/Footer'
import HomeHeader from '@/components/HomeHeader'
import TeamBuilder from '@/components/team/TeamBuilder'
import React from 'react'

const page = () => {
  return (
    <div>
        <HomeHeader/>
        <TeamBuilder/>
        <Footer/>
    </div>
  )
}

export default page