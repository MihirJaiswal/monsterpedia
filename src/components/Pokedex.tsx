import React from 'react';
import Image from 'next/image';
import img from '../../public/pokedex.png';

interface PokemonProps {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  spriteUrl: string;
}

const Pokedex: React.FC<PokemonProps> = ({ name, height, weight, base_experience, spriteUrl }) => {
  return (
    <div>
      <div className="relative">
        <Image
          src={img}
          alt="PokeDex"
          width={600}
          height={600}
          quality={100}
          loading="lazy"
          className="w-[38rem] h-auto mx-auto mb-4 rounded-lg"
        />
        <div className="absolute top-12 left-20 md:top-28 md:left-[17rem] flex flex-col items-center">
          <div className="p-4">
            <img
              src={spriteUrl}
              alt={name}
              className="w-32 h-32 mx-auto rounded-lg"
            />
          </div>
          <div className="md:mt-44">
            <ul className="text-left space-y-2 mb-4 text-black font-extrabold p-4">
              <h1 className="text-lg font-extrabold text-center mb-4 text-gray-800 capitalize underline">{name}</h1>
              <li><strong className="font-semibold text-gray-700">Height:</strong> {height / 10} m</li>
              <li><strong className="font-semibold text-gray-700">Weight:</strong> {weight / 10} kg</li>
              <li><strong className="font-semibold text-gray-700">Base Experience:</strong> {base_experience}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
