import * as React from 'react';
import { Identifier } from '../entities/Entity';
import List from '../entities/List';
import Item from '../entities/Item';

import CheckButton from './CheckButton';
import { useSubscription } from '../hooks/list';

interface Props {
  id: Identifier<List>;
  items: Item[];
  checkedItems: Identifier<Item>[];
  purchased: Item[];
  initList: (id: Identifier<List>) => void;
  onAddItem: (name: string) => void;
  onToggleItemCheck: (item: Item) => void;
  onPurchase: () => void;
  onDeleteItem: (item: Item) => void;
}

export default function List(props: Props) {
  const {
    id,
    items,
    checkedItems,
    purchased,
    initList,
    onAddItem,
    onToggleItemCheck,
    onPurchase,
    onDeleteItem
  } = props;
  useSubscription(id);
  React.useEffect(() => {
    initList(id);
  }, [id.toValue()]);

  const itemInput = React.useRef(null);
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = itemInput.current;
    if (target) {
      onAddItem(target.value);
      target.value = '';
    }
  };

  return (
    <div>
      <form onSubmit={e => handleAddItem(e)}>
        <input type="text" ref={itemInput} placeholder="品目を追加" />
        <input type="submit" />
      </form>
      {items.length > 0 && (
        <ul>
          {items.map(item => {
            return (
              <li key={item.id.toValue()}>
                <CheckButton
                  onClick={() => onToggleItemCheck(item)}
                  isChecked={!!checkedItems.find(id => id.equal(item.id))}
                />
                {item.name}
                <button onClick={() => onDeleteItem(item)}>×</button>
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={() => onPurchase()} disabled={checkedItems.length == 0}>
        購入済にする
      </button>
      {purchased.length > 0 && (
        <ul>
          {purchased.map(item => {
            return <li key={item.id.toValue()}>{item.name}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
