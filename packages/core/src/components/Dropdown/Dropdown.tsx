import React, { useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

const DropdownContainer = styled.div<{ placement: string }>`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 2px;
  width: fit-content;
  justify-content: center;
  align-items: center;
  ${({ placement }) => {
    switch (placement) {
      case 'top':
        return css`
          top: ;
        `
      case 'bottom':
        return css``
      case 'left':
        return css``
      case 'right':
        return css``
      default:
        return css``
    }
  }}
`

const DropdownTrigger = styled.div`
  cursor: pointer;
`

const DropdownMenu = styled.div<{ placement: string; arrow: boolean }>`
  position: absolute;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: max-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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
      case 'bottomleft':
        return css`
          top: 100%;
          left: 0;
          transform: translateX(-50%);
          margin-top: 5px;
          bottom: auto;
        `
      case 'bottomright':
        return css`
          top: 100%;
          left: 100%;
          transform: translateX(-50%);
          margin-top: 5px;
          bottom: auto;
        `
      case 'topleft':
        return css`
          bottom: 100%;
          left: 0;
          transform: translateX(-50%);
          margin-bottom: 5px;
          top: auto;
        `
      case 'topright':
        return css`
          bottom: 100%;
          left: 100%;
          transform: translateX(-50%);
          margin-bottom: 5px;
          top: auto;
        `
      default:
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 5px;
          bottom: auto;
        `
    }
  }}
    &::after {
        content: '';
        position: absolute;
        border-style: ${({ arrow }) => (arrow ? 'solid' : '')};
        ${({ placement }) => {
          switch (placement) {
            case 'top':
            case 'topleft':
            case 'topright':
              return css`
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border-width: 5px 5px 0 5px;
                border-color: #fff transparent transparent transparent;
              `
            case 'bottom':
            case 'bottomleft':
            case 'bottomright':
              return css`
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                border-width: 0 5px 5px 5px;
                border-color: transparent transparent #fff transparent;
              `
            case 'left':
              return css`
                left: 100%;
                top: 50%;
                transform: translateY(-50%);
                border-width: 5px 0 5px 5px;
                border-color: transparent transparent transparent #fff;
              `
            case 'right':
              return css`
                right: 100%;
                top: 50%;
                transform: translateY(-50%);
                border-width: 5px 5px 5px 0;
                border-color: transparent #fff transparent transparent;
              `
            default:
              return css`
                border-style: none;
              `
          }
        }}
`

const DropdownMenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  color: #3f4f5f;
  &:hover {
    background-color: #f5f5f5;
  }
`

type DropdownOption = {
  key: string
  label: React.ReactNode
  onClick: () => void
  link: string
}

type DropdownProps = {
  options: DropdownOption[]
  trigger: React.ReactNode
  on: 'click' | 'hover'
  closeDelay?: number
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'bottomleft'
    | 'bottomright'
    | 'topleft'
    | 'topright'
    | 'leftbottom'
    | 'lefttop'
    | 'righttop'
    | 'rightbottom'
  arrow?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  trigger,
  arrow = false,
  placement = 'bottom',
  on,
  closeDelay = 800,
}) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [delayTimeoutId, setDelayTimeoutId] = useState<number | undefined>()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const handleMenuItemClick = (onClick: () => void) => {
    setMenuVisible(false)
    if (delayTimeoutId) {
      clearTimeout(delayTimeoutId)
    }
    onClick()
  }

  const handleTriggerMouseEnter = () => {
    if (on === 'hover') {
      setMenuVisible(true)
      if (delayTimeoutId) {
        clearTimeout(delayTimeoutId)
      }
    }
  }

  const handleTriggerMouseLeave = () => {
    if (on === 'hover') {
      setDelayTimeoutId(
        window.setTimeout(() => {
          setMenuVisible(false)
        }, closeDelay),
      )
    }
  }

  const handleDropdownMouseEnter = () => {
    if (on === 'hover') {
      if (delayTimeoutId) {
        clearTimeout(delayTimeoutId)
      }
    }
  }

  const handleDropdownMouseLeave = () => {
    if (on === 'hover') {
      setDelayTimeoutId(
        window.setTimeout(() => {
          setMenuVisible(false)
        }, closeDelay),
      )
    }
  }

  return (
    <DropdownContainer placement={placement} ref={dropdownRef}>
      <DropdownTrigger
        onClick={() => {
          if (on === 'click') {
            setMenuVisible(!menuVisible)
          }
        }}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
      >
        {trigger}
      </DropdownTrigger>
      {menuVisible && (
        <DropdownMenu
          placement={placement}
          arrow={arrow}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          {options.map((option) => (
            <DropdownMenuItem key={option.key} onClick={() => handleMenuItemClick(option.onClick)}>
              {option.link ? <a href={option.link}>{option.label}</a> : <span>{option.label}</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  )
}

export default Dropdown
