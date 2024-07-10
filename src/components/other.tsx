'use client'
import React from 'react';
import { Vortex } from './ui/vortex';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PokemonGameFeature = () => {
  return (
    <div className="overflow-hidden">
     <div  className='flex items-center justify-center overflow-hidden mt-12 border bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 rounded-md'>
     <Vortex>
        <div className='md:w-96 w-80 h-96 flex flex-col gap-8 justify-center items-center overflow-hidden bg-black bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-md'> 
          
          <motion.div
             key="robot-div"
             initial={{ y: 0 }}
             animate={{ y: 8 }}
             transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
           <img src="/munna.png" alt="Munna" className='w-44' />
          </motion.div>

         <div className='flex items-center justify-center gap-4'>
         <motion.div
             className="text-white font-bold text-2xl"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
           Play Now
          </motion.div>
          <div>
            <img src="/favicon.jpg" alt="" className='w-10' />
          </div>
         </div>

          <div className='flex items-center gap-4'>
            <a href="#_" className="relative px-6 py-3 font-bold text-white rounded-lg group overflow-hidden">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 transform bg-purple-800 opacity-80 group-hover:bg-blue-800"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 transform translate-x-1 translate-y-1 bg-blue-800 mix-blend-screen group-hover:translate-x-0 group-hover:translate-y-0 opacity-80"></span>
              <span className="relative z-10">Button Text</span>
              <span className="absolute inset-0 border-2 border-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <FaGithub size={40} className='text-white' />
          </div>
        </div>
      </Vortex>
     </div>
    </div>
  );
};

export default PokemonGameFeature;
