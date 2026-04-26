import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PhotoGrid from '../components/PhotoGrid';
import { useTimelines } from '../hooks/useTimelines';
import { usePhotos } from '../hooks/usePhotos';
import { motion } from 'framer-motion';

const Timeline: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { timelines, updateTimelineName } = useTimelines();
  const { photos } = usePhotos();
  const [timeline, setTimeline] = useState<any>(null);
  const [timelinePhotos, setTimelinePhotos] = useState<any[]>([]);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (id) {
      const foundTimeline = timelines.find(t => t.id === id);
      if (foundTimeline) {
        setTimeline(foundTimeline);
        setNewName(foundTimeline.name);
        const timelinePhotoIds = foundTimeline.photoIds;
        const filteredPhotos = photos.filter(p => timelinePhotoIds.includes(p.id));
        setTimelinePhotos(filteredPhotos);
      }
    }
  }, [id, timelines, photos]);

  const handleNameEdit = () => {
    if (timeline) {
      updateTimelineName(timeline.id, newName);
      setEditingName(false);
    }
  };

  if (!timeline) return <div>Timeline bulunamadı</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen bg-gray-50'
    >
      <div className='container mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <div className='flex items-center'>
            {editingName ? (
              <input
                type='text'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className='text-3xl font-bold text-gray-800 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500'
                autoFocus
              />
            ) : (
              <h1 className='text-3xl font-bold text-gray-800'>{timeline.name}</h1>
            )}
            <button
              onClick={editingName ? handleNameEdit : () => setEditingName(true)}
              className='ml-4 p-2 text-gray-500 hover:text-gray-700'
            >
              {editingName ? 'Kaydet' : 'Düzenle'}
            </button>
          </div>
          <button
            onClick={() => navigate('/')}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            Geri
          </button>
        </div>

        <PhotoGrid photos={timelinePhotos} />
      </div>
    </motion.div>
  );
};

export default Timeline;