import React from 'react';
import { FaPaperclip } from 'react-icons/fa'; // Import the clip icon from react-icons

const Note = () => {
  return (
    <div className='relative z-10'>
      <section id="developers-note" className=" md:w-1/2 w-[85%] mx-auto my-12 md:p-8 px-4 py-8 flex flex-col items-center justify-center bg-yellow-100/80 border border-yellow-500 rounded-lg shadow-lg transform rotate-1">
        <FaPaperclip className="absolute top-4 left-4 mt-[-20px] ml-[-20px] text-4xl text-gray-700 transform -rotate-45" />
        <div className='px-4'>
          <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Developer's Note</h2>
          <div className="text-center max-w-2xl">
            <div className='flex flex-col justify-center items-center mb-6'>
            <p className="md::text-2xl text-xl text-gray-900 font-semibold leading-relaxed">
              Hello Pokémon Trainers!
            </p>
           <div className='-mt-2'>
           <img src="/underline.png" alt="" className='md:w-80 w-64 h-4' />
           <img src="/underline.png" alt="" className='md:w-80 w-64 h-4 -mt-2' />
           </div>
            </div>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              We are thrilled to share with you the latest updates and features coming to our website. Our team has been working hard to bring new functionalities and improvements to enhance your Pokémon experience. Stay tuned for exciting new features and updates that will make your journey even more enjoyable!
            </p>
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              As always, we appreciate your feedback and support. If you have any suggestions or encounter any issues, feel free to reach out to us through our contact page.
            </p>
          </div>
          <p className='absolute right-8 md:right-48 bottom-7 text-gray-900 font-bold'>- Mihir</p>
        </div>
      </section>
    </div>
  );
};

export default Note;
