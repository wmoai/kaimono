import * as React from 'react';
import { Identifier } from '../entities/Entity';
import Item from '../entities/Item';

import ItemList from './elements/ItemList';
import CheckButton from './elements/CheckButton';

interface Props {
  items: Item[];
  checkedItems: Identifier<Item>[];
  isPurchased?: boolean;
  onCheck?: (item: Item) => void;
  onDelete: (item: Item) => void;
}

export default function Items(props: Props) {
  const { items, checkedItems, isPurchased = false, onCheck, onDelete } = props;
  if (items.length === 0) {
    return null;
  }
  return (
    <ItemList isPurchased={isPurchased}>
      {items.map(item => {
        return (
          <li key={item.id.toValue()}>
            {!isPurchased && (
              <CheckButton
                onClick={() => onCheck && onCheck(item)}
                isChecked={!!checkedItems.find(id => id.equal(item.id))}
              />
            )}
            {item.name}
            <button onClick={() => onDelete(item)}>×</button>
          </li>
        );
      })}
    </ItemList>
  );
}
