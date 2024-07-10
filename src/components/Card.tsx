import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  icon: any;
  href: string;
}

const Card = ({ title, description, icon, href }: CardProps) => {
  return (
   <>
    <Link href={href}>
    <div className="rounded-md border border-neutral-300 bg-gray-900/40 backdrop-blur-sm p-8 text-center shadow flex flex-col items-center justify-center transform transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:bg-gray-900/50 cursor-pointer">
      <div className='relative'>
        <div className="absolute inset-0 flex justify-center border-2 border-gray-300 items-center z-0 bg-card2 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 opacity-40 transition-all duration-300">
          <div className="w-36 h-36 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
            <div className="w-36 h-36 rounded-full border-2 border-gray-300 relative flex justify-center items-center">
              <div className="absolute w-full h-full flex items-center justify-center">
                <div className="absolute w-full h-[2px] bg-white transform rotate-45 left-2"></div>
                <div className="absolute w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"></div>
                <div className="absolute w-full h-[2px] bg-white transform rotate-45 right-2"></div>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={icon}
          width={124}
          height={124}
          quality='100'
          alt="icon"
          className='w-32 relative transition-transform duration-300 hover:animate-spinThreeTimes'
        />
      </div>
      <h3 className="mt-6 text-white text-xl font-bold transition-colors duration-300 hover:text-gray-300">{title}</h3>
      <p className="my-4 mb-0 font-normal leading-relaxed tracking-wide text-gray-400 text-center transition-colors duration-300 hover:text-gray-200">
        {description}
      </p>
    </div>
    </Link>
   </>
  );
};

export default Card;
