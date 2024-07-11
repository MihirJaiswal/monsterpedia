import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

interface PokemonCardProps {
  pokemon: Pokemon;
  onRemove: (id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onRemove }) => {
  return (
    <div className="rounded-lg shadow-lg p-4 flex flex-col items-center w-60 mx-auto bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 relative">
      <div className="w-32 h-32 absolute left-12 top-4 inset-0 flex justify-center border-2 border-gray-300 items-center z-0 bg-card2 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
        <div className="w-32 h-32 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-[2px] bg-white transform rotate-45 left-2"></div>
            <div className="absolute w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"></div>
            <div className="absolute w-full h-[2px] bg-white transform rotate-45 right-2"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="mb-2 w-32 h-32 object-cover"
        />
        <h3 className="text-lg font-semibold mb-2 text-center">{pokemon.name}</h3>
        <div className="flex flex-wrap gap-2 mb-2 justify-center">
          {pokemon.types.map((type) => (
            <div key={type} className="flex items-center space-x-1">
              <img
                src={`/types/${type}.png`} 
                alt={type}
                className="w-6 h-6"
              />
              <span className="text-sm font-medium capitalize">{type}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => onRemove(pokemon.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition border border-gray-500 duration-200 m-4"
        >
          
          <span className='flex items-center justify-center gap-2'><FaTimes/> Remove</span>
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
