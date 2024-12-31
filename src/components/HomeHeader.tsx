import Image from 'next/image'
import React from 'react'
import HomeNav from './HomeNav'
import HomeMobileNav from './HomeMobileNav'
import logo from '../../public/logo.webp'

const HomeHeader = () => {
  return (
    <div className='fixed w-full top-0 z-50 bg-cyan-950/80 backdrop-blur-sm border-b border-gray-300 '>
      <div className='flex justify-between items-center px-5 lg:px-7.5 xl:px-10'>
        <a href="/" className='flex items-center w-[12rem] xl:mr-8'>
          <Image
            alt='logo'
            src={logo}
            width={52}
            height={42}
            loading='lazy'
            placeholder='blur'
            quality={100}
            className='m-2'
          />
          <p className='text-gray-200 font-bold text-2xl hidden lg:block uppercase'>
            MonsterPédia
          </p>
        </a>
        
        <div className='hidden lg:block'>
          <HomeNav />
        </div>

        <div className='lg:hidden flex items-center gap-5'>
          <HomeMobileNav />
        </div>
      </div>
    </div>
  )
}

export default HomeHeader
