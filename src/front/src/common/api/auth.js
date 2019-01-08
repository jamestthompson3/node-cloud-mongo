import request from 'superagent'
import Cookies from 'js-cookie'

export const signUp = ({ email, password }) =>
  request
    .post('/api/auth/register')
    .send({ email, password })
    .then(res => {
      if (res.statusCode === 200) {
        Cookies.set('AuthToken', res.body.user.token)
      }
    })

export const login = ({ username, password }) =>
  request
    .post('/api/auth/login/')
    .send({ username, password })
    .then(res => {
      if (res.statusCode === 200) {
        Cookies.set('AuthToken', res.body.user.token)
      }
    })
