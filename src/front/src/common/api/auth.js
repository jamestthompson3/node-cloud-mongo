import request from 'superagent'
import Cookies from 'js-cookie'

export const signUp = ({ email, password, displayName }) => {
  return request
    .post('/api/auth/register')
    .send({ email, password, displayName })
    .then(res => {
      console.log(res)
      if (res.statusCode === 200) {
        Cookies.set('AuthToken', res.body.user.token)
        return res.body
      } else {
        return { body: { error: 'Error in Login Process' } }
      }
    })
}

export const login = ({ username, password }) => {
  return request
    .post('/api/auth/login/')
    .send({ username, password })
    .then(res => {
      if (res.statusCode === 200) {
        return res.body
      } else {
        return { body: { error: 'Error in Login Process' } }
      }
    })
}
