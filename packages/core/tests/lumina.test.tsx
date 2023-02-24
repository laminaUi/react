import * as React from 'react'
import { render } from '@testing-library/react'
import 'jest-canvas-mock'

import { Button, Tooltip } from '../src'

function ComponentList() {
  return (
    <div className='test'>
      <Button variant='secondary'> Hi </Button>
    </div>
  )
}
describe('Common render', () => {
  it('renders without crashing', () => {
    render(<ComponentList />)
  })
})
