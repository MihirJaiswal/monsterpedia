import React from 'react';
import Image from 'next/image';

interface Move {
  move: {
    name: string;
    method: 'level-up' | 'egg' | 'machine'; 
    type: 'physical' | 'special' | 'status';
    level?: number;
    moveType: string;
  };
}

interface MovesSectionProps {
  moves: Move[];
}

const moveCategoryImages: { [key: string]: string } = {
  physical: '/moves/physical.png',
  special: '/moves/special.png',
  status: '/moves/status.png',
};

const moveTypeImages: { [key: string]: string } = {
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
  default: '/types/default.png',
};

const MovesSection: React.FC<MovesSectionProps> = ({ moves }) => {
   const renderMove = (move: Move, index: number) => (
    <tr key={index} className="border-b border-gray-200">
      <td className="py-2 px-4 capitalize text-gray-900">{move.move.name}</td>
      {move.move.method === 'level-up' && (
        <td className="py-2 px-4">{move.move.level}</td>
      )}
      <td className="py-2 px-4">
        <Image
          src={moveCategoryImages[move.move.type] || '/types/default.png'} 
          alt={move.move.type}
          width={24}
          height={24}
          className="inline-block"
        />
      </td>
      <td className="py-2 px-4">
        <Image
          src={moveTypeImages[move.move.moveType] || '/types/default.png'} 
          alt={move.move.moveType}
          width={24}
          height={24}
          className="inline-block"
        />
      </td>
    </tr>
  );

  const renderTable = (title: string, filteredMoves: Move[]) => (
    <div className="flex flex-col">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800 p-4">{title}</h3>
      <div className="overflow-x-auto text-black">
        {filteredMoves.length === 0 ? (
          <p className="text-center text-gray-600 py-4">No moves available</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-100 text-left">Move</th>
                <th className={`py-2 px-4 bg-gray-100 text-left ${title === 'Level-Up Moves' ? 'block' : 'hidden'}`}>
                  Level
                </th>
                <th className="py-2 px-4 bg-gray-100 text-center">Cat.</th>
                <th className="py-2 px-4 bg-gray-100 text-center">Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredMoves.map(renderMove)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const sortedLevelUpMoves = moves
    .filter(move => move.move.method === 'level-up')
    .sort((a, b) => (a.move.level ?? 0) - (b.move.level ?? 0));

  return (
    <div className='mt-8'>
      <div className="flex flex-col md:flex-row justify-center gap-12">
        <div className="flex-1 max-h-[85vh] overflow-y-auto bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 p-4">
          {renderTable('Level-Up Moves', sortedLevelUpMoves)}
        </div>
        <div className="flex-1 max-h-[85vh] overflow-y-auto p-4 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
          {renderTable('Egg Moves', moves.filter(move => move.move.method === 'egg'))}
        </div>
        <div className="flex-1 max-h-[85vh] overflow-y-auto p-4 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
          {renderTable('TM Moves', moves.filter(move => move.move.method === 'machine'))}
        </div>
      </div>
    </div>
  );
};

export default MovesSection;
