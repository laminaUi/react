import * as React from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'tertiary'
  size?: 'small' | 'medium' | 'large'
  textColor?: string
  outlineColor?: string
  fullWidth?: boolean
  onClick?: () => void
  href?: string
}

interface ButtonGroupProps {
  variant?: 'contained' | 'outlined' | 'text'
  color?: ButtonProps['color']
  size?: ButtonProps['size']
  textColor?: ButtonProps['textColor']
  outlineColor?: ButtonProps['outlineColor']
  fullWidth?: ButtonProps['fullWidth']
  children: React.ReactNode
}

const SButtonGroup = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
`

const SButton = styled.button<{
  isFirst: boolean
  isLast: boolean
  variant: string
}>`
  ${(props: { isFirst: boolean }) =>
    props.isFirst &&
    css`
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}
  ${(props: { isLast: boolean }) =>
    props.isLast &&
    css`
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
  ${(props: { isFirst: boolean; isLast: boolean }) =>
    !props.isFirst &&
    !props.isLast &&
    css`
      border-radius: 0;
      border-left: none;
      border-right: none;
    `}
  ${(props: { variant: string; isLast: boolean }) =>
    props.variant === 'contained' &&
    !props.isLast &&
    css`
      border-right: 1px solid #e5e5e5;
    `}
`

const ButtonGroup = ({
  variant = 'contained',
  color,
  size,
  textColor,
  outlineColor,
  fullWidth,
  children,
}: ButtonGroupProps) => {
  const count = React.Children.count(children)

  return (
    <SButtonGroup>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const isFirst = index === 0
          const isLast = index === count - 1
          return (
            <SButton
              variant={variant}
              color={color}
              size={size}
              textColor={textColor}
              outlineColor={outlineColor}
              fullWidth={fullWidth}
              isFirst={isFirst}
              isLast={isLast}
              onClick={child.props.onClick}
              href={child.props.href}
            >
              {child.props.children}
            </SButton>
          )
        }
        return child
      })}
    </SButtonGroup>
  )
}

export default ButtonGroup
