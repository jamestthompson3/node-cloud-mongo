import request from 'superagent'

export const signUp = ({ email, password }) =>
  request.post('/api/auth/register').send({ email, password })

export const login = ({ username, password }) =>
  request.post('/api/auth/login/').send({ username, password })
