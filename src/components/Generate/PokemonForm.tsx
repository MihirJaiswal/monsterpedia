import React from 'react';

interface PokemonFormProps {
  name: string;
  hp: string;
  attack: string;
  defense: string;
  spAttack: string;
  spDefense: string;
  speed: string;
  type1: string;
  type2: string;
  ability: string;
  abilityDescription: string;
  image: File | null;
  previewImage: string | ArrayBuffer | null;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAttackChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDefenseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSpAttackChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSpDefenseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSpeedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAbilityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAbilityDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onType1Change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onType2Change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerateImage: () => void;

}

const PokemonForm: React.FC<PokemonFormProps> = ({
  name,
  hp,
  attack,
  defense,
  spAttack,
  spDefense,
  speed,
  ability,
  abilityDescription,
  type1,
  type2,
  image,
  previewImage,
  onNameChange,
  onHpChange,
  onAttackChange,
  onDefenseChange,
  onSpAttackChange,
  onSpDefenseChange,
  onSpeedChange,
  onAbilityChange,
  onAbilityDescriptionChange,
  onType1Change,
  onType2Change,
  onImageUpload,
  onGenerateImage,
 
}) => (
  <div className="max-w-6xl mx-auto overflow-hidden">
    <form className="flex flex-col items-center rounded-lg">
      <div className='w-full rounded-lg md:w-4/5 lg:w-3/4 bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-white  flex flex-col items-center py-4'>
      <div className="w-full md:w-4/5 lg:w-3/4 rounded-lg">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-2">Name:</label>
              <input
                type="text"
                value={name}
                onChange={onNameChange}
                className="border p-3  w-full"
                placeholder="Enter Pokémon name"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="border p-2 rounded w-full mb-4"
              />
              <button
                type="button"
                onClick={onGenerateImage}
                className="bg-cyan-800 text-white p-3 rounded w-full"
              >
                Generate Pokémon Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/4">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">HP:</label>
              <input
                type="text"
                value={hp}
                onChange={onHpChange}
                className="border p-2 rounded w-full"
                placeholder="HP"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Attack:</label>
              <input
                type="text"
                value={attack}
                onChange={onAttackChange}
                className="border p-2 rounded w-full"
                placeholder="Attack"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Defense:</label>
              <input
                type="text"
                value={defense}
                onChange={onDefenseChange}
                className="border p-2 rounded w-full"
                placeholder="Defense"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sp. Attack:</label>
              <input
                type="text"
                value={spAttack}
                onChange={onSpAttackChange}
                className="border p-2 rounded w-full"
                placeholder="Sp. Attack"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sp. Defense:</label>
              <input
                type="text"
                value={spDefense}
                onChange={onSpDefenseChange}
                className="border p-2 rounded w-full"
                placeholder="Sp. Defense"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Speed:</label>
              <input
                type="text"
                value={speed}
                onChange={onSpeedChange}
                className="border p-2 rounded w-full"
                placeholder="Speed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/4">
        <div className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-2">Ability:</label>
              <input
                type="text"
                value={ability}
                onChange={onAbilityChange}
                className="border p-2 rounded w-full"
                placeholder="Enter Pokémon ability"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Ability Description:</label>
              <input
                type="text"
                value={abilityDescription}
                onChange={onAbilityDescriptionChange}
                className="border p-2 rounded w-full"
                placeholder="Enter ability description"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/4">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-2">Primary Type:</label>
              <select
                name="type1"
                value={type1 || ''}
                onChange={onType1Change}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Primary Type</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="flying">Flying</option>
                <option value="psychic">Psychic</option>
                <option value="bug">Bug</option>
                <option value="rock">Rock</option>
                <option value="ghost">Ghost</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="steel">Steel</option>
                <option value="fairy">Fairy</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Secondary Type:</label>
              <select
                name="type2"
                value={type2 || ''}
                onChange={onType2Change}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Secondary Type</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
                <option value="electric">Electric</option>
                <option value="ice">Ice</option>
                <option value="fighting">Fighting</option>
                <option value="poison">Poison</option>
                <option value="ground">Ground</option>
                <option value="flying">Flying</option>
                <option value="psychic">Psychic</option>
                <option value="bug">Bug</option>
                <option value="rock">Rock</option>
                <option value="ghost">Ghost</option>
                <option value="dragon">Dragon</option>
                <option value="dark">Dark</option>
                <option value="steel">Steel</option>
                <option value="fairy">Fairy</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      </div>
    </form>
  </div>
);

export default PokemonForm;

