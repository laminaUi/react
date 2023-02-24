import * as React from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'text' | 'outlined'
  fullWidth?: boolean
  outlineColor?: string
  textColor?: string
  color?: string
  size?: string
  href?: string
  icon?: React.ReactNode
  iconPlacement?: 'start' | 'top' | 'end' | 'bottom'
  shape?: 'round' | 'square' | 'circle'
  loading?: boolean
}

const SButton = styled.button<ButtonProps>`
  /* default styles */
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : shape === 'round' ? '999px' : '4px')};
  border: none;
  outline: none;
  cursor: pointer;

  /* variants */
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background-color: #007bff;
          color: #fff;
        `
      case 'secondary':
        return css`
          background-color: #6c757d;
          color: #fff;
        `
      case 'success':
        return css`
          background-color: #28a745;
          color: #fff;
        `
      case 'warning':
        return css`
          background-color: #ffc107;
          color: #212529;
        `
      case 'danger':
        return css`
          background-color: #dc3545;
          color: #fff;
        `
      case 'text':
        return css`
          background-color: transparent;
          color: #007bff;
        `
      case 'outlined':
        return css`
          background-color: transparent;
          color: #007bff;
          border: 2px solid #007bff;
          text-align: center;
        `
      default:
        return css`
          background-color: #007bff;
          color: #fff;
        `
    }
  }}

  /* additional styles */
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  /* disabled styles */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  /* size styles */
  ${({ size }) =>
    size &&
    css`
      height: ${size.split(' ')[0]};
      width: ${size.split(' ')[1]};
    `}

  /* color styles */
  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
      color: #fff;
    `}

  ${({ icon }) =>
    icon &&
    css`
      display: flex;
      items: center;
      justify-items: center;
      gap: 4px;
    `}
  /* Custom outline color */
  ${(props) =>
    props.outlineColor &&
    `
      border-color: ${props.outlineColor};
    `}
      
  /* Custom text color */
  ${(props) =>
    props.textColor &&
    `
      color: ${props.textColor};
    `}

  ${({ shape }) => {
    switch (shape) {
      case 'round':
        return css`
          border-radius: 20px;
        `
      case 'square':
        return css`
          border-radius: 0px;
        `
      case 'circle':
        return css`
          border-radius: 50%;
          padding: 5px;
        `
      default:
        return css`
          border-radius: 4px;
        `
    }
  }}

  /* Loading styles */
  ${({ loading }) =>
    loading &&
    css`
      position: relative;
      overflow: hidden;
      pointer-events: none;
      opacity: 0.6;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid #fff;
        border-top-color: rgba(255, 255, 255, 0.2);
        border-left-color: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    `}
`

const Button = ({ children, icon, iconPlacement = 'start', ...rest }: ButtonProps) => {
  if (rest.href) {
    return (
      <a href={rest.href}>
        <SButton as='span' {...rest}>
          {icon && iconPlacement === 'start' ? <span className='icon'>{icon}</span> : null}
          {children}
          {icon && iconPlacement === 'end' ? (
            <span style={{ color: 'green', gap: '8px' }} className='icon'>
              {icon}
            </span>
          ) : null}
        </SButton>
      </a>
    )
  } else {
    return (
      <SButton {...rest}>
        {icon && iconPlacement === 'start' ? <span className='icon'>{icon}</span> : null}
        {children}
        {icon && iconPlacement === 'end' ? <span className='icon'>{icon}</span> : null}
      </SButton>
    )
  }
}

export default Button
