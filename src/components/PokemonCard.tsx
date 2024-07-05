import Link from 'next/link';

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

  return (
    <Link href={`/pokemon/${index + 1}`}>
      <div className="relative h-full w-full py-4 px-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
        {spriteUrl ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 mx-auto mb-4">
                <div className="absolute inset-0 flex justify-center items-center z-0 bg-card rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
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
                  src={spriteUrl} 
                  alt={name} 
                  className="w-32 h-32 object-cover object-center relative"
                />
              </div>
              <p 
                className={`text-center font-bold text-[#011434] uppercase ${
                    name.length > 8 ? 'text-sm' : 'text-base'
                }`}
                >
                {name}
                </p>
              <div className="flex gap-2 mt-2">
                {types.map((type, idx) => (
                  <img
                    key={idx}
                    src={typeImages[type.type.name] || '/types/default.png'} // Fallback image
                    alt={type.type.name}
                    className="w-8 h-8 object-cover"
                    title={type.type.name}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-lg font-semibold text-gray-500">Loading...</p>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-500 to-transparent opacity-20 pointer-events-none" />
      </div>
    </Link>
  );
};

export default PokemonCard;
