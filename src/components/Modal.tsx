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
    padding: '30px 30px 20px 30px'
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
      {contents}
      <Footer>
        <CancelButton onClick={() => onCancel()}>キャンセル</CancelButton>
        <ConfirmButton onClick={() => onConfirm()}>確認</ConfirmButton>
      </Footer>
    </ReactModal>
  );
}

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 30px;
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
  color: ${COLORS.PALETTE.BLACK};
  background-color: ${COLORS.PALETTE.SILVER};
`;

const ConfirmButton = styled(Button)`
  color: ${COLORS.PALETTE.WHITE};
  background-color: ${COLORS.THEME.POSITIVE};
`;
