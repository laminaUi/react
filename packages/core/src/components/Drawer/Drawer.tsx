import { useEffect, useState } from 'react'
import * as React from 'react'
import styled, { keyframes } from 'styled-components'

type DrawerProps = {
  visible?: boolean
  onClose?: () => void
  placement?: 'top' | 'right' | 'bottom' | 'left'
  title?: string
  width?: number | string
  height?: number | string
  mask?: boolean
  maskClosable?: boolean
  bodyStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Drawer: React.FC<DrawerProps> = ({
  visible = false,
  onClose,
  placement = 'right',
  title,
  width = 256,
  height,
  mask = true,
  maskClosable = true,
  bodyStyle,
  children,
  className,
  style,
}) => {
  const [isOpened, setIsOpened] = useState(visible)

  useEffect(() => {
    setIsOpened(visible)
  }, [visible])

  const handleMaskClick = () => {
    if (maskClosable) {
      setIsOpened(false)
      onClose?.()
    }
  }

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <span>
      {isOpened ? (
        <Wrapper visible={isOpened} mask={mask} onClick={handleMaskClick} style={style}>
          <Content placement={placement} width={width} height={height} className={className}>
            {title && <Header>{title}</Header>}
            <Body style={bodyStyle} onClick={handleWrapperClick}>
              {children}
            </Body>
          </Content>
        </Wrapper>
      ) : null}
    </span>
  )
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Wrapper = styled.div<{ visible: boolean; mask: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ mask }) => (mask ? 'rgba(0, 0, 0, 0.65)' : 'transparent')};
  z-index: 1000;
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.3s ease-in-out;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
`

const Content = styled.div<{
  placement: DrawerProps['placement']
  width: DrawerProps['width']
  height: DrawerProps['height']
}>`
  position: absolute;
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }) => (typeof height === 'number' ? `${height}px` : height)};
  overflow: auto;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease-in-out;
  ${({ placement }) => {
    switch (placement) {
      case 'top':
        return `top: 0; left: 50%; transform: translateX(-50%); `
      case 'right':
        return `top: 0; right: 0; `
      case 'bottom':
        return `bottom: 0; left: 50%; transform: translateX(-50%); `
      case 'left':
        return `top: 0; left: 0; `
      default:
        return ''
    }
  }}
`

const Header = styled.div`padding: 16px; font - size: 18px; font - weight: 500; color: rgba(0, 0, 0, 0.85); border - bottom: 1px solid #f0f0f0;`

const Body = styled.div`padding: 16px; font - size: 14px; line - height: 1.5; color: rgba(0, 0, 0, 0.65);`

export default Drawer
