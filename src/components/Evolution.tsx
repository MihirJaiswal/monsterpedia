import React, { useState } from 'react';
import Image from 'next/image';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import gif from '../../public/pokeball-loader.gif';

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
  image_url: string; // URL of the Pokémon's image
  types?: PokemonType[]; // Optional Pokémon types
}

// Define the EvolutionProps interface
interface EvolutionProps {
  evolution: Evolution[]; // Array of evolution objects
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

// Define the item images map
const itemImages: { [key: string]: string } = {
  "auspicious-armor": '/items/auspicious-armor.png',
  "berry-sweet": '/items/berrysweet.png',
  "black-augurite": '/items/black-augurite.png',
  "chipped-pot": '/items/chipped-pot.png',
  "clover-sweet": '/items/clover-sweet.png',
  "cracked-pot": '/items/cracked-pot.png',
  "dawn-stone": '/items/dawnstone.png',
  "deep-sea-scale": '/items/deepsea-scale.png',
  "deep-sea-tooth": '/items/deepsea-tooth.png',
  "dragon-scale": '/items/dragonscale.png',
  "dubious-disc": '/items/dubiousdisc.png',
  "dusk-stone": '/items/duskstone.png',
  "electirizer": '/items/electirizer.png',
  "fire-stone": '/items/firestone.png',
  "flower-sweet": '/items/flowersweet.png',
  "galarica-cuff": '/items/galarica-cuff.png',
  "galarica-wreath": '/items/galarica-wreath.png',
  "ice-stone": '/items/icestone.png',
  "king-s-rock": '/items/kingsrock.png',
  "leaders-crest": '/items/leaders-crest.png',
  "leaf-stone": '/items/leafstone.png',
  "linking-cord": '/items/linkingcord.png',
  "love-sweet": '/items/lovesweet.png',
  "magmarizer": '/items/magmarizer.png',
  "malicious-armor": '/items/malicious-armor.png',
  "masterpiece-teacup": '/items/masterpiece-teacup.png',
  "metal-alloy": '/items/metal-alloy.png',
  "metal-coat": '/items/metalcoat.png',
  "moon-stone": '/items/moonstone.png',
  "oval-stone": '/items/ovalstone.png',
  "peat-block": '/items/peatblock.png',
  "prism-scale": '/items/prismscale.png',
  "protector": '/items/protector.png',
  "razor-claw": '/items/razorclaw.png',
  "razor-fang": '/items/razorfang.png',
  "reaper-cloth": '/items/reapercloth.png',
  "ribbon-sweet": '/items/ribbonsweet.png',
  "sachet": '/items/sachet.png',
  "scroll-of-darkness": '/items/scrollofdarkness.png',
  "scroll-of-waters": '/items/scrollofwaters.png',
  "shiny-stone": '/items/shinystone.png',
  "star-sweet": '/items/starsweet.png',
  "strawberry-sweet": '/items/strawberrysweet.png',
  "sun-stone": '/items/sunstone.png',
  "sweet-apple": '/items/sweetapple.png',
  "syrupy-apple": '/items/syrupyapple.png',
  "tart-apple": '/items/tartapple.png',
  "thunder-stone": '/items/thunderstone.png',
  "unremarkable-teacup": '/items/unremarkableteacup.png',
  "upgrade": '/items/upgrade.png',
  "water-stone": '/items/waterstone.png',
  "whipped-dream": '/items/whippeddream.png',
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

  const displayedPokemon = new Set();
  const rows: JSX.Element[][] = [[]];

  evolution.forEach((evo, index) => {
    const isRepeated = displayedPokemon.has(evo.species_name);
    displayedPokemon.add(evo.species_name);

    const evolutionItem = (
      <React.Fragment key={index}>
        {rows[rows.length - 1].length > 0 && !isRepeated && (
          <div className="flex flex-col items-center mx-4">
            <div className="text-center mb-2">
              {evo.min_level !== null && <div>
                <Image
                  src='/items/rarecandy.png'
                  alt="rarecandy"
                  width={48}
                  height={48}
                  className="mx-auto mb-1"
                />
                (Level: {evo.min_level})
                </div>}
              {evo.item && (
              <div className="text-center">
                
                <Image
                  src={itemImages[evo.item.toLowerCase()]} // Direct path and fallback
                  alt={evo.item}
                  width={96}
                  height={96}
                  quality={100}
                  className="w-12 h-12 mx-auto mb-1"
                />
                <div>{evo.item}</div>
              </div>
              )}

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
          className={`flex flex-col items-center text-center py-4 px-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 mx-4 cursor-pointer ${isRepeated ? 'mt-4 md:mt-0' : ''}`}
          onClick={(event) => handleClick(evo.species_name, evo.image_url, event)}
        >
          <div className="relative w-48 h-auto mb-4">
            {isNavigating && currentImageUrl === evo.image_url ? (
              <div className="flex flex-col items-center justify-center gap-4">
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
            <div className="font-bold">{evo.species_name}</div>
          </div>
          {/* Render type images if available */}
          {evo.types && (
            <div className="flex gap-2 mt-2">
              {evo.types.map((type, idx) => (
                <Image
                  key={idx}
                  width={20}
                  height={20}
                  src={typeImages[type.type.name] || '/types/default.png'} // Fallback image
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
    );

    if (isRepeated) {
      rows.push([evolutionItem]);
    } else {
      rows[rows.length - 1].push(evolutionItem);
    }
  });

  return (
    <div className="mt-12">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap md:flex-nowrap items-center justify-center gap-4 mb-8">
          {row}
        </div>
      ))}
    </div>
  );
};

export default Evolution;
