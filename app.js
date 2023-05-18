import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import router from "./routes/user.route.js"

const app = express()

// setting up view enigne
app.set("view engine", "ejs")

app.use(cookieParser())
app.use(express.static(path.join(path.resolve(), "public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

export default app
