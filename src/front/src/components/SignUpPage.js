import React from 'react'
import { Formik } from 'formik'
import styled from 'styled-components'

import { Widget, Button, Input } from 'common/ui'
import { signUp } from 'common/api/auth'

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

export const SignUpPage = () => (
  <Widget title="sign up" style={{ marginTop: '4rem' }}>
    <Formik
      onSubmit={(values, setSubmitting) => {
        signUp(values)
          .then(() => setSubmitting(false))
          .catch(() => setSubmitting(false))
      }}
      render={({ isSubmitting, dirty, errors, handleSubmit, handleChange }) => (
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
              Create Account
            </Button>
          )}
        </Form>
      )}
    />
  </Widget>
)
