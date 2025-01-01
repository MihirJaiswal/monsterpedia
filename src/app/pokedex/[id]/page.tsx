import axios from 'axios';
import { notFound } from 'next/navigation';
import PokemonDetailClient from '../../../components/pokedex/PokemonPage';

enum MoveMethod {
  LEVEL_UP = 'level-up',
  EGG = 'egg',
  MACHINE = 'machine',
}

enum MoveType {
  PHYSICAL = 'physical',
  SPECIAL = 'special',
  STATUS = 'status',
}

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
      method: MoveMethod;
      type: MoveType;
      moveType: string;
      level?: number;
    };
  }[];
  evolution: EvolutionPath[];
}

interface EvolutionPath {
  species_name: string;
  min_level: number | null;
  trigger_name: string;
  item: string | null;
  image_url: string;
  types: PokemonType[];
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

const fetchPokemonData = async (name: string): Promise<PokemonDetail | null> => {
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
            method: method as MoveMethod,
            type: type as MoveType,
            moveType: moveDetails.type.name,
            level: method === MoveMethod.LEVEL_UP ? level : undefined,
          },
        };
      })
    );

    return {
      ...pokemonData,
      moves: moves.filter(move => move !== null) as PokemonDetail['moves'],
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return null;
  }
};

const fetchSpeciesData = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching species data:', error);
    return null;
  }
};

const extractEvolutionPaths = async (chain: EvolutionChain): Promise<EvolutionPath[][]> => {
  const paths: EvolutionPath[][] = [];

  const traverseChain = async (currentChain: EvolutionChain | null, currentPath: EvolutionPath[]) => {
    if (!currentChain) return;

    const pokemonData = await fetchPokemonData(currentChain.species.name);
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
      await Promise.all(currentChain.evolves_to.map(evolution => traverseChain(evolution, newPath)));
    }
  };

  await traverseChain(chain, []);

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

export default async function PokemonPage({ params }: Props) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    const pokemon: PokemonDetail = response.data;
    const species: SpeciesDetail = await fetchSpeciesData(pokemon.species.url);

    if (!species) {
      console.error('No species data found.');
      notFound();
    }

    const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    const description = descriptionEntry ? descriptionEntry.flavor_text : 'No description available.';
    const evolutionChainResponse = await axios.get(species.evolution_chain.url);
    const evolutionChain: EvolutionChainDetail = evolutionChainResponse.data;

    const evolutionPaths = await extractEvolutionPaths(evolutionChain.chain);
    if (species.evolves_from_species) {
      await axios.get(species.evolves_from_species.url);
    }

    const detailedPokemon = await fetchPokemonData(pokemon.name);
    if (!detailedPokemon) {
      console.error('No detailed Pokémon data found.');
      notFound();
    }

    return <PokemonDetailClient pokemon={{ ...detailedPokemon, description, evolution: evolutionPaths.flat() }} />;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    notFound();
  }
}
