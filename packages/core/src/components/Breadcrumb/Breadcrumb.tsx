import React from 'react'
import styled from 'styled-components'

type BreadcrumbItem = {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
}

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const BreadcrumbLink = styled.a`
  color: #1890ff;
  &:hover {
    color: #40a9ff;
  }
`

const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  color: #ccc;
`

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, separator = '/' }) => {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          {item.icon && <span>{item.icon}</span>}
          {item.href ? (
            <BreadcrumbLink href={item.href} onClick={item.onClick}>
              {item.label}
            </BreadcrumbLink>
          ) : (
            <span>{item.label}</span>
          )}
          {index !== items.length - 1 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
        </React.Fragment>
      ))}
    </BreadcrumbContainer>
  )
}

export default Breadcrumb
