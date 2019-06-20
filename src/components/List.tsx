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
  initList: (id: Identifier<List>) => void;
  onAddItem: (name: string) => void;
  onToggleItemCheck: (item: Item) => void;
  onPurchase: () => void;
}

export default function List(props: Props) {
  const {
    id,
    items,
    checkedItems,
    initList,
    onAddItem,
    onToggleItemCheck,
    onPurchase
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
      {items && (
        <ul>
          {items.map(item => {
            return (
              <li key={item.id.toValue()}>
                <CheckButton
                  onClick={() => onToggleItemCheck(item)}
                  isChecked={!!checkedItems.find(id => id.equal(item.id))}
                />
                {item.name}
              </li>
            );
          })}
        </ul>
      )}
      {checkedItems.length > 0 && (
        <button onClick={() => onPurchase()}>購入完了</button>
      )}
    </div>
  );
}
