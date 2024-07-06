import axios from 'axios';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PokemonDetail {
  id: number; // Add this field to use for National Dex number
  species: {
    url: string;
  };
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
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
}

interface EvolutionDetail {
  species_name: string;
  min_level: number | null;
  trigger_name: string;
  item: string | null;
}

interface EvolutionChain {
  id: number;
  chain: {
    evolves_to: {
      species: {
        name: string;
      };
      evolves_to: {
        species: {
          name: string;
        };
        evolution_details: EvolutionDetail[];
      }[];
      evolution_details: EvolutionDetail[];
    }[];
    species: {
      name: string;
    };
  };
}

interface Props {
  params: {
    id: string;
  };
}

const typeImages: { [key: string]: string } = {
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
};

export default async function PokemonPage({ params }: Props) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  if (!response.data) {
    notFound();
  }

  const pokemon: PokemonDetail = response.data;

  // Get species info for evolution chain and description
  const speciesResponse = await axios.get(pokemon.species.url);
  const species = speciesResponse.data;

  // Get evolution chain
  const evolutionChainResponse = await axios.get(species.evolution_chain.url);
  const evolutionChain: EvolutionChain = evolutionChainResponse.data;

  // Get description
  const descriptionEntry = species.flavor_text_entries.find((entry: any) => entry.language.name === 'en');
  const description = descriptionEntry ? descriptionEntry.flavor_text : 'No description available.';

  const getStatColor = (stat: number) => {
    if (stat > 100) return 'bg-green-600';
    if (stat > 70) return 'bg-yellow-600';
    if (stat > 40) return 'bg-orange-600';
    if (stat > 0) return 'bg-red-600';
    if (stat === 0) return 'bg-gray-600';
    return 'bg-red-600';
  };

  const getTotalStatColor = (total: number) => {
    if (total > 500) return 'bg-blue-600';
    if (total > 400) return 'bg-purple-600';
    if (total > 300) return 'bg-teal-600';
    return 'bg-pink-600';
  };

  const totalBaseStats = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  return (
    <div className="p-6 h-full bg-hero flex flex-col md:flex-row justify-center items-center">
      <div>
        <div className="relative w-52 h-52 mx-auto mb-4">
          <div className="absolute inset-0 flex justify-center border-2 border-gray-300 items-center z-0 bg-bg2 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
            <div className="w-36 h-36 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
              <div className="w-32 h-32 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
                <div className="absolute w-full h-full flex items-center justify-center">
                  <div className="absolute w-full h-[2px] bg-white transform rotate-45 left-2"></div>
                  <div className="absolute w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"></div>
                  <div className="absolute w-full h-[2px] bg-white transform rotate-45 right-2"></div>
                </div>
              </div>
            </div>
          </div>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-52 h-52 object-cover object-center relative"
          />
        </div>
        <h1 className='text-4xl font-bold text-gray-950 mb-4 text-center'>
        #{pokemon.id}
        </h1>
        <h1 className="text-4xl font-bold text-gray-950 mb-4 text-center">
           {pokemon.name}
        </h1>

        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((type, idx) => (
            <Image
              key={idx}
              src={typeImages[type.type.name] || '/types/default.png'}
              alt={type.type.name}
              width={40}
              height={40}
              className="object-cover"
            />
          ))}
        </div>

        <div className="px-20 flex items-center justify-center">
          <p className="text-center text-white mt-2 p-4 border border-white rounded-lg">{description}</p>
        </div>
      </div>
      <div className="ml-10 border border-gray-300 rounded-lg shadow-lg p-6 max-w-md text-center relative overflow-hidden">
        <div className="text-left mb-6">
          <h2 className="text-2xl font-bold text-gray-950 mb-4">Stats</h2>
          <ul className="space-y-2">
            {pokemon.stats.map((stat, index) => (
              <li key={index} className="flex items-center">
                <span className="font-semibold text-gray-800 capitalize w-24">{stat.stat.name}:</span>
                <div className="relative w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`absolute h-full ${getStatColor(stat.base_stat)}`} style={{ width: `${stat.base_stat}%` }}></div>
                </div>
                <span className="ml-4 w-8 text-right">{stat.base_stat}</span>
              </li>
            ))}
            <li className="flex items-center">
              <span className="font-semibold text-gray-800 capitalize w-24">Total Base Stats:</span>
              <div className="relative w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div className={`absolute h-full ${getTotalStatColor(totalBaseStats)}`} style={{ width: `${(totalBaseStats / 600) * 100}%` }}></div>
              </div>
              <span className="w-16 ml-2 text-center text-white">{totalBaseStats}</span>
            </li>
          </ul>
        </div>
        <div className="text-left mb-6">
          <h2 className="text-2xl font-bold text-gray-950 mb-4">Abilities</h2>
          <ul className="space-y-1">
            {pokemon.abilities.map((ability, index) => (
                            <li key={index} className="capitalize">
                            {ability.ability.name}
                            {ability.is_hidden && <span className="ml-2 text-sm text-gray-200">(Hidden)</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
            
