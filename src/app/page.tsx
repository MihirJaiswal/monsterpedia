import React from 'react'
import Hero from '@/components/Hero'
import HomeHeader from '@/components/HomeHeader'
import About from '@/components/About'
import Footer from '@/components/Footer'
import SupportMe from '@/components/Support'
import Feature from '@/components/Feature'
import Final from '@/components/up'


const page = () => {
  return (
    <div className='bg-hero h-screen'>
      <div className='fixed inset-0 bg-black bg-contain bg-repeat-x bg-center opacity-50 pointer-events-none'></div>
      <HomeHeader/>
      <Hero/>
     <div className='px-4'>
     <About/>
      <Final/>
      <Feature/>
      <SupportMe/>
     </div>
      <Footer/>
    </div>
  )
}

export default page