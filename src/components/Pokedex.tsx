import React from 'react';
import Image from 'next/image';
import img from '../../public/pokedex.png';
import { FaWeight, FaRuler, FaStar } from 'react-icons/fa';

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
      {/* Desktop Version */}
      <div className="relative hidden md:block">
        <Image
          src={img}
          alt="PokeDex"
          width={600}
          height={600}
          quality={100}
          loading="lazy"
          className="md:w-[32rem] h-auto mx-auto mb-4 rounded-lg"
        />
        <div className="absolute md:top-20 md:left-52 flex flex-col items-center">
          <div className="p-4">
            <img
              src={spriteUrl}
              alt={name}
              className="md:w-32 md:h-32 w-24 h-24 mx-auto rounded-lg"
            />
          </div>
          <div className="md:mt-28">
            <ul className="text-left space-y-3 mb-4 text-black font-semibold p-4 text-sm">
              <h1 className="md:text-lg text-xs font-bold text-center mb-3 text-gray-800 capitalize">{name}</h1>
              <li className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-full">
                  <FaRuler className="w-4 h-4" />
                </span>
                <span>
                  <strong className="font-semibold text-gray-700">Height:</strong> {height / 10} m
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 text-green-600 bg-green-100 rounded-full">
                  <FaWeight className="w-4 h-4" />
                </span>
                <span>
                  <strong className="font-semibold text-gray-700">Weight:</strong> {weight / 10} kg
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="flex items-center justify-center w-6 h-6 text-yellow-600 bg-yellow-100 rounded-full">
                  <FaStar className="w-4 h-4" />
                </span>
                <span>
                  <strong className="font-semibold text-gray-700">Base Experience:</strong> {base_experience}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden px-12 py-10 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 rounded-lg shadow-xl max-w-xs mx-auto my-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100"></div>
        <div className="flex justify-center items-center">
          <Image
            src={spriteUrl}
            alt={name}
            width={120}
            height={120}
            quality={100}
            loading="lazy"
            className="w-32 h-32"
          />
        </div>
        <div className="text-center mt-4">
          <h1 className="text-3xl md:text-2xl font-bold text-gray-900 capitalize">{name}</h1>
          <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-800">
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-6 h-6 text-blue-600 bg-blue-100 rounded-full">
                <FaRuler className="w-4 h-4" />
              </span>
              <span>
                <strong className="font-semibold text-gray-700">Height:</strong> {height / 10} m
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-6 h-6 text-green-600 bg-green-100 rounded-full">
                <FaWeight className="w-4 h-4" />
              </span>
              <span>
                <strong className="font-semibold text-gray-700">Weight:</strong> {weight / 10} kg
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-6 h-6 text-yellow-600 bg-yellow-100 rounded-full">
                <FaStar className="w-4 h-4" />
              </span>
              <span>
                <strong className="font-semibold text-gray-700">Base Experience:</strong> {base_experience}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
