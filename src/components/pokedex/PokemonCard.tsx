import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import gif from '../../../public/loader.webp'

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

  const typeColors: { [key: string]: string } = {
    normal: '#A8A878',
    fire: '#FEA059',
    water: '#449CDF',
    grass: '#65BC58',
    electric: '#F8D030',
    ice: '#59D5C6',
    fighting: '#E34078',
    poison: '#B76CC0',
    ground: '#E9793C',
    flying: '#98AFDF',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#697ABC',
    dragon: '#197FC6',
    dark: '#705848',
    steel: '#6496A9',
    fairy: '#FA94ED',
  };

  const getGradientForTypes = () => {
    if (types.length === 0) return 'from-gray-400 to-gray-600';
    if (types.length === 1) {
      const color = typeColors[types[0].type.name] || '#A8A878';
      return `bg-gradient-to-br from-[${color}] to-[${color}]`;
    }
    const color1 = typeColors[types[0].type.name] || '#A8A878';
    const color2 = typeColors[types[1].type.name] || '#A8A878';
    return `bg-gradient-to-br from-[${color1}] via-[${color1}] to-[${color2}]`;
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/pokedex/${name.toLowerCase()}`);
    }, 200);
  };

  const formattedNumber = String(index).padStart(3, '0');
 
  return (
    <div
      className="relative h-full w-full bg-white/50 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-lg  hover:shadow-2xl transform transition-all duration-300 hover:scale-102 hover:-translate-y-2 cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 ${getGradientForTypes()} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

      {/* Pokédex number badge */}
      <div className="absolute top-3 right-3 bg-black bg-opacity-30 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
        #{formattedNumber}
      </div>

      {isNavigating ? (
        <div className='flex flex-col items-center justify-center gap-4 py-8'>
          <div className="relative md:w-36 md:h-36 h-28 w-28">
            {/* Pokeball Background */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full">
              <div className="relative flex items-center justify-center rounded-full border border-gray-300 md:h-32 md:w-32 h-24 w-24">
                <div className="absolute flex h-full w-full items-center justify-center">
                  <div className="absolute top-14 left-2 h-[1px] w-full rotate-45 transform bg-gray-300"></div>
                  <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border border-white"></div>
                  <div className="absolute top-16 h-[1px] w-full rotate-45 transform bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/* Spinning Pokemon Image - Overlaid on top */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={gif}
                alt="Loading..."
                width={100}
                height={100}
                quality={100}
                className="animate-spin md:w-32 md:h-32 w-24 h-24 object-contain"
              />
            </div>
          </div>

          <p className='text-gray-800 text-center text-2xl font-semibold'>Loading...</p>
        </div>
      ) : (
        <>
          {spriteUrl ? (
            <div className="flex flex-col items-center justify-center p-6 pb-4">
              {/* Pokemon Image Container */}
              <div className="relative md:w-40 md:h-40 w-32 h-32 mb-3">
                {/* Pokéball background design */}
                <div className="absolute inset-0 flex justify-center items-center z-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                  <div
                    className={`md:w-40 md:h-40 w-32 h-32 rounded-full relative flex justify-center items-center transition-all duration-300`}
                    style={{
                      backgroundColor: types.length > 0 ? typeColors[types[0].type.name] || '#A8A878' : '#A8A878',
                    }}
                  >
                    <div className="md:w-36 md:h-36 w-28 h-28 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
                      <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="absolute w-full h-[2px] bg-gray-400 transform rotate-0"></div>
                        <div className="absolute w-12 h-12 rounded-full border-4 border-gray-400 bg-white flex justify-center items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pokemon sprite with hover effect */}
                <Image
                  src={spriteUrl}
                  alt={name}
                  width={160}
                  height={160}
                  className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Pokemon Name */}
              <h3 className={`text-center font-bold text-gray-800 uppercase tracking-wide mb-3 ${name.length > 10 ? 'text-sm' : 'text-lg'
                }`}>
                {name}
              </h3>

              {/* Type badges with improved styling */}
              <div className="flex gap-2 flex-wrap justify-center">
                {types.map((type, idx) => (
                  <div
                    key={idx}
                    className="relative group/type"
                  >
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full shadow-sm transition-all duration-200 hover:shadow-md"
                      style={{
                        backgroundColor: typeColors[type.type.name] || '#A8A878',
                      }}
                    >
                      <Image
                        src={typeImages[type.type.name] || '/types/default.png'}
                        alt={type.type.name}
                        width={16}
                        height={16}
                        quality={100}
                        unoptimized
                        className="w-6 h-6 object-contain"
                        loading="lazy"
                      />
                      <span className="text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)] text-xs font-semibold uppercase tracking-wider">
                        {type.type.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center gap-4 py-8'>
              <div className="relative md:w-36 md:h-36 w-28 h-28 md:mx-auto">
                <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-30">
                  <div className="md:w-36 md:h-36 w-28 h-28 rounded-full relative flex justify-center items-center">
                    <div className="md:w-32 md:h-32 w-24 h-24 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
                      <div className="absolute w-full h-full flex items-center justify-center">
                        <div className="absolute w-full h-[2px] bg-gray-400"></div>
                        <div className="absolute w-12 h-12 rounded-full border-4 border-gray-400 bg-white flex justify-center items-center">
                          <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className='text-gray-600 text-center mt-4 text-sm font-semibold'>Loading...</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-100 via-transparent to-transparent opacity-30 pointer-events-none" />
    </div>
  );
};

export default PokemonCard;