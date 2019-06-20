import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Component from '../components/List';
import { State } from '../store';

import { Identifier } from '../entities/Entity';
import List from '../entities/List';
import Item from '../entities/Item';
import { initList, addItem, toggleItemCheck } from '../actions/list';

interface MatchParams {
  id: string;
}

export default connect(
  (state: State, props: RouteComponentProps<MatchParams>) => {
    return {
      listId: new Identifier<List>(props.match.params.id),
      items: state.list.items
    };
  },
  dispatch => {
    return {
      initList: () => {
        dispatch(initList());
      },
      onAddItem: (name: string, listId: Identifier<List>) => {
        dispatch(addItem(name, listId));
      },
      onToggleItemCheck: (item: Item, listId: Identifier<List>) => {
        dispatch(toggleItemCheck(item, listId));
      }
    };
  }
)(Component);
