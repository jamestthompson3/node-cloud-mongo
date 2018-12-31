import styled from 'styled-components'

export const Input = styled.input.attrs(p => ({ type: p.type || 'text' }))`
  border-radius: ${p => p.theme.borderRadius};
  border: none;
  padding: 8px;
  margin: 5px 0px;
`
