'use client';
import { useState, useEffect, useCallback } from 'react';
import PokemonCard from './PokemonCard';
import ShimmerCard from './ShimmerCard';
import {
  FaSearch, FaLeaf, FaFire, FaTint, FaBolt, FaSnowflake, FaFistRaised,
  FaSkullCrossbones, FaMountain, FaFeather, FaBrain, FaBug, FaGem,
  FaGhost, FaDragon, FaMoon, FaCog, FaStar, FaBullseye
} from 'react-icons/fa';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
}

type PokemonTypeName = 'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice' |
  'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' |
  'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy';

const generations = [
  { name: 'Generation 1', limit: 151, offset: 0 },
  { name: 'Generation 2', limit: 100, offset: 151 },
  { name: 'Generation 3', limit: 135, offset: 251 },
  { name: 'Generation 4', limit: 107, offset: 386 },
  { name: 'Generation 5', limit: 156, offset: 493 },
  { name: 'Generation 6', limit: 72, offset: 649 },
  { name: 'Generation 7', limit: 88, offset: 721 },
  { name: 'Generation 8', limit: 96, offset: 809 },
  { name: 'Generation 9', limit: 103, offset: 905 },
];

const types: PokemonTypeName[] = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark',
  'steel', 'fairy'
];

const typeIcons: Record<PokemonTypeName, JSX.Element | null> = {
  normal: <FaBullseye/>,
  fire: <FaFire />,
  water: <FaTint />,
  grass: <FaLeaf />,
  electric: <FaBolt />,
  ice: <FaSnowflake />,
  fighting: <FaFistRaised />,
  poison: <FaSkullCrossbones />,
  ground: <FaMountain />,
  flying: <FaFeather />,
  psychic: <FaBrain />,
  bug: <FaBug />,
  rock: <FaGem />,
  ghost: <FaGhost />,
  dragon: <FaDragon />,
  dark: <FaMoon />,
  steel: <FaCog />,
  fairy: <FaStar />
};

