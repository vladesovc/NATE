import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);

    const transaction = db.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate');

    const result = await store.put({value: content, id:1 });

    console.log('Content added to Db:', result);
  } catch (error) {
    console.error('putDb not implemented', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);

    const transaction = db.transaction('jate', 'readonly');
    const store = transaction.objectStore('jate');

    const content = await store.get(1);

    console.log('All content from database:', content);

    return content?.value;
  } catch (error) {
    console.error('getDb not implemented', error);
    return null;
  }
};

initdb();
