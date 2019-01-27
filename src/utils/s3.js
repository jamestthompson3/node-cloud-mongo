import { S3, config } from 'aws-sdk'

config.update({
  /* eslint-disable-next-line */
  accessKeyID: process.env.AWS_ACCESS_KEY,
  /* eslint-disable-next-line */
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const s3 = new S3()

// const params = {
//   Bucket: 'testing',
//   Body: req.body,
//   Key: `${req.user}filName${Date.now()}`
// }

const uploadToS3 = params => s3.upload(params, err => err && res.sendStatus(200))
const resolveParams = params => {
  const buff = new Buffer(params.fileName + Math.random())
  return `http://test/${buf.toString('base64')}`
}
const uploadToS3Dev = params => Promise.resolve(setTimeout(resolveParams(params), 500))
