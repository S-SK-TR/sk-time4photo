import Dexie, { Table } from 'dexie';

interface Photo {
  id: string;
  fileName: string;
  createdAt: Date;
  year: number;
  month: number;
  url: string;
}

interface Timeline {
  id: string;
  name: string;
  photoIds: string[];
  createdAt: Date;
}

export class AppDB extends Dexie {
  photos!: Table<Photo>;
  timelines!: Table<Timeline>;

  constructor() {
    super('SKTime4PhotoDB');
    this.version(1).stores({
      photos: 'id, createdAt, year, month',
      timelines: 'id, name, createdAt'
    });
  }
}

export const db = new AppDB();