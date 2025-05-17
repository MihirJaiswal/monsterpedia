'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  FaSearch, FaLeaf, FaFire, FaTint, FaBolt, FaSnowflake, FaFistRaised,
  FaSkullCrossbones, FaMountain, FaFeather, FaBrain, FaBug, FaGem,
  FaGhost, FaDragon, FaMoon, FaCog, FaStar, FaBullseye
} from 'react-icons/fa';
import PokemonCard from './PokemonCard';
import ShimmerCard from './ShimmerCard';

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

const dataCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000;

const Pokemon = () => {
  // State variables
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetail }>({});
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingPokemon, setLoadingPokemon] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayedCount, setDisplayedCount] = useState<number>(32);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<PokemonTypeName | ''>('');
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [currentlyDisplayedPokemons, setCurrentlyDisplayedPokemons] = useState<Pokemon[]>([]);
  const [totalFilteredCount, setTotalFilteredCount] = useState<number>(0);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState<boolean>(false);
  
  const isCacheValid = (key: string) => {
    const cacheEntry = dataCache.get(key);
    if (!cacheEntry) return false;
    return (Date.now() - cacheEntry.timestamp) < CACHE_DURATION;
  };

  const fetchWithCache = async (url: string, cacheKey: string) => {
    // Check cache first
    if (isCacheValid(cacheKey)) {
      return dataCache.get(cacheKey).data;
    }

    const res = await fetch(url, {
      next: { revalidate: CACHE_DURATION / 1000 } 
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch from ${url}`);
    }
    
    const data = await res.json();
    dataCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  };

  useEffect(() => {
    async function fetchAllPokemon() {
      try {
        setInitialLoading(true);
        const cacheKey = 'all-pokemon-list';
        
        if (isCacheValid(cacheKey)) {
          setPokemonList(dataCache.get(cacheKey).data);
          setInitialLoading(false);
          return;
        }
        
        const totalPokemon = 1025;
        const data = await fetchWithCache(
          `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemon}&offset=0`,
          cacheKey
        );
        
        const newList: Pokemon[] = new Array(totalPokemon).fill({ name: "", url: "" });
        data.results.forEach((pokemon: Pokemon, index: number) => {
          newList[index] = pokemon;
        });
        
        setPokemonList(newList);
        
        generations.forEach((gen, index) => {
          const genData = data.results.slice(gen.offset, gen.offset + gen.limit);
          dataCache.set(`generation-${index}`, {
            data: genData,
            timestamp: Date.now()
          });
        });
      } catch (error) {
        console.error("Error fetching all Pokemon:", error);
      } finally {
        setInitialLoading(false);
      }
    }

    fetchAllPokemon();
  }, []);

  const fetchPokemonDetails = useCallback(async (pokemonToFetch: Pokemon[]) => {
    if (pokemonToFetch.length === 0) return {};
    
    setLoadingPokemon(prev => {
      const newLoading = new Set(prev);
      pokemonToFetch.forEach(pokemon => newLoading.add(pokemon.name));
      return newLoading;
    });
    
    const priorityBatch = pokemonToFetch.slice(0, Math.min(30, pokemonToFetch.length));
    const remainingBatch = pokemonToFetch.slice(priorityBatch.length);
    
    const newDetails: { [key: string]: PokemonDetail } = {};
    const controllers: AbortController[] = [];
    
    try {
      const batchSize = 10;
      for (let i = 0; i < priorityBatch.length; i += batchSize) {
        const batch = priorityBatch.slice(i, i + batchSize);
        const promises = batch.map(pokemon => {
          const cacheKey = `pokemon-detail-${pokemon.name}`;
          if (isCacheValid(cacheKey)) {
            return Promise.resolve({
              name: pokemon.name,
              data: dataCache.get(cacheKey).data
            });
          }
          
          const controller = new AbortController();
          controllers.push(controller);
          
          return fetch(pokemon.url, { signal: controller.signal })
            .then(res => res.json())
            .then(data => {
              dataCache.set(cacheKey, {
                data,
                timestamp: Date.now()
              });
              return { name: pokemon.name, data };
            });
        });
        
        const results = await Promise.allSettled(promises);
        
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value?.data?.name) {
            newDetails[result.value.data.name] = result.value.data;
            setLoadingPokemon(prev => {
              const newLoading = new Set(prev);
              newLoading.delete(result.value.name);
              return newLoading;
            });
          }
        });
      }
      
      if (remainingBatch.length > 0) {
        setTimeout(() => {
          fetchRemainingDetails(remainingBatch);
        }, 100);
      }
    } catch (error:any) {
      if (error.name !== 'AbortError') {
        console.error("Error fetching Pokemon details:", error);
      }
    }
    
    return newDetails;
  }, []);
  
  const fetchRemainingDetails = async (pokemonList: Pokemon[]) => {
    const batchSize = 10;
    const newDetails: { [key: string]: PokemonDetail } = {};
    
    for (let i = 0; i < pokemonList.length; i += batchSize) {
      const batch = pokemonList.slice(i, i + batchSize);
      const promises = batch.map(pokemon => {
        const cacheKey = `pokemon-detail-${pokemon.name}`;
        if (isCacheValid(cacheKey)) {
          return Promise.resolve({
            name: pokemon.name,
            data: dataCache.get(cacheKey).data
          });
        }
        
        return fetch(pokemon.url)
          .then(res => res.json())
          .then(data => {
            dataCache.set(cacheKey, {
              data,
              timestamp: Date.now()
            });
            return { name: pokemon.name, data };
          });
      });
      
      try {
        const results = await Promise.allSettled(promises);
        
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value?.data?.name) {
            newDetails[result.value.data.name] = result.value.data;
            setLoadingPokemon(prev => {
              const newLoading = new Set(prev);
              newLoading.delete(result.value.name);
              return newLoading;
            });
          }
        });
        
        if (Object.keys(newDetails).length > 0) {
          setPokemonDetails(prev => ({...prev, ...newDetails}));
        }
      } catch (error) {
        console.error("Error fetching remaining Pokemon details:", error);
      }
    }
  };

  useEffect(() => {
    setShowNoResultsMessage(false);
    
    const performFiltering = async () => {
      setFilterLoading(true);
      
      try {
        let filtered = pokemonList.filter(pokemon => pokemon.name);
        
        if (searchTerm) {
          filtered = filtered.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        if (selectedGeneration !== null) {
          const { offset, limit } = generations[selectedGeneration];
          
          const cacheKey = `generation-${selectedGeneration}`;
          
          if (isCacheValid(cacheKey)) {
            const genPokemon = dataCache.get(cacheKey).data;
            filtered = genPokemon;
            
            if (searchTerm) {
              filtered = filtered.filter(pokemon => 
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
            }
          } else {
            filtered = filtered.filter(pokemon => {
              const position = pokemonList.findIndex(p => p.name === pokemon.name);
              return position >= offset && position < offset + limit;
            });
          }
        }
        
        setTotalFilteredCount(filtered.length);
        
        if (selectedType) {
          const needDetails = filtered.filter(pokemon => !pokemonDetails[pokemon.name]);
          
          if (needDetails.length > 0) {
            const visiblePokemon = needDetails.slice(0, displayedCount + 20);
            const newDetails = await fetchPokemonDetails(visiblePokemon);
            
            if (Object.keys(newDetails).length > 0) {
              setPokemonDetails(prev => ({...prev, ...newDetails}));
            }
            
            const allDetails = {...pokemonDetails, ...newDetails};
            filtered = filtered.filter(pokemon => {
              const detail = allDetails[pokemon.name];
              return detail?.types?.some(type => type.type.name === selectedType);
            });
          } else {
            filtered = filtered.filter(pokemon => {
              const detail = pokemonDetails[pokemon.name];
              return detail?.types?.some(type => type.type.name === selectedType);
            });
          }
        }
        
        setCurrentlyDisplayedPokemons(filtered.slice(0, displayedCount));
        
        if (selectedType) {
          setTotalFilteredCount(filtered.length);
        }
        
        setTimeout(() => {
          if (filtered.length === 0) {
            setShowNoResultsMessage(true);
          }
        }, 2500);
      } catch (error) {
        console.error("Error applying filters:", error);
      } finally {
        setFilterLoading(false);
      }
    };
    
    const debounceTimer = setTimeout(performFiltering, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedType, selectedGeneration, displayedCount, pokemonList, pokemonDetails, fetchPokemonDetails]);

  useEffect(() => {
    async function fetchDetailsForDisplayed() {
      if (currentlyDisplayedPokemons.length === 0 || initialLoading) return;
      
      const pokemonToFetch = currentlyDisplayedPokemons.filter(
        pokemon => !pokemonDetails[pokemon.name]
      );
      
      if (pokemonToFetch.length === 0) return;
      
      try {
        const newDetails = await fetchPokemonDetails(pokemonToFetch);
        if (Object.keys(newDetails).length > 0) {
          setPokemonDetails(prev => ({...prev, ...newDetails}));
        }
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    }

    fetchDetailsForDisplayed();
  }, [currentlyDisplayedPokemons, pokemonDetails, initialLoading, fetchPokemonDetails]);

  const loadMorePokemons = () => {
    setDisplayedCount(prevCount => prevCount + 32);
  };

  const hasMoreToDisplay = currentlyDisplayedPokemons.length < totalFilteredCount;

  const handleFilterChange = (type: PokemonTypeName | '', generation: number | null) => {
    setFilterLoading(true);
    setShowNoResultsMessage(false);
    setSelectedType(type);
    setSelectedGeneration(generation);
    setDisplayedCount(30);
  };

  return (
    <div className="relative p-6 min-h-screen mt-16">
      <div className="relative mb-6 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6 mt-6">
        <div className="relative w-full max-w-5xl">
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
          <div className="relative flex flex-col items-center lg:hidden">
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
      <div className="relative hidden px-28 lg:grid grid-cols-9 justify-center gap-4 mb-6">
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

      <div className="relative grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 md:gap-6 py-10 mb-6 lg:px-24">
        {initialLoading ? (
          Array.from({ length: 30 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))
        ) : currentlyDisplayedPokemons.length > 0 ? (
          currentlyDisplayedPokemons.map((pokemon, index) => {
            const pokemonDetail = pokemonDetails[pokemon.name];
            const isLoading = loadingPokemon.has(pokemon.name);
            if (isLoading || !pokemonDetail) {
              return <ShimmerCard key={`shimmer-${pokemon.name}-${index}`} />;
            }
        
            return (
              <PokemonCard
                key={`pokemon-${pokemon.name}-${index}`}
                name={pokemon.name}
                spriteUrl={pokemonDetail?.sprites?.other?.['official-artwork']?.front_default}
                types={pokemonDetail?.types}
                index={index}
              />
            );
          })
        ) : (
          filterLoading || !showNoResultsMessage ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={`loading-shimmer-${index}`} />
            ))
          ) : (
            <div className="col-span-6 text-center py-10">
              <p className="text-xl">No Pokémon found matching your filters</p>
            </div>
          )
        )}
      </div>
      {hasMoreToDisplay && currentlyDisplayedPokemons.length > 0 && (
        <div className="relative text-center">
          <button
            onClick={loadMorePokemons}
            className={`${
              selectedType
                ? typeGradients[selectedType]
                : 'bg-gradient-to-r from-blue-400 to-blue-600'
            } text-white py-2 px-6 rounded-lg border border-black shadow-md hover:opacity-80 transition duration-300`}
          >
            Load More ({currentlyDisplayedPokemons.length} of {totalFilteredCount})
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokemon;