import * as React from 'react';
import styled from 'styled-components';
import { Identifier } from '../entities/Entity';
import ShoppingList from '../entities/ShoppingList';
import Item from '../entities/Item';

import * as COLORS from './colors';
import ContentsContainer from './elements/ContentsContainer';
import Header from './Header';
import ItemForm from './ItemForm';
import Items from './Items';
import * as Icons from './elements/Icons';
import { useSubscription } from './hooks/shoppingList';

let debounce: number;

interface Props {
  id: Identifier<ShoppingList>;
  title: string;
  items: Item[];
  checkedItems: Identifier<Item>[];
  purchased: Item[];
  initShoppingList: (id: Identifier<ShoppingList>) => void;
  onUpdateTitle: (title: string) => void;
  onAddItem: (name: string) => void;
  onToggleItemCheck: (item: Item) => void;
  onPurchase: () => void;
  onDeleteItem: (item: Item) => void;
  openModal: (contents: React.ReactNode, onConfirm: () => void) => void;
}

export default function ShoppingList(props: Props) {
  const {
    id,
    title,
    items,
    checkedItems,
    purchased,
    initShoppingList,
    onUpdateTitle,
    onAddItem,
    onToggleItemCheck,
    onPurchase,
    onDeleteItem,
    openModal
  } = props;
  useSubscription(id);
  React.useEffect(() => {
    initShoppingList(id);
  }, [id.toString()]);

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
            return <li key={item.id.toString()}>{item.name}</li>;
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

  const [titleBuffer, setTitleBuffer] = React.useState('');
  const handleOnChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setTitleBuffer(target.value);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      onUpdateTitle(target.value);
    }, 3000);
  };
  React.useEffect(() => {
    setTitleBuffer(title);
  }, [title]);

  return (
    <React.Fragment>
      <Header />
      <Container>
        <div>
          <ItemForm onAddItem={name => onAddItem(name)} />
          <ListHeader>
            <ListTitle
              value={titleBuffer}
              onChange={e => handleOnChangeTitle(e)}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  (e.target as HTMLElement).blur();
                }
              }}
            />
            {items.length > 0 && (
              <PurchaseButton
                onClick={() => handlePurchase()}
                disabled={checkedItems.length == 0}
              >
                <Icons.Check size={'1.2em'} />
                購入済にする
              </PurchaseButton>
            )}
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
    </React.Fragment>
  );
}

const Container = styled(ContentsContainer)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 15px;
  overflow-y: scroll;
`;

const ScrollArea = styled.div`
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
  @media (max-width: 799px) {
    padding: 10px 15px 0 0px;
  }
  @media (min-width: 800px) {
    display: flex;
    align-items: center;
    padding: 10px 15px 10px 0px;
  }
  font-size: 1.3em;
`;

const ListTitle = styled.input`
  color: ${COLORS.THEME.BLACK};
  padding: 5px 15px;
  flex-grow: 1;
  font-size: 1em;
  border: none;
  outline: none;
  text-overflow: ellipsis;
`;

const PurchaseButton = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  @media (max-width: 799px) {
    padding: 0 20px;
    margin: 5px auto;
  }
  @media (min-width: 800px) {
    margin: 0;
    margin-left: 20px;
  }
  border: none;
  outline: none;
  font-size: 0.8em;
  color: ${COLORS.THEME.CLEAR};
  border-radius: 12px;
  white-space: nowrap;
  user-select: none;
  &:disabled {
    background-color: ${COLORS.THEME.DISABLED};
  }
  &:enabled {
    background-color: ${COLORS.THEME.MAIN};
    cursor: pointer;
  }
  & > ${Icons.Icon} {
    margin-right: 5px;
  }
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const PurchasedHeader = styled(ListIndex)`
  padding: 8px 15px;
  font-size: 0.9em;
  color: ${COLORS.THEME.BLACK};
  background-color: ${COLORS.THEME.SHADOW};
  margin-top: 60px;
`;
