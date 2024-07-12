'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import pokedex2 from '../../public/Pokedex2.png'
import battle from '../../public/gym.png';
import go from '../../public/go.png';
import master from '../../public/masterball.png';
import ShineBorder from './ui/shine-border';

const About = () => {
  return (
    <section id='about' className="relative flex flex-col justify-center items-center z-40">
      <ShineBorder className="relative block px-6 py-10 md:py-20 md:px-12 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2" color={["#A07CFE", "#FE8FB5", "#0AB6C8"]}>
        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center">
          <motion.img
            src="/logo.png"
            alt="Monster Pedia Logo"
            className="w-28"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.h2
            className="block w-full bg-gradient-to-b text-white bg-clip-text font-bold text-transparent text-3xl sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover and Build Your Ultimate Pokédex
          </motion.h2>
          <motion.p
            className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Monster Pedia provides a comprehensive and customizable Pokédex experience. Dive into detailed Pokémon
            information, create and manage your own Pokédex, and enjoy intuitive design tools that make it easy for
            everyone, from casual fans to dedicated trainers.
          </motion.p>
        </div>
        
        <div className="relative flex flex-col mx-auto max-w-7xl z-10 md:grid gap-10 pt-14 lg:grid-cols-4 md:grid-cols-2">
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card 
            title="Pokedex" 
            description="Explore detailed information on every Pokémon, including stats, abilities, and evolution."
            icon={pokedex2}
            href="/pokedex"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card 
            title="Calculator" 
            description="Calculate Pokémon type weaknesses and strengths, essential for planning Nuzlock and other battles."
            icon={go}
            href="/calculator"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card 
            title="Team Builder" 
            description="Create and optimize your Pokémon team, analyzing strengths, weaknesses, and synergy for competitive play."
            icon={battle}
            href="/team"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card 
            title="Pokemon Generator" 
            description="Generate custom Pokémon cards with detailed stats, abilities, and types for personalized collections."
            icon={master}
            href="/generator"
          />
        </motion.div>
      </div>

        <motion.div
          className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
          style={{ backgroundImage: 'linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
          style={{ backgroundImage: 'linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        </motion.div>
        <motion.div
          className="absolute bottom-0 left-0 md:block opacity-90"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <img src="/backgrounds/umbreon.png" alt="Umbreon" className='w-56' />
        </motion.div>
      </ShineBorder>
    </section>
  );
};

export default About;
