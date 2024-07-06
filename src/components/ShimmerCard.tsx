import React from 'react';

const ShimmerCard: React.FC = () => {
  return (
    <div className="relative h-full w-full py-4 px-6 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 transform transition-transform hover:scale-105">
      <div className="flex flex-col items-center justify-center">
        <div className="relative md:w-36 md:h-36 w-28 md:mx-auto mb-4">
          <div className="absolute inset-0 flex justify-center items-center z-0 bg-card rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
            <div className="md:w-36 md:h-36 rounded-full border border-gray-300 relative flex justify-center items-center">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-[1px] bg-gray-300 transform rotate-45 left-2 animate-pulse"></div>
                <div className="absolute w-10 h-10 rounded-full border border-white flex justify-center items-center animate-pulse"></div>
                <div className="absolute w-full h-[1px] bg-gray-300 transform rotate-45 right-2 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center bg-gray-300 animate-pulse rounded-full"></div>
        </div>
        <p className="text-center font-bold text-[#011434] uppercase text-base  animate-pulse w-2/3 h-5 rounded">Loading...</p>
        <div className="flex gap-2 mt-2">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"
            />
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-500 to-transparent opacity-20 pointer-events-none" />
    </div>
  );
};

export default ShimmerCard;
