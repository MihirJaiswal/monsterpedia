'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  { id: 1, title: 'Game Maker', description: 'Discover new types and abilities to enhance your Pokémon team.', img: '/feature1.png' },
  { id: 2, title: 'Pokedex Maker', description: 'Get additional customization options for your Pokémon team.', img: '/feature2.png' },
  { id: 3, title: 'Fakemon API', description: 'Engage with new interactive elements and challenges.', img: '/feature3.png' },
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
        <img src="/mega.png" alt="" className='w-16' />
      <h2 className="text-3xl font-extrabold text-white mb-6">Upcoming Features</h2>
      <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam, sed ut explicabo alias id dignissimos officiis beatae necessitatibus quos dolor.
      </p>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        transition={{duration:0.2}}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            className="relative md:w-72 p-4 h-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-40 border border-gray-300 rounded-md shadow-2xl overflow-hidden transform transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-opacity-30"
            variants={itemVariants}
            whileHover={{ scale: 1.1, rotate: 2, }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
          >
            <div className="relative w-full h-36">
              <Image src={feature.img} alt={feature.title} layout="fill" objectFit="contain" className="rounded-t-lg" />
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