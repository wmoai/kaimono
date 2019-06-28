import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { Identifier } from '../entities/Entity';
import ShoppingList from '../entities/ShoppingList';

import history from '../history';
import PortalPage from '../containers/Portal';
import ShoppingListPage from '../containers/ShoppingList';
import Modal from '../containers/Modal';

interface Props {
  isLoading: boolean;
  initializeApp: () => void;
}

export function shoppingListPath(id: Identifier<ShoppingList>) {
  return `/lists/${id.toString()}`;
}

export default function App(props: Props) {
  const { isLoading, initializeApp } = props;
  React.useEffect(() => {
    initializeApp();
  }, []);

  return (
    <React.Fragment>
      <GlobalStyle />
      {isLoading ? (
        <Loading />
      ) : (
        <Router history={history}>
          <Route exact path="/" component={PortalPage} />
          <Route exact path="/lists/:id" component={ShoppingListPage} />
        </Router>
      )}
      <Modal />
    </React.Fragment>
  );
}

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
  }
  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  &:before {
    content: 'loading...';
  }
`;
