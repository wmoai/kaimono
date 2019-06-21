import { db } from '../firebase';
import store from '../store';
import Item, { documentToItem, newItem } from './Item';
import { Identifier } from './Entity';

import { syncList } from '../actions/list';

export default interface List {
  id: Identifier<List>;
  createdAt: Date;
  updatedAt: Date;
}

export async function create() {
  const now = new Date();
  const ref = await db.collection('lists').add({
    createdAt: now,
    updatedAt: now
  });
  return ref.id;
}

function timestamp(id: Identifier<List>, now?: Date) {
  db.collection('lists')
    .doc(id.toValue())
    .update({
      updatedAt: now || new Date()
    });
}

export function subscribeItems(id: Identifier<List>) {
  db.collection('lists')
    .doc(id.toValue())
    .collection('items')
    .onSnapshot(querySnapshot => {
      const items: Item[] = querySnapshot.docs.map(doc => documentToItem(doc));
      store.dispatch(syncList(items));
    });
}

export function unsubscribeItems(id: Identifier<List>) {
  db.collection('lists')
    .doc(id.toValue())
    .collection('items')
    .onSnapshot(() => {});
}

export function addItem(name: string, listId: Identifier<List>) {
  const now = new Date();
  db.collection('lists')
    .doc(listId.toValue())
    .collection('items')
    .add(newItem(name, now))
    .then(() => {
      timestamp(listId, now);
    });
}

export function purchase(
  itemIds: Identifier<Item>[],
  listId: Identifier<List>
) {
  const itemsRef = db
    .collection('lists')
    .doc(listId.toValue())
    .collection('items');
  const batch = db.batch();
  itemIds.forEach(itemId => {
    batch.update(itemsRef.doc(itemId.toValue()), { isPurchased: true });
  });
  batch.commit().then(() => {
    timestamp(listId);
  });
}

export function delteItem(item: Item, listId: Identifier<List>) {
  db.collection('lists')
    .doc(listId.toValue())
    .collection('items')
    .doc(item.id.toValue())
    .delete()
    .then(() => {
      timestamp(listId);
    });
}
