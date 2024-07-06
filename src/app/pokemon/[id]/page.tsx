import axios from 'axios';
import { notFound } from 'next/navigation';
import PokemonDetailClient from '../../../components/PokemonPage';

interface PokemonType {
  type: {
    name: string;
  };
}

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
  types: PokemonType[];
  moves: {
    move: {
      name: string;
      method: 'level-up' | 'egg' | 'tm';
      type: 'physical' | 'special' | 'status';
      level?: number;
    };
  }[];
  evolution: {
    species_name: string;
    min_level: number | null;
    trigger_name: string;
    item: string | null;
    image_url: string;
    types: PokemonType[];
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

const fetchMoveDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching move details:', error);
    return null;
  }
};

const fetchPokemonData = async (name: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonData = response.data;

    const moves = await Promise.all(
      pokemonData.moves.map(async (moveEntry: any) => {
        const moveDetails = await fetchMoveDetails(moveEntry.move.url);
        if (!moveDetails) return null;

        const method = moveEntry.version_group_details[0]?.move_learn_method.name;
        const type = moveDetails.damage_class.name;
        const level = moveEntry.version_group_details[0]?.level_learned_at;

        return {
          move: {
            name: moveEntry.move.name,
            method: method as 'level-up' | 'egg' | 'tm',
            type: type as 'physical' | 'special' | 'status',
            level: method === 'level-up' ? level : undefined,
          },
        };
      })
    );

    return {
      ...pokemonData,
      moves: moves.filter(move => move !== null),
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return null;
  }
};

export default async function PokemonPage({ params }: Props) {
  try {
    console.log(`Fetching data for Pokémon ID: ${params.id}`);

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    if (!response.data) {
      console.error('No Pokémon data found.');
      notFound();
    }

    const pokemon: PokemonDetail = response.data;
    console.log('Basic Pokémon data:', pokemon);

    const speciesResponse = await axios.get(pokemon.species.url);
    const species: SpeciesDetail = speciesResponse.data;

    const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    const description = descriptionEntry ? descriptionEntry.flavor_text : 'No description available.';
    console.log('Description:', description);

    const evolutionChainResponse = await axios.get(species.evolution_chain.url);
    const evolutionChain: EvolutionChainDetail = evolutionChainResponse.data;

    const seenPokemon = new Set<string>();

    const extractEvolutionLine = async (chain: EvolutionChain): Promise<PokemonDetail['evolution']> => {
      let evolutions: PokemonDetail['evolution'] = [];

      const traverseChain = async (currentChain: EvolutionChain | null) => {
        if (!currentChain) return;

        if (!seenPokemon.has(currentChain.species.name)) {
          seenPokemon.add(currentChain.species.name);

          const pokemonData = await fetchPokemonData(currentChain.species.name);
          if (!pokemonData) return;

          evolutions.push({
            species_name: currentChain.species.name,
            min_level: currentChain.evolution_details[0]?.min_level ?? null,
            trigger_name: currentChain.evolution_details[0]?.trigger.name ?? '',
            item: currentChain.evolution_details[0]?.item?.name ?? null,
            image_url: pokemonData.sprites.other['official-artwork'].front_default,
            types: pokemonData.types,
          });
        }

        await Promise.all(currentChain.evolves_to.map(evolution => traverseChain(evolution)));
      };

      await traverseChain(chain);
      return evolutions;
    };

    const evolution = await extractEvolutionLine(evolutionChain.chain);
    console.log('Evolution line:', evolution);

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
          image_url: preEvolutionPokemon.sprites.other['official-artwork'].front_default,
          types: preEvolutionPokemon.types,
        });
      }
    }

    const detailedPokemon = await fetchPokemonData(pokemon.name);
    if (!detailedPokemon) {
      console.error('No detailed Pokémon data found.');
      notFound();
    }

    console.log('Detailed Pokémon data:', detailedPokemon);

    return <PokemonDetailClient pokemon={{ ...detailedPokemon, description, evolution }} />;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    notFound();
  }
}
