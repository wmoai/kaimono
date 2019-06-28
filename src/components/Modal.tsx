import * as React from 'react';
import * as ReactModal from 'react-modal';
import styled from 'styled-components';
import * as COLORS from './colors';

interface Props {
  isOpen: boolean;
  contents: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const style: ReactModal.Styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    top: '10%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translateX(-50%)',
    minWidth: 260,
    maxWidth: '80%',
    maxHeight: '80%',
    boxSizing: 'border-box',
    wordBreak: 'break-word',
    padding: '0'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
};

export default function Modal(props: Props) {
  const { isOpen, contents, onConfirm, onCancel } = props;
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="test"
      onRequestClose={() => onCancel()}
      style={style}
    >
      <Container>{contents}</Container>
      <Footer>
        <CancelButton onClick={() => onCancel()}>キャンセル</CancelButton>
        <ConfirmButton onClick={() => onConfirm()}>確認</ConfirmButton>
      </Footer>
    </ReactModal>
  );
}

const Container = styled.div`
  padding: 30px 30px 20px;
  overflow-y: scroll;
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 30px 20px;
`;

const Button = styled.button`
  outline: none;
  border: none;
  height: 32px;
  padding: 0 15px;
  cursor: pointer;
  font-size: 0.8em;
  margin-left: 10px;
`;

const CancelButton = styled(Button)`
  color: ${COLORS.THEME.DARK};
  background-color: ${COLORS.THEME.DARKSMOKE};
`;

const ConfirmButton = styled(Button)`
  color: ${COLORS.THEME.CLEAR};
  background-color: ${COLORS.THEME.MAIN};
`;
