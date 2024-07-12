'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  { id: 1, title: 'Game Maker', description: 'Create your own Pokémon games with custom rules, characters, and adventures using our intuitive game maker.', img: '/feature1.png' },
  { id: 2, title: 'Pokedex Maker', description: 'Design and customize your own Pokédex, adding unique entries and detailed information for fan-made Pokémon.', img: '/feature2.png' },
  { id: 3, title: 'Fakemon API', description: 'Access a comprehensive API to generate and integrate Fakemon into your applications, complete with stats and abilities.', img: '/feature3.png' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const UpcomingFeatures = () => {
  return (
    <section id="upcoming-section" className="container mx-auto p-4 flex mb-12 flex-col items-center justify-center">
      <div className='flex flex-col items-center justify-center gap-4'>
      <motion.div
        initial={{ filter: 'blur(10px)', opacity: 0.8 }}
        whileInView={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="w-16"
      >
        <Image
          src="/mega.png"
          alt="Upcoming Features"
          width={64} 
          height={64} 
          className="rounded-full" 
        />
      </motion.div>

      <motion.h2
        className="md:text-3xl text-2xl font-extrabold text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Upcoming Features
      </motion.h2>
      <motion.p
        className="text-lg text-gray-300 mb-12 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Stay tuned for exciting new features! We're constantly working to enhance your experience with new tools, improved functionality, and innovative updates to make your Pokémon journey even more enjoyable.
      </motion.p>
    </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        transition={{duration:0.2}}
         id='cards'
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="relative md:w-72 p-4 h-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50 border border-gray-300 rounded-md shadow-2xl overflow-hidden transform transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-opacity-30"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 2, }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <div className="relative w-full h-36 flex items-center justify-center">
            <div className="absolute left-12 md:left-14 inset-0 w-36 h-36 flex justify-center border-2 border-gray-300 items-center z-0 bg-card2 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-30 transition-all duration-300">
          <div className="w-36 h-36 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
            <div className="w-36 h-36 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-[2px] bg-white transform rotate-45 left-2"></div>
                <div className="absolute w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"></div>
                <div className="absolute w-full h-[2px] bg-white transform rotate-45 right-2"></div>
              </div>
            </div>
          </div>
        </div>
              <Image src={feature.img} alt={feature.title} 
              width={300}
              height={300}
               className="rounded-t-lg w-36 relative object-contain " />
            </div>
            <div className="p-6 h-fyll flex flex-col justify-between">
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-200 leading-relaxed">{feature.description}</p>
            </div>
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center text-white text-center opacity-0 transition-opacity duration-500 p-4"
              whileHover={{ opacity: 1 }}
            >
              <p className="font-semibold">{feature.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default UpcomingFeatures;
