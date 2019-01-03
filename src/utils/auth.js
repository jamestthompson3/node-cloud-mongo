import jwt from 'express-jwt'
import { config as dotenv } from 'dotenv'

dotenv()

const getTokenFromHeaders = req => {
  const {
    headers: { authorization }
  } = req

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1]
  }

  return null
}

export const auth = {
  required: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeaders
  }),
  optional: jwt({
    secret: process.env.SECRET_KEY,
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false
  })
}
