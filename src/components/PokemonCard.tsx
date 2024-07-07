import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import gif from '../../public/pokeball-loader.gif'

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonCardProps {
  name: string;
  spriteUrl?: string;
  types?: PokemonType[];
  index: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, spriteUrl, types = [], index }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  // Define a map for type images
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

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent default navigation behavior
    setIsNavigating(true); // Show shimmer effect
    setTimeout(() => {
      router.push(`/pokemon/${name.toLowerCase()}`); // Navigate to details page
    }, 200); // Delay for shimmer effect
  };

  return (
    <div
      className="relative h-full w-full py-4 px-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 transform transition-transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      {isNavigating ? (
        <div className='flex flex-col items-center justify-center gap-4 mb-12'>
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
          <p className='text-gray-800 text-center mt-4 text-lg font-bold'>Loading...</p>
          </div>
        </div> // Display shimmer effect while navigating
      ) : (
        <>
          {spriteUrl ? (
            <div className="flex flex-col items-center justify-center">
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
                  src={spriteUrl}
                  alt={name}
                  width={144} // 36 * 4 for better resolution
                  height={144} // 36 * 4 for better resolution
                  className="w-full h-full object-cover object-center relative"
                  loading="lazy"
                />
              </div>
              <p
                className={`text-center font-bold text-[#011434] uppercase ${
                  name.length > 10 ? 'text-xs' : 'text-base'
                }`}
              >
                {name}
              </p>
              <div className="flex gap-2 mt-2">
                {types.map((type, idx) => (
                  <Image
                    key={idx}
                    src={typeImages[type.type.name] || '/types/default.png'}
                    alt={type.type.name}
                    width={32} // Adjust size as needed
                    height={32} // Adjust size as needed
                    className="w-8 h-8 object-cover"
                    loading="lazy"
                    title={type.type.name}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-lg font-semibold text-gray-500">Loading...</p>
          )}
        </>
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-500 to-transparent opacity-20 pointer-events-none" />
    </div>
  );
};

export default PokemonCard;
