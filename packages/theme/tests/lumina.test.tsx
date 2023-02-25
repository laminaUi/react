import * as React from 'react'
import { render } from '@testing-library/react'
import 'jest-canvas-mock'

import { Icon } from '../src'

function IconTest() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <div>
      <Icon name='sun' color='red' className='h5' style={{ marginTop: '3px' }} />
      <Icon
        name="sun"
        color="red"
        className="h5"
        style={{ marginTop: '3px' }}
        aria-label="Sun icon"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-hidden="false"
      />
    </div>
  )
}
describe('Common render', () => {
  it('renders without crashing', () => {
    render(<IconTest />)
  })
})
