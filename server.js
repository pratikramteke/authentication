import app from "./app.js"
import config from "./config/config.js"
import connectToDB from "./database.js"
import User from "./models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectToDB()

// setting up view enigne
app.set("view engine", "ejs")

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies

  if (token) {
    const decoded = jwt.verify(token, config.JWT_SECRET)
    req.user = await User.findById(decoded._id)
    next()
  } else {
    res.render("login")
  }
}

app.get("/", isAuthenticated, (req, res) => {
  const { name } = req.user
  res.render("dashboard", { name })
})

app.get("/signup", (req, res) => {
  res.render("signup")
})

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: "fields should not be empty" })
    }

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      res.json({ success: false, message: "user already exists login please" })
      return
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await User.create({ name, email, password: hashedPassword })
    user.password = undefined
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET)

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() +60 * 60 * 1000),
    })
    return res.redirect("/dashboard")
  } catch (error) {
    console.log(error)
    throw new Error(error)
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

        const token = jwt.sign({ _id: isUserExist._id }, config.JWT_SECRET)

        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        })
        return res.redirect("/dashboard")
      }
      return res.json({
        success: false,
        message: "incorrect email or password",
      })
    }
    return res.json({ success: false, message: "please signup first" })
  } catch (error) {
    console.log(error)
    throw error
  }
})

app.get("/dashboard", isAuthenticated, (req, res) => {
  const { name } = req.user
  res.render("dashboard", { name })
})

app.post("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.redirect("/")
})

app.get("/users",isAuthenticated, async (req, res) => {
  const user = await User.find()
  res.send(user)
})

app.listen(config.PORT, () => {
  console.log(`App listen on http://localhost:${config.PORT}`)
})
