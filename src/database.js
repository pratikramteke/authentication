import mongoose from "mongoose"
import config from "./config/config.js"

const connectToDB = async () => {
  try {
    console.log(config.MOGODB_URL);
    await mongoose.connect(config.MOGODB_URL)
    console.log("db connected")
  } catch (error) {
    console.error(error)
  }
}

export default connectToDB
