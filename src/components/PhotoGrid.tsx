import React from 'react';
import { motion } from 'framer-motion';

interface PhotoGridProps {
  photos: any[];
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos }) => {
  // Tarihe göre grupla
  const groupedPhotos = photos.reduce((acc, photo) => {
    const year = photo.year;
    const month = photo.month;
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(photo);
    return acc;
  }, {} as Record<number, Record<number, any[]>>);

  // Yılları sırala
  const sortedYears = Object.keys(groupedPhotos).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className='space-y-12'>
      {sortedYears.map(year => (
        <div key={year} className='space-y-8'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-2xl font-bold text-gray-800 sticky top-0 bg-gray-50 py-2 z-10'
          >
            {year}
          </motion.h2>

          {/* Ayları sırala */}
          {Object.keys(groupedPhotos[year]).sort((a, b) => parseInt(b) - parseInt(a)).map(month => (
            <div key={month} className='space-y-4'>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className='text-lg font-semibold text-gray-700'
              >
                {new Date(0, parseInt(month) - 1).toLocaleString('tr-TR', { month: 'long' })}
              </motion.h3>

              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {groupedPhotos[year][month].map(photo => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className='aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow'
                  >
                    <img
                      src={photo.url}
                      alt={photo.fileName}
                      className='w-full h-full object-cover'
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;