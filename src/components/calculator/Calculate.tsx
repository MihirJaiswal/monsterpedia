'use client';
import React, { useState, useEffect } from 'react';
import TypeTable from './TypeTable'; // Adjust the import path as needed

const typeOptions = [
  "None", "Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting",
  "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon",
  "Dark", "Steel", "Fairy"
];

interface TypeData {
  weaknesses: string[];
  resistances: string[];
  immunities: string[];
}

interface TypeDataMap {
  [key: string]: TypeData;
}

const typeData: TypeDataMap = {
  "Normal": { 
    "weaknesses": ["Fighting"], 
    "resistances": [], 
    "immunities": ["Ghost"]
  },
  "Fire": { 
    "weaknesses": ["Water", "Rock", "Ground"], 
    "resistances": ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"], 
    "immunities": []
  },
  "Water": { 
    "weaknesses": ["Electric", "Grass"], 
    "resistances": ["Fire", "Water", "Ice", "Steel"], 
    "immunities": []
  },
  "Electric": { 
    "weaknesses": ["Ground"], 
    "resistances": ["Electric", "Flying", "Steel"], 
    "immunities": []
  },
  "Grass": { 
    "weaknesses": ["Fire", "Flying", "Poison", "Bug", "ice"], 
    "resistances": ["Water", "Grass", "Electric", "Ground"], 
    "immunities": []
  },
  "Ice": { 
    "weaknesses": ["Fire", "Fighting", "Rock", "Steel"], 
    "resistances": ["Ice"], 
    "immunities": []
  },
  "Fighting": { 
    "weaknesses": ["Flying", "Psychic", "Fairy"], 
    "resistances": ["Bug", "Rock", "Dark"], 
    "immunities": []
  },
  "Poison": { 
    "weaknesses": ["Ground", "Psychic"], 
    "resistances": ["Grass", "Fighting", "Poison", "Bug", "Fairy"], 
    "immunities": []
  },
  "Ground": { 
    "weaknesses": ["Water", "Grass", "Ice"], 
    "resistances": ["Poison", "Rock"], 
    "immunities": ["Electric"]
  },
  "Flying": { 
    "weaknesses": ["Electric", "Ice", "Rock"], 
    "resistances": ["Grass", "Fighting", "Bug"], 
    "immunities": ["Ground"]
  },
  "Psychic": { 
    "weaknesses": ["Bug", "Ghost", "Dark"], 
    "resistances": ["Fighting", "Psychic"], 
    "immunities": []
  },
  "Bug": { 
    "weaknesses": ["Fire", "Flying", "Rock"], 
    "resistances": ["Grass", "Fighting", "Ground"], 
    "immunities": []
  },
  "Rock": { 
    "weaknesses": ["Water", "Grass", "Fighting", "Ground", "Steel"], 
    "resistances": ["Normal", "Fire", "Poison", "Flying"], 
    "immunities": []
  },
  "Ghost": { 
    "weaknesses": ["Ghost", "Dark"], 
    "resistances": ["Bug", "Poison"], 
    "immunities": ["Normal", "Fighting"]
  },
  "Dragon": { 
    "weaknesses": ["Ice", "Dragon", "Fairy"], 
    "resistances": ["Fire", "Water", "Electric", "Grass"], 
    "immunities": []
  },
  "Dark": { 
    "weaknesses": ["Fighting", "Bug", "Fairy"], 
    "resistances": ["Ghost", "Dark"], 
    "immunities": ["Psychic"]
  },
  "Steel": { 
    "weaknesses": ["Fire", "Fighting", "Ground"], 
    "resistances": ["Normal", "Grass", "Ice", "Flying", "Psychic", "Bug", "Rock", "Dragon", "Steel", "Fairy"], 
    "immunities": []
  },
  "Fairy": { 
    "weaknesses": ["Poison", "Steel"], 
    "resistances": ["Fighting", "Bug", "Dark"], 
    "immunities": []
  }
};

interface PokemonType {
  type1: number;
  type2: number;
}

