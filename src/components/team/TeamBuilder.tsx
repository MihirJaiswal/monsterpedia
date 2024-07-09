// TeamBuilder.tsx
'use client';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import PokemonSelect from './PokemonSelect';
import PhotoFrame from './PhotoFrame';
import ImageUpload from './ImageUpload';
import PokemonCard from './PokemonCard'; // Import the PokemonCard component
import StaticCard from './StaticCardGrid'; // Import the StaticCard component

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const TeamBuilder: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const photoFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const fetchedPokemonList: Pokemon[] = [];
        const generationCounts: Record<number, number> = {
          1: 151, // Gen 1
          2: 251, // Gen 2
          3: 386, // Gen 3
          4: 493, // Gen 4
          5: 649, // Gen 5
          6: 721, // Gen 6
          7: 809, // Gen 7
          8: 898, // Gen 8
          9: 1010, // Gen 9
          10: 1000, // Gen 10
        };
        const currentGeneration = 9; // Update this to the current generation
        const totalPokemon = generationCounts[currentGeneration] || 1010; // Fallback to the latest known total

        const requests = [];
        for (let i = 1; i <= totalPokemon; i++) { // Fetch Pokémon up to the current total
          requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
        }

        const responses = await Promise.all(requests);

        responses.forEach((response) => {
          const { id, name, sprites, types } = response.data;
          fetchedPokemonList.push({
            id,
            name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize the first letter
            image: sprites.other['official-artwork'].front_default,
            types: types.map((type: { type: { name: string } }) => type.type.name), // Extract types
          });
        });

        setPokemonList(fetchedPokemonList);
        setFilteredPokemonList(fetchedPokemonList);
      } catch (err) {
        console.error('Failed to fetch Pokémon data.');
      }
    };

    fetchPokemonList();
  }, []);

  useEffect(() => {
    setFilteredPokemonList(
      pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, pokemonList]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = parseInt(event.target.value, 10);
    const selectedPokemon = pokemonList.find((pokemon) => pokemon.id === selectedId);
    if (selectedPokemon && !team.find((p) => p.id === selectedPokemon.id)) {
      setTeam([...team, selectedPokemon]);
    }
  };

  const removePokemonFromTeam = (id: number) => {
    setTeam(team.filter((pokemon) => pokemon.id !== id));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    if (photoFrameRef.current) {
      html2canvas(photoFrameRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'team_with_uploaded_image.png';
        link.click();
      });
    }
  };

  return (
    <div className="mt-32 px-8 md:px-16 mb-10">
      <PokemonSelect
        pokemonList={pokemonList}
        filteredPokemonList={filteredPokemonList}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSelectChange={handleSelectChange}
        teamSize={team.length} // Pass team size as a prop
      />
   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-12">
        {team.length === 0 ? (
          <>
            <StaticCard />
            <StaticCard />
            <StaticCard />
            <StaticCard />
            <StaticCard />
            <StaticCard />
          </>
        ) : (
          team.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemove={removePokemonFromTeam}
            />
          ))
        )}
      </div>
      
      {/* Conditionally render PhotoFrame and ImageUpload */}
      {team.length > 0 && (
        <div className='flex px-24 flex-col items-center justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 rounded-lg shadow-2xl mt-16'>
          <PhotoFrame
            team={team}
            uploadedImage={uploadedImage}
            photoFrameRef={photoFrameRef}
          />
          <ImageUpload
            handleImageUpload={handleImageUpload}
            downloadImage={downloadImage}
          />
        </div>
      )}
    </div>
  );
};

export default TeamBuilder;
