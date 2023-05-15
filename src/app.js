import bodyParser from "body-parser";
import express from "express";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export default app