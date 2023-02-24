import { useState } from 'react'
import * as React from 'react'
import styled, { css } from 'styled-components'

interface PopconfirmProps {
  cancelText?: string
  disabled?: boolean
  icon?: React.ReactNode
  okText?: string
  okType?: string
  showCancel?: boolean
  title?: React.ReactNode | (() => React.ReactNode)
  description?: React.ReactNode | (() => React.ReactNode)
  placement?: string
  onConfirm?: (e: React.MouseEvent<HTMLElement>) => void
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void
  children?: React.ReactNode
  visible?: boolean
  backgroundColor?: string
  textColor?: string
}

interface PopconfirmContainerProps {
  placement?: 'top' | 'bottom' | 'left' | 'right'
  backgroundColor?: string
  textColor?: string
}

interface PopconfirmButtonsProps {
  backgroundColor?: string
  textColor?: string
}

const PopconfirmContainer = styled.div<PopconfirmContainerProps>`
  position: relative;
  display: inline-block;
  cursor: pointer;
`

const PopconfirmBox = styled.div<PopconfirmContainerProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  color: ${({ textColor }) => textColor || '#000000'};
  width: max-content;
  background-color: ${({ backgroundColor }) => backgroundColor || '#EEEEEE'};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  ${({ placement }) => {
    switch (placement) {
      case 'top':
        return css`
          bottom: 100%;
          left: 50%;
          margin-bottom: 8px;
          transform: translateX(-50%);
        `
      case 'bottom':
        return css`
          top: 100%;
          left: 50%;
          margin-top: 8px;
          transform: translateX(-50%);
        `
      case 'left':
        return css`
          top: 50%;
          right: 100%;
          margin-right: 8px;
          transform: translateY(-50%);
        `
      case 'right':
        return css`
          top: 50%;
          right: 100%;
          margin-left: 8px;
          transform: translateY(-50%);
        `
      default:
        return css`
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
        `
    }
  }}
  &::after {
    content: '';
    position: absolute;
    border-width: 6px;
    border-style: solid;
    border-color: transparent;
    ${({ placement }) => {
      switch (placement) {
        case 'top':
          return css`
            bottom: -12px;
            left: 50%;
            border-top-color: ${({ backgroundColor }) => backgroundColor || '#EEEEEE'};
            transform: translateX(-50%);
          `
        case 'bottom':
          return css`
            top: -12px;
            left: 50%;
            border-bottom-color: ${({ backgroundColor }) => backgroundColor || '#EEEEEE'};
            transform: translateX(-50%);
          `
        case 'left':
          return css`
            right: -12px;
            top: 50%;
            border-left-color: ${({ backgroundColor }) => backgroundColor || '#EEEEEE'};
            transform: translateY(-50%);
          `
        case 'right':
          return css`
            left: -12px;
            top: 50%;
            border-right-color: ${({ backgroundColor }) => backgroundColor || '#EEEEEE'};
            transform: translateY(-50%);
          `
        default:
          return css`
            display: none;
          `
      }
    }}
  }
`

const PopconfirmTitle = styled.div`
  font-weight: bold;
  margin-bottom: 6px;
`

const PopconfirmDescription = styled.div`
  margin-bottom: 10px;
`

const PopconfirmButtons = styled.div`
  display: flex;
  justify-content: end;
  items-align: center;
  gap: 5px;
`

const PopconfirmButton = styled.button<PopconfirmButtonsProps>`
  color: ${({ textColor }) => textColor || '#000000'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#EEEEEE'};
  cursor: pointer;
  border-radius: 3px;
`

const PopconfirmIcon = styled.div`
  margin-right: 10px;
`

const Popconfirm: React.FC<PopconfirmProps> = ({
  cancelText = 'Cancel',
  disabled = false,
  icon,
  okText = 'OK',
  okType = 'primary',
  showCancel = true,
  title,
  description,
  placement,
  onConfirm,
  onCancel,
  children,
  visible,
  backgroundColor,
  textColor,
}) => {
  const [show, setShow] = useState(visible)

  const handleClick = () => {
    if (!disabled) {
      setShow(true)
    }
  }

  const handleConfirm = (e: React.MouseEvent<HTMLElement>) => {
    if (onConfirm) {
      onConfirm(e)
    }
    setShow(false)
  }

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    if (onCancel) {
      onCancel(e)
    }
    setShow(false)
  }

  return (
    <PopconfirmContainer onClick={handleClick}>
      {children}
      {show && (
        <PopconfirmBox placement={placement} backgroundColor={backgroundColor} textColor={textColor}>
          {icon && <PopconfirmIcon>{icon}</PopconfirmIcon>}
          {title && <PopconfirmTitle>{title}</PopconfirmTitle>}
          {description && <PopconfirmDescription>{description}</PopconfirmDescription>}
          <PopconfirmButtons>
            {showCancel && (
              <PopconfirmButton onClick={handleCancel} backgroundColor={backgroundColor} textColor={textColor}>
                {cancelText}
              </PopconfirmButton>
            )}
            <PopconfirmButton
              type={okType}
              onClick={handleConfirm}
              backgroundColor={backgroundColor}
              textColor={textColor}
            >
              {okText}
            </PopconfirmButton>
          </PopconfirmButtons>
        </PopconfirmBox>
      )}
    </PopconfirmContainer>
  )
}

export default Popconfirm
