import React, { CSSProperties } from 'react'
import styled, { keyframes } from 'styled-components'

interface SpinProps {
  delay?: number
  indicator?: React.ReactNode
  size?: 'small' | 'default' | 'large'
  spinning?: boolean
  tip?: React.ReactNode
  wrapperClassName?: string
  style?: CSSProperties
}

interface StyledSpinProps {
  size?: 'small' | 'default' | 'large'
}

const sizeMap = {
  small: 6,
  default: 12,
  large: 18,
}

const SpinContainer = styled.div`
  position: relative;
  display: inline-block;
`

const SpinWrapper = styled.div<StyledSpinProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinDot = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 50%;
  width: 15px;
  height: 15px;
  margin-left: -5px;
  border-radius: 50%;
  animation: ${rotateAnimation} 1s cubic-bezier(0.75, 0.25, 0.25, 0.75) infinite;
  animation-fill-mode: both;
  width: ${({ size }) => sizeMap[size || 'default']}px;
  height: ${({ size }) => sizeMap[size || 'default']}px;
  margin-top: ${({ size }) => -sizeMap[size || 'default'] / 2}px;
  margin-left: ${({ size }) => -sizeMap[size || 'default'] / 2}px;
  border-right: 2px solid transparent;
  border-top: 2px solid #b4e4ff;
  border-left: 2px solid #b4e4ff;
  border-bottom: 2px solid #b4e4ff;
  border-radius: 50%;
  &:nth-child(1) {
    animation-delay: -0.36s;
  }
  &:nth-child(2) {
    animation-delay: -0.24s;
    margin-left: ${({ size }) => sizeMap[size || 'default'] * 2}px;
  }
  &:nth-child(3) {
    animation-delay: -0.12s;
    margin-left: ${({ size }) => sizeMap[size || 'default'] * 1}px;
    margin-top: ${({ size }) => sizeMap[size || 'default'] * 1.5}px;
  }
`

const SpinIndicator = styled.div`
  position: relative;
  display: flex;
  gap: 3px;
`

const Spin: React.FC<SpinProps> = ({
  delay = 10,
  indicator,
  size = 'default',
  spinning = true,
  tip,
  wrapperClassName,
  style,
}) => {
  const delayTimeoutRef = React.useRef<number>(delay)
  const [shouldRender, setShouldRender] = React.useState<boolean>(spinning)

  React.useEffect(() => {
    if (!spinning) {
      clearTimeout(delayTimeoutRef.current)
      delayTimeoutRef.current = window.setTimeout(() => setShouldRender(false), 500)
    } else {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current)
      }
      if (!shouldRender) {
        setShouldRender(true)
      }
    }
  }, [spinning])

  if (!shouldRender) {
    return null
  }

  const indicatorNode = indicator || (
    <SpinIndicator>
      <SpinDot size={size} />
      <SpinDot size={size} />
      <SpinDot size={size} />
    </SpinIndicator>
  )

  return (
    <SpinContainer className={wrapperClassName} style={style}>
      {spinning && (
        <SpinWrapper size={size}>
          {indicatorNode}
          {tip && <div>{tip}</div>}
        </SpinWrapper>
      )}
    </SpinContainer>
  )
}

export default Spin
