'use client'
import { useState, useEffect } from 'react';
import { MotionDiv } from './MotionDiv';
import Image from 'next/image';

export default function ScrollManager() {
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
  return (
    <div>
      <MotionDiv
                    initial={{ opacity: 1, y: -200 }}
                    animate={{ opacity: isScrolledToUpcoming ? 0 : 1, y: isScrolledToUpcoming ? -100 : 0 }}
                    transition={{ duration: 1, delay: isScrolledToUpcoming ? 0 : 0.3 }}
                    className={`fixed top-24 left-2 md:left-44 opacity-90`}
                >
                    <MotionDiv
                        key="jirachi-div"
                        initial={{ y: isScrolledToUpcoming ? 0 : 5 }}
                        animate={{ y: isScrolledToUpcoming ? 5 : 0 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <Image src="/jirachi.webp" alt="Jirachi" width={100} height={100} loading='lazy' className={`md:w-16 w-12 ${isScrolledToUpcoming ? '' : 'block'}`} />
                    </MotionDiv>
                </MotionDiv>

                {/* Ho-Oh */}
                <MotionDiv
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
                    <Image src="/Ho-Oh.webp" alt="Ho-Oh" width={130} height={130} className='md:w-44 w-32' loading='lazy' />
                </MotionDiv>

                {/* Lugia */}
                <MotionDiv
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
                    <Image src="/lugia.webp" alt="Lugia" width={130} height={130} className='md:w-44 w-32 z-50' loading='lazy' />
                </MotionDiv>


                <div className={`fixed top-24 md:hidden left-2 md:left-44 opacity-90 ${isScrolledToUpcoming ? 'block' : 'hidden'}`}>
                    <MotionDiv
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                    >
                        <Image src="/Ho-Oh.webp" alt="Jirachi" width={100} height={100} loading='lazy' className={`md:hidden w-28 ${isScrolledToUpcoming ? '' : 'block'}`} />
                    </MotionDiv>
                </div>
    </div>
  )
}
