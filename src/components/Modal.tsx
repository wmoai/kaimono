import * as React from 'react';
import * as ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
  contents: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

const style: ReactModal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    boxSizing: 'border-box',
    wordBreak: 'break-word',
    padding: '30px'
  }
};

export default function Modal(props: Props) {
  const { isOpen, contents, onConfirm, onCancel } = props;
  return (
    <ReactModal isOpen={isOpen} contentLabel="test" style={style}>
      {contents}
      <div>
        <button onClick={() => onCancel()}>キャンセル</button>
        <button onClick={() => onConfirm()}>確認</button>
      </div>
    </ReactModal>
  );
}
