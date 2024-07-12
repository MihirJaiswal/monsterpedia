'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Particles from './ui/Particles';
import OrbitingCircles from './ui/orbiting-circles';
import Meteors from './ui/meteors';
import { motion } from 'framer-motion';

const Hero = () => {
    const [isScrolledToUpcoming, setIsScrolledToUpcoming] = useState(false);
    const [isScrolledToSupport, setIsScrolledToSupport] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const upcomingSection = document.getElementById('cards');
            const supportSection = document.getElementById('dream-section');
            const upcomingSectionTop = upcomingSection?.getBoundingClientRect().top;
            const supportSectionTop = supportSection?.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            setScrollY(window.scrollY);

            if (upcomingSectionTop && upcomingSectionTop <= windowHeight) {
                setIsScrolledToUpcoming(true);
            } else {
                setIsScrolledToUpcoming(false);
            }

            if (supportSectionTop && supportSectionTop <= windowHeight) {
                setIsScrolledToSupport(true);
            } else {
                setIsScrolledToSupport(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const Icons = {
        lifeorb: () => (
            <Image src="/lifeorb.png" height={130} width={130} alt="" />
        ),
        gym: () => (
            <Image src="/gym.png" height={130} width={130} alt="" />
        ),
        go: () => (
            <Image src="/go.png" height={130} width={130} alt="" />
        ),
        masterball: () => (
            <Image src="/masterball.png" height={130} width={130} alt="" />
        ),
    };

    return (
        <div>
            <div>
                <div className="fixed left-0 top-0 h-full w-12 bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 text-white shadow-md hidden md:block border-r border-gray-600"></div>
                <div className="fixed right-0 top-0 h-full w-12 bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 text-white shadow-md hidden md:block border-l border-gray-600"></div>
                <div className="fixed bottom-0 h-10 z-40 w-full bg-gray-300 bg-clip-padding backdrop-filter bg-opacity-5 text-white shadow-md hidden md:block border-t border-gray-600"></div>
            </div>

            <div className="relative text-white overflow-hidden h-screen flex flex-col items-center justify-center">
                <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
                    <div className="relative flex h-[500px] w-full">
                        <Meteors number={7} />
                    </div>
                    <a href='/pokedex' className='absolute flex flex-col items-center justify-center px-4'>
                        <Image src="/pokedex2.png" alt="" height={130} width={130} className='w-16 h-full' />
                    </a>
                    <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} delay={20} radius={80}>
                        <Icons.masterball />
                    </OrbitingCircles>
                    <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} delay={10} radius={80}>
                        <Icons.gym />
                    </OrbitingCircles>
                    <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={190} duration={20} reverse>
                        <Icons.go />
                    </OrbitingCircles>
                    <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={190} duration={20} delay={20} reverse>
                        <Icons.lifeorb />
                    </OrbitingCircles>
                </div>

                {/* Heading */}
                <div className='absolute bottom-8 md:bottom-8 left-12 md:right-0 text-gray-300 flex flex-col justify-center items-center'>
                    <div className="hidden md:block">
                        <span className="absolute mx-auto py-4 flex border w-fit bg-gradient-to-r blur-xl from-cyan-600 via-teal-500 to-cyan-500 bg-clip-text text-4xl box-content font-extrabold text-transparent text-center select-none">
                            Explore the World of Pokémon
                        </span>
                        <h1 className="relative top-0 w-fit h-auto py-4 justify-center flex bg-gradient-to-r items-center from-cyan-500 via-teal-500 to-cyan-600 bg-clip-text text-4xl font-extrabold text-transparent text-center select-auto">
                            Explore the World of Pokémon
                        </h1>
                    </div>
                </div>

                {/* Particles */}
                <div className='fixed top-16 left-0 w-full h-full'>
                    <Particles className={`absolute top-32 w-full h-full ${isScrolledToUpcoming ? 'absolute' : 'fixed'}`} quantity={500} />
                </div>

                {/* Background Ash */}
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0 }}
                    className='fixed bottom-0 right-0'
                >
                    <Image src="/backgrounds/ash.png" alt="" height={800} width={800} quality={100} className='w-full md:h-96' />
                </motion.div>

                {/* Jirachi */}
                <motion.div
                    initial={{ opacity: 1, y: -200 }}
                    animate={{ opacity: isScrolledToUpcoming ? 0 : 1, y: isScrolledToUpcoming ? -100 : 0 }}
                    transition={{ duration: 1, delay: isScrolledToUpcoming ? 0 : 0.3 }}
                    className={`fixed top-24 left-2 md:left-44 opacity-90`}
                >
                    <motion.div
                        key="jirachi-div"
                        initial={{ y: isScrolledToUpcoming ? 0 : 5 }}
                        animate={{ y: isScrolledToUpcoming ? 5 : 0 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <Image src="/jirachi.png" alt="Jirachi" width={100} height={100} className={`md:w-16 w-12 ${isScrolledToUpcoming ? '' : 'block'}`} />
                    </motion.div>
                </motion.div>

                {/* Ho-Oh */}
                <motion.div
                    initial={{ opacity: 0, x: -150, y: 0 }}
                    animate={{ 
                        opacity: isScrolledToUpcoming && !isScrolledToSupport ? 1 : 0, 
                        x: isScrolledToUpcoming && !isScrolledToSupport ? -50 : 'calc(-100vw + 150px)', 
                        y: isScrolledToUpcoming && !isScrolledToSupport ? 100 : 'calc(100vh - 150px)' 
                    }}
                    transition={{ 
                        x: { type: "spring", stiffness: 50, damping: 10 },
                        y: { type: "spring", stiffness: 50, damping: 10 },
                        opacity: { duration: 0.2 }
                    }}
                    className={`fixed top-24 left-24 opacity-90 hidden md:block`}
                >
                    <Image src="/ho-oh.png" alt="Ho-Oh" width={130} height={130} className='md:w-44 w-32' />
                </motion.div>

                {/* Lugia */}
                <motion.div
                    initial={{ opacity: 0, x: 150, y: 0 }}
                    animate={{ 
                        opacity: isScrolledToUpcoming && !isScrolledToSupport ? 1 : 0, 
                        x: isScrolledToUpcoming && !isScrolledToSupport ? 50 : 'calc(100vw - 150px)', 
                        y: isScrolledToUpcoming && !isScrolledToSupport ? 100 : 'calc(100vh - 150px)' 
                    }}
                    transition={{ 
                        x: { type: "spring", stiffness: 50, damping: 10 },
                        y: { type: "spring", stiffness: 50, damping: 10 },
                        opacity: { duration: 0.2 }
                    }}
                    className={`fixed top-28 right-20 opacity-90 hidden md:block`}
                >
                    <Image src="/lugia.png" alt="Lugia" width={130} height={130} className='md:w-44 w-32 z-50' />
                </motion.div>


                <div className={`fixed top-24 md:hidden left-2 md:left-44 opacity-90 ${isScrolledToUpcoming ? 'block' : 'hidden'}`}>
                    <motion.div
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                    >
                        <Image src="/ho-oh.png" alt="Jirachi" width={100} height={100} className={`md:hidden w-28 ${isScrolledToUpcoming ? '' : 'block'}`} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
