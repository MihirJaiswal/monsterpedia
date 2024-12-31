import Image from 'next/image';
import Particles from './ui/Particles';
import OrbitingCircles from './ui/orbiting-circles';
import Meteors from './ui/meteors';
import pokedex2 from '../../public/About/Pokedex2.webp'
import { MotionDiv } from './MotionDiv';
import battle from '../../public/About/gym.webp';
import go from '../../public/About/go.webp';
import master from '../../public/About/masterball.webp';
import orb from '../../public/About/lifeorb.png'
import ScrollManager from './ScrollManager';
import ash from '../../public/backgrounds/ash.webp'

const Hero = () => {
    

    const Icons = {
        lifeorb: () => (
            <Image src={orb} height={130} width={130} alt="img" loading='lazy' />
        ),
        gym: () => (
            <Image src={battle} height={130} width={130} alt="img" loading='lazy' />
        ),
        go: () => (
            <Image src={go} height={130} width={130} alt="img" loading='lazy' />
        ),
        masterball: () => (
            <Image src={master} height={130} width={130} alt="img" loading='lazy' />
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
            <div className="relative flex flex-col items-center justify-center h-[500px] w-full overflow-hidden rounded-lg pt-6">
                <div className="relative flex h-full w-full">
                    <Meteors number={7} />
                </div>
                <a href='/pokedex' className='absolute flex flex-col items-center justify-center px-4'>
                    <Image src={pokedex2} alt="" height={130} width={130} className='w-16 h-full' />
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
                    <Particles className='top-32 w-full h-full fixed' quantity={500} />
                </div>

                {/* Background Ash */}
                <MotionDiv
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0 }}
                    className='fixed bottom-0 right-0'
                    viewport={{ once: true }}
                >
                    <Image src={ash} alt="ash and pikachu" height={800} width={800} quality={100} className='w-full md:h-96' loading='lazy' placeholder='blur' />
                </MotionDiv>

                <ScrollManager/>
                
            </div>
        </div>
    );
};

export default Hero;
