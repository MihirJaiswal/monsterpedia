import React from 'react';
import { FaDownload } from 'react-icons/fa';

interface ImageUploadProps {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  downloadImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleImageUpload, downloadImage }) => {
  return (
    <div className="mb-4 flex flex-col md:flex-row justify-center items-center">
     <div className=''>
     <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
     </div>
      <div className="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
          <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
          <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
          <span className="relative z-20 flex items-center text-sm">
           <div className="flex items-center justify-between gap-2">
           <FaDownload/>
            <button  onClick={downloadImage} className="z-30">
              Download Pokémon
            </button>
           </div>
          </span>
        </div>
    </div>
  );
};

export default ImageUpload;
