import { S3, config } from 'aws-sdk'

config.update({
  /* eslint-disable-next-line */
  accessKeyID: process.env.AWS_ACCESS_KEY,
  /* eslint-disable-next-line */
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const s3 = new S3()

const params = {
  Bucket: 'testing',
  Body: req.body,
  Key: `${req.user}filName${Date.now()}`
}
s3.upload(params, err => err && res.sendStatus(200))
