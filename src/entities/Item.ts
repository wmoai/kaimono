import { firestore } from 'firebase';
import { Identifier } from './Entity';

export default interface Item {
  id: Identifier<Item>;
  name: string;
  isChecked: boolean;
  createdAt: Date;
}

export function newItem(name: string, now: Date) {
  return {
    name,
    isChecked: false,
    createdAt: now
  };
}

export function documentToItem(doc: firestore.QueryDocumentSnapshot) {
  const data = doc.data();
  return {
    id: new Identifier<Item>(doc.id),
    name: data.name,
    isChecked: data.isChecked || false,
    createdAt: data.createdAt
  };
}
