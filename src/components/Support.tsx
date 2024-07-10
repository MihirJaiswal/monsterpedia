import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa'; // Import icons for support methods
import UpcomingFeatures from '@/components/Upcoming'
import PokemonGameFeature from './other';

const SupportMe = () => {
  return (
    <section id="support-me" className="container relative md:w-[90%] mx-auto my-12 p-8 flex flex-col items-center justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border border-gray-400 text-center">
            <UpcomingFeatures/>
      <div className='flex flex-col items-center justify-center border p-8 rounded-md'>
      <h2 className="text-4xl font-bold text-gray-100 mb-6">Support Me</h2>
      <p className="text-lg text-gray-300 mb-6">
        If you enjoy using our website and would like to support the development, please consider making a donation or following us on social media. Your support helps us keep improving and adding new features!
      </p>
      <div className="flex space-x-6">
        <a href="https://paypal.me/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          <FaLinkedin size={40} />
        </a>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
          <FaTwitter size={40} />
        </a>
        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
          <FaGithub size={40} className='text-white' />
        </a>
      </div>
      </div>
      <div>
      <PokemonGameFeature/>
      </div>
    </section>
  );
};

export default SupportMe;
