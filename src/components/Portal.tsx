import * as React from 'react';
import styled from 'styled-components';
import * as COLORS from './colors';

import { Link } from 'react-router-dom';
import ContentContainer from './elements/ContentsContainer';
import BrowseHistory from '../entities/BrowseHistory';
import { shoppingListPath } from './App';

interface Props {
  browseHistory: BrowseHistory[];
  loadBrowseHistory: () => void;
  onCreateShoppingList: () => void;
}

export default function Portal(props: Props) {
  const { browseHistory, loadBrowseHistory, onCreateShoppingList } = props;
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateShoppingList();
  };

  React.useEffect(() => {
    loadBrowseHistory();
  }, []);

  return (
    <div>
      <TopContainer>
        <Title>カウモノ</Title>
        <form onSubmit={e => handleCreate(e)}>
          <CreateButton>買うものリストを作成</CreateButton>
        </form>
      </TopContainer>
      <ContentContainer>
        {browseHistory && browseHistory.length > 0 && (
          <React.Fragment>
            <HistoryList>
              <h2>閲覧した買うものリスト</h2>
              {browseHistory.map(entry => (
                <li key={entry.id.toString()}>
                  <Link to={shoppingListPath(entry.id)}>{entry.title}</Link>
                </li>
              ))}
            </HistoryList>
          </React.Fragment>
        )}
      </ContentContainer>
    </div>
  );
}

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 250px;
  padding-bottom: 100px;
  background-color: ${COLORS.THEME.MAIN};
`;

const Title = styled.h1`
  color: ${COLORS.THEME.CLEAR};
  font-size: 3em;
`;

const CreateButton = styled.button`
  border: none;
  outline: none;
  font-size: 1.2em;
  font-weight: bold;
  padding: 8px 20px;

  color: ${COLORS.THEME.MAIN_DARK};
  background-color: ${COLORS.THEME.CLEAR};
  border: 3px solid ${COLORS.THEME.MAIN_LIGHT};
  border-radius: 20px;
  cursor: pointer;
`;

const HistoryList = styled.ul`
  list-style: none;
  padidng: 0;
  margin-top: 40px;
  & > h2 {
    font-size: 1.2em;
    margin: 0;
    color: ${COLORS.THEME.DARK};
  }
`;
