import { useEffect } from 'react';

import { Identifier } from '../entities/Entity';
import List from '../entities/List';
import { subscribeItems, unsubscribeItems } from '../entities/List';

export function useSubscription(id: Identifier<List>) {
  useEffect(() => {
    subscribeItems(id);
    return () => {
      unsubscribeItems(id);
    };
  }, [id.toValue()]);
}
