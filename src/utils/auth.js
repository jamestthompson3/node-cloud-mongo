import jwt from 'express-jwt'
import { config } from 'dotenv'

config()
import { Account } from '../models/accounts'

const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }

  return null
}

console.log(process.env.SECRET_KEY)

export const auth = {
  required: jwt({
    secret: process.env.SECRET_KEY || 'SOMETHING',
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: process.env.SECRET_KEY || 'ANOTHER',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
}

export const getCurrentUser = id => {
  return Account.findById(id).then(user => {
    if (!user) {
      return null
    }

    return user
  })
}
