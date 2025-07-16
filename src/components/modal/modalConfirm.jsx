// ConfirmModal.jsx
import React from 'react';
import styled from 'styled-components';
import ModalFrame from './modalFrame';

const ModalTitle = styled.div`
  padding: 16px 20px 0;
  font-weight: bold;

  h4 {
    margin: 0;
    font-size: 18px;
    text-align: center;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
`;

const ModalButtonWrap = styled.div`
  padding: 0 20px 20px;
  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    padding: 8px 14px;
    font-size: 14px;
    background: #222;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:last-child {
      background: #aaa;
    }
  }
`;

const ConfirmModal = ({
  isVisible,
  title = 'Alert',
  content = '',
  width,
  height,
  maxWidth,
  isOverlay = true,
  onCloseDialogHandler,
}) => {
  const closeHandler = (key) => {
    onCloseDialogHandler?.(key); // 1: 확인, 0: 취소
  };

  return (
    <ModalFrame
      isVisible={isVisible}
      width={width}
      height={height}
      maxWidth={maxWidth}
      isOverlay={isOverlay}
      onCloseDialogHandler={() => closeHandler(0)}
    >
      <ModalTitle>
        <h4>{title}</h4>
      </ModalTitle>

      <ModalBody dangerouslySetInnerHTML={{ __html: content }} />

      <ModalButtonWrap>
        <button onClick={() => closeHandler(1)}>확인</button>
        <button onClick={() => closeHandler(0)}>취소</button>
      </ModalButtonWrap>
    </ModalFrame>
  );
};

export default ConfirmModal;
