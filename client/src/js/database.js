import { openDB } from 'idb';

const initdb = async () =>
  openDB('jotspot', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jotspot')) {
        console.log('jotspot database already exists');
        return;
      }
      db.createObjectStore('jotspot', { keyPath: 'id', autoIncrement: true });
      console.log('jotspot database created');
    },
  });

export const putDb = async (content) => {
  console.log('Put to the database');
  const jotspotDb = await openDB('jotspot', 1);
  const tx = jotspotDb.transaction('jotspot', 'readwrite');
  const store = tx.objectStore('jotspot');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('data saved to the DB', result);
}

export const getDb = async () => {
  console.log('GET from the database');
  const jotspotDb = await openDB('jotspot', 1);
  const tx = jotspotDb.transaction('jotspot', 'readonly');
  const store = tx.objectStore('jotspot');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
}

initdb();