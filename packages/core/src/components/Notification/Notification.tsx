import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import * as React from 'react'

interface NotificationProps {
  btn?: React.ReactNode
  className?: string
  closeIcon?: React.ReactNode
  description: React.ReactNode
  duration?: number
  icon?: React.ReactNode
  key?: string
  message: React.ReactNode
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  style?: React.CSSProperties
  customPlacement?: React.CSSProperties
  children?: React.ReactNode
  onClick?: () => void
  onClose?: () => void
}

interface NotificationContainerProps {
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  customPlacement?: React.CSSProperties
}

const NotificationContainer = styled.div<NotificationContainerProps>`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 9999;
  ${({ placement }) => {
    switch (placement) {
      case 'topLeft':
        return css`
          top: 0;
          left: 0;
        `
      case 'topRight':
        return css`
          top: 0;
          right: 0;
        `
      case 'bottomLeft':
        return css`
          bottom: 0;
          left: 0;
        `
      case 'bottomRight':
        return css`
          bottom: 0;
          right: 0;
        `
      default:
        return css`
          bottom: 0;
          right: 0;
        `
    }
  }}
  ${({ customPlacement }) =>
    customPlacement &&
    css`
      ${customPlacement};
    `}
`

const NotificationBox = styled.div`
  display: flex;
  align-items: start;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`

const NotificationContent = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  & > span:first-child {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  & > span:last-child {
    font-size: 14px;
    margin-top: 4px;
  }

  & > * {
    margin-top: 4px;
  }
`

const IconWrapper = styled.div`
  margin-right: 10px;
`

const CloseButton = styled.div`
  margin-left: auto;
  cursor: pointer;
  font-weight: bold;
`

const Notification: React.FC<NotificationProps> = ({
  btn,
  className,
  closeIcon,
  description,
  duration = 4.5,
  icon,
  key,
  message,
  placement = 'topRight',
  customPlacement,
  style,
  onClick,
  children,
  onClose,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose()
      }, duration * 1000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    onClose && onClose()
  }

  return visible ? (
    <NotificationContainer onClick={onClick} key={key} placement={placement} customPlacement={customPlacement}>
      <NotificationBox style={style} className={className}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <NotificationContent>
          <span>{message}</span>
          <span>{description}</span>
          {children}
        </NotificationContent>
        {btn || <CloseButton onClick={handleClose}>{closeIcon || <span>&times;</span>}</CloseButton>}
      </NotificationBox>
    </NotificationContainer>
  ) : null
}

export default Notification
