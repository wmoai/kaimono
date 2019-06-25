import * as React from 'react';
import * as dayjs from 'dayjs';
import styled from 'styled-components';
import { Identifier } from '../entities/Entity';
import Item from '../entities/Item';

import ItemList from './elements/ItemList';
import CheckButton from './elements/CheckButton';
import * as Icons from './elements/Icons';

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
        const isChecked = !!checkedItems.find(id => id.equal(item.id));
        return (
          <li key={item.id.toValue()}>
            {!isPurchased && (
              <CheckButton
                onClick={() => onCheck && onCheck(item)}
                isChecked={isChecked}
              >
                <Icons.Check size={'2em'} />
              </CheckButton>
            )}
            <ContentArea>
              <NameSpan isChecked={isChecked}>{item.name}</NameSpan>
              {isPurchased && item.purchasedAt && (
                <DateSpan>
                  {dayjs(item.purchasedAt).format('YYYY/MM/DD HH:mm')}
                </DateSpan>
              )}
              <RemoveButton onClick={() => onDelete(item)}>
                <Icons.Remove size={'1.5em'} />
              </RemoveButton>
            </ContentArea>
          </li>
        );
      })}
    </ItemList>
  );
}

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  margin-left: 10px;
  border-bottom: 1px solid gainsboro;
`;

const NameSpan = styled.span<{ isChecked?: boolean }>`
  font-weight: ${props => (props.isChecked ? 'bold' : 'normal')};
`;

const DateSpan = styled.span`
  font-size: 0.7em;
  margin-left: 30px;
  &:before {
    content: '―  ';
  }
`;

const RemoveButton = styled.button`
  width: 40px;
  height: 40px;
  outline: none;
  border: none;
  background-color: transparent;
  margin-left: auto;
  font-size: 0.8em;
  cursor: pointer;
  color: lightgray;
  user-select: none;
  &:hover {
    color: crimson;
  }
`;
