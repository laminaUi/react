import * as React from 'react'
import { useState } from 'react'
import styled, { css } from 'styled-components'

interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error'
  message?: React.ReactNode
  description?: React.ReactNode
  showIcon?: boolean
  onClose?: () => void
  closable?: boolean
  className?: string
}

const alertTypeStyles = {
  success: css`
    background-color: #f6ffed;
    border-color: #b7eb8f;
    color: #52c41a;
  `,
  info: css`
    background-color: #e6f7ff;
    border-color: #91d5ff;
    color: #1890ff;
  `,
  warning: css`
    background-color: #fffbe6;
    border-color: #ffe58f;
    color: #faad14;
  `,
  error: css`
    background-color: #fff1f0;
    border-color: #ffa39e;
    color: #f5222d;
  `,
}

const AlertContainer = styled.div<AlertProps>`
  position: relative;
  padding: 12px 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 16px;
  ${(props) => alertTypeStyles[props.type ?? 'info']}
`

const CloseButton = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  outline: none;
`

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  description,
  showIcon = false,
  onClose,
  closable = false,
  className,
}) => {
  const [isAlertClose, setIsAlertClose] = useState(closable)
  const CloseHandler = (): void => {
    setIsAlertClose(!isAlertClose)
  }
  return (
    <span>
      {isAlertClose ? (
        <AlertContainer type={type} className={className}>
          {closable && <CloseButton onClick={onClose || CloseHandler}>×</CloseButton>}
          {showIcon && <div>Icon Placeholder</div>}
          {message && <div>{message}</div>}
          {description && <div>{description}</div>}
        </AlertContainer>
      ) : null}
    </span>
  )
}

export default Alert
