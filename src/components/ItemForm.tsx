import * as React from 'react';
import styled from 'styled-components';
import * as Icons from './elements/Icons';
import * as COLORS from './colors';

interface Props {
  onAddItem: (name: string) => void;
}

export default function ItemForm(props: Props) {
  const { onAddItem } = props;
  const itemInput = React.useRef(null);
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = itemInput.current;
    if (target) {
      const name = target.value.trim();
      if (name !== '') {
        onAddItem(target.value);
        target.value = '';
      }
    }
  };

  return (
    <Form onSubmit={e => handleAddItem(e)}>
      <ItemInput type="text" ref={itemInput} placeholder="買うものを追加" />
      <AddButton>
        <Icons.Add size={'26px'} />
      </AddButton>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 0 5px;
  border: 1px solid gainsboro;
`;

const ItemInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  border: none;
  outline: none;
  font-size: 1em;
  &::placeholder {
    color: ${COLORS.THEME.DARK};
  }
`;

const AddButton = styled.button`
  width: 50px;
  height: 100%;
  border: none;
  outline: none;
  color: ${COLORS.THEME.CLEAR};
  background-color: ${COLORS.THEME.POSITIVE};
`;
