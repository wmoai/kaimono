import * as React from 'react';
import styled from 'styled-components';
import * as COLORS from './colors';

interface Props {
  onCreateShoppingList: () => void;
}

export default function Portal(props: Props) {
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onCreateShoppingList();
  };

  return (
    <div>
      <TopContainer>
        <Title>カウモノ</Title>
        <form onSubmit={e => handleCreate(e)}>
          <CreateButton>買うものリストを作成</CreateButton>
        </form>
      </TopContainer>
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
