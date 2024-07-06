import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa'; // Importing the arrow icon
import { FaArrowDown } from 'react-icons/fa';

// Define the Pokémon type interface
interface PokemonType {
  type: {
    name: string;
  };
}

// Define the Evolution interface
interface Evolution {
  species_name: string;
  min_level: number | null;
  trigger_name: string;
  item: string | null;
  image_url: string;  // URL of the Pokémon's image
  types?: PokemonType[];  // Optional Pokémon types
}

// Define the EvolutionProps interface
interface EvolutionProps {
  evolution: Evolution[];  // Array of evolution objects
}

// Define the type images map
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

const Evolution: React.FC<EvolutionProps> = ({ evolution }) => {
  if (!evolution || evolution.length === 0) {
    return <p className="text-center text-gray-800">No evolution data available</p>;
  }

  return (
    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
      {evolution.map((evo, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <div className="flex flex-col items-center mx-4">
              <div className="text-center mb-2">
                {evolution[index].min_level !== null && (
                  <div>(Level: {evolution[index].min_level})</div>
                )}
                {evolution[index].item && <div>(Item: {evolution[index].item})</div>}
                {evolution[index].trigger_name && <div>- {evolution[index].trigger_name}</div>}
              </div>
              <div className="flex items-center">
                {/* Icon visible on medium screens and above */}
                <FaArrowRight size={24} className="hidden md:block text-gray-800" />
                
                {/* Icon visible on screens smaller than medium */}
                <FaArrowDown size={24} className="block md:hidden text-gray-800" />
              </div>
            </div>
          )}
          <Link href={`/pokemon/${evo.species_name}`} passHref>
            <div className="flex flex-col items-center text-center py-4 px-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 mx-4">
              <div className="relative w-48 h-auto mb-4">
                <div className="absolute inset-0 flex justify-center items-center z-0 bg-card2 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
                  <div className="w-36 h-36 rounded-full relative flex justify-center items-center">
                    <div className="w-32 h-32 rounded-full border border-gray-300 relative flex justify-center items-center">
                      <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="absolute w-full h-[1px] bg-gray-300 transform rotate-45 left-2"></div>
                        <div className="absolute w-10 h-10 rounded-full border border-white flex justify-center items-center"></div>
                        <div className="absolute w-full h-[1px] bg-gray-300 transform rotate-45 right-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  src={evo.image_url}
                  alt={evo.species_name}
                  className="w-48 h-auto object-cover rounded-lg relative"
                />
              </div>
              <div className="text-center">
                <div className='font-bold'>{evo.species_name}</div>
              </div>
              {/* Render type images if available */}
              {evo.types && (
                <div className="flex gap-2 mt-2">
                  {evo.types.map((type, idx) => (
                    <Image
                      key={idx}
                      width={20}
                      height={20}
                      src={typeImages[type.type.name] || '/types/default.png'}  // Fallback image
                      alt={type.type.name}
                      className="w-8 h-8 object-cover"
                      loading="lazy"
                      title={type.type.name}
                    />
                  ))}
                </div>
              )}
            </div>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Evolution;
