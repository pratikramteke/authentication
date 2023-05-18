import { Router } from "express"
import isAuthenticated from "../middlewares/auth.middleware.js"
import {
  getDashboad,
  getRoot,
  getSignUp,
  getUsers,
  login,
  logout,
  signUp,
} from "../controllers/user.contoller.js"

const router = Router()

router.get("/", isAuthenticated, getRoot)

router.get("/signup", getSignUp)

router.post("/signup", signUp)

router.post("/login", login)

router.get("/dashboard", isAuthenticated, getDashboad)

router.post("/logout", logout)

router.get("/users", isAuthenticated, getUsers)

export default router
