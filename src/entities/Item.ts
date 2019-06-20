import { firestore } from 'firebase';
import { Identifier } from './Entity';

export default interface Item {
  id: Identifier<Item>;
  name: string;
  isPurchased: boolean;
  createdAt: Date;
}

export function newItem(name: string, now: Date) {
  return {
    name,
    isPurchased: false,
    createdAt: now
  };
}

export function documentToItem(doc: firestore.QueryDocumentSnapshot) {
  const data = doc.data();
  return {
    id: new Identifier<Item>(doc.id),
    name: data.name,
    isPurchased: data.isPurchased,
    createdAt: data.createdAt
  };
}
