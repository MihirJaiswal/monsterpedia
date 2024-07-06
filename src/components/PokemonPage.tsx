// src/components/PokemonPage.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import PokemonImage from './PokemonImage';
import TypeWeakness from './TypeWeakness';
import Pokedex from './Pokedex';
import Evolution from './Evolution';
import MovesSection from './MovesSection'; // Ensure this path is correct


interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  description: string;
  moves: {
    move: {
      name: string;
      method: 'level-up' | 'egg' | 'machine';
      type: 'physical' | 'special' | 'status';
      level?: number;
    };
  }[];
  evolution: {
    species_name: string;
    min_level: number | null;
    trigger_name: string;
    item: string | null;
    image_url: string;
  }[];
}

const typeImages: { [key: string]: string } = {
  normal: '/types/normal.png',
  fire: '/types/fire.png',
  water: '/types/water.png',
  grass: '/types/grass.png',
  electric: '/types/electric.png',
  ice: '/types/ice.png',
  fighting: '/types/fighting.png',
  poison: '/types/poison.png',
  ground: '/types/ground.png',
  flying: '/types/flying.png',
  psychic: '/types/psychic.png',
  bug: '/types/bug.png',
  rock: '/types/rock.png',
  ghost: '/types/ghost.png',
  dragon: '/types/dragon.png',
  dark: '/types/dark.png',
  steel: '/types/steel.png',
  fairy: '/types/fairy.png',
};

interface Props {
  pokemon: PokemonDetail;
}

const PokemonPage: React.FC<Props> = ({ pokemon }) => {
  const [activeSection, setActiveSection] = useState<'section1' | 'section2' | 'section3' | 'section4'>('section1');

  const getStatColor = (stat: number) => {
    if (stat > 100) return 'bg-green-600';
    if (stat > 70) return 'bg-yellow-600';
    if (stat > 40) return 'bg-orange-600';
    if (stat > 0) return 'bg-red-600';
    if (stat === 0) return 'bg-gray-600';
    return 'bg-red-600';
  };

  const getTotalStatColor = (total: number) => {
    if (total > 500) return 'bg-blue-600';
    if (total > 400) return 'bg-purple-600';
    if (total > 300) return 'bg-teal-600';
    return 'bg-pink-600';
  };

  const totalBaseStats = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
  return (
    <div>
      <div className="relative p-6 bg-hero bg-cover bg-center min-h-screen">
        <div className="absolute inset-0 bg-bg2 bg-repeat-round bg-contain opacity-5 pointer-events-none"></div>
        <div className='flex flex-col items-center'>
          <div className="mb-4 grid grid-cols-2 md:flex gap-4 border border-white p-2 rounded-lg shadow-lg bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40">
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${activeSection === 'section1' ? 'bg-white text-gray-900 font-semibold' : ' text-black'}`}
              onClick={() => setActiveSection('section1')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${activeSection === 'section2' ? 'bg-white text-gray-900 font-semibold' : ' text-black'}`}
              onClick={() => setActiveSection('section2')}
            >
              Pokedex
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${activeSection === 'section3' ? 'bg-white text-gray-900 font-semibold' : ' text-black'}`}
              onClick={() => setActiveSection('section3')}
            >
              Moves
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${activeSection === 'section4' ? 'bg-white text-gray-900 font-semibold' : ' text-black'}`}
              onClick={() => setActiveSection('section4')}
            >
              Evolution
            </button>
          </div>

          {activeSection === 'section1' && (
            <div className='section1 flex flex-col md:flex-row justify-center items-center mt-12'>
              <div>
                <PokemonImage sprites={pokemon.sprites} name={pokemon.name} />
                
                <h1 className="text-4xl font-bold text-gray-950 mb-4 text-center">
                #{pokemon.id}  {pokemon.name}
                </h1>

                <div className="flex justify-center gap-2 mb-4">
                  {pokemon.types.map((type, idx) => (
                    <Image
                      key={idx}
                      src={typeImages[type.type.name] || '/types/default.png'}
                      alt={type.type.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ))}
                </div>

                <div className="md:px-20 px-6 flex items-center justify-center">
                  <p className="text-center text-white mt-2 p-4 border border-white rounded-lg">{pokemon.description}</p>
                </div>
              </div>
              <div className="mx-4 my-6 rounded-lg shadow-lg p-6 px-4 md:p-8 max-w-md text-center relative overflow-hidden bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-200">
                  {/* Stats Section */}
                  <div className="text-left mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Stats</h2>
                    <ul className="space-y-4">
                      {pokemon.stats.map((stat, index) => (
                        <li key={index} className="flex items-center flex-wrap">
                          <div className='flex items-center justify-center gap-2 md:gap-6'>
                          <div className="font-semibold text-gray-800 capitalize w-24 sm:w-32">{stat.stat.name}:</div>
                          <div className="relative flex-1 h-3 md:h-[12px] w-32 md:w-36 sm:h-5 bg-gray-300 rounded-full overflow-hidden mr-2">
                            <div className={`absolute h-full ${getStatColor(stat.base_stat)}`} style={{ width: `${stat.base_stat}%` }}></div>
                          </div>
                          <div className="text-black">{stat.base_stat}</div>
                          </div>
                        </li>
                      ))}
                      <li className="flex items-center flex-wrap">
                        <span className="font-semibold text-gray-800 capitalize w-24 sm:w-32">Total:</span>
                        <div className="relative flex-1 h-3 md:h-[12px]  w-32 md:w-36 sm:h-5 bg-gray-300 rounded-full overflow-hidden mr-2">
                          <div className={`absolute h-full ${getTotalStatColor(totalBaseStats)}`} style={{ width: `${(totalBaseStats / 600) * 100}%` }}></div>
                        </div>
                        <span className="text-gray-900">{totalBaseStats}</span>
                      </li>
                    </ul>
                  </div>
                  {/* Abilities Section */}
                  <div className="text-left mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Abilities</h2>
                    <ul className="space-y-3">
                      {pokemon.abilities.map((ability, index) => (
                        <li key={index} className="capitalize text-black">
                          {ability.ability.name}
                          {ability.is_hidden && <span className="ml-2 text-xs sm:text-sm text-gray-800">(Hidden)</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
          </div>
          )}
            {activeSection === 'section2' && (
              <div className='section2 flex flex-col md:flex-row justify-between items-center mt-4 md:gap-44 gap-12'>
                <div>
                  <Pokedex
                    name={pokemon.name}
                    height={pokemon.height}
                    weight={pokemon.weight}
                    spriteUrl={pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default} // Use optional chaining and fallback
                    base_experience={pokemon.base_experience}
                  />
                </div>
                <div className='text-left'>
                  <TypeWeakness types={pokemon.types} />
                </div>
              </div>
            )}
            {activeSection === 'section3' && (
              <MovesSection moves={pokemon.moves} />  // Use the new MovesSection component
            )}
            {activeSection === 'section4' && (
              <Evolution evolution={pokemon.evolution} />
            )}
          </div>
        </div>
      </div>
  );
};

export default PokemonPage;
