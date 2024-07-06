import React from 'react';
import Image from 'next/image';

// Define the Move interface with additional properties
interface Move {
  move: {
    name: string;
    method: 'level-up' | 'egg' | 'tm'; // Method of learning the move
    type: 'physical' | 'special' | 'status'; // Type of the move
    level?: number; // Level at which the move is learned (optional, only for level-up moves)
  };
}

// Interface for MovesSectionProps
interface MovesSectionProps {
  moves: Move[];
}

// Images for move types
const moveTypeImages: { [key: string]: string } = {
  physical: '/moves/physical.png',
  special: '/moves/special.png',
  status: '/moves/status.png',
};

// MovesSection component
const MovesSection: React.FC<MovesSectionProps> = ({ moves }) => {
  // Function to render move with icon
  const renderMove = (move: Move, index: number) => (
    <tr key={index} className="border-b border-gray-200">
      <td className="py-2 px-4 capitalize text-gray-800">{move.move.name}</td>
      <td className="py-2 px-4">
        {move.move.level !== undefined ? `${move.move.level}` : ''}
      </td>
      <td className="py-2 px-4">
        <Image
          src={moveTypeImages[move.move.type] || '/types/default.png'} // Fallback image
          alt={move.move.type}
          width={24}
          height={24}
          className="inline-block"
        />
      </td>
    </tr>
  );

  const renderTable = (title: string, filteredMoves: Move[]) => (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
      <div className="overflow-x-auto text-black">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left">Move</th>
              {
                title === 'Level-Up Moves' ? <th className="py-2 px-4 bg-gray-100 text-left">Level</th> : ""
              }
              <th className="py-2 px-4 bg-gray-100 text-right">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredMoves.map(renderMove)}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Sort level-up moves by level
  const sortedLevelUpMoves = moves
    .filter(move => move.move.method === 'level-up')
    .sort((a, b) => (a.move.level ?? 0) - (b.move.level ?? 0));

  return (
    <div>
      <div className="mt-4 flex justify-center gap-12">
        {renderTable('Level-Up Moves', sortedLevelUpMoves)}
        {renderTable('Egg Moves', moves.filter(move => move.move.method === 'egg'))}
        {renderTable('TM Moves', moves.filter(move => move.move.method === 'tm'))}
      </div>
    </div>
  );
};

export default MovesSection;
