import { db } from '../firebase';
import store from '../store';
import Item, { documentToItem, newItem } from './Item';
import { Identifier } from './Entity';

import { sync } from '../actions/shoppingList';

export default interface ShoppingList {
  id: Identifier<ShoppingList>;
  createdAt: Date;
  updatedAt: Date;
}

function shoppingListCollection() {
  return db.collection('shoppinglists');
}
function shoppingListDoc(id: Identifier<ShoppingList>) {
  return shoppingListCollection().doc(id.toValue());
}
function itemsCollection(shoppingListId: Identifier<ShoppingList>) {
  return shoppingListDoc(shoppingListId).collection('items');
}
function itemDocument(
  shoppingListId: Identifier<ShoppingList>,
  itemId: Identifier<Item>
) {
  return itemsCollection(shoppingListId).doc(itemId.toValue());
}

export async function create() {
  const now = new Date();
  const ref = await shoppingListCollection().add({
    createdAt: now,
    updatedAt: now
  });
  return ref.id;
}

function timestamp(id: Identifier<ShoppingList>, now?: Date) {
  shoppingListDoc(id).update({
    updatedAt: now || new Date()
  });
}

export function subscribeItems(id: Identifier<ShoppingList>) {
  itemsCollection(id).onSnapshot(querySnapshot => {
    const items: Item[] = querySnapshot.docs.map(doc => documentToItem(doc));
    store.dispatch(sync(items));
  });
}

export function unsubscribeItems(id: Identifier<ShoppingList>) {
  itemsCollection(id).onSnapshot(() => {});
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
  const batch = db.batch();
  itemIds.forEach(itemId => {
    batch.update(itemsCollection(shoppingListId).doc(itemId.toValue()), {
      isPurchased: true
    });
  });
  batch.commit().then(() => {
    timestamp(shoppingListId);
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
