// imports go here
import * as React from 'react'
import styled from 'styled-components'

// define interface for Col props
interface ColProps {
  span?: number
  offset?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
  children?: React.ReactNode
  gutter?: number | [number, number]
  style?: React.CSSProperties
}

// define interface for Grid props
interface GridProps {
  gutter?: number | [number, number]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

interface RowProps {
  gutter?: number | [number, number]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  align?: 'top' | 'middle' | 'bottom'
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

// define styled components for Grid and Col
const GridContainer = styled.div<GridProps>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'top'};
  margin-left: ${(props) => (typeof props.gutter === 'number' ? `-${props.gutter / 2}px` : '-0')};
  margin-right: ${(props) => (typeof props.gutter === 'number' ? `-${props.gutter / 2}px` : '-0')};
`

const ColContainer = styled.div<ColProps>`
  flex: 0 0 auto;
  padding-left: ${(props) => (typeof props.gutter === 'number' ? `${props.gutter / 2}px` : '0')};
  padding-right: ${(props) => (typeof props.gutter === 'number' ? `${props.gutter / 2}px` : '0')};
  ${(props) => props.span && `flex-basis: ${(props.span / 24) * 100}%`};
  ${(props) => props.offset && `margin-left: ${(props.offset / 24) * 100}%`};

  ${(props) =>
    props.xs &&
    `
      @media (max-width: 575px) {
        flex-basis: ${(props.xs / 24) * 100}%;
        margin-left: 0;
      }
    `}

  ${(props) =>
    props.sm &&
    `
      @media (min-width: 576px) {
        flex-basis: ${(props.sm / 24) * 100}%;
        margin-left: 0;
      }
    `}
  
    ${(props) =>
    props.md &&
    `
      @media (min-width: 768px) {
        flex-basis: ${(props.md / 24) * 100}%;
        margin-left: 0;
      }
    `}
  
    ${(props) =>
    props.lg &&
    `
      @media (min-width: 992px) {
        flex-basis: ${(props.lg / 24) * 100}%;
        margin-left: 0;
      }
    `}
  
    ${(props) =>
    props.xl &&
    `
      @media (min-width: 1200px) {
        flex-basis: ${(props.xl / 24) * 100}%;
        margin-left: 0;
      }
    `}
  
    ${(props) =>
    props.xxl &&
    `
      @media (min-width: 1600px) {
        flex-basis: ${(props.xxl / 24) * 100}%;
        margin-left: 0;
      }
    `}
`

const RowContainer = styled.div<RowProps>`
  margin-left: ${(props) => (typeof props.gutter === 'number' ? `-${props.gutter / 2}px` : '-0')};
  margin-right: ${(props) => (typeof props.gutter === 'number' ? `-${props.gutter / 2}px` : '-0')};
`

// define Row component
export const Row: React.FC<RowProps> = ({ children, ...rest }) => {
  // filter out non-Col components from children
  const cols = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Col,
  ) as React.ReactElement<ColProps>[]

  // calculate column widths based on the span prop
  const totalSpan = cols.reduce((acc, col) => acc + (col.props.span || 0), 0)
  const colWidths = cols.map((col) => `${((col.props.span || 0) / totalSpan) * 100}%`)

  // create an array of column elements with correct styles
  const colElements = cols.map((col, index) => {
    const colStyle: React.CSSProperties = {
      ...(col.props.style || {}),
      flexBasis: colWidths[index],
      paddingLeft: typeof rest.gutter === 'number' ? `${rest.gutter / 2}px` : undefined,
      paddingRight: typeof rest.gutter === 'number' ? `${rest.gutter / 2}px` : undefined,
    }

    return React.cloneElement(col, { key: index, style: colStyle })
  })

  return (
    <RowContainer {...rest}>
      <Grid>{colElements}</Grid>
    </RowContainer>
  )
}

// define Grid and Col components
// define Grid and Col components
export const Grid: React.FC<GridProps> = ({ children, ...rest }) => {
  return <GridContainer {...rest}>{children}</GridContainer>
}

export const Col: React.FC<ColProps> = ({ children, span, offset, style, xs, sm, md, lg, xl, xxl, ...rest }) => {
  return (
    <ColContainer style={style} span={span} offset={offset} xs={xs} sm={sm} md={md} lg={lg} xl={xl} xxl={xxl} {...rest}>
      {children}
    </ColContainer>
  )
}
