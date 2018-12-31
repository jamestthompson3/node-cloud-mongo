import request from 'superagent'

export const signUp = ({ email, password }) =>
  request.post('/api/auth/register').send({ email, password })
