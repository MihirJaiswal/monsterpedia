'use client'
import React from 'react';

interface ImageUploadProps {
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  downloadImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ handleImageUpload, downloadImage }) => {
  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <button
        onClick={downloadImage}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Download Team with Image
      </button>
    </div>
  );
};

export default ImageUpload;
