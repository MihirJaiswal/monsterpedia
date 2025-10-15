'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

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
  pokemonName: string;
}

interface RawMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: string;
    };
  }[];
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

const BATCH_SIZE = 10;

const MovesSection: React.FC<MovesSectionProps> = ({ moves: initialMoves, pokemonName }) => {
  const [allMoves, setAllMoves] = useState<Move[]>(initialMoves);
  const [allRawMoves, setAllRawMoves] = useState<RawMove[]>([]);
  const [loadingMore, setLoadingMore] = useState<{[key: string]: boolean}>({
    'level-up': false,
    'egg': false,
    'machine': false,
  });

  useEffect(() => {
    fetchAllRawMoves();
  }, []);

  const fetchAllRawMoves = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setAllRawMoves(response.data.moves);
    } catch (error) {
      console.error('Error fetching moves:', error);
    }
  };

  const fetchMoveDetails = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching move details:', error);
      return null;
    }
  };

  const loadMoreMoves = async (method: 'level-up' | 'egg' | 'machine') => {
    setLoadingMore(prev => ({ ...prev, [method]: true }));
    try {
      // Filter raw moves by method
      const methodRawMoves = allRawMoves.filter(
        m => m.version_group_details[0]?.move_learn_method.name === method
      );

      // Get currently loaded moves of this method
      const currentMethodMoves = allMoves.filter(m => m.move.method === method);
      
      // Get next batch
      const nextBatch = methodRawMoves.slice(
        currentMethodMoves.length,
        currentMethodMoves.length + BATCH_SIZE
      );

      if (nextBatch.length === 0) {
        setLoadingMore(prev => ({ ...prev, [method]: false }));
        return;
      }

      // Fetch details for the batch
      const moveDetailsPromises = nextBatch.map(async (moveEntry): Promise<Move | null> => {
        const moveDetails = await fetchMoveDetails(moveEntry.move.url);
        if (!moveDetails) return null;

        const level = moveEntry.version_group_details[0]?.level_learned_at;

        return {
          move: {
            name: moveEntry.move.name,
            method: method,
            type: moveDetails.damage_class.name as 'physical' | 'special' | 'status',
            moveType: moveDetails.type.name as string,
            ...(method === 'level-up' && level !== undefined ? { level } : {}),
          },
        } as Move;
      });

      const resolvedMoves = await Promise.all(moveDetailsPromises);
      const newMoves = resolvedMoves.filter((move): move is Move => move !== null);

      setAllMoves(prev => [...prev, ...newMoves]);
    } catch (error) {
      console.error('Error loading more moves:', error);
    } finally {
      setLoadingMore(prev => ({ ...prev, [method]: false }));
    }
  };

  const getHasMore = (method: 'level-up' | 'egg' | 'machine') => {
    const totalMethodMoves = allRawMoves.filter(
      m => m.version_group_details[0]?.move_learn_method.name === method
    ).length;
    const currentMethodMoves = allMoves.filter(m => m.move.method === method).length;
    return currentMethodMoves < totalMethodMoves;
  };

  const renderTable = (
    title: string, 
    filteredMoves: Move[], 
    showLevel: boolean = false,
    method: 'level-up' | 'egg' | 'machine'
  ) => {
    const hasMore = getHasMore(method);
    const isLoading = loadingMore[method];

    return (
      <div className="flex flex-col h-full">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 border-b-2 border-gray-200 pb-2">
          <h3 className="text-2xl font-semibold text-gray-800 p-4">
            {title} <span className="text-lg text-gray-600">({filteredMoves.length})</span>
          </h3>
        </div>
        
        <div className="overflow-x-auto flex-1">
          {filteredMoves.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No moves available</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="sticky top-[0px] bg-gradient-to-b from-gray-100 to-gray-50 z-10 shadow-sm">
                <tr>
                  <th className="py-3 px-4 text-left font-bold text-gray-700 border-b-2 border-gray-300">
                    Move
                  </th>
                  {showLevel && (
                    <th className="py-3 px-4 text-center font-bold text-gray-700 border-b-2 border-gray-300">
                      Level
                    </th>
                  )}
                  <th className="py-3 px-4 text-center font-bold text-gray-700 border-b-2 border-gray-300">
                    Category
                  </th>
                  <th className="py-3 px-4 text-center font-bold text-gray-700 border-b-2 border-gray-300">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMoves.map((move, idx) => (
                  <tr 
                    key={`${move.move.name}-${idx}`} 
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="py-3 px-4 capitalize text-gray-900 font-medium">
                      {move.move.name.replace(/-/g, ' ')}
                    </td>
                    {showLevel && (
                      <td className="py-3 px-4 text-center font-bold text-blue-600">
                        {move.move.level ?? '-'}
                      </td>
                    )}
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <Image
                          src={moveCategoryImages[move.move.type] || '/types/default.png'} 
                          alt={move.move.type}
                          width={32}
                          height={32}
                          className="inline-block"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <Image
                          src={moveTypeImages[move.move.moveType] || '/types/default.png'} 
                          alt={move.move.moveType}
                          width={32}
                          height={32}
                          className="inline-block"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {hasMore && (
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t-2 border-gray-200 p-4">
            <button
              onClick={() => loadMoreMoves(method)}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    );
  };

  const sortedLevelUpMoves = allMoves
    .filter(move => move.move.method === 'level-up')
    .sort((a, b) => (a.move.level ?? 0) - (b.move.level ?? 0));

  const eggMoves = allMoves.filter(move => move.move.method === 'egg');
  const tmMoves = allMoves.filter(move => move.move.method === 'machine');

  return (
    <div className='mt-8'>
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        <div className="flex-1 max-h-[85vh] overflow-y-auto bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-2 border-gray-300 shadow-xl">
          {renderTable('Level-Up Moves', sortedLevelUpMoves, true, 'level-up')}
        </div>
        <div className="flex-1 max-h-[85vh] overflow-y-auto bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-2 border-gray-300 shadow-xl">
          {renderTable('Egg Moves', eggMoves, false, 'egg')}
        </div>
        <div className="flex-1 max-h-[85vh] overflow-y-auto bg-white rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border-2 border-gray-300 shadow-xl">
          {renderTable('TM Moves', tmMoves, false, 'machine')}
        </div>
      </div>
    </div>
  );
};

export default MovesSection;