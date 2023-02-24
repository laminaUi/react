import { ReactNode } from 'react'
import * as React from 'react'
import styled, { css } from 'styled-components'

interface TooltipProps {
  title: string | ReactNode
  color?: string
  backgroundColor?: string
  placement?: 'top' | 'left' | 'right' | 'bottom'
  visible?: boolean
  trigger?: 'hover' | 'click'
  onVisibleChange?: (visible: boolean) => void
  children?: ReactNode
}

const TooltipContainer = styled.div<{ placement: string }>`
  position: relative;
  display: flex;
  gap: 2px;
  width: fit-content;
  ${({ placement }) => {
    switch (placement) {
      case 'top':
        return css`
          flex-wrap: wrap;
          flex-direction: column-reverse;
        `
      case 'bottom':
        return css`
          flex-wrap: wrap;
          flex-direction: column;
        `
      case 'left':
        return css`
          flex-direction: row-reverse;
        `
      case 'right':
        return css`
          flex-direction: row;
        `
      default:
        return css`
          flex-wrap: wrap;
          flex-direction: column;
        `
    }
  }}
`

const TooltipPopup = styled.div<{ visible: boolean; placement: string; color: string; backgroundColor: string }>`
  position: absolute;
  z-index: 1;
  visibility: ${(props: { visible: boolean }) => (props.visible ? 'visible' : 'hidden')};
  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  padding: 5px;
  border-radius: 3px;
  font-size: 14px;
  width: max-content;

  ${({ placement }) => {
    switch (placement) {
      case 'top':
        return css`
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 5px;
          top: auto;
        `
      case 'bottom':
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 5px;
          bottom: auto;
        `
      case 'left':
        return css`
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 5px;
          left: auto;
        `
      case 'right':
        return css`
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 5px;
          right: auto;
        `
      default:
        return css`
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 5px;
          top: auto;
        `
    }
  }}

  &::after {
    content: '';
    position: absolute;
    border-style: solid;

    ${({ placement, backgroundColor }) => {
      switch (placement) {
        case 'top':
          return css`
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px 5px 0 5px;
            border-color: ${backgroundColor} transparent transparent transparent;
          `
        case 'bottom':
          return css`
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 5px 5px 5px;
            border-color: transparent transparent ${backgroundColor} transparent;
          `
        case 'left':
          return css`
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 5px 0 5px 5px;
            border-color: transparent transparent transparent ${backgroundColor};
          `
        case 'right':
          return css`
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 5px 5px 5px 0;
            border-color: transparent ${backgroundColor} transparent transparent;
          `
        default:
          return css`
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px 5px 0 5px;
            border-color: ${backgroundColor} transparent transparent transparent;
          `
      }
    }}`

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  visible = false,
  trigger = 'hover',
  color,
  backgroundColor,
  onVisibleChange,
}) => {
  const [isTooltipVisible, setTooltipVisible] = React.useState(visible)

  const handleVisibilityChange = (newVisible: boolean) => {
    setTooltipVisible(newVisible)
    onVisibleChange(newVisible)
  }

  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {}
  if (trigger === 'hover') {
    triggerProps.onMouseEnter = () => handleVisibilityChange(true)
    triggerProps.onMouseLeave = () => handleVisibilityChange(false)
  } else if (trigger === 'click') {
    triggerProps.onClick = () => handleVisibilityChange(!isTooltipVisible)
  }

  return (
    <div>
      <TooltipContainer {...triggerProps} placement={placement}>
        {children}
        <TooltipPopup backgroundColor={backgroundColor} color={color} placement={placement} visible={isTooltipVisible}>
          {title}
        </TooltipPopup>
      </TooltipContainer>
    </div>
  )
}

export default Tooltip
