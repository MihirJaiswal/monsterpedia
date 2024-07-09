"use client";

import React, { useState, useRef } from 'react';
import htmlToImage from 'html-to-image';
import axios from 'axios';
import PokemonForm from './PokemonForm';
import Preview from './Preview';
import pikachuImg from '../../../public/pikachu.jpg'; // Import static image

const PokemonCreator: React.FC = () => {
  const [name, setName] = useState('');
  const [hp, setHp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [spAttack, setSpAttack] = useState('');
  const [spDefense, setSpDefense] = useState('');
  const [speed, setSpeed] = useState('');
  const [ability, setAbility] = useState('');
  const [abilityDescription, setAbilityDescription] = useState('');
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(pikachuImg.src); // Use img.src for string URL
  const previewRef = useRef<HTMLDivElement>(null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image generation using the unofficial Cartoon Network API
  const handleImageGeneration = async () => {
    try {
      const response = await axios.get('https://www.cartoons.org/api/characters');
      const characters = response.data;
      
      if (characters.length > 0) {
        // Extract image URLs
        const imageUrls = characters.map((character: any) => character.image_url);
        
        if (imageUrls.length > 0) {
          // Select a random image
          const randomIndex = Math.floor(Math.random() * imageUrls.length);
          const randomImageUrl = imageUrls[randomIndex];
          setPreviewImage(randomImageUrl);
        } else {
          throw new Error('No images found');
        }
      } else {
        throw new Error('No characters found');
      }
    } catch (error) {
      console.error('Error fetching cartoon images:', error);
      setPreviewImage(pikachuImg.src); // Fallback to placeholder image
    }
  };

  // Handle download
  const handleDownload = async () => {
    if (previewRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current);
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'pokemon.png';
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  // Handle types change
  const handleType1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType1(e.target.value);
  };

  const handleType2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType2(e.target.value);
  };

  return (
    <div className='flex flex-col md:flex-row mt-28 mb-12 mx-12'>
      <div className='flex-1'>
        <PokemonForm
          name={name}
          hp={hp}
          attack={attack}
          defense={defense}
          spAttack={spAttack}
          spDefense={spDefense}
          speed={speed}
          ability={ability}
          abilityDescription={abilityDescription}
          type1={type1}
          type2={type2}
          image={image}
          previewImage={previewImage}
          onNameChange={(e) => setName(e.target.value)}
          onHpChange={(e) => setHp(e.target.value)}
          onAttackChange={(e) => setAttack(e.target.value)}
          onDefenseChange={(e) => setDefense(e.target.value)}
          onSpAttackChange={(e) => setSpAttack(e.target.value)}
          onSpDefenseChange={(e) => setSpDefense(e.target.value)}
          onSpeedChange={(e) => setSpeed(e.target.value)}
          onAbilityChange={(e) => setAbility(e.target.value)}
          onAbilityDescriptionChange={(e) => setAbilityDescription(e.target.value)}
          onType1Change={handleType1Change}
          onType2Change={handleType2Change}
          onImageUpload={handleImageUpload}
          onGenerateImage={handleImageGeneration}
        />
      </div>
      <Preview
        name={name}
        hp={hp}
        attack={attack}
        defense={defense}
        spAttack={spAttack}
        spDefense={spDefense}
        speed={speed}
        ability={ability}
        abilityDescription={abilityDescription}
        type1={type1}
        type2={type2}
        previewImage={previewImage}
        ref={previewRef}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default PokemonCreator;
