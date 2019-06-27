import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Component from '../components/ShoppingList';
import { State } from '../store';

import { Identifier } from '../entities/Entity';
import ShoppingList from '../entities/ShoppingList';
import Item from '../entities/Item';
import {
  init,
  updateTitle,
  addItem,
  toggleItemCheck,
  purchase,
  deleteItem
} from '../actions/shoppingList';
import { open } from '../actions/modal';

interface MatchParams {
  id: string;
}

export default connect(
  (state: State, props: RouteComponentProps<MatchParams>) => {
    const { title, items, checkedItems } = state.shoppingList;
    return {
      id: new Identifier<ShoppingList>(props.match.params.id),
      title,
      items: items.filter(item => !item.isPurchased),
      checkedItems: checkedItems,
      purchased: items
        .filter(item => item.isPurchased)
        .sort((a, b) => {
          if (a.purchasedAt > b.purchasedAt) {
            return -1;
          }
          return 1;
        })
    };
  },
  dispatch => {
    return {
      initShoppingList: (id: Identifier<ShoppingList>) => {
        dispatch(init(id));
      },
      onAddItem: (name: string) => {
        dispatch(addItem(name));
      },
      onUpdateTitle: (title: string) => {
        dispatch(updateTitle(title));
      },
      onToggleItemCheck: (item: Item) => {
        dispatch(toggleItemCheck(item));
      },
      onPurchase: () => {
        dispatch(purchase());
      },
      onDeleteItem: (item: Item) => {
        dispatch(deleteItem(item));
      },
      openModal: (contents: React.ReactNode, onConfirm: () => void) => {
        dispatch(open(contents, onConfirm));
      }
    };
  }
)(Component);
