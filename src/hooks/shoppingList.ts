import { useEffect } from 'react';

import { Identifier } from '../entities/Entity';
import ShoppingList from '../entities/ShoppingList';
import { subscribeItems, unsubscribeItems } from '../entities/ShoppingList';

export function useSubscription(id: Identifier<ShoppingList>) {
  useEffect(() => {
    subscribeItems(id);
    return () => {
      unsubscribeItems(id);
    };
  }, [id.toValue()]);
}
