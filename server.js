import app from "./app.js"
import config from "./config/config.js"
import connectToDB from "./database.js"
import User from "./models/user.model.js"
import bcryptjs from "bcryptjs"

connectToDB()

app.set("view engine", "ejs")

app.get("/", async (req, res) => {
  const user = await User.find()
  res.render("login")
})

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      res.json({ success: false, message: "user already exists login please" })
      return
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await User.create({ name, email, password: hashedPassword })
    user.password = undefined
    res.json({ success: true, message: "user registered", user })
  } catch (error) {
    console.log(error)
  }
})

app.post("/login", async (req, res) => {
  // res.render('')
  try {
    const { email, password } = req.body

    const isUserExist = await User.findOne({ email }).select("+password")
    if (isUserExist) {
      const isPasswordMatch = await bcryptjs.compare(
        password,
        isUserExist.password
      )
      if (isPasswordMatch) {
        isUserExist.password = undefined
        res.json({
          success: true,
          message: "successfully logged in",
          isUserExist,
        })
        return
      }
      res.json({ success: false, message: "incorrect email or password" })
      return
    }
    res.send({ success: false, message: "please signup first" })
  } catch (error) {
    console.log(error)
  }
})

app.listen(config.PORT, () => {
  console.log(`App listen on http://localhost:${config.PORT}`)
})
