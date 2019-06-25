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
    <Container>
      <GlobalStyle />
      <Modal />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <Router history={history}>
          <div>
            <Route exact path="/" component={Portal} />
            <Route exact path="/shoppinglists/:id" component={ShoppingList} />
          </div>
        </Router>
      )}
    </Container>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  width: 800px;
  margin: 0 auto 80px;
`;
