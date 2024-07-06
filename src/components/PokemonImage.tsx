'use client';

import { useState } from 'react';
import { FaBullseye } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';

interface PokemonImageProps {
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string; // Add shiny sprite from official artwork
      };
    };
  };
  name: string;
}

const PokemonImage = ({ sprites, name }: PokemonImageProps) => {
  const [isShiny, setIsShiny] = useState(false);

  const toggleShiny = () => setIsShiny(!isShiny);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-52 h-52 mx-auto mb-4">
        <div className="absolute inset-0 flex justify-center border-2 border-gray-300 items-center z-0 bg-card2 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
          <div className="w-36 h-36 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
            <div className="w-32 h-32 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-[2px] bg-white transform rotate-45 left-2"></div>
                <div className="absolute w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"></div>
                <div className="absolute w-full h-[2px] bg-white transform rotate-45 right-2"></div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={isShiny ? sprites.other['official-artwork'].front_shiny : sprites.other['official-artwork'].front_default}
          alt={name}
          className={`w-52 h-52 object-cover object-center relative transition-transform duration-500`}
        />
      </div>
      <div className="flex justify-center ">
        <button
          onClick={toggleShiny}
          className="text-white border border-white p-2 rounded-lg flex items-center gap-2 mb-6"
        >
           {
            isShiny ? 'Original'  : 'Shiny'
         }
        {
          isShiny ? <FaBullseye/> : <FaStar />
        } 
        </button>
      </div>
    </div>
  );
};

export default PokemonImage;
