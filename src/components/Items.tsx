import * as React from 'react';
import * as dayjs from 'dayjs';
import { Identifier } from '../entities/Entity';
import Item from '../entities/Item';

import ItemList from './elements/ItemList';
import CheckButton from './elements/CheckButton';
import PurchasedDate from './elements/PurchasedDate';

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
            {isPurchased && item.purchasedAt && (
              <PurchasedDate>
                {dayjs(item.purchasedAt).format('YYYY/MM/DD HH:mm')}
              </PurchasedDate>
            )}
            <button onClick={() => onDelete(item)}>×</button>
          </li>
        );
      })}
    </ItemList>
  );
}
