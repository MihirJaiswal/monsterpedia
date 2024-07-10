import React from 'react';
import Card from './Card';
import pokedex from '../../public/pokedex2.png';
import battle from '../../public/gym.png';
import go from '../../public/go.png';
import master from '../../public/masterball.png';
import ShineBorder from './ui/shine-border';

const About = () => {
  return (
    <section id='about' className="flex flex-col justify-center items-center z-40">
      <ShineBorder className="relative block px-6 py-10 md:py-20 md:px-12 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2 " color={["#A07CFE", "#FE8FB5", "#0AB6C8"]}>
        <div className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center">
          <img src="/logo.png" alt="Monster Pedia Logo" className="w-28" />
          <h2 className="block w-full bg-gradient-to-b text-white bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
            Discover and Build Your Ultimate Pokédex
          </h2>
          <p className="mx-auto my-4 w-full max-w-xl bg-transparent text-justify md:text-center font-medium leading-relaxed tracking-wide text-gray-300">
            Monster Pedia provides  comprehensive and customizable Pokédex experience. Dive into detailed Pokémon
            information, create and manage your own Pokédex, and enjoy intuitive design tools that make it easy for
            everyone, from casual fans to dedicated trainers.
          </p>
        </div>

        <div className="relative flex flex-col mx-auto max-w-7xl z-10 md:grid gap-10 pt-14 lg:grid-cols-4 md:grid-cols-2">
          <Card 
            title="Pokedex" 
            description="Tailor your Pokédex's look and feel, from the color scheme to the font size, to the design of the page."
            icon={pokedex}
            href="/pokedex"
          />

          <Card 
            title="Caculator" 
            description="We build our templates with speed in mind, ensuring super-fast load times so your customers never waver."
            icon={go}
            href="/calculator"
          />

          <Card 
            title="Team Builder" 
            description="Everything you need to succeed and launch your Pokédex, right out of the box. No need to install anything else."
            icon={battle}
            href="/team"
          />
          <Card 
            title="Pokemon Generator" 
            description="Everything you need to succeed and launch your Pokédex, right out of the box. No need to install anything else."
            icon={master}
            href="/generator"
          />
        </div>

        <div className="absolute bottom-0 left-0 z-0 h-1/3 w-full border-b"
          style={{ backgroundImage: 'linear-gradient(to right top, rgba(79, 70, 229, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}>
        </div>
        <div className="absolute bottom-0 right-0 z-0 h-1/3 w-full"
          style={{ backgroundImage: 'linear-gradient(to left top, rgba(220, 38, 38, 0.2) 0%, transparent 50%, transparent 100%)', borderColor: 'rgba(92, 79, 240, 0.2)' }}>
        </div>
        <div className="absolute bottom-0 left-0 md:block opacity-90">
          <img src="/backgrounds/umbreon.png" alt="" className='w-56' />
        </div>
      </ShineBorder>
    </section>
  );
};

export default About;
