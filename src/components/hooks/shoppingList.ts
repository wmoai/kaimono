import { useEffect } from 'react';

import { Identifier } from '../../entities/Entity';
import ShoppingList from '../../entities/ShoppingList';
import { subscribe } from '../../entities/ShoppingList';

export function useSubscription(id: Identifier<ShoppingList>) {
  useEffect(() => {
    const unsubscribe = subscribe(id);
    return () => {
      unsubscribe();
    };
  }, [id.toString()]);
}
