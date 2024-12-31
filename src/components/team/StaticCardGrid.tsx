import React from 'react';
import Image from 'next/image';
import go from '../../../public/About/go.webp'

const StaticCard: React.FC = () => {
  return (
    <div className="rounded-lg shadow-lg p-4 flex flex-col items-center w-full max-w-xs md:w-60 mx-auto bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100 relative">
      <div className="w-24 h-24 md:w-32 md:h-32 absolute left-1/2 transform -translate-x-1/2 top-4 inset-0 flex justify-center border-2 border-gray-300 items-center z-0 bg-gray-200 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
          <div className="absolute w-full h-full flex items-center justify-center">
            <div className="absolute w-full h-[2px] bg-gray-300 transform rotate-45 left-2"></div>
            <div className="absolute w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex justify-center items-center"></div>
            <div className="absolute w-full h-[2px] bg-gray-300 transform rotate-45 right-2"></div>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <Image
         src={go}
         alt="place holder"
         width={200}
         height={200}
         loading='lazy'
         className="w-24 md:w-32 mb-8 md:mb-12" />
        <div>
          <img src="/plus.png" alt="" className="w-8 md:w-12" />
        </div>
      </div>
    </div>
  );
};

export default StaticCard;
