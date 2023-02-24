import * as React from 'react'
import styled, { css } from 'styled-components'

interface ModalProps {
  title?: string
  visible?: boolean
  animation?: 'animatetop' | 'square' | 'circle'
  onCancel?: () => void
  onOk?: () => void
  children?: React.ReactNode
}

const ModalWrapper = styled.div<ModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;

  @-webkit-keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
  @-webkit-keyframes animateout {
    from {
      transform: scale(2);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes animateout {
    from {
      transform: scale(2);
    }
    to {
      transform: scale(1);
    }
  }

  @-webkit-keyframes animatebottom {
    from {
      bottom: -300px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  @keyframes animatebottom {
    from {
      bottom: -300px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  @-webkit-keyframes animatein {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes animatein {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  ${({ animation }) => {
    switch (animation) {
      case 'animatetop':
        return css`
          -webkit-animation-name: animatetop;
          -webkit-animation-duration: 0.4s;
          animation-name: animatetop;
          animation-duration: 0.4s;
        `
      case 'animatebottom':
        return css`
          -webkit-animation-name: animatebottom;
          -webkit-animation-duration: 0.4s;
          animation-name: animatebottom;
          animation-duration: 0.4s;
        `
      case 'animatein':
        return css`
          -webkit-animation-name: animatein;
          -webkit-animation-duration: 0.4s;
          animation-name: animatein;
          animation-duration: 0.4s;
        `
      case 'animateout':
        return css`
          -webkit-animation-name: animateout;
          -webkit-animation-duration: 0.4s;
          animation-name: animateout;
          animation-duration: 0.4s;
        `
      default:
        return css`
          border-radius: 4px;
        `
    }
  }}
`

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const ModalContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  min-width: 300px;
  margin: auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
`

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
`

const ModalBody = styled.div`
  margin-bottom: 20px;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ModalCancelButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 16px;
  margin-right: 10px;
`

const ModalOkButton = styled.button`
  background-color: #1890ff;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 16px;
`

const Modal = ({ title, visible, animation, onCancel, onOk, children }: ModalProps): JSX.Element => {
  const handleClose = (): void => {
    setTimeout(onCancel, 300)
  }

  const handleOk = (): void => {
    setTimeout(onOk, 300)
  }
  return (
    <span>
      {visible ? (
        <span>
          <ModalWrapper animation={animation}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <ModalCloseButton onClick={handleClose}>×</ModalCloseButton>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <ModalCancelButton onClick={handleClose}>Cancel</ModalCancelButton>
                <ModalOkButton onClick={handleOk}>Ok</ModalOkButton>
              </ModalFooter>
            </ModalContent>
          </ModalWrapper>
        </span>
      ) : null}
    </span>
  )
}

export default Modal
