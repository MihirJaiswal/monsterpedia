'use client'
import React from 'react'
import PokemonGameFeature from './other'
import { motion } from 'framer-motion'

const Feature = () => {
  return (
    <div>
         <section id="support-me" className="container relative md:w-[90%] mx-auto my-12 p-8 flex flex-col items-center justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2 border-white text-center">
         <motion.div
          className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.img
            src="/favicon.jpg"
            alt="Monster Pedia Logo"
            className="w-20 mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.h2
            className="block w-full bg-gradient-to-b text-white bg-clip-text font-bold text-transparent text-3xl sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Similar Projects
          </motion.h2>
          <motion.p
            className="mx-auto my-4 w-full max-w-xl bg-transparent text-center md:text-center font-medium leading-relaxed tracking-wide text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Discover <span className='font-bold'>Dream Mist</span>, My other exciting Pokémon game project for browser created using HTML canvas.
          </motion.p>
        </motion.div>
           <div className='z-50'>
           <PokemonGameFeature/>
           </div>
            <motion.div className=''  
             initial={{ opacity: 0.4 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}>
            <div className="absolute bottom-0 left-0 md:block opacity-90">
            <img src="/mist4.png" alt="" className='w- opacity-20 blur-md' />
          </div>
          <div className="absolute bottom-0 left-0 md:block opacity-90">
            <img src="/mist4.png" alt="" className='w-2/3 opacity-15 blur-md' />
          </div>
          <div className="absolute bottom-0 left-0 md:block opacity-90">
            <img src="/mist.png" alt="" className='w-96 opacity-10 blur-md' />
          </div>
          </motion.div>
        </section>
      </div>
  )
}

export default Feature