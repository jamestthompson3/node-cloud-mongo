import express from 'express'
import passport from 'passport'

export const uploadsRouter = express.Router()

uploadsRouter.post('/', passport.authenticate('local'), (req, res) => {
  res.sendStatus(200)
})
