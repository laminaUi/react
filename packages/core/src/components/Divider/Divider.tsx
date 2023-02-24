import React from 'react'
import styled from 'styled-components'

export type DividerProps = {
  type?: 'horizontal' | 'vertical'
  dashed?: boolean
  orientation?: 'left' | 'right' | 'center'
  className?: string
  style?: React.CSSProperties
}

const Divider: React.FC<DividerProps> = ({
  type = 'horizontal',
  dashed = false,
  orientation = 'center',
  className,
  style,
}) => {
  return <StyledDivider type={type} dashed={dashed} orientation={orientation} className={className} style={style} />
}

const StyledDivider = styled.div<DividerProps>`
  border-top: ${({ type }) => (type === 'horizontal' ? '1px solid #e8e8e8' : 'none')};
  border-left: ${({ type }) => (type === 'vertical' ? '1px solid #e8e8e8' : 'none')};
  border-bottom: none;
  border-right: none;
  border-style: ${({ dashed }) => (dashed ? 'dashed' : 'solid')};
  margin: ${({ type, orientation }) => (type === 'horizontal' && orientation !== 'center' ? '0' : '8px 0')};

  &::before,
  &::after {
    content: '';
    display: ${({ type }) => (type === 'horizontal' ? 'none' : 'block')};
    border-top: 1px solid #e8e8e8;
    transform: ${({ orientation }) =>
      orientation === 'left' ? 'translateY(-50%)' : orientation === 'right' ? 'translateY(50%)' : 'none'};
    width: ${({ orientation }) => (orientation !== 'center' ? '16px' : '100%')};
    margin: ${({ type }) => (type === 'vertical' ? '0 8px' : '0')};
  }
`

export default Divider
