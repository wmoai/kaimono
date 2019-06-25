import * as React from 'react';
import styled from 'styled-components';
import { Identifier } from '../entities/Entity';
import ShoppingList from '../entities/ShoppingList';
import Item from '../entities/Item';

import ItemForm from './ItemForm';
import Items from './Items';
import * as Icons from './elements/Icons';
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
  openModal: (contents: React.ReactNode, onConfirm: () => void) => void;
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
    onDeleteItem,
    openModal
  } = props;
  useSubscription(id);
  React.useEffect(() => {
    initShoppingList(id);
  }, [id.toValue()]);

  const handlePurchase = () => {
    const checked = items.filter(item => {
      return !!checkedItems.find(itemId => itemId.equal(item.id));
    });
    openModal(
      <div>
        以下のアイテムを購入済みにします。
        <br />
        よろしいですか？
        <ul>
          {checked.map(item => {
            return <li key={item.id.toValue()}>{item.name}</li>;
          })}
        </ul>
      </div>,
      () => {
        onPurchase();
      }
    );
  };
  const handleDeleteItem = (item: Item) => {
    openModal(
      <div>
        <b>{item.name}</b>を削除します。
        <br />
        よろしいですか？
      </div>,
      () => {
        onDeleteItem(item);
      }
    );
  };

  return (
    <Container>
      <div>
        <ItemForm onAddItem={name => onAddItem(name)} />
        <ListHeader>
          <ListTitle>買うものリスト</ListTitle>
          <PurchaseButton
            onClick={() => handlePurchase()}
            disabled={checkedItems.length == 0}
          >
            <Icons.Check size={'1.2em'} />
            購入済にする
          </PurchaseButton>
        </ListHeader>
      </div>
      <ScrollArea>
        <Items
          items={items}
          checkedItems={checkedItems}
          onCheck={item => onToggleItemCheck(item)}
          onDelete={item => handleDeleteItem(item)}
        />
        {purchased.length > 0 && (
          <React.Fragment>
            <PurchasedHeader>購入済み</PurchasedHeader>
            <Items
              items={purchased}
              checkedItems={checkedItems}
              isPurchased={true}
              onDelete={item => handleDeleteItem(item)}
            />
          </React.Fragment>
        )}
      </ScrollArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 15px;
  box-sizing: border-box;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: scroll;
  box-sizing: border-box;
  padding-bottom: 40px;
`;

const ListIndex = styled.h2`
  margin: 0;
  font-size: 1em;
  font-weight: normal;
`;

const ListHeader = styled(ListIndex)`
  @media (min-width: 800px) {
    display: flex;
    align-items: center;
  }
  font-size: 1.3em;
  padding: 10px 15px;
`;

const ListTitle = styled.div`
  color: #444;
`;

const PurchaseButton = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  @media (max-width: 799px) {
    margin-top: 5px;
  }
  @media (min-width: 800px) {
    margin: 0;
    margin-left: auto;
  }
  border: none;
  outline: none;
  font-size: 0.8em;
  color: white;
  border-radius: 12px;
  white-space: nowrap;
  user-select: none;
  &:disabled {
    background-color: lightgray;
  }
  &:enabled {
    background-color: mediumseagreen;
    cursor: pointer;
  }
  & > ${Icons.Icon} {
    margin-right: 5px;
  }
`;

const PurchasedHeader = styled(ListIndex)`
  padding: 8px 15px;
  font-size: 0.9em;
  color: #666;
  background-color: #f0f0f0;
  margin-top: 60px;
`;
