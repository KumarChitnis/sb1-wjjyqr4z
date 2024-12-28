import { IndexedDBClient } from './idb';

export const db = new IndexedDBClient();

// Initialize database connection
db.connect().catch(console.error);