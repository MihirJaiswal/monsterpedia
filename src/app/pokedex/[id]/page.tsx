import axios from 'axios';
import { notFound } from 'next/navigation';
import PokemonDetailClient from '../../../components/pokedex/PokemonPage';

// Add caching
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCached = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCache = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Batch fetch move details with concurrency limit
const fetchMoveDetailsBatch = async (urls: string[], batchSize = 20) => {
  const results: any[] = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(
      batch.map(async (url) => {
        const cached = getCached(url);
        if (cached) return cached;
        
        try {
          const response = await axios.get(url);
          setCache(url, response.data);
          return response.data;
        } catch (error) {
          console.error('Error fetching move:', error);
          return null;
        }
      })
    );
    
    results.push(...batchResults.map(r => r.status === 'fulfilled' ? r.value : null));
  }
  
  return results.filter(Boolean);
};

const fetchPokemonData = async (name: string, includeMoves = true) => {
  try {
    const cacheKey = `pokemon-${name}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = response.data;

    if (!includeMoves) {
      setCache(cacheKey, pokemonData);
      return pokemonData;
    }

    const limitedMoves = pokemonData.moves.slice(0, 50); 
    const moveUrls = limitedMoves.map((m: any) => m.move.url);
    
    const moveDetails = await fetchMoveDetailsBatch(moveUrls);
    
    const movesWithDetails = limitedMoves.map((moveEntry: any, index: number) => {
      const moveDetail = moveDetails[index];
      if (!moveDetail) return null;

      const method = moveEntry.version_group_details[0]?.move_learn_method.name;
      const level = moveEntry.version_group_details[0]?.level_learned_at;
      
      return {
        move: {
          name: moveEntry.move.name,
          method: method,
          type: moveDetail.damage_class.name,
          moveType: moveDetail.type.name,
          level: method === 'level-up' ? level : undefined,
        },
      };
    }).filter(Boolean);

    const result = {
      ...pokemonData,
      moves: movesWithDetails,
    };
    
    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return null;
  }
};

const fetchSpeciesData = async (url: string) => {
  try {
    const cached = getCached(url);
    if (cached) return cached;
    
    const response = await axios.get(url);
    setCache(url, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching species data:', error);
    return null;
  }
};

// Cache Pokemon data during evolution chain traversal
const pokemonCache = new Map<string, any>();

const extractEvolutionPaths = async (chain: any) => {
  const paths: any[][] = [];

  const traverseChain = async (currentChain: any, currentPath: any[]) => {
    if (!currentChain) return;

    // Check cache first
    let pokemonData = pokemonCache.get(currentChain.species.name);
    if (!pokemonData) {
      pokemonData = await fetchPokemonData(currentChain.species.name, false); 
      if (pokemonData) {
        pokemonCache.set(currentChain.species.name, pokemonData);
      }
    }
    
    if (!pokemonData) return;

    const newPath = [
      ...currentPath,
      {
        species_name: pokemonData.name,
        min_level: currentChain.evolution_details[0]?.min_level ?? null,
        trigger_name: currentChain.evolution_details[0]?.trigger.name ?? '',
        item: currentChain.evolution_details[0]?.item?.name ?? null,
        image_url: pokemonData.sprites.other['official-artwork'].front_default,
        types: pokemonData.types,
      },
    ];

    if (currentChain.evolves_to.length === 0) {
      paths.push(newPath);
    } else {
      await Promise.all(currentChain.evolves_to.map((evolution: any) => traverseChain(evolution, newPath)));
    }
  };

  await traverseChain(chain, []);

  // Remove duplicates
  const uniquePaths = paths.map(path => {
    const seenSpecies = new Set<string>();
    return path.filter(evo => {
      if (seenSpecies.has(evo.species_name)) return false;
      seenSpecies.add(evo.species_name);
      return true;
    });
  });

  return uniquePaths;
};

export default async function PokemonPage({ params }: { params: { id: string } }) {
  try {
    // Parallel fetch basic data
    const [pokemonResponse, detailedPokemon] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`),
      fetchPokemonData(params.id, true) // Fetch with moves
    ]);
    
    const pokemon = pokemonResponse.data;
    
    if (!detailedPokemon) {
      console.error('No detailed Pokémon data found.');
      notFound();
    }

    // Fetch species data
    const species = await fetchSpeciesData(pokemon.species.url);
    if (!species) {
      console.error('No species data found.');
      notFound();
    }

    const descriptionEntry = species.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );
    const description = descriptionEntry ? descriptionEntry.flavor_text : 'No description available.';

    // Fetch evolution chain
    const evolutionChainResponse = await axios.get(species.evolution_chain.url);
    const evolutionPaths = await extractEvolutionPaths(evolutionChainResponse.data.chain);

    return (
      <PokemonDetailClient 
        pokemon={{ 
          ...detailedPokemon, 
          description, 
          evolution: evolutionPaths.flat() 
        }} 
      />
    );
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    notFound();
  }
}

// Add revalidation for Next.js caching
export const revalidate = 3600; // Revalidate every hour