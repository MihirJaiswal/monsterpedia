// MovesSection.tsx
import React from 'react';

interface Move {
  move: {
    name: string;
  };
}

interface MovesSectionProps {
  moves: Move[];
}

const MovesSection: React.FC<MovesSectionProps> = ({ moves }) => {
  return (
    <div className="mt-12 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-950">Moves</h2>
      <ul className="space-y-2">
        {moves.map((move, index) => (
          <li key={index} className="capitalize text-lg text-gray-800">
            {move.move.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovesSection;
