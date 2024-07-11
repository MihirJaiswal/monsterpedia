'use client'
import React, { useState } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PhotoFrameProps {
  team: Pokemon[];
  uploadedImage: string | null;
  photoFrameRef: React.RefObject<HTMLDivElement>;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ team, uploadedImage, photoFrameRef }) => {
  const [userName, setUserName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <>
    <h3 className="text-3xl font-extrabold mb-6 text-gray-800 pt-8 text-center">Team</h3>
    <div
      ref={photoFrameRef}
      className="flex flex-col md:flex-row items-center justify-center p-8 space-y-8 md:space-y-0 space-x-8"
    >
      <div className="flex-1 flex flex-col items-center md:items-start">
      
        <div className="flex flex-wrap gap-6 justify-center">
          {team.map((pokemon) => (
            <div
              key={pokemon.id}
              className="relative w-32 h-32 overflow-hidden rounded-lg border border-gray-200 shadow-lg"
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-full object-cover transition-transform transform hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-xs text-center py-1 px-2 rounded-t-lg">
                {pokemon.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center">
        {uploadedImage ? (
          <div className="w-full flex flex-col items-center">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-56 h-56 object-cover border-4 border-gray-200 rounded-lg shadow-xl transition-transform transform hover:scale-105"
            />
            <input
              type="text"
              value={userName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="mt-4 w-54 max-w-xs p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-56 border-4 border-gray-200 rounded-lg bg-gray-100 text-gray-600">
            <p className="text-lg">Upload your image </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default PhotoFrame;
