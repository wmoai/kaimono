import { db } from '../services/firebase';
import store from '../store';
import Item, { documentToItem, newItem } from './Item';
import { Identifier } from './Entity';

import { syncInfo, syncItems } from '../actions/shoppingList';

export default interface ShoppingList {
  id: Identifier<ShoppingList>;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

function shoppingListCollection() {
  return db.collection('shoppinglists');
}
function shoppingListDoc(id: Identifier<ShoppingList>) {
  return shoppingListCollection().doc(id.toString());
}
function itemsCollection(shoppingListId: Identifier<ShoppingList>) {
  return shoppingListDoc(shoppingListId).collection('items');
}
function itemDocument(
  shoppingListId: Identifier<ShoppingList>,
  itemId: Identifier<Item>
) {
  return itemsCollection(shoppingListId).doc(itemId.toString());
}

export async function create() {
  const now = new Date();
  const ref = await shoppingListCollection().add({
    title: '新しい買うものリスト',
    createdAt: now,
    updatedAt: now
  });
  return new Identifier<ShoppingList>(ref.id);
}

function timestamp(id: Identifier<ShoppingList>, now?: Date) {
  shoppingListDoc(id).update({
    updatedAt: now || new Date()
  });
}

export function subscribe(id: Identifier<ShoppingList>) {
  const unsubscribeInfo = shoppingListDoc(id).onSnapshot(doc => {
    const data = doc.data();
    const title =
      data.title && data.title !== '' ? data.title : '買うものリスト';
    store.dispatch(syncInfo(title));
  });
  const unsubscribeItems = itemsCollection(id)
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      const items: Item[] = querySnapshot.docs.map(doc => documentToItem(doc));
      store.dispatch(syncItems(items));
    });

  return () => {
    unsubscribeInfo();
    unsubscribeItems();
  };
}

export function updateTitle(
  title: string,
  shoppingListId: Identifier<ShoppingList>
) {
  shoppingListDoc(shoppingListId)
    .update({
      title
    })
    .then(() => {
      timestamp(shoppingListId);
    });
}

export function addItem(
  name: string,
  shoppingListId: Identifier<ShoppingList>
) {
  const now = new Date();
  itemsCollection(shoppingListId)
    .add(newItem(name, now))
    .then(() => {
      timestamp(shoppingListId, now);
    });
}

export function purchase(
  itemIds: Identifier<Item>[],
  shoppingListId: Identifier<ShoppingList>
) {
  const now = new Date();
  const batch = db.batch();
  itemIds.forEach(itemId => {
    batch.update(itemsCollection(shoppingListId).doc(itemId.toString()), {
      isPurchased: true,
      purchasedAt: now
    });
  });
  batch.commit().then(() => {
    timestamp(shoppingListId, now);
  });
}

export function delteItem(
  item: Item,
  shoppingListId: Identifier<ShoppingList>
) {
  itemDocument(shoppingListId, item.id)
    .delete()
    .then(() => {
      timestamp(shoppingListId);
    });
}
