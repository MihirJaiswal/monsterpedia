import Card from './Card';
import pokedex2 from '../../public/About/Pokedex2.webp'
import battle from '../../public/About/gym.webp';
import go from '../../public/About/go.webp';
import master from '../../public/About/masterball.webp';
import ShineBorder from './ui/shine-border';
import Image from 'next/image';
import { MotionDiv, MotionH2, MotionImg, MotionP } from './MotionDiv';
import Umbreon from '../../public/backgrounds/umbreon.webp'

const About = () => {
  return (
    <section id='about' className="relative flex flex-col justify-center items-center z-40">
      <ShineBorder className="relative block px-6 py-10 md:py-20 md:px-12 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2" color={["#A07CFE", "#FE8FB5", "#0AB6C8"]}>
        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center">
          <MotionImg
            src="/logo.webp"
            alt="Monster Pedia Logo"
            loading='lazy'
            className="w-28"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <MotionH2
            className="block w-full bg-gradient-to-b text-white bg-clip-text font-bold text-transparent text-3xl sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover and Build Your Ultimate Pokédex
          </MotionH2>
          <MotionP
            className="mx-auto my-4 w-full max-w-xl bg-transparent text-center font-medium leading-relaxed tracking-wide text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Monster Pedia provides a comprehensive and customizable Pokédex experience. Dive into detailed Pokémon
            information, create and manage your own Pokédex, and enjoy intuitive design tools that make it easy for
            everyone, from casual fans to dedicated trainers.
          </MotionP>
        </div>
        
        <div className="relative flex flex-col mx-auto max-w-7xl z-10 md:grid gap-10 pt-14 lg:grid-cols-4 md:grid-cols-2">
        <MotionDiv
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
        </MotionDiv>

        <MotionDiv
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
        </MotionDiv>

        <MotionDiv
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
        </MotionDiv>

        <MotionDiv
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
        </MotionDiv>
      </div>

        <MotionDiv
          className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
          style={{ backgroundImage: 'linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        </MotionDiv>
        <MotionDiv
          className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
          style={{ backgroundImage: 'linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
        </MotionDiv>
        <MotionDiv
          className="absolute bottom-0 left-0 md:block opacity-90"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image src={Umbreon} alt="Umbreon" loading='lazy' placeholder='blur' quality={100} className='w-56' />
        </MotionDiv>
      </ShineBorder>
    </section>
  );
};

export default About;
