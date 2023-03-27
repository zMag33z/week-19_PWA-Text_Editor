// import node module to run and utilize the browser's built in indexDB database.
import { openDB } from 'idb';

// here we create our 'personal' initialize function for indexDB
const initdb = async () =>
// here we'll open selected database version one
  openDB('jate', 1, {
    // run upgrade, plugin in the database data, ask if store has key name 'jate'
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //  if not create new indexDB object store field
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// future note: take repeating functionality and pass privledges of below.

// POST or PUT data to database
export const putDb = async (content) => {
  console.log('Post to the ase');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // put - avoid matching and throw error
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// GET database 
//  *note: was having weird register SW issue. checked files no issues. changed SW dest name to no resolve. questioned the result value and now runs 100 (conditional rendering).
export const getDb = async () => {
  console.log('GET this database - jate');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log(`\nJate Database\n`, result);
  return result ?.value;
};

// 'personal init' - when file imported initialize this function
initdb();