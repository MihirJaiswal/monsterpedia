'use client'
import Image from 'next/image';
import Link from 'next/link';
import Particles from './ui/Particles';
import OrbitingCircles from './ui/orbiting-circles';
import Meteors from './ui/meteors';
import { motion } from 'framer-motion';

const Hero = () => {
    const Icons = {
        gitHub: () => (
          <img src="/lifeorb.png" alt="" />
        ),
        notion: () => (
          <img src="/gym.png" alt="" />
        ),
        googleDrive: () => (
          <img src="/go.png" alt="" />
        ),
        whatsapp: () => (
         <img src="masterball.png" alt="" />
        ),
      };

  return (
    <div>
      <div className="fixed left-0 top-0 h-full w-36 bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 text-white shadow-md hidden md:block border-r border-gray-600">
      {/* <div className="p-4 border-b border-gray-600 mt-20">
  <button className="p-2 rounded text-white flex items-center">
    
  </button>
</div> */}
      </div>

      <div className="relative text-white overflow-hidden h-screen flex flex-col items-center justify-center">
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
          <div className="relative flex h-[500px] w-full">
            <Meteors number={7} />
          </div>
          <div className='absolute flex flex-col items-center justify-center px-4'>
            <img src="/pokedex2.png" alt="" className='w-16 h-full' />
          </div>

          <OrbitingCircles
            className="size-[30px] border-none bg-transparent"
            duration={20}
            delay={20}
            radius={80}
          >
            <Icons.whatsapp />
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[30px] border-none bg-transparent"
            duration={20}
            delay={10}
            radius={80}
          >
            <Icons.notion />
          </OrbitingCircles>

          {/* Outer Circles (reverse) */}
          <OrbitingCircles
            className="size-[50px] border-none bg-transparent"
            radius={190}
            duration={20}
            reverse
          >
            <Icons.googleDrive />
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[50px] border-none bg-transparent"
            radius={190}
            duration={20}
            delay={20}
            reverse
          >
            <Icons.gitHub />
          </OrbitingCircles>
        </div>

        <div>
          <div className='absolute bottom-8 md:bottom-8 left-12 md:right-0 text-gray-300 flex flex-col justify-center items-center'>
            <div className="hidden md:block">
              <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-cyan-600 via-teal-500 to-cyan-500 bg-clip-text text-4xl box-content font-extrabold text-transparent text-center select-none">
                Explore the World of Pokémon
              </span>
              <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-cyan-500 via-teal-500 to-cyan-600 bg-clip-text text-4xl font-extrabold text-transparent text-center select-auto">
                Explore the World of Pokémon
              </h1>
            </div>
           {/*  <div className="md:hidden">
              <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-cyan-600 via-teal-500 to-cyan-500 bg-clip-text text-4xl box-content font-extrabold text-transparent text-center select-none">
                MonsterPedia
              </span>
              <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-cyan-500 via-teal-500 to-cyan-600 bg-clip-text text-4xl font-extrabold text-transparent text-center select-auto">
                MonsterPedia
              </h1>
            </div> */}
          </div>

          <div className='absolute top-16 left-0 w-full h-full'>
            <Particles
              className="absolute top-32 w-full h-full"
              quantity={500}
            />
          </div>
        </div>

        <div className='absolute bottom-0 right-0'>
        <img src="/backgrounds/ash.png" alt="" className='w-full md:h-96 ' />
      </div>
        {/* Decorative Image */}
        <div className="absolute top-24 left-2 md:left-44 opacity-90">
        <motion.div
             key="robot-div"
             initial={{ y: ontoggle ? 0 : 5 }}
             animate={{ y: ontoggle ? 5 : 0 }}
             transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
               <Image src="/jirachi.png" alt="Pikachu" width={100} height={100} className='md:w-16 w-12' />
             </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
