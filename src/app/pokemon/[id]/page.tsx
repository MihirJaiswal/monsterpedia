import { notFound } from 'next/navigation';
import PokemonDetailClient from '../../../components/PokemonPage';

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
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch move details: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching move details:', error);
    return null;
  }
};

const fetchPokemonData = async (name: string): Promise<PokemonDetail | null> => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
    const pokemonData = await response.json();

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
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch species data: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching species data:', error);
    return null;
  }
};

const extractEvolutionPaths = async (chain: EvolutionChain): Promise<EvolutionPath[][]> => {
  const paths: EvolutionPath[][] = [];

  const traverseChain = async (currentChain: EvolutionChain | null, currentPath: EvolutionPath[]) => {
    if (!currentChain) return;

    // Fetch Pokémon data
    const pokemonData = await fetchPokemonData(currentChain.species.name);
    if (!pokemonData) return;

    // Create new path with the current Pokémon
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

    // If there are no further evolutions, finalize this path
    if (currentChain.evolves_to.length === 0) {
      paths.push(newPath);
    } else {
      // Recurse for each evolution
      await Promise.all(currentChain.evolves_to.map(evolution => traverseChain(evolution, newPath)));
    }
  };

  // Start traversing from the base chain
  await traverseChain(chain, []);

  // Ensure uniqueness of evolution paths
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
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);

    const pokemon: PokemonDetail = await response.json();
    const species: SpeciesDetail = await fetchSpeciesData(pokemon.species.url);

    if (!species) {
      console.error('No species data found.');
      notFound();
    }

    const descriptionEntry = species.flavor_text_entries.find(entry => entry.language.name === 'en');
    const description = descriptionEntry ? descriptionEntry.flavor_text : 'No description available.';
    const evolutionChainResponse = await fetch(species.evolution_chain.url);
    if (!evolutionChainResponse.ok) throw new Error(`Failed to fetch evolution chain: ${evolutionChainResponse.statusText}`);
    const evolutionChain: EvolutionChainDetail = await evolutionChainResponse.json();
    console.log("rhe evo chain",evolutionChain)

    const seenPokemon = new Set<string>();

    const evolutionPaths = await extractEvolutionPaths(evolutionChain.chain);
    if (species.evolves_from_species) {
      const preEvolutionResponse = await fetch(species.evolves_from_species.url);
  /*     if (!preEvolutionResponse.ok) throw new Error(`Failed to fetch pre-evolution data: ${preEvolutionResponse.statusText}`);
      const preEvolutionData = await preEvolutionResponse.json();
      const preEvolutionPokemon = await fetchPokemonData(preEvolutionData?.name ?? '');
 */
     /*  if (preEvolutionData && preEvolutionPokemon && !seenPokemon.has(preEvolutionData.name)) {
        evolutionPaths.forEach(path => {
          path.unshift({
            species_name: preEvolutionData.name,
            min_level: null,
            trigger_name: '',
            item: null,
            image_url: preEvolutionPokemon.sprites.other['official-artwork'].front_default,
            types: preEvolutionPokemon.types,
          });
        });
      } */
    }

    const detailedPokemon = await fetchPokemonData(pokemon.name);
    if (!detailedPokemon) {
      console.error('No detailed Pokémon data found.');
      notFound();
    }

    console.log('Evolution Paths:', evolutionPaths);

    return <PokemonDetailClient pokemon={{ ...detailedPokemon, description, evolution: evolutionPaths.flat() }} />;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    notFound();
  }
}
