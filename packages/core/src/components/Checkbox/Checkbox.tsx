import * as React from 'react'
import styled from 'styled-components'

interface CheckboxProps {
  value?: string
  defaultChecked?: boolean
  disabled?: boolean
  color?: string
  icon?: React.ReactNode
  leftLabel?: string
  rightLabel?: string
  onChange?: (value: string, checked: boolean) => void
}

const SLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 8px;
`

const SInput = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.color || '#ccc'};
  outline: none;
  cursor: pointer;
  margin-right: 8px;

  &:checked {
    background-color: ${(props) => props.color || '#ccc'};
    border-color: ${(props) => props.color || '#ccc'};

    &:before {
      content: '';
      display: block;
      width: 10px;
      height: 5px;
      border: 2px solid #fff;
      border-top: none;
      border-right: none;
      transform: rotate(45deg);
      position: absolute;
      top: 2px;
      left: 2px;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const SIcon = styled.div`
  margin-right: 8px;
`

const Checkbox = ({
  value,
  defaultChecked = false,
  disabled = false,
  color = '#ccc',
  icon,
  leftLabel,
  rightLabel,
  onChange,
}: CheckboxProps) => {
  const [isChecked, setChecked] = React.useState(defaultChecked)

  const handleChange = () => {
    if (!disabled) {
      const newValue = !isChecked
      setChecked(newValue)
      onChange(value, newValue)
    }
  }

  return (
    <SLabel>
      <SInput type='checkbox' checked={isChecked} disabled={disabled} color={color} onChange={handleChange} />
      {icon && <SIcon>{icon}</SIcon>}
      {leftLabel && <div style={{ marginRight: '8px' }}>{leftLabel}</div>}
      {rightLabel && <div style={{ marginLeft: '8px' }}>{rightLabel}</div>}
    </SLabel>
  )
}

export default Checkbox