const typeGradients: Record<PokemonTypeName, string> = {
  normal: 'bg-gradient-to-r from-gray-400 to-gray-600',
  fire: 'bg-gradient-to-r from-orange-400 to-red-600',
  water: 'bg-gradient-to-r from-blue-400 to-blue-600',
  grass: 'bg-gradient-to-r from-green-400 to-green-600',
  electric: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
  ice: 'bg-gradient-to-r from-cyan-400 to-blue-400',
  fighting: 'bg-gradient-to-r from-red-600 to-red-800',
  poison: 'bg-gradient-to-r from-purple-400 to-purple-600',
  ground: 'bg-gradient-to-r from-yellow-600 to-brown-600',
  flying: 'bg-gradient-to-r from-blue-300 to-blue-500',
  psychic: 'bg-gradient-to-r from-pink-400 to-pink-600',
  bug: 'bg-gradient-to-r from-green-600 to-green-800',
  rock: 'bg-gradient-to-r from-yellow-700 to-brown-700',
  ghost: 'bg-gradient-to-r from-purple-600 to-purple-800',
  dragon: 'bg-gradient-to-r from-purple-500 to-blue-500',
  dark: 'bg-gradient-to-r from-gray-700 to-black',
  steel: 'bg-gradient-to-r from-gray-500 to-gray-700',
  fairy: 'bg-gradient-to-r from-pink-300 to-pink-500'
};

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetail }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayedCount, setDisplayedCount] = useState<number>(30);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<PokemonTypeName | ''>('');
  const [filterLoading, setFilterLoading] = useState<boolean>(false); // New state for filter loading

  const fetchPokemonDetailsInBatches = useCallback(async (pokemons: Pokemon[], batchSize: number) => {
    let detailsMap: { [key: string]: PokemonDetail } = {};

    for (let i = 0; i < pokemons.length; i += batchSize) {
      const batch = pokemons.slice(i, i + batchSize);
      const detailsPromises = batch.map(async (pokemon: Pokemon) => {
        try {
          const detailResponse = await fetch(pokemon.url);
          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch details for ${pokemon.name}: ${detailResponse.statusText}`);
          }
          const detail = await detailResponse.json();
          return detail;
        } catch (error) {
          console.error(error);
          return null;
        }
      });

      const details = await Promise.all(detailsPromises);
      details.forEach((detail) => {
        if (detail) {
          detailsMap[detail.name] = detail;
        }
      });

      setPokemonDetails((prevDetails) => ({ ...prevDetails, ...detailsMap }));
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let allPokemons: Pokemon[] = [];
        let totalFetched = 0;
        const batchSize = 100;

        while (totalFetched < 1025) {
          const listResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${batchSize}&offset=${totalFetched}`); 
          allPokemons = allPokemons.concat(listResponse.data.results);
          totalFetched += batchSize;
        }

        setPokemonList(allPokemons);
        await fetchPokemonDetailsInBatches(allPokemons, 20);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fetchPokemonDetailsInBatches]);

  useEffect(() => {
    setFilterLoading(true);
    const timeoutId = setTimeout(() => {
      setFilterLoading(false);
    }, 500); 

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const filteredPokemonList = pokemonList
    .filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(pokemon => {
      if (!selectedType) return true;
      const detail = pokemonDetails[pokemon.name];
      return detail?.types.some(type => type.type.name === selectedType);
    })
    .filter(pokemon => {
      if (selectedGeneration === null) return true;
      const { offset, limit } = generations[selectedGeneration];
      const index = pokemonList.findIndex(p => p.name === pokemon.name);
      return index >= offset && index < offset + limit;
    });

  const displayedPokemonList = filteredPokemonList.slice(0, displayedCount);

  const loadMorePokemons = () => {
    setDisplayedCount(prevCount => prevCount + 30);
  };

  const hasMorePokemons = displayedCount < filteredPokemonList.length;

  const handleFilterChange = (type: PokemonTypeName | '', generation: number | null) => {
    setFilterLoading(true); 
    setSelectedType(type);
    setSelectedGeneration(generation);
    setTimeout(() => {
      setFilterLoading(false); 
    }, 1000); 
  };

  return (
    <div className="relative p-6 min-h-screen mt-16">
      <div className="relative mb-6 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
        <div className="relative w-full max-w-5xl ">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full text-black bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-3 pl-10 rounded-full border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
        </div>
        <div className='flex gap-6'>
          <div className="relative w-40 md:w-56 max-w-1/2">
            <select
              className="w-full text-black p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedGeneration === null ? 'all' : selectedGeneration}
              onChange={(e) => handleFilterChange(selectedType, e.target.value === 'all' ? null : parseInt(e.target.value))}
            >
              <option value="all">All Generations</option>
              {generations.map((gen, index) => (
                <option key={index} value={index}>{gen.name}</option>
              ))}
            </select>
          </div>
          <div className="relative flex flex-col items-center md:hidden">
            <select
              className="w-full text-black p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedType}
              onChange={(e) => handleFilterChange(e.target.value as PokemonTypeName | '', selectedGeneration)}
            >
              <option value="">All Types</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="relative hidden px-24 md:grid grid-cols-9 justify-center gap-4 mb-6">
        {types.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg shadow-md border border-black transition duration-300 flex items-center gap-2 ${selectedType === type ? `${typeGradients[type]} text-white` : 'bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border border-gray-100 text-black'}`}
            onClick={() => handleFilterChange(type === selectedType ? '' : type, selectedGeneration)}
          >
            {typeIcons[type]}
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </button>
        ))}
      </div>

      <div className="relative grid grid-cols-2 gap-6 md:grid-cols-6 md:gap-6 py-10 mb-6 md:px-24">
        {loading ||filterLoading ? (
          Array.from({ length: displayedCount }).map((_, index) => (
            <ShimmerCard key={index} />
          ))
        ) : (
          displayedPokemonList.map((p, index) => {
            const pokemonDetail = pokemonDetails[p.name];
            return (
              <PokemonCard
                key={index}
                name={p.name}
                spriteUrl={pokemonDetail?.sprites.other['official-artwork'].front_default}
                types={pokemonDetail?.types}
                index={index}
              />
            );
          })
        )}
      </div>
      {hasMorePokemons && (
        <div className="relative text-center">
          <button
            onClick={loadMorePokemons}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
