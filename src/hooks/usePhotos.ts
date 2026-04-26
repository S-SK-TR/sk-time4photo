import { useState, useEffect } from 'react';
import { db } from '../db/dexie';

interface Photo {
  id: string;
  fileName: string;
  createdAt: Date;
  year: number;
  month: number;
  url: string;
}

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const allPhotos = await db.photos.toArray();
      setPhotos(allPhotos);
    };
    loadPhotos();
  }, []);

  const addPhotos = async (newPhotos: Photo[]) => {
    await db.photos.bulkAdd(newPhotos);
    setPhotos([...photos, ...newPhotos]);
  };

  return { photos, addPhotos };
};