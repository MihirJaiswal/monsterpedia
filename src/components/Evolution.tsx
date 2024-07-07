import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Shimmer from './Shimmer'; // Ensure this component is created
import gif from '../../public/pokeball-loader.gif'

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
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = (speciesName: string, imageUrl: string, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default navigation behavior
    setCurrentImageUrl(imageUrl); // Set the current Pokémon image URL
    setIsNavigating(true); // Show shimmer effect

    setTimeout(() => {
      router.push(`/pokemon/${speciesName.toLowerCase()}`); // Navigate to details page
    }, 500); // Adjust delay for shimmer effect duration
  };

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
                {evo.min_level !== null && <div>(Level: {evo.min_level})</div>}
                {evo.item && <div>(Item: {evo.item})</div>}
                {evo.trigger_name && <div>- {evo.trigger_name}</div>}
              </div>
              <div className="flex items-center">
                {/* Icon visible on medium screens and above */}
                <FaArrowRight size={24} className="hidden md:block text-gray-800" />
                
                {/* Icon visible on screens smaller than medium */}
                <FaArrowDown size={24} className="block md:hidden text-gray-800" />
              </div>
            </div>
          )}
          <div
            className="flex flex-col items-center text-center py-4 px-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 mx-4 cursor-pointer"
            onClick={(event) => handleClick(evo.species_name, evo.image_url, event)}
          >
            <div className="relative w-48 h-auto mb-4">
              {isNavigating && currentImageUrl === evo.image_url ? (
                <div className='flex flex-col items-center justify-center gap-4'>
                <div className="relative md:w-36 md:h-36 w-28 md:mx-auto mb-4">
                <div className="absolute inset-0 flex justify-center items-center z-0 bg-card rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
                        <div className="md:w-36 md:h-36 rounded-full relative flex justify-center items-center">
                          <div className="md:w-32 md:h-32 rounded-full border border-gray-300 relative flex justify-center items-center">
                            <div className="absolute w-full h-full flex items-center justify-center">
                              <div className="absolute w-full h-[1px] bg-gray-300 transform rotate-45 left-2"></div>
                              <div className="absolute w-10 h-10 rounded-full border border-white flex justify-center items-center"></div>
                              <div className="absolute w-full h-[1px] bg-gray-300 transform rotate-45 right-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                <Image
                  src={gif}
                  alt="Loading..."
                  width={100}
                  height={100}
                  className="animate-spin w-full h-full object-cover object-center relative"
                />
              
                </div>
              </div>
              ) : (
                <Image
                  src={evo.image_url}
                  alt={evo.species_name}
                  className="w-48 h-auto object-cover rounded-lg relative"
                  width={192} // Adjust size as needed
                  height={192} // Adjust size as needed
                  loading="lazy"
                />
              )}
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
        </React.Fragment>
      ))}
    </div>
  );
};

export default Evolution;
