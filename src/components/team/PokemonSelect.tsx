import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
}

interface PokemonSelectProps {
  pokemonList: Pokemon[];
  filteredPokemonList: Pokemon[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  teamSize: number; 
}

const PokemonSelect: React.FC<PokemonSelectProps> = ({
  pokemonList,
  filteredPokemonList,
  searchQuery,
  setSearchQuery,
  handleSelectChange,
  teamSize, 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const isDisabled = teamSize >= 6;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled) {
      setSearchQuery(e.target.value);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (pokemon: Pokemon) => {
    if (!isDisabled) {
      setSearchQuery(pokemon.name);
      setShowSuggestions(false);
      handleSelectChange({ target: { value: pokemon.id.toString() } } as any);
    }
  };

  const filteredSuggestions = (pokemonList || []).filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative mb-4 mx-auto">
      <div className="relative mb-2 md:mb-8 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={handleSearchChange}
          className={`bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border-2 p-2 pl-10 rounded-full w-full max-w-6xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : ''}`}
          disabled={isDisabled} 
        />
        <FaSearch className="absolute left-2 md:left-32 top-1/2 transform -translate-y-1/2 text-gray-700" />
      </div>
      {showSuggestions && searchQuery && !isDisabled && (
        <div className="absolute top-full left-0 w-1/2 h-96 overflow-scroll bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border border-gray-300 rounded-lg mt-2 shadow-lg z-10">
          {filteredSuggestions.map((pokemon) => (
            <div
              key={pokemon.id}
              className="p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              onClick={() => handleSuggestionClick(pokemon)}
            >
              <div className="font-semibold text-gray-900">{pokemon.name}</div>
              <div className="text-gray-700">{pokemon.types.join(', ')}</div>
            </div>
          ))}
          {filteredSuggestions.length === 0 && (
            <div className="p-4 text-gray-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonSelect;
