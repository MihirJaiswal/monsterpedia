// components/Shimmer.js

import React from 'react';
import Image from 'next/image';
import gif from '../../../public/pokeball-loader.gif';

const Shimmer = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-hero">
      <div className="absolute inset-0 bg-bg2 bg-repeat-round bg-contain opacity-5 pointer-events-none hidden md:block"></div>
      <div className="absolute inset-0 bg-bg4 bg-repeat-round bg-contain opacity-10 pointer-events-none md:hidden"></div>
      
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="flex items-center justify-center">
          <Image
            src={gif}
            alt="Loading..."
            width={100}
            height={100}
            className="animate-spin object-cover"
          />
        </div>
        <p className="text-white text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Shimmer;
