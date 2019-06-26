import * as React from 'react';
import { Router, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import history from '../history';
import Portal from '../containers/Portal';
import ShoppingList from '../containers/ShoppingList';
import Modal from '../containers/Modal';

interface Props {
  isLoading: boolean;
  initializeApp: () => void;
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
          <Route exact path="/" component={Portal} />
          <Route exact path="/shoppinglists/:id" component={ShoppingList} />
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
