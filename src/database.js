import mongoose from "mongoose"
import config from "./config/config.js"

const connectToDB = async () => {
  try {
    await mongoose.connect(config.MOGODB_URL)
    console.log("DB connected")
  } catch (error) {
    console.error(error)
  }
}

export default connectToDB
