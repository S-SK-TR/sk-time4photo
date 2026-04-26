import { useState, useEffect } from 'react';
import { db } from '../db/dexie';

interface Timeline {
  id: string;
  name: string;
  photoIds: string[];
  createdAt: Date;
}

export const useTimelines = () => {
  const [timelines, setTimelines] = useState<Timeline[]>([]);

  useEffect(() => {
    const loadTimelines = async () => {
      const allTimelines = await db.timelines.toArray();
      setTimelines(allTimelines);
    };
    loadTimelines();
  }, []);

  const createTimeline = async (name: string, photoIds: string[]) => {
    const newTimeline = {
      id: Date.now().toString(),
      name,
      photoIds,
      createdAt: new Date()
    };
    await db.timelines.add(newTimeline);
    setTimelines([...timelines, newTimeline]);
    return newTimeline.id;
  };

  const updateTimelineName = async (id: string, newName: string) => {
    await db.timelines.update(id, { name: newName });
    setTimelines(timelines.map(t => t.id === id ? { ...t, name: newName } : t));
  };

  return { timelines, createTimeline, updateTimelineName };
};