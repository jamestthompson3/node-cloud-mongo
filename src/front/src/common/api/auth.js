import request from 'superagent'
import Cookies from 'js-cookie'

export const signUp = ({ email, password }) =>
  request
    .post('/api/auth/register')
    .send({ email, password })
    .then(res => {
      if (res.statusCode === 200) {
        Cookies.set('AuthToken', res.body.user.token)
      } else {
        console.log('Error in Signup Process')
      }
    })
    .then(() => {
      return 'hello'
    })

export const login = ({ username, password }) =>
  request
    .post('/api/auth/login/')
    .send({ username, password })
    .then(res => {
      if (res.statusCode === 200) {
        Cookies.set('AuthToken', res.body.user.token)
        return res.status
      } else {
        console.log('Error in Login Process')
      }
    })
