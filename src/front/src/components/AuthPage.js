import React from 'react'
import { Formik } from 'formik'
import styled from 'styled-components'

import { Widget, Button, Input } from 'common/ui'
import { RootContext } from 'RootProvider'
import { signUp, login } from 'common/api/auth'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1.5rem;
  color: ${p => p.theme.color};
  height: 25rem;
  width: 20rem;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const authenticateUser = ({ values, setSubmitting, type, setCurrentUser, history }) => {
  const sendRequest =
    type === 'login' ? login({ username: values.email, password: values.password }) : signUp(values)
  return sendRequest
    .then(({ user, error }) => {
      setSubmitting(false)

      if (!error) {
        setCurrentUser(user)
        history.push(`/${encodeURIComponent(user.displayName || user.username)}`)
      }
    })
    .catch(() => setSubmitting(false))
}

export const AuthPage = ({ type, history }) => (
  <RootContext.Consumer>
    {({ user, setCurrentUser }) => (
      <Widget title={type} style={{ marginTop: '4rem' }}>
        <Formik
          onSubmit={(values, { setSubmitting }) =>
            authenticateUser({ values, setSubmitting, type, user, setCurrentUser, history })
          }
          render={({ isSubmitting, dirty, handleSubmit, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <label htmlFor="email">email</label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                />
              </InputGroup>
              {type !== 'login' && (
                <InputGroup>
                  <label htmlFor="displayName">display name</label>
                  <Input
                    id="displayName"
                    type="input"
                    placeholder="optional"
                    name="displayName"
                    onChange={handleChange}
                  />
                </InputGroup>
              )}
              <InputGroup>
                <label htmlFor="password">password</label>
                <Input
                  type="password"
                  id="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                />
              </InputGroup>
              {isSubmitting || (
                <Button aria-label="submit" type="submit" disabled={!dirty}>
                  {type}
                </Button>
              )}
            </Form>
          )}
        />
      </Widget>
    )}
  </RootContext.Consumer>
)
