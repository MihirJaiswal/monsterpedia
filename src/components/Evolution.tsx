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
      <h2 className="text-3xl font-bold mb-4 text-gray-950">Evolution Line</h2>
      <ul className="space-y-6">
        {evolution.map((evo, index) => (
          <li key={index} className="flex items-center justify-center space-x-4 capitalize text-lg text-gray-800">
            <Link href={`/pokemon/${evo.species_name}`} passHref>
              <div className="flex items-center space-x-4">
                <img
                  src={evo.image_url}
                  alt={evo.species_name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <div>{evo.species_name}</div>
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
