import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import compression from 'compression'
import { config as dotenv } from 'dotenv'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { connect } from 'mongoose'
import morgan from 'morgan'

import { Account } from './models/accounts'
import { uploadsRouter } from './routes/upload'
import { authenticationRouter } from './routes/authenticate'

dotenv()

/* eslint-disable-next-line */
connect(process.env.MONGO_PORT)

passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

const app = express()
/* eslint-disable-next-line */
const PORT = process.env.NODE_ENV === 'production' ? 80 : 8080

app.use(morgan('dev'))
app.use(
  session({
    /* eslint-disable-next-line */
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    /* eslint-disable-next-line */
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(compression())
app.use(passport.initialize())
app.use(passport.session())
/* eslint-disable-next-line */
app.use(express.static(path.join(__dirname, 'front')))

app.use('/api/uploads', uploadsRouter)
app.use('/api/auth', authenticationRouter)

app.get('*', (req, res) => {
  /* eslint-disable-next-line */
  res.sendFile(path.join(__dirname, 'front/index.html'))
})

if (process.env.NODE_ENV !== 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

app.listen(PORT, () => console.log(`🚀  Absolutely EPIC on port ${PORT}!`))
