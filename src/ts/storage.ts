import { createStore, get, update, set } from 'idb-keyval';

const customStore = createStore('Modo', 'person');
/**
 * Set something in indexedDB
 * */
export const toStore = (key: IDBValidKey, value: any): Promise<void> => set(key, value, customStore);
/**
 * Get something from indexedDB
 * */
export const fromStore = (key: any): any => get(key, customStore);

/**
* Update a value in indexedDB 
*/
export const updateStorage = (key: any, fn: any) => update(key, fn, customStore)

