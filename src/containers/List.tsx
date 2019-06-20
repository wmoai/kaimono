import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Component from '../components/List';
import { State } from '../store';

import { Identifier } from '../entities/Entity';
import List from '../entities/List';
import Item from '../entities/Item';
import { initList, addItem, toggleItemCheck, purchase } from '../actions/list';

interface MatchParams {
  id: string;
}

export default connect(
  (state: State, props: RouteComponentProps<MatchParams>) => {
    const { items, checkedItems } = state.list;
    return {
      id: new Identifier<List>(props.match.params.id),
      items: items.filter(item => !item.isPurchased),
      checkedItems: checkedItems,
      purchased: items.filter(item => item.isPurchased)
    };
  },
  dispatch => {
    return {
      initList: (id: Identifier<List>) => {
        dispatch(initList(id));
      },
      onAddItem: (name: string) => {
        dispatch(addItem(name));
      },
      onToggleItemCheck: (item: Item) => {
        dispatch(toggleItemCheck(item));
      },
      onPurchase: () => {
        dispatch(purchase());
      }
    };
  }
)(Component);
