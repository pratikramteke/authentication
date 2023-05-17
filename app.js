import express from "express";
import path from "path"
import cookieParser from 'cookie-parser'

const app = express()

app.use(cookieParser())
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app