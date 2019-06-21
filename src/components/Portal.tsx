import * as React from 'react';

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
      <form onSubmit={e => handleCreate(e)}>
        <input type="submit" value="新規作成" />
      </form>
    </div>
  );
}
