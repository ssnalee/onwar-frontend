import React from 'react';
import ModalFrame from './modalFrame';
import styled from 'styled-components';
import { IoCloseCircle } from "react-icons/io5";

const ModalTitle = styled.div`
  /* display: flex;
  justify-content: space-between;
  align-items: center; */
  padding: 16px 20px 0;
  font-weight: bold;
  position: relative;

  h4 {
    margin: 0;
    font-size: 18px;
    text-align: center;
    width: 100%;
    font-family: ${({ theme }) => theme.fontFamily.main}, sans-serif;
  }

  .close_btn {
    font-size: 14px;
    cursor: pointer;
    color: #999;
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalButtonWrap = styled.div`
  padding: 0 20px 20px;
  text-align: right;

  button {
    padding: 8px 14px;
    font-size: 14px;
    background: #222;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const AlertModal = ({
    isVisible,
    title = 'Alert',
    content = '',
    width,
    height,
    maxWidth,
    isBtn = false,
    isOverlay = true,
    onCloseDialogHandler,
  }) => {
    const closeHandler = () => {
      onCloseDialogHandler?.();
    };
  
    return (
      <ModalFrame
        isVisible={isVisible}
        width={width}
        height={height}
        maxWidth={maxWidth}
        isOverlay={isOverlay}
        onCloseDialogHandler={closeHandler}
      >
        <ModalTitle>
          <h4>{title}</h4>
          {!isBtn && <div className="close_btn" onClick={closeHandler}><IoCloseCircle font-size="25px" /></div>}
        </ModalTitle>
  
        <ModalBody dangerouslySetInnerHTML={{ __html: content }} />
  
        {isBtn && (
          <ModalButtonWrap>
            <button onClick={closeHandler}>닫기</button>
          </ModalButtonWrap>
        )}
      </ModalFrame>
    );
  };
  
  export default AlertModal;
