import Image from 'next/image'
import React from 'react'
import HomeNav from './HomeNav'
import HomeMobileNav from './HomeMobileNav'
import logo from '../../public/logo.webp'

const HomeHeader = () => {
  return (
    <div className='fixed w-full top-0 z-50 bg-mainb backdrop-blur-sm border-b border-gray-600 lg:backdrop-blur-sm'>
        <div className='flex justify-between items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
        <a href="/" className='flex items-center w-[12rem] xl:mr-8'>
            <Image
            alt='logo'
            src={logo}
            width={52}
            height={42}
            loading='lazy'
            placeholder='blur'
            quality={100}
            className='max-sm:size-10 m-2'
            />
            <p className='text-gray-200 font-bold text-2xl max-lg:hidden uppercase'>MonsterPédia</p>
        </a>
        <div>
        <HomeNav/>
        </div>
      <div className='flex-between gap-5'>
         <HomeMobileNav/>
      </div>
    </div>  
    </div>
  )
}

export default HomeHeader