import styled from 'styled-components'
import { head, last } from 'lodash'

const findColor = p => p.theme[p.color] || p.color || p.primaryColor

const setSize = p => {
  switch(p.size) {
        case "lg":
            return [70, 30]
        case "xl":
            return [120, 60]
        default:
            return [50, 20]
        }
}

const Button = styled.button`
  padding: 10px;
  width: ${p => `${head(setSize(p))}px`};
  height: ${p =>`${last(setSize(p))}px`};
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => p.inverted ? '#fff' : findColor(p)};
  background: ${p => p.inverted ? findColor(p) : 'transparent'};
  border: ${p => `2px solid ${findColor(p)}`};
  cursor: pointer;
  &:hover {
    background: ${p => p.inverted ? 'transparent' : findColor(p)};
    color: ${p => p.inverted ? findColor(p) : '#fff'};
}
`
export default Button
