import { isVisible } from '@testing-library/user-event/dist/utils';
import React, { useEffect } from 'react';
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
  overflow: hidden;
  background: #fff;
  backdrop-filter: blur(25px);
  border-radius: 15px;
  z-index: 1059;
  cursor: auto;
  border: 2px solid #ffd518;
`;

const ModalFrame = ({
    isVisible = false,
    isOverlay = false,
    width = 'fit-content',
    height = 'fit-content',
    maxWidth = '100%',
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
        }
    }, [isVisible]);

    const overlayClickHandler = (e) => {
        if (e.target === e.currentTarget && isOverlay) {
            onCloseDialogHandler?.();
        }
    }

    if (!isVisible) return null;
    return (
        <ModalOverlay
          className={isOverlay ? 'is_over' : ''}
          onClick={overlayClickHandler}
        >
          <ModalWrap style={{ width, height, maxWidth }}>
            {children}
          </ModalWrap>
        </ModalOverlay>
      );
}

export default ModalFrame;