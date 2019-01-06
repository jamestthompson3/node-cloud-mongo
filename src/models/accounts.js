import { Schema, model } from 'mongoose'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import passportLocalMongoose from 'passport-local-mongoose'

config()

export const AccountSchema = new Schema({
  username: String,
  password: String,
  displayName: String
})

AccountSchema.plugin(passportLocalMongoose)

AccountSchema.methods.generateJWT = function() {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 60)

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    process.env.SECRET_KEY
  )
}

AccountSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  }
}

export const Account = model('Account', AccountSchema)
