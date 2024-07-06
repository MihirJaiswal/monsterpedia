import React from 'react';
import Link from 'next/link';

interface Evolution {
  species_name: string;
  min_level: number | null;
  trigger_name: string;
  item: string | null;
  image_url: string;  // Add image URL to the interface
}

interface EvolutionProps {
  evolution: Evolution[];
}

const Evolution: React.FC<EvolutionProps> = ({ evolution }) => {
  if (!evolution || evolution.length === 0) {
    return <p className="text-center text-gray-800">No evolution data available</p>;
  }

  return (
    <div className="mt-12 text-center">
      <ul className="space-y-6 flex justify-between items-center gap-44">
        {evolution.map((evo, index) => (
          <li key={index} className="flex items-center justify-center space-x-4 capitalize text-lg text-gray-800">
            <Link href={`/pokemon/${evo.species_name}`} passHref>
              <div className="flex flex-col items-center space-x-4">
              <div className="relative w-48 h-auto mx-auto mb-4">
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
                  src={evo.image_url}
                  alt={evo.species_name}
                  className="w-48 h-auto object-cover rounded-lg relative"
                />
              </div>
                
                <div>
                  <div className='font-bold'>{evo.species_name}</div>
                  {evo.min_level && <div>(Level: {evo.min_level})</div>}
                  {evo.item && <div>(Item: {evo.item})</div>}
                  {evo.trigger_name && <div>- {evo.trigger_name}</div>}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Evolution;
