'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import React from 'react';
import {
  FaSearch, FaLeaf, FaFire, FaTint, FaBolt, FaSnowflake, FaFistRaised,
  FaSkullCrossbones, FaMountain, FaFeather, FaBrain, FaBug, FaGem,
  FaGhost, FaDragon, FaMoon, FaCog, FaStar, FaBullseye
} from 'react-icons/fa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
const CACHE_DURATION = 60 * 60 * 1000;

const getPokemonIdFromUrl = (url: string): number => {
  const match = url.match(/\/(\d+)\//);
  return match ? parseInt(match[1]) : 0;
};

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetail }>({});
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loadingPokemon, setLoadingPokemon] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayedCount, setDisplayedCount] = useState<number>(32);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<PokemonTypeName | ''>('');
  const [filterLoading, setFilterLoading] = useState<boolean>(false);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState<boolean>(false);
  
  const isCacheValid = useCallback((key: string) => {
    const cacheEntry = dataCache.get(key);
    if (!cacheEntry) return false;
    return (Date.now() - cacheEntry.timestamp) < CACHE_DURATION;
  }, []);

  const fetchWithCache = useCallback(async (url: string, cacheKey: string) => {
    if (isCacheValid(cacheKey)) {
      return dataCache.get(cacheKey).data;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
    
    const data = await res.json();
    dataCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }, [isCacheValid]);

  useEffect(() => {
    async function fetchAllPokemon() {
      try {
        setInitialLoading(true);
        const cacheKey = 'all-pokemon-list';
        
        const data = await fetchWithCache(
          `https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0`,
          cacheKey
        );
        setPokemonList(data.results);
        
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
  }, [fetchWithCache]);

  const fetchingRef = React.useRef(new Set<string>());

  const fetchPokemonDetails = useCallback(async (pokemonToFetch: Pokemon[]) => {
    if (pokemonToFetch.length === 0) return {};
    
    const toFetch = pokemonToFetch.filter(p => !fetchingRef.current.has(p.name));
    if (toFetch.length === 0) return {};
    
    toFetch.forEach(p => fetchingRef.current.add(p.name));
    
    const newLoading = new Set(loadingPokemon);
    toFetch.forEach(p => newLoading.add(p.name));
    setLoadingPokemon(newLoading);
    
    const newDetails: { [key: string]: PokemonDetail } = {};
    
    const batchSize = 20;
    const batches = [];
    
    for (let i = 0; i < toFetch.length; i += batchSize) {
      batches.push(toFetch.slice(i, i + batchSize));
    }
    
    await Promise.all(
      batches.map(async (batch) => {
        const promises = batch.map(async (pokemon) => {
          const cacheKey = `pokemon-detail-${pokemon.name}`;
          
          if (isCacheValid(cacheKey)) {
            return { name: pokemon.name, data: dataCache.get(cacheKey).data };
          }
          
          try {
            const data = await fetchWithCache(pokemon.url, cacheKey);
            console.log(`Fetched details for`, data);
            return { name: pokemon.name, data };
          } catch (error) {
            console.error(`Error fetching ${pokemon.name}:`, error);
            return null;
          }
        });
        
        const results = await Promise.allSettled(promises);
        
        results.forEach((result) => {
          if (result.status === 'fulfilled' && result.value?.data?.name) {
            newDetails[result.value.data.name] = result.value.data;
          }
        });
      })
    );
    
    toFetch.forEach(p => fetchingRef.current.delete(p.name));
    
    setLoadingPokemon(prev => {
      const updated = new Set(prev);
      toFetch.forEach(p => updated.delete(p.name));
      return updated;
    });
    
    if (Object.keys(newDetails).length > 0) {
      setPokemonDetails(prev => ({...prev, ...newDetails}));
    }
    
    return newDetails;
  }, [loadingPokemon, isCacheValid, fetchWithCache]);

  const baseFilteredPokemons = useMemo(() => {
    let filtered = pokemonList;
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerSearch));
    }
    
    if (selectedGeneration !== null) {
      const { offset, limit } = generations[selectedGeneration];
      filtered = filtered.slice(offset, offset + limit);
      
      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerSearch));
      }
    }
    
    return filtered;
  }, [pokemonList, searchTerm, selectedGeneration]);

  const filteredPokemons = useMemo(() => {
    if (!selectedType) return baseFilteredPokemons;
    
    return baseFilteredPokemons.filter(pokemon => {
      const detail = pokemonDetails[pokemon.name];
      if (!detail) return false;
      return detail.types?.some(t => t.type.name === selectedType);
    });
  }, [baseFilteredPokemons, selectedType, pokemonDetails]);

  const currentlyDisplayedPokemons = useMemo(() => {
    return filteredPokemons.slice(0, displayedCount);
  }, [filteredPokemons, displayedCount]);
  
  const shouldShowShimmer = useMemo(() => {
    if (initialLoading) return true;
    
    const missingDetails = currentlyDisplayedPokemons.filter(
      p => !pokemonDetails[p.name]
    );
    
    return missingDetails.length > 0;
  }, [initialLoading, currentlyDisplayedPokemons, pokemonDetails]);

  useEffect(() => {
    if (initialLoading) return;
    
    const pokemonToCheck = selectedType 
      ? baseFilteredPokemons.slice(0, Math.min(baseFilteredPokemons.length, 200))
      : currentlyDisplayedPokemons;
    
    const pokemonToFetch = pokemonToCheck.filter(
      p => !pokemonDetails[p.name] && !loadingPokemon.has(p.name) && !fetchingRef.current.has(p.name)
    );
    
    if (pokemonToFetch.length > 0) {
      fetchPokemonDetails(pokemonToFetch);
    }
  }, [currentlyDisplayedPokemons, baseFilteredPokemons, initialLoading, selectedType]);

  useEffect(() => {
    setShowNoResultsMessage(false);
    
    if (filteredPokemons.length === 0 && !filterLoading && !initialLoading) {
      const timer = setTimeout(() => setShowNoResultsMessage(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [filteredPokemons, filterLoading, initialLoading]);

  useEffect(() => {
    if (currentlyDisplayedPokemons.length === 0 || selectedType) return;
    
    const nextBatch = filteredPokemons.slice(
      displayedCount,
      displayedCount + 32
    ).filter(p => !pokemonDetails[p.name] && !loadingPokemon.has(p.name) && !fetchingRef.current.has(p.name));
    
    if (nextBatch.length > 0) {
      const timer = setTimeout(() => {
        fetchPokemonDetails(nextBatch);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentlyDisplayedPokemons.length, filteredPokemons.length, displayedCount, selectedType]);

  const loadMorePokemons = () => {
    setDisplayedCount(prev => prev + 32);
  };

  const hasMoreToDisplay = currentlyDisplayedPokemons.length < filteredPokemons.length;

  const handleFilterChange = (type: PokemonTypeName | '', generation: number | null) => {
    setFilterLoading(true);
    setShowNoResultsMessage(false);
    setSelectedType(type);
    setSelectedGeneration(generation);
    setDisplayedCount(32);
    setTimeout(() => setFilterLoading(false), 300);
  };

  return (
    <div className="relative p-6 min-h-screen mt-16 bg-blue-500">
      <div className="relative mb-8 flex flex-col lg:flex-row items-center justify-center gap-4 mt-6 px-4 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="relative w-full group">
          <input
            type="text"
            placeholder="Search Pokémon by name or number..."
            className="w-full text-gray-800 bg-white/90 backdrop-blur-xl p-4 pl-12 pr-4 rounded-2xl border-2 border-white/50 shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300 placeholder:text-gray-500 focus:outline-none focus:border-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg group-focus-within:text-blue-500 transition-colors duration-300" />
        </div>

        {/* Filter Selects */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:min-w-[500px]">
          {/* Generation Select */}
          <div className="flex-1">
            <Select
              value={selectedGeneration === null ? 'all' : String(selectedGeneration)}
              onValueChange={(value) => handleFilterChange(selectedType, value === 'all' ? null : parseInt(value))}
            >
              <SelectTrigger className="w-full bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300 rounded-2xl h-14 text-gray-800 font-medium focus:ring-2 focus:ring-purple-400 focus:ring-offset-0">
                <SelectValue placeholder="Select Generation" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-white/50 rounded-xl shadow-2xl">
                <SelectItem value="all" className="cursor-pointer hover:bg-purple-50 focus:bg-purple-100 rounded-lg">
                  All Generations
                </SelectItem>
                {generations.map((gen, index) => (
                  <SelectItem 
                    key={index} 
                    value={String(index)}
                    className="cursor-pointer hover:bg-purple-50 focus:bg-purple-100 rounded-lg"
                  >
                    {gen.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Select */}
          <div className="flex-1 xl:hidden">
            <Select
              value={selectedType || 'all'}
              onValueChange={(value) => handleFilterChange(value === 'all' ? '' : value as PokemonTypeName, selectedGeneration)}
            >
              <SelectTrigger className="w-full bg-white/90 backdrop-blur-xl border-2 border-white/50 shadow-lg hover:shadow-xl focus:shadow-2xl transition-all duration-300 rounded-2xl h-14 text-gray-800 font-medium focus:ring-2 focus:ring-pink-400 focus:ring-offset-0">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-xl border-2 border-white/50 rounded-xl shadow-2xl max-h-[400px]">
                <SelectItem value="all" className="cursor-pointer hover:bg-pink-50 focus:bg-pink-100 rounded-lg">
                  All Types
                </SelectItem>
                {types.map((type) => (
                  <SelectItem 
                    key={type} 
                    value={type}
                    className="cursor-pointer hover:bg-pink-50 focus:bg-pink-100 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      {typeIcons[type]}
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="relative hidden px-28 xl:grid grid-cols-9 justify-center gap-4 mb-6">
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

      <div className="relative grid sm:grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4 md:gap-6 py-10 mb-6 xl:px-24">
        {initialLoading ? (
          Array.from({ length: 32 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))
        ) : currentlyDisplayedPokemons.length > 0 ? (
          <>
            {currentlyDisplayedPokemons.map((pokemon, index) => {
              const pokemonDetail = pokemonDetails[pokemon.name];
              
              if (!pokemonDetail) {
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
            })}
          </>
        ) : (
          showNoResultsMessage ? (
            <div className="col-span-full text-center py-10">
              <p className="text-xl">No Pokémon found matching your filters</p>
            </div>
          ) : (
            Array.from({ length: 8 }).map((_, index) => (
              <ShimmerCard key={`loading-shimmer-${index}`} />
            ))
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
                : 'bg-blue-600'
            } text-white py-2 px-6 rounded-lg border border-blue-800 shadow-md hover:opacity-80 transition duration-300`}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokemon;