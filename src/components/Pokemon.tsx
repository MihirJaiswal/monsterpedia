'use client'
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard'; // Adjust the path as necessary
import { FaSearch, FaFilter } from 'react-icons/fa';

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
  };
  types: PokemonType[];
}

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

const types = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark',
  'steel', 'fairy'
];

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokemonDetails, setPokemonDetails] = useState<{ [key: string]: PokemonDetail }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [displayedCount, setDisplayedCount] = useState<number>(30); // Number of Pokémon to display initially
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');

  const fetchPokemonDetailsInBatches = async (pokemons: Pokemon[], batchSize: number) => {
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
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let allPokemons: Pokemon[] = [];
        let totalFetched = 0;
        const batchSize = 100; // Adjust batch size for fetching

        while (totalFetched < 1025) { // Total number of Pokémon
          const listResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${batchSize}&offset=${totalFetched}`);
          if (!listResponse.ok) {
            throw new Error(`Failed to fetch Pokémon list: ${listResponse.statusText}`);
          }
          const listData = await listResponse.json();
          allPokemons = allPokemons.concat(listData.results);
          totalFetched += batchSize;
        }

        setPokemonList(allPokemons);

        // Fetch details of Pokémon in batches
        await fetchPokemonDetailsInBatches(allPokemons, 20);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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

  const displayedPokemonList = filteredPokemonList.slice(0, displayedCount); // Only show Pokémon up to the displayedCount

  const loadMorePokemons = () => {
    setDisplayedCount(prevCount => prevCount + 30); // Increase the number of Pokémon to display
  };

  if (loading) {
    return <div className="p-6 bg-gray-900 min-h-screen text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="relative p-6 bg-hero bg-cover bg-center min-h-screen">
      <div className="absolute inset-0 bg-bg1 bg-repeat bg-center opacity-5"></div>
      <h1 className="relative text-4xl font-bold text-center mb-8 text-white">MonsterPedia Pokédex</h1>
      <div className="relative mb-6 flex justify-center items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="w-full text-black max-w-md p-3 pl-10 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="relative">
          <select
            className="w-full text-black max-w-md p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedGeneration === null ? 'all' : selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value === 'all' ? null : parseInt(e.target.value))}
          >
            <option value="all">All Generations</option>
            {generations.map((gen, index) => (
              <option key={index} value={index}>{gen.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative mb-6 flex flex-wrap justify-center gap-4 px-20 mt-12">
        {types.map((type, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg shadow-md border border-black ${selectedType === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} transition duration-300`}
            onClick={() => setSelectedType(type === selectedType ? '' : type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="relative flex flex-wrap justify-center gap-6 py-10 mb-6">
        {displayedPokemonList.map((p, index) => {
          const pokemonDetail = pokemonDetails[p.name];
          return (
            <PokemonCard
              key={index}
              name={p.name}
              spriteUrl={pokemonDetail?.sprites.front_default}
              types={pokemonDetail?.types}
              index={index}
            />
          );
        })}
      </div>
      <div className="relative text-center">
        <button
          onClick={loadMorePokemons}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Pokemon;
