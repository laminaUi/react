import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

type MessageType = 'success' | 'info' | 'warning' | 'error'

const CloseOutlined = () => (
  <svg viewBox='0 0 1024 1024'>
    <path d='M715.392 307.328l-92.064-92.064L512 419.072 300.672 217.216l-92.064 92.064L419.072 512l-211.392 211.392 92.064 92.064L512 604.928l211.392 211.392 92.064-92.064L604.928 512l211.392-211.392z' />
  </svg>
)

const CheckCircleOutlined = () => (
  <svg viewBox='0 0 1024 1024'>
    <path d='M512 1024c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512z m157.674-570.984l-329.658 329.658c-11.052 11.052-25.609 16.574-40.166 16.574-14.556 0-29.113-5.522-40.166-16.574l-178.739-178.74c-22.105-22.105-22.105-58.049 0-80.154l52.756-52.756c22.106-22.105 58.05-22.105 80.154 0l98.184 98.184 246.802-246.802c22.106-22.105 58.05-22.105 80.154 0l52.756 52.756c22.105 22.105 22.105 58.049 0 80.154z' />
  </svg>
)

const CloseCircleOutlined = () => (
  <svg viewBox='0 0 1024 1024'>
    <path d='M512 1024c-282.77 0-512-229.23-512-512s229.23-512 512-512 512 229.23 512 512-229.23 512-512 512z m-137.28-669.312l79.462-79.462 137.28 137.28 137.28-137.28 79.462 79.462-137.28 137.28 137.28 137.28-79.462 79.462-137.28-137.28-137.28 137.28-79.462-79.462 137.28-137.28-137.28-137.28z' />
  </svg>
)

const ExclamationCircleOutlined = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='64 64 896 896' {...props}>
    <path d='M512 168c-220 0-344.7 200.9-227.2 341.9l240.7 328.8a31.99 31.99 0 0054.9 0l240.7-328.8C856.7 368.9 732 168 512 168z m0 498a45 45 0 110-90 45 45 0 010 90z m-28 136a28 28 0 1156 0 28 28 0 01-56 0z' />
  </svg>
)

const InfoCircleOutlined = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='64 64 896 896' {...props}>
    <path d='M512 144C300.3 144 128 316.3 128 528s172.3 384 384 384 384-172.3 384-384-172.3-384-384-384zm0 666.2c-20.3 0-38.9-9.3-51-25.1L352 600.7c-12.1-15.8-12.1-39.2 0-55l34.3-44.8c12.1-15.8 30.7-25.1 51-25.1s38.9 9.3 51 25.1l34.3 44.8c12.1 15.8 12.1 39.2 0 55l-34.3 44.8c-12.1 15.8-30.7 25.1-51 25.1zM512 380c-20.3 0-36.8 16.5-36.8 36.8v181.4c0 20.3 16.5 36.8 36.8 36.8s36.8-16.5 36.8-36.8V416.8c0-20.3-16.5-36.8-36.8-36.8z' />
  </svg>
)

type Props = {
  className?: string
  type?: MessageType
  content: React.ReactNode
  visible?: boolean
  duration?: number
  icon?: React.ReactNode
  key?: string | number
  style?: React.CSSProperties
  onClose?: () => void
  onClick?: () => void
}

const IconWrapper = styled.div<{ type: MessageType }>`
  ${({ type }) => {
    switch (type) {
      case 'success':
        return css`
          color: #52c41a;
        `
      case 'info':
        return css`
          color: #1890ff;
        `
      case 'warning':
        return css`
          color: #faad14;
        `
      case 'error':
        return css`
          color: #f5222d;
        `
      default:
        return ''
    }
  }}
`

const Container = styled.div<{ type: MessageType }>`
  margin: auto;
  display: flex;
  width: fit-content;
  height: min-content;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 9999;
  padding: 0px 12px 0px 12px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.5;
  transition: opacity 0.3s;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 3s;
  animation-name: animatetop;
  animation-duration: 3s;

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

  ${({ type }) => {
    switch (type) {
      case 'success':
        return css`
          background-color: #f6ffed;
          color: #52c41a;
          border: 1px solid #b7eb8f;
        `
      case 'info':
        return css`
          background-color: #e6f7ff;
          color: #1890ff;
          border: 1px solid #91d5ff;
        `
      case 'warning':
        return css`
          background-color: #fffbe6;
          color: #faad14;
          border: 1px solid #ffe58f;
        `
      case 'error':
        return css`
          background-color: #fff1f0;
          color: #f5222d;
          border: 1px solid #ffa39e;
        `
      default:
        return ''
    }
  }}
`

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`

const CloseButton = styled.span`
  display: inline-block;
  margin-left: 8px;
  cursor: pointer;
`

const Message: React.FC<Props> = ({
  className,
  content,
  visible = false,
  duration = 6,
  icon,
  onClick,
  onClose,
  style,
  type,
}) => {
  const [show, setShow] = useState(visible)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (duration > 0) {
      timer = setTimeout(() => {
        setShow(false)
      }, duration * 1000)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [duration])

  const handleCloseClick = () => {
    setShow(false)
    onClose?.()
  }

  const getIcon = (type: MessageType) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlined />
      case 'error':
        return <CloseCircleOutlined />
      case 'warning':
        return <ExclamationCircleOutlined />
      case 'info':
        return <InfoCircleOutlined />
      default:
        return null
    }
  }

  return show ? (
    <Container type={type} onClick={onClick} className={className} style={style}>
      <IconWrapper type={type}>{icon || getIcon(type)}</IconWrapper>
      <Content>{content}</Content>
      <CloseButton onClick={handleCloseClick}>
        <CloseOutlined />
      </CloseButton>
    </Container>
  ) : null
}

export default Message
