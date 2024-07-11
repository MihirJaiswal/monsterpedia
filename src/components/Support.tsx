import React from 'react';
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'; // Import icons for support methods
import UpcomingFeatures from '@/components/Upcoming'
import Note from './Note';
import { AlertDialogDemo } from './Alert';

const SupportMe = () => {
  return (
    <div className='bg-white container relative md:w-[90%] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2 border-white text-center mb-12 px-0 md:p-6'>
      <section id="support-me" className=" mx-auto my-12  flex flex-col items-center justify-center bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-50">
      <div className='flex flex-col items-center justify-center border p-8 rounded-md'>
      <h2 className="text-4xl font-bold text-gray-100 bg-clip-padding  mb-6">Support Me</h2>
      <p className="text-lg text-gray-300 mb-6">
        If you enjoy visiting my website and would like to support the development, please consider making a donation or following me on social media. Your support helps me keep improving and adding new features!
      </p>
     <div className='flex flex-col  gap-8 justify-center items-center'>
     <div className="flex space-x-6">
        <a href="https://www.linkedin.com/in/mihir-jaiswal-322898287/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          <FaLinkedin size={40} />
        </a>
        <a href="https://www.instagram.com/monty_draws_/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
          <FaInstagram size={40} />
        </a>
        <a href="https://github.com/MihirJaiswal/MihirJaiswal" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-900">
          <FaGithub size={40} className='text-white' />
        </a>
      </div>
      <div>
        <AlertDialogDemo/>
      </div>
     </div>
      </div>
    </section>
    <Note/>
    <div className="md:absolute md:bottom-0 md:left-0 md:block opacity-90 flex items-center justify-center">
          <img src="/thank.png" alt="" className='w-52 p-2' />
        </div>
    </div>
  );
};

export default SupportMe;
