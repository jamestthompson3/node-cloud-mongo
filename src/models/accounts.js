import { Schema, model } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const AccountSchema = new Schema({
  username: String,
  password: String
})

AccountSchema.plugin(passportLocalMongoose)

export const Account = model('Account', AccountSchema)
