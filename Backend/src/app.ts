import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)

mongoose
  .connect(process.env.DB_PATH as string)
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.log('Error connecting to database', err)
  })

export default app