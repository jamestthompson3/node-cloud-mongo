import { Schema, model } from 'mongoose'

const UploadSchema = new Schema({
  name: String,
  s3Location: String,
  userId: String,
  fileType: String
})

export const Upload = model('Upload', UploadSchema)
