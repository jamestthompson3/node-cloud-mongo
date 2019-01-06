import express from 'express'

import { auth, getCurrentUser } from '../utils/auth'
import { Upload } from '../models/uploads'

export const uploadsRouter = express.Router()

uploadsRouter.use(auth.required)
uploadsRouter.post('/', async (req, res) => {
  const {
    payload: { id },
    body: { name }
  } = req
  const user = await getCurrentUser(id)
  // TODO upload to S3 and save info in model
  const upload = new Upload({ name, s3Location: 'testing2', userId: id })
  upload.save()
  return res.sendStatus(200)
})

uploadsRouter.get('/', async (req, res) => {
  const {
    payload: { id }
  } = req
  Upload.find({ userId: id }, (err, upload) => {
    return res.json(
      upload.map(({ name, fileType, s3Location }) => ({ name, fileType, s3Location }))
    )
  })
})
