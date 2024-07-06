import axios from 'axios';
import { notFound } from 'next/navigation';
import PokemonDetailClient from '../../../components/PokemonPage';

interface PokemonDetail {
  id: number;
  species: {
    url: string;
  };
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
  evolution: {
    species_name: string;
    min_level: number | null;
    trigger_name: string;
    item: string | null;
    image_url: string;
  }[];
}

interface SpeciesDetail {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
}

interface EvolutionChainDetail {
  chain: EvolutionChain;
}

interface EvolutionChain {
  species: {
    name: string;
  };
  evolution_details: {
    min_level: number | null;
    trigger: {
      name: string;
    };
    item: {
      name: string;
    } | null;
  }[];
  evolves_to: EvolutionChain[];
}

interface Props {
  params: {
    id: string;
  };
}

// Helper function to fetch Pokémon data including official artwork
const fetchPokemonData = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};

export default async function PokemonPage({ params }: Props) {
  try {
    // Fetch Pokémon data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    if (!response.data) {
      notFound();
    }

    const pokemon: PokemonDetail = response.data;

    // Get species info for description and evolution chain
    const speciesResponse = await axios.get(pokemon.species.url);
    const species: SpeciesDetail = speciesResponse.data;

    // Get description
    const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    const description = descriptionEntry ? descriptionEntry.flavor_text : 'No description available.';

    // Get evolution chain
    const evolutionChainResponse = await axios.get(species.evolution_chain.url);
    const evolutionChain: EvolutionChainDetail = evolutionChainResponse.data;

    // Track seen Pokémon to avoid duplication
    const seenPokemon = new Set<string>();

    // Traverse the entire evolution chain and fetch images
    const extractEvolutionLine = async (chain: EvolutionChain): Promise<PokemonDetail['evolution']> => {
      let evolutions: PokemonDetail['evolution'] = [];

      const traverseChain = async (currentChain: EvolutionChain | null) => {
        if (!currentChain) return;

        // Fetch Pokémon data and add to evolution list if not already seen
        if (!seenPokemon.has(currentChain.species.name)) {
          seenPokemon.add(currentChain.species.name);

          const pokemonData = await fetchPokemonData(currentChain.species.name);
          evolutions.push({
            species_name: currentChain.species.name,
            min_level: currentChain.evolution_details[0]?.min_level ?? null,
            trigger_name: currentChain.evolution_details[0]?.trigger.name ?? '',
            item: currentChain.evolution_details[0]?.item?.name ?? null,
            image_url: pokemonData.sprites.other['official-artwork'].front_default,  // Use official artwork
          });
        }

        // Traverse all evolutions
        await Promise.all(currentChain.evolves_to.map(evolution => traverseChain(evolution)));
      };

      await traverseChain(chain);
      return evolutions;
    };

    // Fetch full evolution line
    const evolution = await extractEvolutionLine(evolutionChain.chain);

    // If the Pokémon has a pre-evolution, add it to the start of the evolution line
    if (species.evolves_from_species) {
      const preEvolutionResponse = await axios.get(species.evolves_from_species.url);
      const preEvolutionData = preEvolutionResponse.data;
      const preEvolutionPokemon = await fetchPokemonData(preEvolutionData.name);

      if (!seenPokemon.has(preEvolutionData.name)) {
        evolution.unshift({
          species_name: preEvolutionData.name,
          min_level: null,
          trigger_name: '',
          item: null,
          image_url: preEvolutionPokemon.sprites.other['official-artwork'].front_default,  // Use official artwork
        });
      }
    }

    // Pass the data to the client component
    return <PokemonDetailClient pokemon={{ ...pokemon, description, moves: pokemon.moves, evolution }} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
