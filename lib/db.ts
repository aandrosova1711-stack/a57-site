import Datastore from 'nedb-promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export const usersDb = Datastore.create({ filename: path.join(dataDir, 'users.db'), autoload: true });
export const requestsDb = Datastore.create({ filename: path.join(dataDir, 'requests.db'), autoload: true });
export const regulationsDb = Datastore.create({ filename: path.join(dataDir, 'regulations.db'), autoload: true });
export const publicRequestsDb = Datastore.create({ filename: path.join(dataDir, 'public_requests.db'), autoload: true });

export async function initDb() {
  await usersDb.ensureIndex({ fieldName: 'email', unique: true });
  await requestsDb.ensureIndex({ fieldName: 'number' });
}

let counter = Date.now();
export function generateId(): string {
  return (++counter).toString(36) + Math.random().toString(36).slice(2, 6);
}

export async function getNextRequestNumber(): Promise<number> {
  const last = await requestsDb.findOne({}).sort({ number: -1 });
  return last ? (last as any).number + 1 : 1001;
}
