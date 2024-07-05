import axios from 'axios';
import { notFound } from 'next/navigation';

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
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

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">{pokemon.name}</h1>
      <div className="flex justify-center items-center">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-6 max-w-xs text-center relative overflow-hidden">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="w-32 h-32 mx-auto mb-4 rounded-lg border-4 border-gray-200 shadow-md"
          />
          <ul className="list-disc list-inside text-left space-y-2">
            <li><strong className="font-semibold text-gray-700">Height:</strong> {pokemon.height / 10} m</li>
            <li><strong className="font-semibold text-gray-700">Weight:</strong> {pokemon.weight / 10} kg</li>
            <li><strong className="font-semibold text-gray-700">Base Experience:</strong> {pokemon.base_experience}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
