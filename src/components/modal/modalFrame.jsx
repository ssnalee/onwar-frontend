import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1055;

  &.is_over {
    cursor: pointer;
  }
`;

const ModalWrap = styled.div`
  font-family: "NanumSquare", sans-serif;
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 300px;
  transform: translate(-50%, -50%);
  overflow: auto;
  background: #fff;
  backdrop-filter: blur(25px);
  border-radius: 15px;
  z-index: 1059;
  cursor: auto;
  border: 2px solid #ffd518;
  &::-webkit-scrollbar {
    display: block;
    width: 8px;   
  }  
  &::-webkit-scrollbar-thumb {
    background-color: #2861ff; 
    border-radius: 4px;       
  }
  &::-webkit-scrollbar-track {
    background: transparent;  
  }
`;

const ModalFrame = ({
    isVisible = false,
    isOverlay = false,
    width = 'fit-content',
    height = 'fit-content',
    maxWidth = '100%',
    style = null,
    onCloseDialogHandler,
    children
}) => {
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isVisible]);

    const overlayClickHandler = (e) => {
        if (e.target === e.currentTarget && isOverlay) {
            onCloseDialogHandler?.();
        }
    };

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <ModalOverlay
            className={isOverlay ? 'is_over' : ''}
            onClick={overlayClickHandler}
        >
            <ModalWrap style={{ width, height, maxWidth, ...style }}>
                {children}
            </ModalWrap>
        </ModalOverlay>,
        document.body
    );
};

export default ModalFrame;
