import styled from 'styled-components'
import { get } from 'lodash'

const findColor = p => p.theme[p.color] || p.color || p.theme.primaryColor

const BUTTON_SIZES = {
  lg: {
    width: '70px',
    height: '30px'
  },
  xl: {
    width: '120px',
    height: '60px'
  }
}

export const Button = styled.button`
  padding: 10px;
  width: ${p => get(BUTTON_SIZES, `${p.size}.width`, 'auto')};
  height: ${p => get(BUTTON_SIZES, `${p.size}.height`, 'auto')};
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => (p.inverted ? '#fff' : findColor(p))};
  background: ${p => (p.inverted ? findColor(p) : 'transparent')};
  border: ${p => `2px solid ${findColor(p)}`};
  cursor: pointer;
  &:hover {
    background: ${p => (p.inverted ? 'transparent' : findColor(p))};
    color: ${p => (p.inverted ? findColor(p) : '#fff')};
  }
  &:disabled {
    color: gray;
    border: 2px solid gray;
    background: rgba(123, 123, 123, 0.5);
    cursor: not-allowed;
  }
`
