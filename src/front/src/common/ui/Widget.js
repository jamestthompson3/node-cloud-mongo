import * as React from 'react'
import styled from 'styled-components'

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`
const WidgetBody = styled.div`
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.widgetBackground};
  display: flex;
  flex-direction: ${p => p.flexDirection || 'column'};
`

const WidgetTitle = styled.h3`
  text-transform: uppercase;
  margin: 0;
  color: ${p => p.theme.color};
`

export const Widget = ({ flexDirection, title, children, ...rest }) => (
  <WidgetWrapper {...rest}>
    <WidgetTitle>{title}</WidgetTitle>
    <WidgetBody flexDirection={flexDirection}>{children}</WidgetBody>
  </WidgetWrapper>
)