const PokemonTypeCalculator = () => {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([
    { type1: 0, type2: 0 },
    { type1: 0, type2: 0 },
    { type1: 0, type2: 0 },
    { type1: 0, type2: 0 },
    { type1: 0, type2: 0 },
    { type1: 0, type2: 0 },
  ]);

  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [resistances, setResistances] = useState<string[]>([]);
  const [immunities, setImmunities] = useState<string[]>([]);
  const [recommended, setRecommended] = useState<string[]>([]);

  const handleTypeChange = (index: number, type: 'type1' | 'type2', value: string) => {
    const updatedPokemonTypes = [...pokemonTypes];
    updatedPokemonTypes[index] = {
      ...updatedPokemonTypes[index],
      [type]: parseInt(value, 10),
    };
    setPokemonTypes(updatedPokemonTypes);
  };

  useEffect(() => {
    calculateTeam();
  }, [pokemonTypes]);

  const calculateTeam = () => {
    const weaknessesSet = new Set<string>();
    const resistancesSet = new Set<string>();
    const immunitiesSet = new Set<string>();
  
    // Collect weaknesses, resistances, and immunities
    pokemonTypes.forEach(pokemonType => {
      const types = [pokemonType.type1, pokemonType.type2]
        .filter(type => type > 0)
        .map(typeIndex => typeOptions[typeIndex]);
  
      types.forEach(type => {
        const currentTypeData = typeData[type];
        
        if (currentTypeData) {
          currentTypeData.weaknesses.forEach(weakness => {
            weaknessesSet.add(weakness);
          });
          currentTypeData.resistances.forEach(resistance => {
            resistancesSet.add(resistance);
          });
          currentTypeData.immunities.forEach(immunity => {
            immunitiesSet.add(immunity);
          });
        }
      });
    });
  
    // Remove weaknesses that are also resisted
    const filteredWeaknesses = Array.from(weaknessesSet).filter(weakness => !resistancesSet.has(weakness));
    
    // Remove resistances that are also weaknesses
    const filteredResistances = Array.from(resistancesSet).filter(resistance => !weaknessesSet.has(resistance));
    
    // Remove immunities that are also in the weaknesses list
    const filteredWeaknessesWithImmunities = filteredWeaknesses.filter(weakness => !immunitiesSet.has(weakness));
  
    // Not resisted types
    const filteredNotResisted = typeOptions.slice(1).filter(type => !filteredResistances.includes(type));
  
    setWeaknesses(filteredWeaknessesWithImmunities);
    setResistances(filteredResistances);
    setImmunities(Array.from(immunitiesSet));
    setRecommended(filteredNotResisted);
  };
  
  

  const getTypeData = (type1: number, type2: number): TypeData => {
    const type1Data = type1 > 0 ? typeData[typeOptions[type1]] : { weaknesses: [], resistances: [], immunities: [] };
    const type2Data = type2 > 0 ? typeData[typeOptions[type2]] : { weaknesses: [], resistances: [], immunities: [] };
    const combinedWeaknesses = new Set([...type1Data.weaknesses, ...type2Data.weaknesses]);
    const combinedResistances = new Set([...type1Data.resistances, ...type2Data.resistances]);
    const combinedImmunities = new Set([...type1Data.immunities, ...type2Data.immunities]);
    const filteredWeaknesses = Array.from(combinedWeaknesses).filter(weakness => !combinedResistances.has(weakness) && !combinedImmunities.has(weakness));
    const filteredResistances = Array.from(combinedResistances).filter(resistance => !combinedWeaknesses.has(resistance) && !combinedImmunities.has(resistance));
    return {
      weaknesses: filteredWeaknesses,
      resistances: filteredResistances,
      immunities: Array.from(combinedImmunities),
    };
  };
  

  const reset = () => {
    setPokemonTypes([
      { type1: 0, type2: 0 },
      { type1: 0, type2: 0 },
      { type1: 0, type2: 0 },
      { type1: 0, type2: 0 },
      { type1: 0, type2: 0 },
      { type1: 0, type2: 0 },
    ]);
    setWeaknesses([]);
    setResistances([]);
    setImmunities([]);
    setRecommended([]);
  };

  return (
    <div id="main" className='flex flex-col items-center text-gray-700'>
      {/* <button onClick={reset} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded">Reset</button> */}
      <TypeTable 
        pokemonTypes={pokemonTypes}
        typeOptions={typeOptions}
        handleTypeChange={handleTypeChange}
        weaknesses={weaknesses}
        resistances={resistances}
        immunities={immunities}
        recommended={recommended}
        getTypeData={getTypeData}
      />
      
    </div>
  );
};

export default PokemonTypeCalculator;
