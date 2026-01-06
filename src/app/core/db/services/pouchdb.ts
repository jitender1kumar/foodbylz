import PouchDBCore from 'pouchdb-core';
import PouchDBIdb from 'pouchdb-adapter-idb';

PouchDBCore.plugin(PouchDBIdb);

export const PouchDB = PouchDBCore;
