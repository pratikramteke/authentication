import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import config from "../config/config.js"

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

export default isAuthenticated
