import axios from 'axios';
import { notFound } from 'next/navigation';

interface PokemonDetail {
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
    return 'bg-red-600';
  };

  const totalBaseStats = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  return (
    <div className="p-6 h-full bg-hero flex flex-col md:flex-row justify-around items-center">
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
        <div className='px-20  flex items-center justify-center'>
        <p className="text-center text-gray-100 mt-8 p-4 border border-white rounded-lg">{description}</p>
        </div>
      </div>
      <div className="ml-10 border border-gray-300 rounded-lg shadow-lg p-6 max-w-md text-center relative overflow-hidden">
        <div className="text-left mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Stats</h2>
          <ul className="space-y-2">
            {pokemon.stats.map((stat, index) => (
              <li key={index} className="flex items-center">
                <span className="font-semibold text-gray-700 capitalize w-24">{stat.stat.name}:</span>
                <div className="relative w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`absolute h-full ${getStatColor(stat.base_stat)}`} style={{ width: `${stat.base_stat}%` }}></div>
                </div>
                <span className="ml-4 w-8 text-right">{stat.base_stat}</span>
              </li>
            ))}
            <li className="font-semibold text-gray-700">Total Base Stats: <span className='text-white font-bold'>{totalBaseStats}</span></li>
          </ul>
        </div>
        <div className="text-left mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Abilities</h2>
          <ul className="space-y-1">
            {pokemon.abilities.map((ability, index) => (
              <li key={index} className="capitalize">{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
