import express from 'express'
import passport from 'passport'

import { Account } from '../models/accounts'

export const authenticationRouter = express.Router()

authenticationRouter.post('/register', (req, res, next) => {
  Account.register(new Account({ username: req.body.email }), req.body.password, err => {
    if (err) {
      console.log(err)
      return next(err)
    }

    res.sendStatus(200)
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

authenticationRouter.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.body)
  return res.send({ message: 'login successful' })
})

authenticationRouter.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})
