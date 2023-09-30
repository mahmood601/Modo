import { createStore, setMany, get, update, set } from 'idb-keyval';

const customStore = createStore('Modo', 'person');

export const manyToStore = (keyVal: [IDBValidKey , any][]): Promise<void> => setMany(keyVal, customStore);
export const toStore = (key: IDBValidKey, value: any): Promise<void> => set(key, value, customStore);
export const fromStore = (key: any): any => get(key, customStore);
export const updateStorage = (key: any, fn: any) => update(key, fn, customStore)
