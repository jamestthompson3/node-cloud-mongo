import express from 'express'
import passport from 'passport'

import { Account } from '../models/accounts'
import { auth } from '../utils/auth'

export const authenticationRouter = express.Router()

authenticationRouter.post('/register', (req, res, next) => {
  Account.register(new Account({ username: req.body.email }), req.body.password, (err, user) => {
    if (err) {
      return next(err)
    }

    return res.json({ user: user.toAuthJSON() })
  })
})

authenticationRouter.get('/', (req, res) => {
  Account.find({}, (err, docs) => {
    if (err) {
      return res.sendStatus(500)
    }

    // docs.forEach(doc => doc.remove())
    res.send(docs)
  })
})

authenticationRouter.post('/login', auth.optional, (req, res, next) => {
  return passport.authenticate('local', { session: false }, (err, passportUser) => {
    if (err) {
      return next(err)
    }

    if (passportUser) {
      return res.json({ user: passportUser.toAuthJSON() })
    }

    return res.status(400).send({ message: 'username or password incorrect' })
  })(req, res, next)
})

authenticationRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
