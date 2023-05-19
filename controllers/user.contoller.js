import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const getRoot = (req, res) => {
  const { name } = req.user
  res.render("dashboard", { name })
}

export const getSignUp = (req, res) => {
  res.render("signup")
}

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.render("signup", { message: "fields should not be empty" })
    }

    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
      return res.render("signup", {
        message: "user already exists login please",
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await User.create({ name, email, password: hashedPassword })
    user.password = undefined
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET)

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    return res.redirect("/dashboard")
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const login = async (req, res) => {
  // res.render('')
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.render("login", { message: "fields should not be empty" })
    }

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
      return res.render("login", { message: "incorrect email or password" })
    }
    return res.render("login", { message: "please signup first" })
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getDashboad = (req, res) => {
  const { name } = req.user
  res.render("dashboard", { name })
}

export const getUsers = async (req, res) => {
  const user = await User.find()
  res.send(user)
}

export const logout = (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.redirect("/")
}
