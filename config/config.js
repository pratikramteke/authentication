import dotenv from "dotenv"

dotenv.config()

const config = {
  PORT: process.env.PORT || 5000,
  MOGODB_URL: process.env.MOGODB_URL || "mongodb://0.0.0.0:27017/authentication",
  JWT_SECRET: process.env.JWT_SECRET
}

export default config
