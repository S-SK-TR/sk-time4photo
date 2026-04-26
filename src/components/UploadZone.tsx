import React, { useState, useRef } from 'react';
import { usePhotos } from '../hooks/usePhotos';
import { motion } from 'framer-motion';
import exifr from 'exifr';

interface UploadZoneProps {
  onPhotosUploaded: (photos: any[]) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onPhotosUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addPhotos } = usePhotos();

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      await processFiles(files);
    }
  };

  const processFiles = async (files: File[]) => {
    setIsLoading(true);
    const processedPhotos = [];

    for (const file of files) {
      if (!file.type.match('image.*')) continue;

      const url = URL.createObjectURL(file);
      const exifData = await exifr.parse(file);
      const createdAt = exifData?.DateTimeOriginal ? new Date(exifData.DateTimeOriginal) : new Date(file.lastModified);

      const photo = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        fileName: file.name,
        createdAt,
        year: createdAt.getFullYear(),
        month: createdAt.getMonth() + 1,
        url
      };

      processedPhotos.push(photo);
    }

    addPhotos(processedPhotos);
    onPhotosUploaded(processedPhotos);
    setIsLoading(false);
  };

  return (
    <motion.div
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept='image/*'
        className='hidden'
      />
      {isLoading ? (
        <div className='flex flex-col items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4'></div>
          <p className='text-gray-600'>Fotoğraflar işleniyor...</p>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <svg className='w-12 h-12 text-gray-400 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
          </svg>
          <p className='text-gray-600'>Fotoğrafları buraya sürükle veya tıkla</p>
          <p className='text-sm text-gray-500 mt-2'>Birden fazla fotoğraf seçebilirsiniz</p>
        </div>
      )}
    </motion.div>
  );
};

export default UploadZone;