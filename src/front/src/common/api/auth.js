import request from 'superagent'
import Cookies from 'js-cookie'

export const signUp = ({ email, password }) =>
  request
    .post('/api/auth/register')
    .send({ email, password })
    .then(res => {
      if (res.statusCode === 200) {
        Cookies.set('AuthToken', res.body.user.token)
        return res.status
      }
    })

export const login = ({ username, password }) => {
  console.log('hello world again')
  return request
    .post('/api/auth/login/')
    .send({ username, password })
    .then(res => {
      console.log('here is the res in login: ', res)

      if (res.statusCode === 200) {
        Cookies.set('AuthToken', res.body.user.token)
        console.log('res.status: ', res.status)
        return res.status
      } else {
        return 'Error in Login Process'
      }
    })
}
