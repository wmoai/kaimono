import * as React from 'react';
import { Identifier } from '../entities/Entity';
import ShoppingList from '../entities/ShoppingList';
import Item from '../entities/Item';

import Items from './Items';
import CheckButton from './Elements/CheckButton';
import { useSubscription } from '../hooks/shoppingList';

interface Props {
  id: Identifier<ShoppingList>;
  items: Item[];
  checkedItems: Identifier<Item>[];
  purchased: Item[];
  initShoppingList: (id: Identifier<ShoppingList>) => void;
  onAddItem: (name: string) => void;
  onToggleItemCheck: (item: Item) => void;
  onPurchase: () => void;
  onDeleteItem: (item: Item) => void;
}

export default function ShoppingList(props: Props) {
  const {
    id,
    items,
    checkedItems,
    purchased,
    initShoppingList,
    onAddItem,
    onToggleItemCheck,
    onPurchase,
    onDeleteItem
  } = props;
  useSubscription(id);
  React.useEffect(() => {
    initShoppingList(id);
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
        <input type="submit" value="追加" />
      </form>
      <Items
        items={items}
        checkedItems={checkedItems}
        onCheck={item => onToggleItemCheck(item)}
        onDelete={item => onDeleteItem(item)}
      />
      <button onClick={() => onPurchase()} disabled={checkedItems.length == 0}>
        購入済にする
      </button>
      <Items
        items={purchased}
        checkedItems={checkedItems}
        isPurchased={true}
        onDelete={item => onDeleteItem(item)}
      />
    </div>
  );
}
