import express from 'express'

import { auth } from '../utils/auth'

export const uploadsRouter = express.Router()

uploadsRouter.post('/', auth.required, (req, res) => {
  res.sendStatus(200)
})
