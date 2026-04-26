import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TimelineListProps {
  timelines: any[];
}

const TimelineList: React.FC<TimelineListProps> = ({ timelines }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {timelines.map((timeline, index) => (
        <motion.div
          key={timeline.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Link
            to={`/timeline/${timeline.id}`}
            className='block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100'
          >
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>{timeline.name}</h3>
            <p className='text-sm text-gray-500'>
              {timeline.photoIds.length} fotoğraf •
              {new Date(timeline.createdAt).toLocaleDateString('tr-TR')}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default TimelineList;