import HomeHeader from '@/components/HomeHeader'
import TeamBuilder from '@/components/team/TeamBuilder'
import React from 'react'

const page = () => {
  return (
    <div className='bg-hero'>
        <HomeHeader/>
        <TeamBuilder/>
    </div>
  )
}

export default page