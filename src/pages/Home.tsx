import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadZone from '../components/UploadZone';
import TimelineList from '../components/Timeline/TimelineList';
import { usePhotos } from '../hooks/usePhotos';
import { useTimelines } from '../hooks/useTimelines';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { photos, addPhotos } = usePhotos();
  const { timelines, createTimeline } = useTimelines();
  const [lastTimelineId, setLastTimelineId] = useState<string | null>(null);

  useEffect(() => {
    const savedTimelineId = localStorage.getItem('lastTimelineId');
    if (savedTimelineId) {
      setLastTimelineId(savedTimelineId);
    }
  }, []);

  const handlePhotosUploaded = (newPhotos: any[]) => {
    addPhotos(newPhotos);
    const timelineId = createTimeline(
      `Yeni Timeline ${new Date().toLocaleDateString()}`,
      newPhotos.map(p => p.id)
    );
    localStorage.setItem('lastTimelineId', timelineId);
    navigate(`/timeline/${timelineId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='min-h-screen bg-gray-50'
    >
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>SK-Time4Photo</h1>

        <UploadZone onPhotosUploaded={handlePhotosUploaded} />

        {lastTimelineId && (
          <div className='mt-12'>
            <h2 className='text-xl font-semibold text-gray-700 mb-4'>Son Açılan Timeline</h2>
            <TimelineList timelines={timelines.filter(t => t.id === lastTimelineId)} />
          </div>
        )}

        {timelines.length > 0 && (
          <div className='mt-12'>
            <h2 className='text-xl font-semibold text-gray-700 mb-4'>Tüm Timelineler</h2>
            <TimelineList timelines={timelines} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;