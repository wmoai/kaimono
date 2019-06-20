import * as React from 'react';
import { Identifier } from '../entities/Entity';
import List from '../entities/List';
import Item from '../entities/Item';

import CheckButton from './CheckButton';
import { useSubscription } from '../hooks/list';

interface Props {
  listId: Identifier<List>;
  items: Item[];
  checkedItems: Identifier<Item>[];
  initList: () => void;
  onAddItem: (name: string, listId: Identifier<List>) => void;
  onToggleItemCheck: (item: Item) => void;
}

export default function List(props: Props) {
  const {
    listId,
    items,
    checkedItems,
    initList,
    onAddItem,
    onToggleItemCheck
  } = props;
  useSubscription(listId);
  React.useEffect(() => {
    initList();
  }, [listId.toValue()]);

  const itemInput = React.useRef(null);
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = itemInput.current;
    if (target) {
      onAddItem(target.value, listId);
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
    </div>
  );
}
