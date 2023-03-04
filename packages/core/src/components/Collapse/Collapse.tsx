import * as React from 'react'
import styled, { css } from 'styled-components'

const CollapsePanelHeader = styled.div`
  padding: 10px;
  font-weight: bold;
  background-color: #f1f1f1;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #ddd;
    `}
`

const CollapsePanelContent = styled.div`
  padding: 10px;
`

const CollapsePanelContainer = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 10px;
`

const CollapseContainer = styled.div`
  border: 1px solid #ddd;
  margin-bottom: 10px;
`

interface CollapsePanelProps {
  header: React.ReactNode
  key: string
  isActive: boolean
  className?: string
  children: React.ReactNode
  onChange?: (key: string, isActive: boolean) => void
}

const CollapsePanel: React.FC<CollapsePanelProps> = ({ header, key, isActive, className, children, onChange }) => {
  const handleClick = () => {
    if (onChange) {
      onChange(key, !isActive)
    }
  }

  return (
    <CollapseContainer className={className}>
      <CollapsePanelHeader onClick={handleClick}>{header}</CollapsePanelHeader>
      <CollapsePanelContainer>
        {isActive && <CollapsePanelContent>{children}</CollapsePanelContent>}
      </CollapsePanelContainer>
    </CollapseContainer>
  )
}

interface CollapseProps {
  defaultActiveKey?: string
  activeKey?: string[]
  onChange?: (activeKeys: Array<string>, isActive: boolean) => void
  className?: string
  style?: React.CSSProperties
  accordion?: boolean
  children: React.ReactNode
}

const Collapse: React.FC<CollapseProps> = ({
  defaultActiveKey,
  activeKey,
  onChange,
  accordion = false,
  className,
  style,
  children,
}) => {
  const [activeKeys, setActiveKeys] = React.useState<string[]>([])

  React.useEffect(() => {
    if (defaultActiveKey) {
      setActiveKeys(Array.isArray(defaultActiveKey) ? defaultActiveKey : [defaultActiveKey])
    }
  }, [defaultActiveKey])

  React.useEffect(() => {
    if (activeKey !== undefined) {
      setActiveKeys(Array.isArray(activeKey) ? activeKey : [activeKey])
    }
  }, [activeKey])

  const handlePanelChange = (key: string, isActive: boolean) => {
    let newActiveKeys: string[] = []

    if (accordion) {
      if (isActive) {
        newActiveKeys = [key]
      }
    } else {
      newActiveKeys = isActive ? [...activeKeys, key] : activeKeys.filter((activeKey) => activeKey !== key)
    }

    setActiveKeys(newActiveKeys)

    if (onChange) {
      onChange(newActiveKeys, isActive)
    }
  }

  return (
    <div className={className} style={style}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement<CollapsePanelProps>(child)) {
          return null
        }

        const key = child.key?.toString()

        if (key === undefined) {
          throw new Error(`CollapsePanel must have a 'key' prop.`)
        }

        return React.cloneElement(child, {
          key,
          isActive: activeKeys.includes(key),
          onChange: handlePanelChange,
        })
      })}
    </div>
  )
}

export { Collapse, CollapsePanel }
