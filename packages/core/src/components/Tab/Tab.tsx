import React, { useState } from 'react'
import styled from 'styled-components'

interface TabProps {
  label: string
  children: React.ReactNode
  disable?: boolean
  onClick?: () => void
  icon?: React.ReactNode
  iconPlacement?: 'start' | 'top' | 'end' | 'bottom'
  direction?: 'column' | 'row' | string
}

interface TabPaneProps {
  active?: boolean
  children: React.ReactNode
}

interface TabsProps {
  children: React.ReactElement<TabProps>[]
  defaultIndex?: number
  justify?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | string
  icon?: React.ReactNode
  iconPlacement?: 'start' | 'top' | 'end' | 'bottom'
  direction?: 'column' | 'row'
}

const TabWrapper = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  overflow-x: hidden;
  width: max-content;
  height: max-content;
`

const TabList = styled.div<{ justify?: string; direction?: string }>`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  -webkit-background-clip: padding-box; /* for Safari */
  background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
  overflow-x: scroll;
  overflow-y: scroll;
  width: min-content;
  height: min-content;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  flex-direction: ${({ direction }) => (direction == 'row' ? 'column' : 'row')};
`

const TabListItem = styled.div<{ active?: boolean; disable?: boolean }>`
  border: none;
  white-space: nowrap;
  padding: 8px;
  margin-right: 8px;
  color: ${(props) => (props.active ? '#1890ff' : '#fff')};
  cursor: ${(props) => (props.disable ? 'not-allowed' : 'pointer')};
  z-index: 10;
  border-bottom: ${(props) => (props.active ? '2px solid #1890ff' : '2px solid transparent')};
  transition: border-bottom 0.3s ease-out;

  &::after {
    transform: translateX(-50%);
  }

  &:hover {
    color: #1890ff;
  }
`

const TabContent = styled.div`
  padding: 4px;
  flex-grow: 3;
  width: max-content;
  height: max-content;
`

const Tab: React.FC<TabProps> = ({ children, icon, iconPlacement = 'start' }) => {
  return (
    <>
      {icon && iconPlacement === 'start' ? <span className='icon'>{icon}</span> : null}
      {children}
      {icon && iconPlacement === 'end' ? <span className='icon'>{icon}</span> : null}
    </>
  )
}

const TabPane: React.FC<TabPaneProps> = ({ active, children }) => {
  if (!active) return null
  return <TabContent>{children}</TabContent>
}

const Tabs: React.FC<TabsProps> = ({ children, direction = 'row', justify = 'start', defaultIndex = 0 }) => {
  const [currentActiveKey, setCurrentActiveKey] = useState<number>(defaultIndex)

  const handleTabClick = (index: number) => {
    const clickedTab = children[index]
    if (clickedTab.props.disable) {
      return
    }
    setCurrentActiveKey(index)
    if (clickedTab.props.onClick) {
      clickedTab.props.onClick()
    }
  }

  return (
    <TabWrapper direction={direction}>
      <TabList justify={justify} direction={direction}>
        {React.Children.map(children, (child: React.ReactElement<TabProps>, index: number) => (
          <TabListItem
            active={currentActiveKey === index}
            onClick={() => handleTabClick(index)}
            disable={child.props.disable}
          >
            {child.props.label}
          </TabListItem>
        ))}
      </TabList>
      {React.Children.map(children, (child: React.ReactElement<TabProps>, index: number) => (
        <TabPane active={currentActiveKey === index}>{child.props.children}</TabPane>
      ))}
    </TabWrapper>
  )
}

export { Tabs, Tab }
